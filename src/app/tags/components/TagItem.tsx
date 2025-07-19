import Button from '@/app/common/Button';
import { Tag } from '@/app/lib/types'
import { Calendar, Percent } from 'lucide-react';
import React from 'react'

interface TagItemProps {
    tag: Tag;
}

const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  return (
    <div className="bg-brand-c dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-3">

      {/* Nombre */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {tag.name}
      </h3>

      {/* Descuento */}
      {tag.discount !== undefined && (
        <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
          <Percent className="w-4 h-4 mr-2" />
          <span>Descuento: {tag.discount}%</span>
        </div>
      )}

      {/* Fecha de creación */}
      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
        <Calendar className="w-4 h-4 mr-2" />
        <span>
          Creado en:{" "}
          {tag.createdAt
            ? new Date(tag.createdAt).toLocaleDateString()
            : "Fecha desconocida"}
        </span>
      </div>

        {/* Color */}
        {tag.color && (
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
            <span>Color: {tag.color}</span>
            <span
              className="ml-2 w-4 h-4 rounded-full"
              style={{ backgroundColor: tag.color }}
            ></span>
          </div>
        )}

      {/* Acciones */}
      <div className="mt-4 flex space-x-2">
        <Button onClick={() => console.log("Editar categoría", tag.id)}>
          Editar
        </Button>
        <Button
          onClick={() => console.log("Eliminar categoría", tag.id)}
          color="danger"
        >
          Eliminar
        </Button>
      </div>
    </div>
  )
}

export default TagItem