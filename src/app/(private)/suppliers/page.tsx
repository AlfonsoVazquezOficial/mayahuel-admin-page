"use client";
import React, { useEffect } from "react";
import BasePage from "../../common/BasePage";
import PulseSimpleItem from "../../common/PulseSimpleItem";
import SupplierItem from "./components/SupplierItem";
import PaginationButtons from "../../common/PaginationButtons";
import { getFunction } from "../../lib/FetchUtils";
import { GET_PAGINATED_SUPPLIERS_URI } from "../../lib/URIS";
import { Supplier } from "../../lib/types";
import Button from "../../common/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

interface PaginatedSuppliersResponse {
  suppliers: Supplier[];
  lastVisible: string;
}

const SuppliersPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);
  const [lastVisibles, setLastVisibles] = React.useState<string[]>([]);
  const router = useRouter();
  const {user} = useAuth();

  const TEST_SUPPLIER = {
    id: "1",
    name: "Proveedor de Prueba",
    email: "proveedor@prueba.com",
    phone: "123456789",
    address: "Calle Falsa 123",
    createdAt: new Date().toISOString(),
  };

  const fetchSuppliers = async (lastVisible: string | null) => {
    setIsLoading(true);
    try {
      let uri = GET_PAGINATED_SUPPLIERS_URI;
      if (lastVisible) {
        uri += `&lastVisible=${lastVisible}`;
      }
      const data = await getFunction<PaginatedSuppliersResponse>(uri, true, user as User);

      setSuppliers(data?.suppliers || []);
      setLastVisibles((prev) => [...prev, data.lastVisible]);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers(null);
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
      title="Proveedores"
      description={"Aquí puedes administrar los proveedores de tus productos."}
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
                router.push("/suppliers/add");
              }}
              className="mb-4"
              size="large"
            >
              Agregar
            </Button>

            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <SupplierItem key={supplier.id} supplier={supplier} />
              ))
            ) : (
              <div className="text-center text-gray-500">
                No hay proveedores disponibles.
              </div>
            )}

            <PaginationButtons
              onBack={() => {
                if (lastVisibles.length > 1) {
                  const newLastVisibles = lastVisibles.slice(0, -2);
                  const previousLastVisible =
                    newLastVisibles[newLastVisibles.length - 1] || null;
                  setLastVisibles(newLastVisibles);
                  fetchSuppliers(previousLastVisible);
                } else {
                  console.warn("No hay más proveedores anteriores.");
                }
              }}
              onNext={() => {
                const lastVisible = lastVisibles[lastVisibles.length - 1];
                if (lastVisible == "") {
                  setLastVisibles([]);
                }
                fetchSuppliers(lastVisible);
              }}
              disableBack={false}
              disableNext={false}
              isLoading={false}
            />
          </div>
        )}
        {/* Aquí puedes agregar más componentes o lógica para mostrar los proveedores */}
      </div>
    </BasePage>
  );
};

export default SuppliersPage;
