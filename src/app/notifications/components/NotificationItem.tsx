import React from 'react'
import { Notification } from '@/app/lib/types'
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Percent,
  Calendar,
} from 'lucide-react'
import Button from '@/app/common/Button'

interface NotificationItemProps {
  notification: Notification
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  discount: Percent,
}

const bgColorMap = {
  info: 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100',
  success: 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100',
  warning: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100',
  error: 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100',
  discount: 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100',
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { type, message, createdAt, isActive } = notification
  const Icon = iconMap[type.toLowerCase() as keyof typeof iconMap]
  const badgeStyle = bgColorMap[type.toLowerCase() as keyof typeof bgColorMap]

  return (
    <div className="bg-brand-c dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-4">
      
      {/* Encabezado */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${badgeStyle}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {message}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isActive ? 'Activa' : 'Inactiva'}
            </span>
          </div>
        </div>

        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeStyle}`}>
          {type.toUpperCase()}
        </span>
      </div>

      {/* Fecha */}
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{new Date(createdAt).toLocaleString()}</span>
      </div>

      {/* Acciones */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-end">
        <Button onClick={() => console.log('Ver notificación', notification.id)}>Ver</Button>
        <Button onClick={() => console.log('Editar notificación', notification.id)}>Editar</Button>
        <Button color="danger" onClick={() => console.log('Eliminar notificación', notification.id)}>Eliminar</Button>
      </div>
    </div>
  )
}

export default NotificationItem
