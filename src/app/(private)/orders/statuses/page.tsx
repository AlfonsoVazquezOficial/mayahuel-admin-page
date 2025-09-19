'use client';
import BasePage from '@/app/common/BasePage'
import Button from '@/app/common/Button';
import PulseSimpleItem from '@/app/common/PulseSimpleItem';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import OrderItem from '../components/OrderItem';
import { OrderStatus } from '@/app/lib/types';
import PaginationButtons from '@/app/common/PaginationButtons';
import OrderStatusItem from '../components/OrderStatusItem';
import { GET_PAGINATED_ORDER_STATUSES_URI } from '@/app/lib/URIS';
import { getFunction } from '@/app/lib/FetchUtils';
import { useAuth } from '@/app/hooks/useAuth';
import { User } from 'firebase/auth';

interface PaginatedResponse {
  orderStatuses: OrderStatus[];
  lastVisible: string;
}

const OrderStatusesPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderStatuses, setOrderStatuses] = React.useState<OrderStatus[]>([]);
  const [lastVisibles, setLastVisibles] = React.useState<string[]>([]);
  const router = useRouter();


  const fetchOrderStatuses = async (lastVisible: string | null) => {
    setIsLoading(true);
    try {
      let uri = GET_PAGINATED_ORDER_STATUSES_URI;
      if (lastVisible) {
        uri += `&lastVisible=${lastVisible}`;
      }
      const data = await getFunction<PaginatedResponse>(uri, true, user as User);

      console.log("Datos obtenidos:", data);
      setOrderStatuses(data?.orderStatuses || []);
      setLastVisibles((prev) => [...prev, data.lastVisible]);
    } catch (error) {
      console.error("Error fetching order statuses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderStatuses(null);
  }, []);

  useEffect(() => {
    // Aquí podrías manejar la lógica para cargar más proveedores
    // cuando se alcance el último proveedor visible.
    if (lastVisibles.length > 0) {
      console.log("Últimos estados de pedido visibles:", lastVisibles);
      // Lógica para cargar más estados de pedido si es necesario
    }
  }, [lastVisibles]);

  return (
    <BasePage title='Estados de Pedido' description={"Esta es la página de los estados de pedido"}>
        <div>
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

            <Button color="primary" onClick={() => {
            router.push("/orders/statuses/add");
          }} className="mb-4" size="large" >Agregar</Button>

          {
            orderStatuses.length > 0 ? (
              orderStatuses.map((status) => (
                <OrderStatusItem key={status.id} orderStatus={status} />
              ))
            ) : (<div className="text-center text-gray-500">
                No hay estados de pedido disponibles.
              </div>)
          }

            <PaginationButtons
              onBack={() => {
                if (lastVisibles.length > 1) {
                  const newLastVisibles = lastVisibles.slice(0, -2);
                  const previousLastVisible =
                    newLastVisibles[newLastVisibles.length - 1] || null;
                  setLastVisibles(newLastVisibles);
                  fetchOrderStatuses(previousLastVisible);
                } else {
                  console.warn("No hay más páginas anteriores.");
                }
              }}
              onNext={() => {
                const lastVisible = lastVisibles[lastVisibles.length - 1];
                if (lastVisible == "") {
                  setLastVisibles([]);
                }
                fetchOrderStatuses(lastVisible);
              }}
              disableBack={false}
              disableNext={false}
              isLoading={false}
            /> 
          </div>
        )}
      </div>
    </BasePage>
  )
}

export default OrderStatusesPage