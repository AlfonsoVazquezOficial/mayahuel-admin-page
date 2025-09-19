'use client';
import BasePage from '@/app/common/BasePage';
import { useAuth } from '@/app/hooks/useAuth';
import { getFunction, postFunction } from '@/app/lib/FetchUtils';
import { OrderStatus } from '@/app/lib/types';
import { GET_BY_ID_ORDER_STATUS_URI, POST_SAVE_ORDER_STATUS_URI } from '@/app/lib/URIS';
import { User } from 'firebase/auth';
import { Package, Save, } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface EditResponse {
  isCompleted: boolean;
}
const EditOrderStatusPage = () => {

  const { user } = useAuth();
  const params = useParams();
  const orderStatusId = params?.id as string; // 👈 id desde la ruta dinámica
  const [formData, setFormData] = useState({
    name: "",
    createdAt: "",
  });
  
  
    const [loading, setLoading] = useState(true);

    // Cargar datos del proveedor
  useEffect(() => {
    
    const getOrderStatus = async () => {
      try {
        const uri = `${GET_BY_ID_ORDER_STATUS_URI}/${orderStatusId}`;
        const orderStatus = await getFunction<OrderStatus>(uri, true, user as User);

        if (orderStatus) {
          setFormData({
            name: orderStatus.name,
            createdAt: orderStatus.createdAt || "",
          });
        }
      } catch (error) {
        console.error("Error al cargar order status:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderStatusId) {
      getOrderStatus();
    }

  }, [orderStatusId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrderStatus: OrderStatus = {
      id: orderStatusId,
      name: formData.name,
      createdAt: formData.createdAt,
    };

    postOrderStatus(newOrderStatus);
  };

  const postOrderStatus = async (orderStatus: OrderStatus) => {
    try {
      const uri = POST_SAVE_ORDER_STATUS_URI;
      const data = await postFunction<EditResponse>(
        uri,
        orderStatus,
        true,
        user as User
      );

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Order status guardado exitosamente");
      } else {
        console.error("Error al guardar el order status");
      }
    } catch (error) {
      console.error("Error al guardar el order status:", error);
    } finally {
      setFormData({
        name: "",
        createdAt: "",
      });
    }
  };

  return (
    <BasePage
      title="Editar Order Status"
      description="Completa el formulario para editar el order status."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Nombre del Order Status
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej. Pendiente, En Proceso, Completado"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          <Save className="h-5 w-5" />
          Guardar Order Status
        </button>
      </form>
    </BasePage>
  );
}

export default EditOrderStatusPage