"use client";

import React, { useRef, useState } from "react";
import BasePage from "@/app/common/BasePage";
import { Category } from "@/app/lib/types";
import { Tag, FileText, Percent, Image as ImageIcon, Save } from "lucide-react";
import {
  POST_SAVE_CATEGORY_URI,
  POST_SAVE_CATEGORY_WITH_IMAGE_URI,
} from "@/app/lib/URIS";
import { postFunction } from "@/app/lib/FetchUtils";
import Image from "next/image";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

interface AddResponse {
  isCompleted: boolean;
}

const AddCategoryPage = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discount: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // Vista previa inmediata
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCategory: Category = {
      id: "",
      name: formData.name,
      description: formData.description || undefined,
      createdAt: Date.now().toString(),
      discount: formData.discount ? Number(formData.discount) : undefined,
      imageUrl: preview || undefined, // ⚡ por ahora guardamos la URL de preview
    };

    postCategory(newCategory);
  };

  const postCategory = async (category: Category) => {
    try {
      const uri = POST_SAVE_CATEGORY_WITH_IMAGE_URI;

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(category));
      if (imageFile) formDataToSend.append("file", imageFile);

      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const data = await postFunction<AddResponse>(uri, formDataToSend, true, user as User);

      if (data) {
        console.log("Categoría guardada exitosamente");
      } else {
        console.error("Error al guardar la categoría");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setFormData({
        name: "",
        description: "",
        discount: "",
      });

      // ⚡ Limpieza de imagen y memoria
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setImageFile(null);
      setPreview(null);

      // ⚡ Limpiar también el input file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <BasePage
      title="Agregar Categoría"
      description="Completa el siguiente formulario para registrar una nueva categoría."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Nombre de la Categoría
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej. Electrónica"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Descripción
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ej. Categoría de productos electrónicos como celulares, laptops, etc."
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              rows={3}
            />
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
              placeholder="Ej. 10"
              min="0"
              max="100"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Imagen de la Categoría
          </label>
          <div className="relative flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 dark:text-gray-300"
                ref={fileInputRef} 
              />
            </div>
            {preview && (
              <Image
                src={preview}
                alt="Your image"
                width={32}
                height={32}
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
                unoptimized
              />
            )}
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Save className="h-5 w-5" />
          Guardar Categoría
        </button>
      </form>
    </BasePage>
  );
};

export default AddCategoryPage;
