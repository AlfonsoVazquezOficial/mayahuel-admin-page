'use client';
import React from "react";
import { Notification } from "@/app/lib/types";
import { Bell, Calendar, Clock, Droplet } from "lucide-react";
import Button from "@/app/common/Button";
import { useRouter } from "next/navigation";
import { postFunction } from "@/app/lib/FetchUtils";
import { POST_DELETE_NOTIFICATION_URI } from "@/app/lib/URIS";
import { Modal } from "@/app/common/Modal";
import { ModalFooter } from "@/app/common/ModalFooter";
import { useAuth } from "@/app/hooks/useAuth";
import { User } from "firebase/auth";

interface NotificationItemProps {
  notification: Notification;
}
interface DeleteResponse {
  isCompleted: boolean;
}

const hexToRGBA = (hex: string, alpha = 1) => {
  // Admite #RGB o #RRGGBB
  const clean = hex.replace("#", "");
  const isShort = clean.length === 3;
  const r = parseInt(isShort ? clean[0] + clean[0] : clean.slice(0, 2), 16);
  const g = parseInt(isShort ? clean[1] + clean[1] : clean.slice(2, 4), 16);
  const b = parseInt(isShort ? clean[2] + clean[2] : clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const formatMs = (ms: number) => {
  if (ms < 1000) return `${ms} ms`;
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rs = s % 60;
  if (m < 60) return `${m}m${rs ? ` ${rs}s` : ""}`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return `${h}h${rm ? ` ${rm}m` : ""}`;
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { user } = useAuth();
  const { id, title, message, date: createdAt, isActive, timeInMs, color } = notification;

  const accentBg = hexToRGBA(color, 0.12);
  const accentBorder = hexToRGBA(color, 0.35);
  const router = useRouter();

  // Modal
    const [isModalOpen, setIsModalOpen] = React.useState(false);

  const postDelete = async () => {
    try {
      const uri = POST_DELETE_NOTIFICATION_URI;
      const data = await postFunction<DeleteResponse>(uri, notification, true, user as User);

      console.log("Respuesta del servidor:", data);

      if (data) {
        console.log("Notificación eliminada exitosamente");
      } else {
        console.error("Error al eliminar la notificación");
      }
    } catch (error) {
      console.error("Error al hacer delete:", error);
    }
  };

  return (
    <div className="bg-brand-c dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-4">
      {/* Encabezado */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-xl"
            style={{ backgroundColor: accentBg, border: `1px solid ${accentBorder}`, color }}
          >
            <Bell className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <p className="text-base font-semibold text-gray-900 dark:text-white">{title}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isActive ? "Activa" : "Inactiva"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Chip de color */}
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full border"
            style={{ borderColor: accentBorder, color }}
            title={`Color: ${color}`}
          >
            <span className="inline-flex items-center gap-1">
              <Droplet className="w-3 h-3" />
              {color}
            </span>
          </span>
        </div>
      </div>

      {/* Tiempo y Fecha */}
      <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(Number(createdAt)).toUTCString()}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <span>{formatMs(timeInMs)}</span>
        </div>
      </div>

      {/* Acciones */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-end">
        <Button onClick={() => router.push(`/notifications/edit/${id}`)}>Editar</Button>
        <Button color="danger" onClick={() => setIsModalOpen(true)}>
          Eliminar
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Eliminar Notificación
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ¿Estás seguro de que deseas eliminar esta notificación?
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-bold">
            Esta acción no desactiva, sino que elimina permanentemente la notificación.
          </p>
        </div>
        <ModalFooter>
          <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              postDelete();
              setIsModalOpen(false);
              window.location.reload();
            }}
            color="danger"
          >
            Eliminar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default NotificationItem;
