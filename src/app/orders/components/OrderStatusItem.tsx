"use client";
import Button from "@/app/common/Button";
import { Modal } from "@/app/common/Modal";
import { ModalFooter } from "@/app/common/ModalFooter";
import { postFunction } from "@/app/lib/FetchUtils";
import { OrderStatus } from "@/app/lib/types";
import { POST_DELETE_ORDER_STATUS_URI } from "@/app/lib/URIS";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface OrderStatusItemProps {
  orderStatus: OrderStatus;
}

interface DeleteResponse {
  isCompleted: boolean;
}

const OrderStatusItem: React.FC<OrderStatusItemProps> = ({ orderStatus }) => {
  const router = useRouter();
  // Modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const postDelete = async () => {
    try {
      const uri = POST_DELETE_ORDER_STATUS_URI;
      const data = await postFunction<DeleteResponse>(uri, orderStatus, false);

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Estado de la orden eliminado exitosamente");
      } else {
        console.error("Error al eliminar el estado de la orden");
      }
    } catch (error) {
      console.error("Error al hacer delete:", error);
    }
  };

  return (
    <div className="bg-brand-c dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-3">
      {/* Nombre */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {orderStatus.name}
      </h3>

      {/* Fecha de creación */}
      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
        <Calendar className="w-4 h-4 mr-2" />
        <span>
          Creado en:{" "}
          {orderStatus.createdAt
            ? new Date(Number(orderStatus.createdAt)).toUTCString()
            : "Fecha desconocida"}
        </span>
      </div>

      {/* Acciones */}
      <div className="mt-4 flex space-x-2">
        <Button onClick={() => router.push(`/orders/statuses/edit/${orderStatus.id}`)}>
          Editar
        </Button>
        <Button onClick={() => setIsModalOpen(true)} color="danger">
          Eliminar
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Eliminar Estado de Pedido
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar este Estado de pedido?
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-bold">
            Esta acción no desactiva, sino que elimina permanentemente el estado de pedido.
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

export default OrderStatusItem;
