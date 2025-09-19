"use client";
import { ShippingWarranty } from "@/app/lib/types";
import React from "react";
import { Shield, Percent, DollarSign } from "lucide-react";
import Button from "@/app/common/Button";
import { useRouter } from "next/navigation";
import { ModalFooter } from "@/app/common/ModalFooter";
import { Modal } from "@/app/common/Modal";
import { POST_DELETE_SHIPPING_WARRANTY_URI } from "@/app/lib/URIS";
import { postFunction } from "@/app/lib/FetchUtils";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

interface ShippingWarrantyItemProps {
  warranty: ShippingWarranty;
}

interface DeleteResponse {
  isCompleted: boolean;
}

const ShippingWarrantyItem: React.FC<ShippingWarrantyItemProps> = ({
  warranty,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [randomString, setRandomString] = React.useState("");

  // Generar string aleatorio para confirmación
  const generateRandomString = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const validateInput = () => {
    if (inputRef.current) {
      return inputRef.current.value === randomString;
    }
    return false;
  };

  const postDelete = async () => {
    try {
      const uri = POST_DELETE_SHIPPING_WARRANTY_URI;
      const data = await postFunction<DeleteResponse>(uri, warranty, true, user as User);

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Garantía de envío eliminada exitosamente");
      } else {
        console.error("Error al eliminar la garantía de envío");
      }
    } catch (error) {
      console.error("Error al hacer delete:", error);
    }
  };

  React.useEffect(() => {
    if (isModalOpen) {
      setRandomString(generateRandomString(8));
    }
  }, [isModalOpen]);

  return (
    <div className="bg-brand-c dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-3 mb-2">
      {/* Nombre */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
        {warranty.name}
      </h3>

      {/* Costo porcentual */}
      <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
        <DollarSign className="w-4 h-4 mr-1" />
        <span>
          Costo:{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {warranty.percentCost}%
          </span>{" "}
          del valor del envío
        </span>
      </div>

      {/* Porcentaje de cobertura */}
      <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
        <Percent className="w-4 h-4 mr-1" />
        <span>
          Cobertura:{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {warranty.warrantyPercent}%
          </span>
        </span>
      </div>

      {/* Acciones */}
      <div className="flex space-x-2 mt-3">
        <Button
          color="primary"
          onClick={() => {
            router.push(`/orders/warranties/edit/${warranty.name}`);
          }}
        >
          Editar
        </Button>
        <Button color="danger" onClick={() => setIsModalOpen(true)}>
          Eliminar
        </Button>
      </div>

      {/* Modal confirmación */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Eliminar Garantía de Envío
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar esta garantía de envío?
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-bold">
            Esta acción no desactiva, sino que elimina permanentemente la
            garantía de envío.
          </p>

          {/* Confirmación con código aleatorio */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Para confirmar la eliminación, ingresa el siguiente código:
            </p>
            <p className="font-bold">{randomString}</p>
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Ingresa el código aquí"
              ref={inputRef}
            />
          </div>
        </div>
        <ModalFooter>
          <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              if (validateInput()) {
                postDelete();
                setIsModalOpen(false);
                window.location.reload();
              } else {
                alert("El código ingresado no es correcto.");
              }
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

export default ShippingWarrantyItem;
