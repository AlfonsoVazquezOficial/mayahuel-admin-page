'use client';
import React from "react";
import BasePage from "../common/BasePage";
import PulseSimpleItem from "../common/PulseSimpleItem";
import { Order } from "../lib/types";
import OrderItem from "./components/OrderItem";
import PaginationButtons from "../common/PaginationButtons";

const OrdersPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const TEST_ORDER: Order = {
  id: 'order-001',
  createdAt: '2025-07-20T14:35:00Z',
  updatedAt: '2025-07-21T10:00:00Z',
  totalAmount: 475.00,
  status: {
    id: 'status-completed',
    name: 'Completado',
    description: 'El pedido ha sido entregado exitosamente',
  },
  paymentDetails: {
    id: 'payment-001',
    clientName: 'Ana González',
    clientEmail: 'ana.gonzalez@example.com',
    clientPhone: '+52 744 123 4567',
    paymentMethod: 'Tarjeta de crédito',
    paymentId: 'pm_ABC123456789',
    paymentStatus: 'Pagado',
  },
  products: [
    {
      id: 'prod-001',
      name: 'Laptop Lenovo ThinkPad',
      description: 'Laptop empresarial de 14 pulgadas',
      price: 400,
      stock: 1,
      categoryId: 'cat-electronics',
      supplierId: 'sup-001',
      tags: [
        { id: 'tag-urgent', name: 'Urgente', color: '#dc2626', createdAt: '2025-07-15T08:00:00Z' },
        { id: 'tag-office', name: 'Oficina', color: '#2563eb', createdAt: '2025-07-15T08:00:00Z' }
      ],
      createdAt: '2025-07-15T08:00:00Z',
      images: ['https://via.placeholder.com/150'],
      discount: 10,
      minimumStock: 2,
    },
    {
      id: 'prod-002',
      name: 'Mouse inalámbrico Logitech',
      price: 75,
      stock: 1,
      categoryId: 'cat-accessories',
      createdAt: '2025-07-16T09:00:00Z',
      discount: 0,
    },
  ],
}

  return (
    <BasePage
      title="Pedidos"
      description={"Aquí puedes administrar los pedidos de tu tienda."}
    >
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
            <OrderItem order={TEST_ORDER} />
            <OrderItem order={TEST_ORDER} />
            <OrderItem order={TEST_ORDER} />
            <OrderItem order={TEST_ORDER} />
            <OrderItem order={TEST_ORDER} />
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
  );
};

export default OrdersPage;
