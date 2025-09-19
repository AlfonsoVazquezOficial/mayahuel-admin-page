"use client";
import React, { useEffect } from "react";
import BasePage from "../../common/BasePage";
import PulseSimpleItem from "../../common/PulseSimpleItem";
import PaginationButtons from "../../common/PaginationButtons";
import TagItem from "./components/TagItem";
import { useRouter } from "next/navigation";
import { Tag } from "../../lib/types";
import { getFunction } from "../../lib/FetchUtils";
import Button from "../../common/Button";
import { GET_PAGINATED_TAGS_URI } from "../../lib/URIS";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

interface PaginatedResponse {
  tags: Tag[];
  lastVisible: string;
}

const TagsPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [lastVisibles, setLastVisibles] = React.useState<string[]>([]);
  const router = useRouter();

  const TEST_TAG = {
    id: "1",
    name: "Etiqueta de Prueba",
    createdAt: new Date().toISOString(),
    color: "#FF5733", // Color de ejemplo,
    discount: 15, // Descuento de ejemplo
  };

  const fetchTags = async (lastVisible: string | null) => {
    setIsLoading(true);
    try {
      let uri = GET_PAGINATED_TAGS_URI;
      if (lastVisible) {
        uri += `&lastVisible=${lastVisible}`;
      }
      const data = await getFunction<PaginatedResponse>(uri, true, user as User);

      setTags(data?.tags || []);
      setLastVisibles((prev) => [...prev, data.lastVisible]);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags(null);
  }, []);

  useEffect(() => {
    // Aquí podrías manejar la lógica para cargar más
    // cuando se alcance el último visible.
    if (lastVisibles.length > 0) {
      console.log("Últimos visibles:", lastVisibles);
      // Lógica para cargar más si es necesario
    }
  }, [lastVisibles]);

  return (
    <BasePage
      title="Etiquetas"
      description={"Aquí puedes administrar las etiquetas de tus productos."}
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
            <Button
              color="primary"
              onClick={() => {
                router.push("/tags/add");
              }}
              className="mb-4"
              size="large"
            >
              Agregar
            </Button>

            {tags.length > 0 ? (
              tags.map((tag) => <TagItem key={tag.id} tag={tag} />)
            ) : (
              <div className="text-center text-gray-500">
                No hay etiquetas disponibles.
              </div>
            )}

            <PaginationButtons
              onBack={() => {
                if (lastVisibles.length > 1) {
                  const newLastVisibles = lastVisibles.slice(0, -2);
                  const previousLastVisible =
                    newLastVisibles[newLastVisibles.length - 1] || null;
                  setLastVisibles(newLastVisibles);
                  fetchTags(previousLastVisible);
                } else {
                  console.warn("No hay más páginas anteriores.");
                }
              }}
              onNext={() => {
                const lastVisible = lastVisibles[lastVisibles.length - 1];
                if (lastVisible == "") {
                  setLastVisibles([]);
                }
                fetchTags(lastVisible);
              }}
              disableBack={false}
              disableNext={false}
              isLoading={false}
            />
          </div>
        )}
      </div>
    </BasePage>
  );
};

export default TagsPage;
