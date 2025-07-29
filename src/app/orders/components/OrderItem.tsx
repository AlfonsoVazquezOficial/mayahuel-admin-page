import React from 'react'
import { Order } from '@/app/lib/types'
import {
  Calendar,
  CreditCard,
  Phone,
  ShoppingCart,
  User2,
  Mail,
  BadgeDollarSign,
  Tag,
  PackageCheck,
  Truck,
} from 'lucide-react'
import Button from '@/app/common/Button'

interface OrderItemProps {
  order: Order
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const { paymentDetails, products, totalAmount, status, createdAt } = order

  const formatPrice = (price: number, discount?: number) => {
    if (!discount) return `$${price.toFixed(2)}`
    const discounted = price * (1 - discount / 100)
    return (
      <>
        <span className="line-through text-gray-400 mr-2">${price.toFixed(2)}</span>
        <span className="text-green-600 dark:text-green-400 font-semibold">${discounted.toFixed(2)}</span>
      </>
    )
  }

  return (
    <div className="bg-brand-c dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-6">

      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center gap-3">
          <User2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{paymentDetails.clientName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{paymentDetails.clientEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4" />
              <span>{paymentDetails.clientPhone}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 md:mt-0 text-sm text-right">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 font-semibold text-xs">
            {status.name}
          </span>
          {status.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{status.description}</p>
          )}
        </div>
      </div>

      {/* Detalles del pedido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          <span>Método: {paymentDetails.paymentMethod}</span>
          <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
            {paymentDetails.paymentStatus}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BadgeDollarSign className="w-4 h-4" />
          <span className="font-semibold text-green-600 dark:text-green-400">
            Total: ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Fecha */}
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="w-4 h-4 mr-2" />
        <span>Creado el {new Date(createdAt).toLocaleDateString()}</span>
      </div>

      {/* Productos incluidos */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
          <ShoppingCart className="w-5 h-5" />
          <span>Productos</span>
        </div>
        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
              <div>
                <p className="font-medium text-sm text-gray-800 dark:text-gray-100">{p.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Cantidad: {p.stock}
                </p>
              </div>
              <div className="text-sm">
                {formatPrice(p.price, p.discount)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Acciones */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-end">
        <Button onClick={() => console.log('Ver pedido', order.id)}>Ver</Button>
        <Button onClick={() => console.log('Editar pedido', order.id)}>Editar</Button>
        <Button color="danger" onClick={() => console.log('Eliminar pedido', order.id)}>Eliminar</Button>
      </div>
    </div>
  )
}

export default OrderItem
