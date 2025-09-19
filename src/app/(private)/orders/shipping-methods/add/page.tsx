"use client";

import BasePage from "@/app/common/BasePage";
import React, { useState } from "react";
import { ShippingMethod } from "@/app/lib/types";
import { Truck, DollarSign, Save } from "lucide-react";
import { POST_SAVE_SHIPPING_METHOD_URI } from "@/app/lib/URIS";
import { postFunction } from "@/app/lib/FetchUtils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

interface AddShippingMethodResponse {
  isCompleted: boolean;
}

const AddShippingMethodPage = () => {
  const { user } = useAuth();
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMethod: ShippingMethod = {
      name: formData.name,
      price: formData.price,
    };

    postShippingMethod(newMethod);
  };

  const postShippingMethod = async (method: ShippingMethod) => {
    try {
      const uri = POST_SAVE_SHIPPING_METHOD_URI;
      const data = await postFunction<AddShippingMethodResponse>(
        uri,
        method,
        true,
        user as User
      );

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Método de envío guardado exitosamente");
        router.push('/orders/shipping-methods');
      } else {
        console.error("Error al guardar el método de envío");
      }
    } catch (error) {
      console.error("Error al guardar método de envío:", error);
    } finally {
      setFormData({
        name: "",
        price: 0,
      });
    }
  };

  return (
    <BasePage
      title="Agregar Método de Envío"
      description="Completa el siguiente formulario para registrar un nuevo método de envío."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Nombre del Método
          </label>
          <div className="relative">
            <Truck className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej. Envío Express"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Precio
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min={0}
              step="0.01"
              placeholder="Ej. 150.00"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Save className="h-5 w-5" />
          Guardar Método de Envío
        </button>
      </form>
    </BasePage>
  );
};

export default AddShippingMethodPage;
