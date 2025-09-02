"use client";

import React, { useEffect, useState } from "react";
import BasePage from "@/app/common/BasePage";
import { Supplier } from "@/app/lib/types";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { getFunction, postFunction } from "@/app/lib/FetchUtils";
import { GET_BY_ID_SUPPLIER_URI, POST_SAVE_SUPPLIER_URI } from "@/app/lib/URIS";

interface UpdateSupplierResponse {
  isCompleted: boolean;
}

const EditSupplierPage = () => {
  const params = useParams();
  const supplierId = params?.id as string; // 👈 id desde la ruta dinámica

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    createdAt: ""
  });

  const [loading, setLoading] = useState(true);

  // Cargar datos del proveedor
  useEffect(() => {
    
    const getSupplier = async () => {
      try {
        const uri = `${GET_BY_ID_SUPPLIER_URI}/${supplierId}`;
        const supplier = await getFunction<Supplier>(uri, false);

        if (supplier) {
          setFormData({
            name: supplier.name,
            email: supplier.email,
            phone: supplier.phone,
            address: supplier.address || "",
            createdAt: supplier.createdAt || ""
          });
        }
      } catch (error) {
        console.error("Error al cargar proveedor:", error);
      } finally {
        setLoading(false);
      }
    };

    if (supplierId) {
      getSupplier();
    }
      
  }, [supplierId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedSupplier: Supplier = {
      id: supplierId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address || undefined,
      createdAt: formData.createdAt, // no lo modificamos aquí
    };

    updateSupplier(updatedSupplier);
  };

  const updateSupplier = async (supplier: Supplier) => {
    
    try {
      const uri = `${POST_SAVE_SUPPLIER_URI}`;
      const data = await postFunction<UpdateSupplierResponse>(
        uri,
        supplier,
        false
      );

      if (data) {
        console.log("Proveedor actualizado correctamente");
      } else {
        console.error("Error al actualizar proveedor");
      }
    } catch (error) {
      console.error("Error al hacer update:", error);
    }
  };

  if (loading) {
    return (
      <BasePage title="Editar Proveedor" description="Cargando proveedor...">
        <div className="text-center py-10">Cargando...</div>
      </BasePage>
    );
  }

  return (
    <BasePage
      title="Editar Proveedor"
      description="Modifica los datos del proveedor seleccionado."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Nombre del Proveedor
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Correo */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Teléfono
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Dirección
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          <Save className="h-5 w-5" />
          Actualizar Proveedor
        </button>
      </form>
    </BasePage>
  );
};

export default EditSupplierPage;
