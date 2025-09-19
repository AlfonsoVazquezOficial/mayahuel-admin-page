"use client";

import React, { useState } from "react";
import BasePage from "@/app/common/BasePage";
import { Tag } from "@/app/lib/types";
import { Tag as TagIcon, Percent, Palette, Save } from "lucide-react";
import { POST_SAVE_TAG_URI } from "@/app/lib/URIS";
import { postFunction } from "@/app/lib/FetchUtils";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

interface AddTagResponse {
  isCompleted: boolean;
}

const AddTagPage = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    color: "#000000",
    discount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTag: Tag = {
      id: "",
      name: formData.name,
      color: formData.color,
      createdAt: "",
      discount: formData.discount ? parseFloat(formData.discount) : undefined,
    };

    postTag(newTag);
  };

  const postTag = async (tag: Tag) => {
    try {
      const uri = POST_SAVE_TAG_URI;
      const data = await postFunction<AddTagResponse>(
        uri,
        tag,
        true, 
        user as User
      );

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Tag guardado exitosamente");
      } else {
        console.error("Error al guardar el tag");
      }
    } catch (error) {
      console.error("Error al guardar el tag:", error);
    } finally {
      setFormData({
        name: "",
        color: "#000000",
        discount: "",
      });
    }
  };

  return (
    <BasePage
      title="Agregar Tag"
      description="Completa el formulario para registrar un nuevo tag."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Nombre del Tag
          </label>
          <div className="relative">
            <TagIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej. Promoción, Destacado, Nuevo"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Color
          </label>
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-gray-400" />
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="h-10 w-20 border rounded-lg cursor-pointer dark:border-gray-600"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formData.color}
            </span>
          </div>
        </div>

        {/* Descuento */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Descuento (%)
          </label>
          <div className="relative">
            <Percent className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Ej. 10"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          <Save className="h-5 w-5" />
          Guardar Tag
        </button>
      </form>
    </BasePage>
  );
};

export default AddTagPage;
