"use client";
import React from "react";
import BasePage from "../common/BasePage";
import PulseSimpleItem from "../common/PulseSimpleItem";
import SupplierItem from "./components/SupplierItem";
import PaginationButtons from "../common/PaginationButtons";

const SuppliersPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const TEST_SUPPLIER = {
    id: "1",
    name: "Proveedor de Prueba",
    email: "proveedor@prueba.com",
    phone: "123456789",
    address: "Calle Falsa 123",
    createdAt: new Date().toISOString(),
  };

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
            <SupplierItem supplier={TEST_SUPPLIER} />
            <SupplierItem supplier={TEST_SUPPLIER} />
            <SupplierItem supplier={TEST_SUPPLIER} />
            <SupplierItem supplier={TEST_SUPPLIER} />
            <SupplierItem supplier={TEST_SUPPLIER} />

            <PaginationButtons
              currentPage={6}
              totalPages={12}
              onBack={() => console.log("Back")}
              onNext={() => console.log("Next")}
              onPageChange={(page) => console.log("Change to", page)}
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
