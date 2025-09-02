"use client";

import React, { useEffect, useRef, useState } from "react";
import BasePage from "@/app/common/BasePage";
import { Category, Supplier, Tag } from "@/app/lib/types";
import {
  Tag as TagIcon,
  FileText,
  DollarSign,
  Boxes,
  Percent,
  Save,
  ListOrdered,

  ArrowDown,
  ArrowUp,
  X,
} from "lucide-react";
import {
  GET_CATEGORY_LIST_URI,
  GET_SUPPLIER_LIST_URI,
  GET_TAG_LIST_URI,
  POST_SAVE_PRODUCT_WITH_IMAGES_URI,
} from "@/app/lib/URIS";
import { getFunction, postFunction } from "@/app/lib/FetchUtils";
import Image from "next/image";


interface AddResponse {
  isCompleted: boolean;
}

interface ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  minimumStock: number;
  categoryId: string;
  supplierId: string;
  tags: string[];
  createdAt: string;
  images: string[];
}

// ⚡ Simulación de datos (luego los traerás con fetch)
const mockCategories = [
  { id: "cat1", name: "Electrónica" },
  { id: "cat2", name: "Ropa" },
  { id: "cat3", name: "Hogar" },
];
const mockSuppliers = [
  { id: "sup1", name: "Proveedor A" },
  { id: "sup2", name: "Proveedor B" },
];
const mockTags = [
  {
    id: "tag1",
    name: "Nuevo",
    createdAt: Date.now().toString(),
    color: "#FF5733",
  },
  {
    id: "tag2",
    name: "Popular",
    createdAt: Date.now().toString(),
    color: "#33FF57",
  },
  {
    id: "tag3",
    name: "Oferta",
    createdAt: Date.now().toString(),
    color: "#3357FF",
  },
];

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: "",
    minimumStock: "",
    categoryId: "",
    supplierId: "",
    tags: [] as string[],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  // Inputs normales
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Agregar un tag
  const handleAddTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tagId = e.target.value;
    if (tagId && !formData.tags.includes(tagId)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagId] }));
    }
  };

  // Quitar un tag
  const handleRemoveTag = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== id),
    }));
  };

  // Manejo de imágenes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImageFiles((prev) => [...prev, ...files]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Eliminar imagen
  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Reordenar imágenes
  const moveImage = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === previews.length - 1)
    )
      return;

    const newFiles = [...imageFiles];
    const newPreviews = [...previews];

    const targetIndex = direction === "up" ? index - 1 : index + 1;

    [newFiles[index], newFiles[targetIndex]] = [
      newFiles[targetIndex],
      newFiles[index],
    ];
    [newPreviews[index], newPreviews[targetIndex]] = [
      newPreviews[targetIndex],
      newPreviews[index],
    ];

    setImageFiles(newFiles);
    setPreviews(newPreviews);
  };

  // Guardar producto
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: ProductInterface = {
      id: "",
      name: formData.name,
      description: formData.description || "",
      price: Number(formData.price),
      stock: Number(formData.stock),
      categoryId: formData.categoryId,
      supplierId: formData.supplierId || "",
      tags: formData.tags.map((tagId) => tagId),
      createdAt: Date.now().toString(),
      images: previews,
      discount: formData.discount ? Number(formData.discount) : 0,
      minimumStock: formData.minimumStock ? Number(formData.minimumStock) : 0,
    };

    postProduct(newProduct);
  };

  const postProduct = async (product: ProductInterface) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(product));

      // Agregamos cada archivo con el mismo key "files"
      imageFiles.forEach((file) => {
        formDataToSend.append("files", file);
      });

      
      const data = await postFunction<AddResponse>(
        POST_SAVE_PRODUCT_WITH_IMAGES_URI,
        formDataToSend,
        false
      );
      
      console.log(formDataToSend);
      console.log(formDataToSend.get("data"));
      console.log(formDataToSend.getAll("files"));

      if (data) {
        console.log("Producto guardado exitosamente");
        // Cleaning the fields
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          discount: "",
          minimumStock: "",
          categoryId: "",
          supplierId: "",
          tags: [],
        });
        setImageFiles([]);
        setPreviews([]);
      } else {
        console.error("Error al guardar el producto");
      }
    } catch (error) {
      console.error("Error posting product:", error);
    }
  };

  const getCategories = async () => {
    try {
      const data = await getFunction<Category[]>(GET_CATEGORY_LIST_URI, false);
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getSuppliers = async () => {
    try {
      const data = await getFunction<Supplier[]>(GET_SUPPLIER_LIST_URI, false);
      console.log(data);
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const getTags = async () => {
    try {
      const data = await getFunction<Tag[]>(GET_TAG_LIST_URI, false);
      console.log(data);
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getSuppliers();
    getTags();
  }, []);

  return (
    <BasePage
      title="Agregar Producto"
      description="Completa el formulario para registrar un nuevo producto."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold mb-2">Nombre</label>
          <div className="relative">
            <TagIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej. Laptop Dell"
              className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Descripción
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ej. Laptop de 16GB RAM y SSD de 512GB"
              className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
              rows={3}
            />
          </div>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-semibold mb-2">Precio ($)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              placeholder="Ej. 15000"
              className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-semibold mb-2">Stock</label>
          <div className="relative">
            <Boxes className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              placeholder="Ej. 25"
              className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Descuento */}
        <div>
          <label className="block text-sm font-semibold mb-2">
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
              className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Stock mínimo */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Stock Mínimo
          </label>
          <div className="relative">
            <ListOrdered className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="minimumStock"
              value={formData.minimumStock}
              onChange={handleChange}
              placeholder="Ej. 5"
              className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-semibold mb-2">Categoría</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          >
            <option value="">Seleccione categoría</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Proveedor */}
        <div>
          <label className="block text-sm font-semibold mb-2">Proveedor</label>
          <select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          >
            <option value="">Sin proveedor</option>
            {suppliers?.map((sup) => (
              <option key={sup.id} value={sup.id}>
                {sup.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold mb-2">Tags</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tagId) => {
              const tag = tags?.find((t) => t.id === tagId);
              return (
                <span
                  key={tagId}
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm"
                  style={{ backgroundColor: tag?.color || "#666" }}
                >
                  {tag?.name || tagId}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tagId)}
                    className="ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              );
            })}
          </div>
          <select
            onChange={handleAddTag}
            value=""
            className="w-full p-2 border rounded-lg dark:bg-gray-800"
          >
            <option value="">Selecciona un tag</option>
            {tags
              .filter((tag) => !formData.tags.includes(tag.id))
              .map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
          </select>
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-sm font-semibold mb-2">Imágenes</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            className="text-sm text-gray-600 dark:text-gray-300"
          />
          <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Añadir Imágenes
              </button>
          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative w-full h-32 border rounded-lg overflow-hidden flex flex-col"
                >
                  <Image
                    src={src}
                    alt={`Imagen ${index + 1}`}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                  <div className="absolute top-1 right-1 flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="bg-red-600 text-white p-1 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-1 right-1 flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveImage(index, "up")}
                      className="bg-gray-700 text-white p-1 rounded-full"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(index, "down")}
                      className="bg-gray-700 text-white p-1 rounded-full"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Save className="h-5 w-5" />
          Guardar Producto
        </button>
      </form>
    </BasePage>
  );
};

export default AddProductPage;
