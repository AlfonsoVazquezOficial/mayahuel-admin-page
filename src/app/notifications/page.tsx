'use client'
import React, { useEffect } from 'react'
import BasePage from '../common/BasePage'
import PulseSimpleItem from '../common/PulseSimpleItem';
import PaginationButtons from '../common/PaginationButtons';
import { Notification } from '../lib/types';
import NotificationItem from './components/NotificationItem';
import { useRouter } from 'next/navigation';
import { GET_PAGINATED_NOTIFICATIONS_URI } from '../lib/URIS';
import { getFunction } from '../lib/FetchUtils';
import Button from '../common/Button';

interface PaginatedResponse {
  notifications: Notification[];
  lastVisible: string;
}

const NotificationsPage = () => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const [lastVisibles, setLastVisibles] = React.useState<string[]>([]);
    const router = useRouter();

  const TEST_NOTIFICATION: Notification = {
    id: 'abc123',
    title: 'Descuento en productos destacados',
    message: '¡Se aplicó un 20% de descuento a productos destacados!',
    color: '#00ff00',
    timeInMs: 10,
    date: new Date().toISOString(),
    isActive: true,
  };


  const fetchNotifications = async (lastVisible: string | null) => {
    setIsLoading(true);
    try {
      let uri = GET_PAGINATED_NOTIFICATIONS_URI;
      if (lastVisible) {
        uri += `&lastVisible=${lastVisible}`;
      }
      const data = await getFunction<PaginatedResponse>(uri, false);

      setNotifications(data?.notifications || []);
      setLastVisibles((prev) => [...prev, data.lastVisible]);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(null);
  }, []);

  useEffect(() => {
    // Aquí podrías manejar la lógica para cargar más
    // cuando se alcance el último visible.
    if (lastVisibles.length > 0) {
      console.log("Últimos visibles:", lastVisibles);
      // Lógica para cargar más si es necesario
    }
  }, [lastVisibles]);


  return (
    <BasePage title='Notificaciones' description={'Aquí puedes administrar las notificaciones de tu tienda.'}>
        <div>
          {isLoading ? (
            <div className='space-y-4'>
              <PulseSimpleItem />
              <PulseSimpleItem />
              <PulseSimpleItem />
              <PulseSimpleItem />
              <PulseSimpleItem />
            </div>
          ) : (
            <div className='space-y-4'>
              <Button
              color="primary"
              onClick={() => {
                router.push("/notifications/add");
              }}
              className="mb-4"
              size="large"
            >
              Agregar
            </Button>

            {notifications.length > 0 ? (
              notifications.map((notification) => <NotificationItem key={notification.id} notification={notification} />)
            ) : (
              <div className="text-center text-gray-500">
                No hay notificaciones disponibles.
              </div>
            )}

              <PaginationButtons
              onBack={() => {
                if (lastVisibles.length > 1) {
                  const newLastVisibles = lastVisibles.slice(0, -2);
                  const previousLastVisible =
                    newLastVisibles[newLastVisibles.length - 1] || null;
                  setLastVisibles(newLastVisibles);
                  fetchNotifications(previousLastVisible);
                } else {
                  console.warn("No hay más páginas anteriores.");
                }
              }}
              onNext={() => {
                const lastVisible = lastVisibles[lastVisibles.length - 1];
                if (lastVisible == "") {
                  setLastVisibles([]);
                }
                fetchNotifications(lastVisible);
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

export default NotificationsPage