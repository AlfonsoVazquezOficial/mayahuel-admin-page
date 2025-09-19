"use client";

import BasePage from "@/app/common/BasePage";
import React, { useState } from "react";
import { ShippingWarranty } from "@/app/lib/types";
import { ShieldCheck, Percent, Save } from "lucide-react";
import { POST_SAVE_SHIPPING_WARRANTY_URI } from "@/app/lib/URIS";
import { postFunction } from "@/app/lib/FetchUtils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

interface AddShippingWarrantyResponse {
  isCompleted: boolean;
}

const AddShippingWarrantyPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<ShippingWarranty>({
    name: "",
    percentCost: 0,
    warrantyPercent: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number.isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postShippingWarranty(formData);
  };

  const postShippingWarranty = async (warranty: ShippingWarranty) => {
    try {
      const uri = POST_SAVE_SHIPPING_WARRANTY_URI;
      const data = await postFunction<AddShippingWarrantyResponse>(
        uri,
        warranty,
        true,
        user as User
      );

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Garantía guardada exitosamente");
        router.push("/orders/warranties");
      } else {
        console.error("Error al guardar la garantía de envío");
      }
    } catch (error) {
      console.error("Error al guardar garantía:", error);
    } finally {
      setFormData({
        name: "",
        percentCost: 0,
        warrantyPercent: 0,
      });
    }
  };

  return (
    <BasePage
      title="Agregar Garantía de Envío"
      description="Completa el siguiente formulario para registrar una nueva garantía de envío."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Nombre de la Garantía
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej. Cobertura Total"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Porcentaje de costo */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Porcentaje del Costo
          </label>
          <div className="relative">
            <Percent className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="percentCost"
              value={formData.percentCost}
              onChange={handleChange}
              required
              min={0}
              max={100}
              step="0.01"
              placeholder="Ej. 5"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Porcentaje de cobertura */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Porcentaje de Cobertura
          </label>
          <div className="relative">
            <Percent className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="warrantyPercent"
              value={formData.warrantyPercent}
              onChange={handleChange}
              required
              min={0}
              max={100}
              step="0.01"
              placeholder="Ej. 80"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          <Save className="h-5 w-5" />
          Guardar Garantía de Envío
        </button>
      </form>
    </BasePage>
  );
};

export default AddShippingWarrantyPage;
