"use client";
import Button from "@/app/common/Button";
import { Modal } from "@/app/common/Modal";
import { ModalFooter } from "@/app/common/ModalFooter";
import { getFunction, postFunction } from "@/app/lib/FetchUtils";
import { Product, Tag } from "@/app/lib/types";
import { GET_PRODUCT_TAGS_URI, POST_DELETE_PRODUCT_URI } from "@/app/lib/URIS";
import {
  Calendar,
  Percent,
  ImageIcon,
  Tag as TagIcon,
  PackageCheck,
  IdCard,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface ProductItemProps {
  product: Product;
}
interface DeleteResponse {
  isCompleted: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const router = useRouter();
  // Modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    console.log("Product in ProductItem:", product);
  }, [product]);

  const postDelete = async () => {
    try {
      const uri = POST_DELETE_PRODUCT_URI;
      const data = await postFunction<DeleteResponse>(uri, product, false);

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Producto eliminado exitosamente");
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al hacer delete:", error);
    }
  };

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
  {product.finalPrice !== undefined && product.finalPrice < product.price ? (
    <div className="space-y-0.5">
      {/* Precio original tachado */}
      <span className="text-sm text-gray-500 line-through">
        ${product.price.toFixed(2)}
      </span>
      {/* Final price destacado */}
      <span className="text-lg ml-2 font-semibold text-green-600 dark:text-green-400">
        ${product.finalPrice.toFixed(2)}
      </span>
      
    </div>
  ) : (
    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
      ${product.finalPrice !== undefined ? product.finalPrice.toFixed(2) : product.price.toFixed(2)}
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
          Creado el {new Date(Number(product.createdAt)).toUTCString()}
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

      {/*Id*/}
      <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
        <IdCard className="w-4 h-4 mt-[2px]" />
        <div className="flex flex-wrap gap-1">
          <span className="px-2 py-0.5 rounded-full dark:text-white text-gray-700 text-[11px]">
            {product.id}
          </span>
        </div>
      </div>

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
        <Button onClick={() => router.push(`/products/edit/${product.id}`)}>
          Editar
        </Button>
        <Button onClick={() => setIsModalOpen(true)} color="danger">
          Eliminar
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Eliminar Producto
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar este producto?
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-bold">
            Esta acción no desactiva, sino que elimina permanentemente el
            producto.
          </p>
        </div>
        <ModalFooter>
          <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              postDelete();
              setIsModalOpen(false);
              window.location.reload();
            }}
            color="danger"
          >
            Eliminar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductItem;
