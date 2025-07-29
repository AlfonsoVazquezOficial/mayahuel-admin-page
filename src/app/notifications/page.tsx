'use client'
import React from 'react'
import BasePage from '../common/BasePage'
import PulseSimpleItem from '../common/PulseSimpleItem';
import PaginationButtons from '../common/PaginationButtons';
import { Notification } from '../lib/types';
import NotificationItem from './components/NotificationItem';

const NotificationsPage = () => {

  const [isLoading, setIsLoading] = React.useState(false);

  const TEST_NOTIFICATION: Notification = {
    id: 'abc123',
    type: 'DISCOUNT',
    message: '¡Se aplicó un 20% de descuento a productos destacados!',
    createdAt: new Date().toISOString(),
    isActive: true,
  };

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
              <NotificationItem notification={TEST_NOTIFICATION} />
              <NotificationItem notification={TEST_NOTIFICATION} />
              <NotificationItem notification={TEST_NOTIFICATION} />
              <NotificationItem notification={TEST_NOTIFICATION} />
              <NotificationItem notification={TEST_NOTIFICATION} />
              <PaginationButtons
                currentPage={1}
                totalPages={5}
                onBack={() => console.log("Back")}
                onNext={() => console.log("Next")}
                onPageChange={(page) => console.log("Change to", page)}
                isLoading={false}
              />  
            </div>
          )}
        </div>
    </BasePage>
  )
}

export default NotificationsPage