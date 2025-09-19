'use client';
import BasePage from "@/app/common/BasePage";
import PulseSimpleItem from "@/app/common/PulseSimpleItem";
import { useAuth } from "@/app/hooks/useAuth";
import { getFunction, postFunction } from "@/app/lib/FetchUtils";
import { ShippingWarranty } from "@/app/lib/types";
import { GET_SHIPPING_WARRANTY_BY_ID_URI, POST_SAVE_SHIPPING_WARRANTY_URI } from "@/app/lib/URIS";
import { User } from "firebase/auth";
import { Percent, Save, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface EditResponse {
  isCompleted: boolean;
}

const EditShippingWarrantyPage = () => {
  const { user } = useAuth();
  const params = useParams();
  const warrantyId = params?.id as string; // id desde la ruta dinámica
  const router = useRouter();

  const [shippingWarranty, setShippingWarranty] = useState<ShippingWarranty | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<ShippingWarranty>({
    name: "",
    percentCost: 0,
    warrantyPercent: 0,
  });

  useEffect(() => {
    const fetchShippingWarranty = async () => {
      setIsLoading(true);
      try {
        const uri = `${GET_SHIPPING_WARRANTY_BY_ID_URI}/${warrantyId}`;
        const warranty = await getFunction<ShippingWarranty>(uri, true, user as User);

        if (warranty) {
          setShippingWarranty(warranty);
          setFormData({
            name: warrantyId,
            percentCost: warranty.percentCost,
            warrantyPercent: warranty.warrantyPercent,
          });
        }
      } catch (error) {
        console.error("Error al cargar garantía de envío:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (warrantyId) {
      fetchShippingWarranty();
    }
  }, [warrantyId]);

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
      const data = await postFunction<EditResponse>(uri, warranty, true, user as User);

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Garantía de envío actualizada exitosamente");
        router.push("/orders/warranties");
      } else {
        console.error("Error al guardar la garantía de envío");
      }
    } catch (error) {
      console.error("Error al guardar garantía de envío:", error);
    }
  };

  return (
    <BasePage
      title="Editar Garantía de Envío"
      description="Completa el siguiente formulario para editar la garantía de envío."
    >
      {isLoading ? (
        <PulseSimpleItem />
      ) : shippingWarranty ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
        >

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
            Editar Garantía de Envío
          </button>
        </form>
      ) : (
        <p className="text-red-500">No se encontró la garantía de envío.</p>
      )}
    </BasePage>
  );
};

export default EditShippingWarrantyPage;
