"use client";

import React, { useEffect, useRef, useState } from "react";
import BasePage from "@/app/common/BasePage";
import { Product } from "@/app/lib/types";
import {
  Tag as TagIcon,
  FileText,
  DollarSign,
  Boxes,
  Percent,
  Save,
  ListOrdered,
  Image as ImageIcon,
  Users,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import { GET_BY_ID_PRODUCT_URI, POST_SAVE_PRODUCT_WITH_IMAGES_URI } from "@/app/lib/URIS";
import { getFunction, postFunction } from "@/app/lib/FetchUtils";
import { useParams } from "next/navigation";

const EditProductPage = () => {
  const params = useParams();
  const id = params?.id as string; // 👈 id desde la ruta dinámica
  const [product, setProduct] = useState<Product | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getFunction<Product>(
          `${GET_BY_ID_PRODUCT_URI}/${params.id}`
        );
        setProduct(data);
        setPreviews(data.images || []);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImageFiles((prev) => [...prev, ...filesArray]);
      setPreviews((prev) => [
        ...prev,
        ...filesArray.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    setPreviews((prev) => {
      const newPreviews = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newPreviews.length) return prev;
      [newPreviews[index], newPreviews[targetIndex]] = [
        newPreviews[targetIndex],
        newPreviews[index],
      ];
      return newPreviews;
    });

    setImageFiles((prev) => {
      const newFiles = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newFiles.length) return prev;
      [newFiles[index], newFiles[targetIndex]] = [
        newFiles[targetIndex],
        newFiles[index],
      ];
      return newFiles;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  if (!product) return;

  try {
    const formDataToSend = new FormData();

    // Creamos un objeto actualizado del producto
    const updatedProduct = {
      ...product,
      images: previews, // 👈 arreglo con todas las URLs ordenadas
      id: id, // Aseguramos que el ID sea el correcto
    };

    // Añadimos los datos del producto
    formDataToSend.append("data", JSON.stringify(updatedProduct));

    // Añadimos los archivos nuevos
    imageFiles.forEach((file) => {
      formDataToSend.append("files", file);
    });

    console.log("DATA:", formDataToSend.get("data"));
    console.log("FILES:", formDataToSend.getAll("files"));
    console.log("PREVIEWS:", previews);

    await postFunction(
      `${POST_SAVE_PRODUCT_WITH_IMAGES_URI}`,
      formDataToSend,
      false
    );
    

    alert("Product updated successfully!");
  } catch (error) {
    console.error("Error updating product:", error);
  }
};


  return (
    <BasePage title="Editar Producto">
      {product ? (
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
                placeholder="Nombre del producto"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
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
                placeholder="Descripción del producto"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
                rows={3}
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
                placeholder="Ej. 50"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: Number(e.target.value) })
                }
                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Precio ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="number"
                placeholder="Ej. 199.99"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
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
                placeholder="Ej. 10"
                value={product.discount}
                onChange={(e) =>
                  setProduct({ ...product, discount: Number(e.target.value) })
                }
                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Imágenes */}
          <div>
            <label className="block text-sm font-semibold mb-2">Imágenes</label>
            <p className="text-bold text-red-500">Si hay imagenes ya existentes, primero suba las imagenes y luego edite el orden</p>
            <div className="flex items-center gap-2 mb-2">
                
              <ImageIcon className="w-5 h-5 text-gray-500" />
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Añadir Imágenes
              </button>
            </div>
            {previews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative w-full h-32 border rounded-lg overflow-hidden flex flex-col"
                  >
                    <Image
                      src={preview}
                      alt={`Imagen ${index + 1}`}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                    <div className="absolute top-1 right-1 flex gap-1">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="bg-red-600 text-white p-1 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-1 right-1 flex gap-1">
                      <button
                        type="button"
                        onClick={() => moveImage(index, "up")}
                        disabled={index === 0}
                        className={`p-1 rounded-full ${
                          index === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(index, "down")}
                        disabled={index === previews.length - 1}
                        className={`p-1 rounded-full ${
                          index === previews.length - 1
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botón Guardar */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            <Save className="h-5 w-5" />
            Guardar Cambios
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </BasePage>
  );
};

export default EditProductPage;
