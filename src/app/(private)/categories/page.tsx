"use client";
import React, { useEffect } from "react";
import BasePage from "../../common/BasePage";
import PulseSimpleItem from "../../common/PulseSimpleItem";
import CategoryItem from "./components/CategoryItem";
import PaginationButtons from "../../common/PaginationButtons";
import Button from "../../common/Button";
import { useRouter } from "next/navigation";
import { Category } from "../../lib/types";
import { getFunction } from "../../lib/FetchUtils";
import { GET_PAGINATED_CATEGORIES_URI } from "../../lib/URIS";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

interface PaginatedResponse {
  categories: Category[];
  lastVisible: string;
}

const CategoriesPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [lastVisibles, setLastVisibles] = React.useState<string[]>([]);
  const router = useRouter();
  const { user } = useAuth(); 

  const TEST_CATEGORY = {
    id: "1",
    name: "Categoría de Prueba",
    description: "Descripción de la categoría de prueba",
    createdAt: new Date().toISOString(),
    discount: 10,
    imageUrl: "https://placehold.co/150", // URL de ejemplo
  };

  const fetchCategories = async (lastVisible: string | null) => {
    setIsLoading(true);
    try {
      let uri = GET_PAGINATED_CATEGORIES_URI;
      if (lastVisible) {
        uri += `&lastVisible=${lastVisible}`;
      }
      const data = await getFunction<PaginatedResponse>(uri, true, user as User);

      setCategories(data?.categories || []);
      setLastVisibles((prev) => [...prev, data.lastVisible]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(null);
  }, []);

  useEffect(() => {
    // Aquí podrías manejar la lógica para cargar más proveedores
    // cuando se alcance el último proveedor visible.
    if (lastVisibles.length > 0) {
      console.log("Últimos proveedores visibles:", lastVisibles);
      // Lógica para cargar más proveedores si es necesario
    }
  }, [lastVisibles]);

  return (
    <BasePage
      title="Categorías"
      description={"Aquí puedes administrar las categorías de tus productos."}
    >
      <div>
        {isLoading ? (
          <div className="space-y-4">
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
          </div>
        ) : (
          <div className="space-y-4">

            <Button color="primary" onClick={() => {
            router.push("/categories/add");
          }} className="mb-4" size="large" >Agregar</Button>

          {
            categories.length > 0 ? (
              categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))
            ) : (<div className="text-center text-gray-500">
                No hay proveedores disponibles.
              </div>)
          }

            <PaginationButtons
              onBack={() => {
                if (lastVisibles.length > 1) {
                  const newLastVisibles = lastVisibles.slice(0, -2);
                  const previousLastVisible =
                    newLastVisibles[newLastVisibles.length - 1] || null;
                  setLastVisibles(newLastVisibles);
                  fetchCategories(previousLastVisible);
                } else {
                  console.warn("No hay más páginas anteriores.");
                }
              }}
              onNext={() => {
                const lastVisible = lastVisibles[lastVisibles.length - 1];
                if (lastVisible == "") {
                  setLastVisibles([]);
                }
                fetchCategories(lastVisible);
              }}
              disableBack={true}
              disableNext={false}
              isLoading={false}
            />
          </div>
        )}
      </div>
    </BasePage>
  );
};

export default CategoriesPage;
