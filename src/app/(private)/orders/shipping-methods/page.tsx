"use client";
import BasePage from "@/app/common/BasePage";
import React, { useEffect } from "react";
import { ShippingMethod } from "@/app/lib/types";
import { getFunction } from "@/app/lib/FetchUtils";
import { GET_SHIPPING_METHODS_URI } from "@/app/lib/URIS";
import PulseSimpleItem from "@/app/common/PulseSimpleItem";
import ShippingMethodItem from "./components/ShippingMethodItem";
import Button from "@/app/common/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

const ShippingMethodsPage = () => {
  const { user } = useAuth();
  const [shippingMethods, setShippingMethods] = React.useState<
    ShippingMethod[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchShippingMethods = async () => {
      setIsLoading(true);
      try {
        const data = await getFunction<ShippingMethod[]>(
          GET_SHIPPING_METHODS_URI,
          true,
          user as User
        );
        if (data) {
          setShippingMethods(data);
          console.log("Fetched shipping methods:", data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
      }
    };
    fetchShippingMethods();
  }, []);

  return (
    <BasePage title="Métodos de Envío">
      <div>
        <Button color="primary" size="large" className="mb-4" onClick={() => router.push('/orders/shipping-methods/add')}>Agregar Método de Envío</Button>
        {isLoading ? (
          <div className="space-y-2">
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
          </div>
        ) : (
          shippingMethods.map((method) => (
            <ShippingMethodItem key={method.name} method={method} />
          ))
        )}
      </div>
    </BasePage>
  );
};

export default ShippingMethodsPage;
