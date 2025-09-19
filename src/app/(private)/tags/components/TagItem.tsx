"use client";
import Button from "@/app/common/Button";
import { Modal } from "@/app/common/Modal";
import { ModalFooter } from "@/app/common/ModalFooter";
import { postFunction } from "@/app/lib/FetchUtils";
import { Tag } from "@/app/lib/types";
import { POST_DELETE_TAG_URI } from "@/app/lib/URIS";
import { Calendar, Percent } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface TagItemProps {
  tag: Tag;
}

interface DeleteResponse {
  isCompleted: boolean;
}

const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  const router = useRouter();
  // Modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const postDelete = async () => {
    try {
      const uri = POST_DELETE_TAG_URI;
      const data = await postFunction<DeleteResponse>(uri, tag, false);

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Tag eliminado exitosamente");
      } else {
        console.error("Error al eliminar el tag");
      }
    } catch (error) {
      console.error("Error al hacer delete:", error);
    }
  };

  return (
    <div className="bg-brand-c dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-3">
      {/* Nombre */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {tag.name}
      </h3>

      {/* Descuento */}
      {tag.discount !== undefined && (
        <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
          <Percent className="w-4 h-4 mr-2" />
          <span>Descuento: {tag.discount}%</span>
        </div>
      )}

      {/* Fecha de creación */}
      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
        <Calendar className="w-4 h-4 mr-2" />
        <span>
          Creado en:{" "}
          {tag.createdAt
            ? new Date(Number(tag.createdAt)).toUTCString()
            : "Fecha desconocida"}
        </span>
      </div>

      {/* Color */}
      {tag.color && (
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
          <span>Color: {tag.color}</span>
          <span
            className="ml-2 w-4 h-4 rounded-full"
            style={{ backgroundColor: tag.color }}
          ></span>
        </div>
      )}

      {/* Acciones */}
      <div className="mt-4 flex space-x-2">
        <Button onClick={() => router.push(`/tags/edit/${tag.id}`)}>
          Editar
        </Button>
        <Button onClick={() => setIsModalOpen(true)} color="danger">
          Eliminar
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Eliminar Tag
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar este tag?
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-bold">
            Esta acción no desactiva, sino que elimina permanentemente el tag.
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

export default TagItem;
