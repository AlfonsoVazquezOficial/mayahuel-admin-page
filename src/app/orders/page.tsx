"use client";
import React, { useEffect } from "react";
import BasePage from "../common/BasePage";
import PulseSimpleItem from "../common/PulseSimpleItem";
import OrderItem from "./components/OrderItem";
import PaginationButtons from "../common/PaginationButtons";
import Button from "../common/Button";
import { Order } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { getFunction } from "../lib/FetchUtils";
import { GET_PAGINATED_ORDERS_URI } from "../lib/URIS";

interface PaginatedResponse {
  orders: Order[];
  lastVisible: string;
}

const OrdersPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [lastVisibles, setLastVisibles] = React.useState<string[]>([]);

  const fetchOrders = async (lastVisible: string | null) => {
    setIsLoading(true);
    try {
      let uri = GET_PAGINATED_ORDERS_URI;
      if (lastVisible) {
        uri += `&lastVisible=${lastVisible}`;
      }
      const data = await getFunction<PaginatedResponse>(uri, false);

      setOrders(data?.orders || []);
      console.log("Fetched orders:", data?.orders);
      console.log("JSON:", JSON.stringify(data?.orders[0]));
      setLastVisibles((prev) => [...prev, data.lastVisible]);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(null);
  }, []);

  useEffect(() => {
    // Aquí podrías manejar la lógica para cargar más proveedores
    // cuando se alcance el último proveedor visible.
    if (lastVisibles.length > 0) {
      console.log("Últimos proveedores visibles:", lastVisibles);
      // Lógica para cargar más proveedores si es necesario
    }
  }, [lastVisibles]);

  return (
    <BasePage
      title="Pedidos"
      description={"Aquí puedes administrar los pedidos de tu tienda."}
    >
      <div>
        <div className="space-x-4 mb-6">
          <Button
          color="primary"
          size="large"
          className="mb-4"
          onClick={() => router.push("/orders/statuses")}
        >
          Estados de Pedido
        </Button>
        <Button
          color="primary"
          size="large"
          className="mb-4"
          onClick={() => router.push("/orders/shipping-methods")}
        >
          Tipos de Envíos
        </Button>
        <Button
          color="primary"
          size="large"
          className="mb-4"
          onClick={() => router.push("/orders/warranties")}
        >
          Garantías
        </Button>
        </div>
        {isLoading ? (
          <div className="space-y-4">
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
          </div>
        ) : (
          <div className="space-y-4">
            {orders.length > 0 ? (
              <>
                {orders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))}
                <PaginationButtons
                  onBack={() => {
                    if (lastVisibles.length > 1) {
                      const newLastVisibles = lastVisibles.slice(0, -2);
                      const previousLastVisible =
                        newLastVisibles[newLastVisibles.length - 1] || null;
                      setLastVisibles(newLastVisibles);
                      fetchOrders(previousLastVisible);
                    } else {
                      console.warn("No hay más páginas anteriores.");
                    }
                  }}
                  onNext={() => {
                    const lastVisible = lastVisibles[lastVisibles.length - 1];
                    if (lastVisible == "") {
                      setLastVisibles([]);
                    }
                    fetchOrders(lastVisible);
                  }}
                  disableBack={true}
                  disableNext={false}
                  isLoading={false}
                />
              </>
            ) : (
              <p>No hay pedidos disponibles.</p>
            )}
          </div>
        )}
      </div>
    </BasePage>
  );
};

export default OrdersPage;
