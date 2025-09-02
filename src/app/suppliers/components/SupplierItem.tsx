"use client";
import React from "react";
import { Supplier } from "@/app/lib/types";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import Button from "@/app/common/Button";
import { useRouter } from "next/navigation";
import { Modal } from "@/app/common/Modal";
import { ModalFooter } from "@/app/common/ModalFooter";
import { POST_DELETE_SUPPLIER_URI } from "@/app/lib/URIS";
import { postFunction } from "@/app/lib/FetchUtils";

interface SupplierItemProps {
  supplier: Supplier;
}
interface DeleteSupplierResponse {
  isCompleted: boolean;
}

const SupplierItem: React.FC<SupplierItemProps> = ({ supplier }) => {
  const router = useRouter();

  // Modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const postDeleteSupplier = async () => {
    try {
      const uri = POST_DELETE_SUPPLIER_URI;
      const data = await postFunction<DeleteSupplierResponse>(
        uri,
        supplier,
        false
      );

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Proveedor eliminado exitosamente");
      } else {
        console.error("Error al eliminar el proveedor");
      }
    } catch (error) {
      console.error("Error al hacer delete:", error);
    }
  };

  return (
    <div className="bg-brand-c dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-2">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {supplier.name}
      </h3>

      <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
        <Mail className="w-4 h-4 mr-2" />
        <span>{supplier.email}</span>
      </div>

      <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
        <Phone className="w-4 h-4 mr-2" />
        <span>{supplier.phone}</span>
      </div>

      {supplier.address && (
        <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{supplier.address}</span>
        </div>
      )}

      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-2">
        <Calendar className="w-4 h-4 mr-2" />
        <span>
          Creado el:{" "}
          {supplier.createdAt
            ? new Date(Number(supplier.createdAt)).toUTCString()
            : "Fecha desconocida"}
        </span>
      </div>

      <div className="mt-4 flex space-x-2">
        <Button onClick={() => router.push(`/suppliers/edit/${supplier.id}`)}>
          Editar
        </Button>
        <Button
          onClick={() => setIsModalOpen(true)}
          color="danger"
          className="ml-2"
        >
          Eliminar
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Eliminar Proveedor
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar este proveedor?
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-bold">
            Esta acción no desactiva, sino que elimina permanentemente al
            proveedor.
          </p>
        </div>
        <ModalFooter>
          <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              postDeleteSupplier();
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

export default SupplierItem;
