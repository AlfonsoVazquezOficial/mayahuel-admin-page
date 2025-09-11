"use client";
import BasePage from "@/app/common/BasePage";
import React, { useEffect } from "react";
import ShippingFormPage, { ShippingData } from "./ShippingFormPage";
import { useParams, useRouter } from "next/navigation";
import { Order } from "@/app/lib/types";
import { GET_ORDER_BY_ID_URI, POST_CHANGE_SHIPPING_DATA_URI } from "@/app/lib/URIS";
import { getFunction, postFunction } from "@/app/lib/FetchUtils";
import PulseSimpleItem from "@/app/common/PulseSimpleItem";

interface EditResponse {
  isCompleted: boolean;
}

const EditShippingDataPage = () => {
  const params = useParams();
  const id = params?.id as string; // 👈 id desde la ruta dinámica
  const [order, setOrder] = React.useState<Order | null>(null);
  const [shippingData, setShippingData] = React.useState<Record<
    string,
    object
  > | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();


  const postEditShippingData = async (newShippingData: ShippingData) => {
    setIsLoading(true);
    try {
        const uri = POST_CHANGE_SHIPPING_DATA_URI;
      const data = await postFunction<EditResponse>(
        uri,
        { orderId: id, shippingDetails: newShippingData },
        false
      );

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Datos de envío actualizados exitosamente");
        router.push('/orders'); // Volver a la página de pedidos
      } else {
        console.error("Error al actualizar los datos de envío");
      }
    } catch (error) {
        console.error("Error al actualizar los datos de envío:", error);
      } finally {
        setIsLoading(false);
      }

  };

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const uri = GET_ORDER_BY_ID_URI + `/${id}`;

        const data = await getFunction<Order>(uri, false);

        setOrder(data || null);
        if (data && data.shippingDetails) {
          setShippingData(data.shippingDetails as Record<string, object>);
        }
        console.log("Fetched order:", data);
        console.log("JSON:", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  return (
    <BasePage
      title="Editar Datos de Envío"
      description="Aquí puedes editar los datos de envío del pedido."
    >
      {isLoading ? (
        <PulseSimpleItem />
      ) : order ? (
        <ShippingFormPage
          initialData={{
            fullName: String(shippingData?.fullName || ""),
            address: String(shippingData?.address || ""),
            city: String(shippingData?.city || ""),
            state: String(shippingData?.state || ""),
            postalCode: String(shippingData?.postalCode || ""),
            country: String(shippingData?.country || ""),
            phone: String(shippingData?.phone || ""),
            email: String(shippingData?.email || ""),
            notes: String(shippingData?.notes || ""),
            shippingMethod: String(shippingData?.shippingMethod || ""),
            shippingWarranty: String(shippingData?.shippingWarranty || ""),
          }}
          onSubmit={(data) => {
            console.log("Datos de envío enviados:", data);
            postEditShippingData(data);
            // Aquí puedes manejar el envío de los datos al backend
          }}
        />
      ) : (
        <p>No se encontró el pedido.</p>
      )}
    </BasePage>
  );
};

export default EditShippingDataPage;
