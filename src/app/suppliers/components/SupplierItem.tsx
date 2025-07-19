import React from "react";
import { Supplier } from "@/app/lib/types";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import Button from "@/app/common/Button";

interface SupplierItemProps {
  supplier: Supplier;
}

const SupplierItem: React.FC<SupplierItemProps> = ({ supplier }) => {
  return (
    <div className="bg-brand-c dark:bg-gray-900 p-4 rounded-xl shadow-md space-y-2">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {supplier.name}
      </h3>

      <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
        <Mail className="w-4 h-4 mr-2" />
        <span>{supplier.email}</span>
      </div>

      <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
        <Phone className="w-4 h-4 mr-2" />
        <span>{supplier.phone}</span>
      </div>

      {supplier.address && (
        <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{supplier.address}</span>
        </div>
      )}

      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-2">
        <Calendar className="w-4 h-4 mr-2" />
        <span>
          Creado el:{" "}
          {supplier.createdAt
            ? new Date(supplier.createdAt).toLocaleDateString()
            : "Fecha desconocida"}
        </span>
      </div>

      <div className="mt-4 flex space-x-2">
        <Button onClick={() => console.log("Edit supplier", supplier.id)}>
          Editar
        </Button>
        <Button
          onClick={() => console.log("Delete supplier", supplier.id)}
          color="danger"
          className="ml-2"
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default SupplierItem;
