"use client";

import React, { useEffect, useState } from "react";
import { Save, Home, MapPin, Flag, Mail, Phone, FileText } from "lucide-react";
import { getFunction } from "@/app/lib/FetchUtils";
import { ShippingMethod, ShippingWarranty } from "@/app/lib/types";
import { GET_SHIPPING_METHODS_URI, GET_SHIPPING_WARRANTIES_URI } from "@/app/lib/URIS";

interface ShippingFormPageProps {
  onSubmit: (data: ShippingData) => void;
  onShippingMethodChange?: (price: number) => void;
  onWarrantyChange?: (percent: number) => void;
  initialData?: ShippingData;
}

export interface ShippingData {
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  notes: string;
  shippingMethod: string;
  shippingWarranty: string;
}

const ShippingFormPage = ({
  onSubmit,
  onShippingMethodChange,
  onWarrantyChange,
    initialData,
}: ShippingFormPageProps) => {
  const [formData, setFormData] = useState<ShippingData>(initialData || {
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    notes: "",
    shippingMethod: "standard",
    shippingWarranty: "none",
  });

  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [shippingWarranties, setShippingWarranties] = useState<
    ShippingWarranty[]
  >([]);

  useEffect(() => {
  const fetchShippingMethods = async () => {
    try {
      const data = await getFunction<ShippingMethod[]>(GET_SHIPPING_METHODS_URI);
      if (data) {
        setShippingMethods(data);

        setFormData((prev) => {
          // Si ya hay un valor (por edición), respétalo.
          const exists = data.some((m) => m.name.toLowerCase() === prev.shippingMethod.toLowerCase());
          return {
            ...prev,
            shippingMethod: exists ? prev.shippingMethod : data[0].name, // fallback
          };
        });
      }
    } catch (error) {
      console.error("Error fetching shipping methods:", error);
    }
  };

  const fetchShippingWarranties = async () => {
    try {
      const data = await getFunction<ShippingWarranty[]>(GET_SHIPPING_WARRANTIES_URI);
      if (data) {
        setShippingWarranties(data);

        setFormData((prev) => {
          // Si ya hay un valor (por edición), respétalo.
          const exists = data.some((w) => w.name.toLowerCase() === prev.shippingWarranty.toLowerCase());
          return {
            ...prev,
            shippingWarranty: exists ? prev.shippingWarranty : data[0].name, // fallback
          };
        });
      }
    } catch (error) {
      console.error("Error fetching shipping warranties:", error);
    }
  };

  fetchShippingMethods();
  fetchShippingWarranties();
}, []);


  useEffect(() => {
    if (onShippingMethodChange) {
      if (shippingMethods.length > 0) {
        const selectedMethod = shippingMethods.find(
          (method) => method.name === formData.shippingMethod
        );
        if (selectedMethod && onShippingMethodChange) {
          onShippingMethodChange(selectedMethod.price);
        }
      }
    }
  }, [formData.shippingMethod, onShippingMethodChange, shippingMethods]);

  useEffect(() => {
    if (onWarrantyChange) {
      if (shippingWarranties.length > 0) {
        const selectedWarranty = shippingWarranties.find(
          (warranty) => warranty.name === formData.shippingWarranty
        );
        if (selectedWarranty && onWarrantyChange) {
          onWarrantyChange(selectedWarranty.percentCost);
        }
      }
    }
  }, [formData.shippingWarranty, onWarrantyChange, shippingWarranties]);

  // Manejar cambios en inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar datos
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de envío:", formData);

    // Aquí podrías hacer el POST a tu API
    // await postFunction(SAVE_SHIPPING_URI, formData);
    onSubmit(formData);

    // Limpiar
    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      email: "",
      notes: "",
      shippingMethod: "",
      shippingWarranty: "",
    });
  };

  useEffect(() => {
  if (initialData) {
    setFormData(initialData);
  }
}, [initialData]);


  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
    >
      {/* Nombre completo */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Nombre Completo
        </label>
        <div className="relative">
          <Home className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Ej. Juan Pérez"
            className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-sm font-semibold mb-2">Dirección</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Ej. Calle Reforma #123"
            className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Ciudad */}
      <div>
        <label className="block text-sm font-semibold mb-2">Ciudad</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          placeholder="Ej. Chilpancingo"
          className="w-full p-2 border rounded-lg dark:bg-gray-800"
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-semibold mb-2">Estado</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          placeholder="Ej. Guerrero"
          className="w-full p-2 border rounded-lg dark:bg-gray-800"
        />
      </div>

      {/* Código Postal */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Código Postal
        </label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
          placeholder="Ej. 39000"
          className="w-full p-2 border rounded-lg dark:bg-gray-800"
        />
      </div>

      {/* País */}
      <div>
        <label className="block text-sm font-semibold mb-2">País</label>
        <div className="relative">
          <Flag className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            placeholder="Ej. México"
            className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-sm font-semibold mb-2">Teléfono</label>
        <div className="relative">
          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Ej. +52 747 123 4567"
            className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Correo */}
      <div>
        <label className="block text-sm font-semibold mb-2">
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
            placeholder="Ej. juan@gmail.com"
            className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Método de envío */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Método de Envío
        </label>
        <select
          name="shippingMethod"
          value={formData.shippingMethod}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-800"
        >
          <option value="">Selecciona un método</option>
          {shippingMethods.map((method) => (
            <option key={method.name} value={method.name}>
              {method.name.toUpperCase()} - ${method.price}
            </option>
          ))}
        </select>
      </div>

      {/* Garantía de envío */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Garantía de Envío
        </label>
        <select
          name="shippingWarranty"
          value={formData.shippingWarranty}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-800"
        >
          <option value="">Selecciona una garantía</option>
          {shippingWarranties.map((warranty) => (
            <option key={warranty.name} value={warranty.name}>
              {warranty.name.toUpperCase()} - {warranty.percentCost}% - Cubre
              hasta {warranty.warrantyPercent}% del valor del pedido
            </option>
          ))}
        </select>
      </div>

      {/* Notas */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Notas adicionales
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ej. Entregar después de las 5pm"
            className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
            rows={3}
          />
        </div>
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        <Save className="h-5 w-5" />
        Guardar Información de Envío
      </button>
    </form>
  );
};

export default ShippingFormPage;
