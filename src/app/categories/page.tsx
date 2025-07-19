"use client";
import React from "react";
import BasePage from "../common/BasePage";
import PulseSimpleItem from "../common/PulseSimpleItem";
import CategoryItem from "./components/CategoryItem";
import PaginationButtons from "../common/PaginationButtons";

const CategoriesPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const TEST_CATEGORY = {
    id: "1",
    name: "Categoría de Prueba",
    description: "Descripción de la categoría de prueba",
    createdAt: new Date().toISOString(),
    discount: 10,
    imageUrl: "https://placehold.co/150", // URL de ejemplo
  };

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
            <CategoryItem category={TEST_CATEGORY} />
            <CategoryItem category={TEST_CATEGORY} />
            <CategoryItem category={TEST_CATEGORY} />
            <CategoryItem category={TEST_CATEGORY} />
            <CategoryItem category={TEST_CATEGORY} />

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
      </div>
    </BasePage>
  );
};

export default CategoriesPage;
