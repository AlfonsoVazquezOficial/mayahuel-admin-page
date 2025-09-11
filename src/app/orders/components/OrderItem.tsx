import React from "react";
import { Order } from "@/app/lib/types";
import {
  Calendar,
  CreditCard,
  Phone,
  ShoppingCart,
  User2,
  Mail,
  BadgeDollarSign,
  Truck,
} from "lucide-react";
import Button from "@/app/common/Button";
import { useRouter } from "next/navigation";
import { pdf } from "@react-pdf/renderer";
import PaymentConfirmedPDF from "../pdfs/PaymentConfirmedPDF";
import { Modal } from "@/app/common/Modal";
import { ModalFooter } from "@/app/common/ModalFooter";
import { POST_DELETE_ORDER_URI } from "@/app/lib/URIS";
import { postFunction } from "@/app/lib/FetchUtils";

interface OrderItemProps {
  order: Order;
}

interface DeleteResponse {
  isCompleted: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const {
    paymentDetails,
    products,
    totalAmount,
    status,
    createdAt,
    shippingDetails,
  } = order;
  // Modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [randomString, setRandomString] = React.useState("");

  React.useEffect(() => {
    setRandomString(generateRandomString(8));
  }, [isModalOpen]);

  const postDelete = async () => {
    try {
      const uri = POST_DELETE_ORDER_URI;
      const data = await postFunction<DeleteResponse>(uri, order, false);

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

  // Cast shippingDetails para poder usarlo
  const sd = shippingDetails as Record<string, object>;

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const router = useRouter();

  const handleDownloadPDF = async () => {
    console.log("Order data:", order);
    if (!order) return;

    const blob = await pdf(
      <PaymentConfirmedPDF
        order={order} // Reemplaza con tus productos reales
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Orden ${new Date().toLocaleDateString()}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

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

  return (
    <div className="bg-brand-c dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center gap-3">
          <User2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {sd.fullName.toString()}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{sd.email.toString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4" />
              <span>{sd.phone.toString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 md:mt-0 text-sm text-right">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-semibold text-xs">
            {status.name}
          </span>
        </div>
      </div>

      {/* Detalles del pedido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          <span>Método: {paymentDetails.method}</span>
          <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
            {paymentDetails.status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BadgeDollarSign className="w-4 h-4" />
          <span className="font-semibold text-green-600 dark:text-green-400">
            Total: {formatPrice(totalAmount)}
          </span>
        </div>
      </div>

      {/* Fecha */}
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="w-4 h-4 mr-2" />
        <span>Creado el {new Date(parseInt(createdAt)).toUTCString()}</span>
      </div>

      {/* Productos incluidos */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
          <ShoppingCart className="w-5 h-5" />
          <span>Productos</span>
        </div>
        <ul className="space-y-2">
          {products.map((p, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2"
            >
              <div>
                <p className="font-medium text-sm text-gray-800 dark:text-gray-100">
                  {p.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Cantidad: {p.quantity} | Precio unitario:{" "}
                  {formatPrice(p.pricePerUnit)}
                </p>
              </div>
              <div className="text-sm font-semibold">
                {formatPrice(p.finalPrice)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Detalles de envío */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-sm space-y-1">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span>
            {String(sd.address)}, {String(sd.city)}, {String(sd.state)},{" "}
            {String(sd.country)}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Código Postal: {String(sd.postalCode)} | Envío:{" "}
          {(sd.shippingMethod as { name?: string } | undefined)?.name ??
            "No especificado"}{" "}
          (
          {(sd.shippingWarranty as { name?: string } | undefined)?.name ??
            "No especificada"}
          )
        </p>
      </div>

      {/* Acciones */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-end">
        <Button
          onClick={() => {
            router.push(`/orders/${order.id}/change-status`);
          }}
        >
          Cambiar Estado
        </Button>
        <Button color="secondary" onClick={() => handleDownloadPDF()}>
          Generar PDF
        </Button>
        <Button
          color="secondary"
          onClick={() => router.push(`/orders/${order.id}/edit-shipping`)}
        >
          Editar Datos de Envío
        </Button>
        <Button color="danger" onClick={() => setIsModalOpen(true)}>
          Eliminar
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Eliminar Pedido
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar este pedido?
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-bold">
            Esta acción no desactiva, sino que elimina permanentemente el
            pedido.
          </p>

          {/* Generate random string and ask confirmation by input */}
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

export default OrderItem;
