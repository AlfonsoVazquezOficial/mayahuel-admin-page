"use client";

import BasePage from "@/app/common/BasePage";
import PulseSimpleItem from "@/app/common/PulseSimpleItem";
import { getFunction, postFunction } from "@/app/lib/FetchUtils";
import { OrderStatus } from "@/app/lib/types";
import {
  GET_ALL_ORDER_STATUSES_URI,
  GET_ORDER_STATUS_BY_ID_URI,
  POST_CHANGE_ORDER_STATUS_URI,
} from "@/app/lib/URIS";
import { Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface UpdateResponse {
  isUpdated: boolean;
}

const ChangeOrderStatusPage = () => {
  const params = useParams();
  const id = params?.id as string; // 👈 id desde la ruta dinámica

  const [statuses, setStatuses] = useState<OrderStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const router = useRouter();
  

  // 🎨 Colores por estado
  const statusColor =
    status === "Completado"
      ? "#00690d"
      : status === "Cancelado"
      ? "#cb191b"
      : "#FFA500";

      const getStatusIdByName = (name: string) => {
        const statusObj = statuses.find((st) => st.name === name);
        return statusObj ? statusObj.id : null;
      }

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const data = await getFunction<string>(
          `${GET_ORDER_STATUS_BY_ID_URI}?id=${id}`
        );
        setStatus(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };
    fetchOrderStatus();
  }, [id]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await getFunction<OrderStatus[]>(GET_ALL_ORDER_STATUSES_URI);
        setStatuses(data);
      } catch (error) {
        console.error("Error fetching order statuses:", error);
      }
    };
    fetchStatuses();
  }, []);

  // Manejo del cambio en el select
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  // Guardar el nuevo estado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { orderId: id, newStatus: getStatusIdByName(status) };

      console.log("Enviando body:", body);
      const data = await postFunction<UpdateResponse>(
        POST_CHANGE_ORDER_STATUS_URI, // 🔧 Ajusta la ruta de tu backend
        body
      );

      if (data) {
        console.log("Estado actualizado correctamente");
        router.push("/orders"); // Redirige a la lista de pedidos
      } else {
        console.error("Error al actualizar el estado");
      }
    } catch (error) {
      console.error("Error posting order status:", error);
    }
  };

  return (
    <BasePage
      title="Cambiar Estado del Pedido"
      description="Selecciona el nuevo estado para la orden."
    >
      {isLoading ? (
        <PulseSimpleItem />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
        >
          {/* Estado actual */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Estado actual
            </label>
            <div
              style={{ backgroundColor: statusColor }}
              className="p-4 rounded-lg text-white font-bold text-center"
            >
              {status}
            </div>
          </div>

          {/* Seleccionar nuevo estado */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Selecciona un nuevo estado
            </label>
            <select
              value={status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-800"
              required
            >
              <option value="">Seleccione estado</option>
              {statuses.map((st) => (
                <option key={st.id} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botón guardar */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Save className="h-5 w-5" />
            Guardar Estado
          </button>
        </form>
      )}
    </BasePage>
  );
};

export default ChangeOrderStatusPage;
