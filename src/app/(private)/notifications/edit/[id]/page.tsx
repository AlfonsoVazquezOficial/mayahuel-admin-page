"use client";

import React, { useEffect, useState } from "react";
import BasePage from "@/app/common/BasePage";
import { Notification } from "@/app/lib/types";
import { Bell, FileText, Palette, Clock, Save, ToggleLeft } from "lucide-react";
import { GET_BY_ID_NOTIFICATION_URI, POST_SAVE_NOTIFICATION_URI } from "@/app/lib/URIS";
import { getFunction, postFunction } from "@/app/lib/FetchUtils";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

interface EditNotificationResponse {
  isCompleted: boolean;
}

const EditNotificationPage = () => {
  const { user } = useAuth();
    const params = useParams();
        const notificationId = params?.id as string; // 👈 id desde la ruta dinámica
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    color: "#0000ff",
    timeInMs: "",
    isActive: true,
    date: ""
  });
  const [loading, setLoading] = useState(true);

  // Cargar datos del proveedor
  useEffect(() => {

    const getNotification = async () => {
      try {
        const uri = `${GET_BY_ID_NOTIFICATION_URI}/${notificationId}`;
        const notification = await getFunction<Notification>(uri, true, user as User);

        if (notification) {
          setFormData({
            title: notification.title,
            message: notification.message,
            color: notification.color,
            timeInMs: notification.timeInMs.toString(),
            isActive: notification.isActive,
            date: notification.date || "",
          });
        }
      } catch (error) {
        console.error("Error al cargar notificación:", error);
      } finally {
        setLoading(false);
      }
    };

    if (notificationId) {
      getNotification();
    }

  }, [notificationId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newNotification: Notification = {
      id: notificationId,
      title: formData.title,
      message: formData.message,
      color: formData.color,
      timeInMs: parseInt(formData.timeInMs, 10),
      date: formData.date,
      isActive: formData.isActive,
    };

    postNotification(newNotification);
  };

  const postNotification = async (notification: Notification) => {
    try {
      const uri = POST_SAVE_NOTIFICATION_URI;
      const data = await postFunction<EditNotificationResponse>(
        uri,
        notification,
        true,
        user as User
      );

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Notificación guardada exitosamente");
      } else {
        console.error("Error al guardar la notificación");
      }
    } catch (error) {
      console.error("Error al guardar la notificación:", error);
    } finally {
      setFormData({
        title: "",
        message: "",
        color: "#0000ff",
        timeInMs: "",
        isActive: true,
        date: ""
      });
    }
  };

  return (
    <BasePage
      title="Editar Notificación"
      description="Completa el formulario para editar la notificación."
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
      >
        {/* Título */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Título
          </label>
          <div className="relative">
            <Bell className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Ej. Recordatorio de Pago"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Mensaje
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Escribe el contenido de la notificación..."
              className="w-full pl-10 pr-3 py-2 border rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
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

        {/* Tiempo en milisegundos */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Tiempo en milisegundos
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="number"
              name="timeInMs"
              value={formData.timeInMs}
              onChange={handleChange}
              required
              min="1"
              placeholder="Ej. 60000 (1 minuto)"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Activo */}
        <div className="flex items-center gap-3">
          <ToggleLeft className="h-5 w-5 text-gray-400" />
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Activa
          </label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-5 w-5 accent-green-600 cursor-pointer"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Save className="h-5 w-5" />
          Guardar Notificación
        </button>
      </form>
    </BasePage>
  );
};

export default EditNotificationPage;
