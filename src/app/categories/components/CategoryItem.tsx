import React from "react";
import { Category } from "@/app/lib/types";
import {
  Info,
  Calendar,
  Percent,
} from "lucide-react";
import Button from "@/app/common/Button";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <div className="bg-brand-c dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-3">
      {/* Imagen (si existe) */}
      {category.imageUrl && (
        <div className="w-full h-40 overflow-hidden rounded-md border dark:border-gray-700">
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Nombre */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {category.name}
      </h3>

      {/* Descripción */}
      {category.description && (
        <div className="flex items-start text-gray-700 dark:text-gray-300 text-sm">
          <Info className="w-4 h-4 mt-0.5 mr-2" />
          <span>{category.description}</span>
        </div>
      )}

      {/* Descuento */}
      {category.discount !== undefined && (
        <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
          <Percent className="w-4 h-4 mr-2" />
          <span>Descuento: {category.discount}%</span>
        </div>
      )}

      {/* Fecha de creación */}
      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
        <Calendar className="w-4 h-4 mr-2" />
        <span>
          Creado en:{" "}
          {category.createdAt
            ? new Date(category.createdAt).toLocaleDateString()
            : "Fecha desconocida"}
        </span>
      </div>

      {/* Acciones */}
      <div className="mt-4 flex space-x-2">
        <Button onClick={() => console.log("Editar categoría", category.id)}>
          Editar
        </Button>
        <Button
          onClick={() => console.log("Eliminar categoría", category.id)}
          color="danger"
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default CategoryItem;
