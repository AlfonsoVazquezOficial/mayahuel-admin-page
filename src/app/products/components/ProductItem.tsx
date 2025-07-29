import Button from "@/app/common/Button";
import { Product } from "@/app/lib/types";
import {
  Calendar,
  Percent,
  ImageIcon,
  Tag as TagIcon,
  PackageCheck,
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="bg-brand-c dark:bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4 transition hover:shadow-xl">
      {/* Header: Nombre + Precio */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {product.description}
            </p>
          )}
        </div>
        <div className="text-right">
          {product.discount ? (
            <div className="space-y-0.5">
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg ml-2 font-semibold text-green-600 dark:text-green-400">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </span>
              <div className="flex items-center justify-end text-sm text-gray-700 dark:text-gray-300">
                <Percent className="w-4 h-4 mr-1" />
                <span>{product.discount}%</span>
              </div>
            </div>
          ) : (
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Stock + mínimo */}
      <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-1">
          <PackageCheck className="w-4 h-4" />
          <span>Stock: {product.stock}</span>
        </div>
        {product.minimumStock !== undefined && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            (Mínimo: {product.minimumStock})
          </div>
        )}
      </div>

      {/* Fecha de creación */}
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="w-4 h-4 mr-2" />
        <span>
          Creado el {new Date(product.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Tags */}
      {Array.isArray(product.tags) && product.tags.length > 0 && (
        <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
          <TagIcon className="w-4 h-4 mt-[2px]" />
          <div className="flex flex-wrap gap-1">
            {product.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 rounded-full text-white text-[11px]"
                style={{ backgroundColor: tag.color || "#6b7280" }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Imágenes */}
      {product.images && product.images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <ImageIcon className="w-4 h-4 mr-2" />
            <span>
              {product.images.length} imagen
              {product.images.length > 1 ? "es" : ""}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.slice(0, 3).map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Producto ${product.name}`}
                width={150}
                height={150}
                className="rounded-md object-cover h-20 w-full border border-gray-200 dark:border-gray-700 "
              />    
            ))}
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-2 justify-end">
        <Button onClick={() => console.log("Editar producto", product.id)}>
          Editar
        </Button>
        <Button
          onClick={() => console.log("Eliminar producto", product.id)}
          color="danger"
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
