'use client';
import React from "react";
import { Category } from "@/app/lib/types";
import {
  Info,
  Calendar,
  Percent,
} from "lucide-react";
import Button from "@/app/common/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Modal } from "@/app/common/Modal";
import { ModalFooter } from "@/app/common/ModalFooter";
import { POST_DELETE_CATEGORY_URI } from "@/app/lib/URIS";
import { postFunction } from "@/app/lib/FetchUtils";

interface CategoryItemProps {
  category: Category;
}

interface DeleteResponse {
  isCompleted: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const router = useRouter();
  // Modal
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    
  const postDelete = async () => {
    try {
      const uri = POST_DELETE_CATEGORY_URI;
      const data = await postFunction<DeleteResponse>(
        uri,
        category,
        false
      );

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Categoría eliminada exitosamente");
      } else {
        console.error("Error al eliminar la categoría");
      }
    } catch (error) {
      console.error("Error al hacer delete:", error);
    }
  };

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
            ? new Date(Number(category.createdAt)).toUTCString()
            : "Fecha desconocida"}
        </span>
      </div>

      {/* Acciones */}
      <div className="mt-4 flex space-x-2">
        <Button onClick={() => router.push(`/categories/edit/${category.id}`)}>
          Editar
        </Button>
        <Button
          onClick={() => setIsModalOpen(true)}
          color="danger"
        >
          Eliminar
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Eliminar Categoría
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  ¿Estás seguro de que deseas eliminar esta categoría?
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400 font-bold">
                  Esta acción no desactiva, sino que elimina permanentemente la categoría.
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

export default CategoryItem;
