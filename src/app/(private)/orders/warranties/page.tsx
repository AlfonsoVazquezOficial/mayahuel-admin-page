'use client';
import BasePage from '@/app/common/BasePage'
import Button from '@/app/common/Button';
import PulseSimpleItem from '@/app/common/PulseSimpleItem';
import { getFunction } from '@/app/lib/FetchUtils';
import { ShippingWarranty } from '@/app/lib/types';
import { GET_SHIPPING_WARRANTIES_URI } from '@/app/lib/URIS';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import ShippingWarrantyItem from './components/ShippingWarrantyItem';
import { useAuth } from '@/app/hooks/useAuth';
import { User } from 'firebase/auth';

const WarrantiesPage = () => {
  const { user } = useAuth();
  const [shippingWarranties, setShippingWarranties] = React.useState<
    ShippingWarranty[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchShippingWarranties = async () => {
      setIsLoading(true);
      try {
        const data = await getFunction<ShippingWarranty[]>(
          GET_SHIPPING_WARRANTIES_URI,
          true,
          user as User
        );
        if (data) {
          setShippingWarranties(data);
          console.log("Fetched shipping warranties:", data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
      }
    };
    fetchShippingWarranties();
  }, []);

  return (
    <BasePage title='Garantías'>
      <div>
        <Button color="primary" size="large" className="mb-4" onClick={() => router.push('/orders/warranties/add')}>Agregar Garantía</Button>
        {isLoading ? (
          <div className="space-y-2">
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
          </div>
        ) : (
          shippingWarranties.map((warranty) => (
            <ShippingWarrantyItem key={warranty.name} warranty={warranty} />
          ))
        )}
      </div>
    </BasePage>
  )
}

export default WarrantiesPage