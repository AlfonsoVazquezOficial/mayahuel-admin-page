"use client";

import React, { useState } from "react";
import BasePage from "@/app/common/BasePage";
import { Supplier } from "@/app/lib/types";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import { POST_SAVE_SUPPLIER_URI } from "@/app/lib/URIS";
import { postFunction } from "@/app/lib/FetchUtils";
import { useAuth } from "@/app/hooks/useAuth";
import { User as UserFirebase } from "firebase/auth";

interface AddSupplierResponse {
  isCompleted: boolean;
}

const AddSupplierPage = () => {
  const {user} = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSupplier: Supplier = {
      id: "",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address || undefined,
      createdAt: "",
    };

    postSupplier(newSupplier);
  };

  const postSupplier = async (supplier: Supplier) => {
    try {
      const uri = POST_SAVE_SUPPLIER_URI;
      const data = await postFunction<AddSupplierResponse>(
        uri,
        supplier,
        true,
        user as UserFirebase
      );

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Proveedor guardado exitosamente");
      } else {
        console.error("Error al guardar el proveedor");
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  };

  return (
    <BasePage
      title="Agregar Proveedor"
      description="Completa el siguiente formulario para registrar un nuevo proveedor."
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
              placeholder="Ej. Distribuidora XYZ"
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
              placeholder="correo@proveedor.com"
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
              placeholder="+52 123 456 7890"
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
              placeholder="Calle #123, Ciudad, País"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Save className="h-5 w-5" />
          Guardar Proveedor
        </button>
      </form>
    </BasePage>
  );
};

export default AddSupplierPage;
