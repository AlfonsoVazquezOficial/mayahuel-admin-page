'use client';
import BasePage from "@/app/common/BasePage";
import PulseSimpleItem from "@/app/common/PulseSimpleItem";
import { useAuth } from "@/app/hooks/useAuth";
import { getFunction, postFunction } from "@/app/lib/FetchUtils";
import { ShippingMethod } from "@/app/lib/types";
import { GET_SHIPPING_METHOD_BY_ID_URI, POST_SAVE_SHIPPING_METHOD_URI } from "@/app/lib/URIS";
import { User } from "firebase/auth";
import { DollarSign, Save, Truck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

interface EditResponse {
  isCompleted: boolean;
}

const EditShippingMethodPage = () => {
  const { user } = useAuth();
  const params = useParams();
  const supplierId = params?.id as string; // 👈 id desde la ruta dinámica
  const router = useRouter();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    price: 0,
  });


  useEffect(() => {
    const fetchShippingMethod = async () => {
      setIsLoading(true);
      try {
        const uri = `${GET_SHIPPING_METHOD_BY_ID_URI}/${supplierId}`;
        const method = await getFunction<ShippingMethod>(uri, true, user as User);

        if (method) {
          setShippingMethod(method);
          setFormData({ price: method.price });
        }
      } catch (error) {
        console.error("Error al cargar método de envío:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (supplierId) {
      fetchShippingMethod();
    }
  }, [supplierId]);

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
      name: supplierId,
      price: formData.price,
    };

    postShippingMethod(newMethod);
  };

  const postShippingMethod = async (method: ShippingMethod) => {
    try {
      const uri = POST_SAVE_SHIPPING_METHOD_URI;
      const data = await postFunction<EditResponse>(uri, method, true, user as User);

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Método de envío guardado exitosamente");
        router.push("/orders/shipping-methods");
      } else {
        console.error("Error al guardar el método de envío");
      }
    } catch (error) {
      console.error("Error al guardar método de envío:", error);
    } finally {
      setFormData({
        price: 0,
      });
    }
  };

  return (
    <BasePage
      title="Editar Método de Envío"
      description="Completa el siguiente formulario para editar el método de envío."
    >
      {
        isLoading ? (
          <PulseSimpleItem />
        ) : shippingMethod ? (
          <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
      >
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
          Editar Método de Envío
        </button>
      </form>
        ) : (
          <p className="text-red-500">No se encontró el método de envío.</p>
        )
      }
    </BasePage>
  );
};

export default EditShippingMethodPage;
