'use client';
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react"; // íconos

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirige a login después de un pequeño delay para mostrar mensaje
      const timer = setTimeout(() => router.replace("/login"), 1000);
      return () => clearTimeout(timer);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 animate-fade-in bg-brand-b dark:bg-gray-900">
        <Loader2 className="w-12 h-12 animate-spin text-brand-a" />
        <p className="text-gray-700 dark:text-gray-300 text-lg">Verificando sesión...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 animate-fade-in bg-brand-b dark:bg-gray-900">
        <AlertCircle className="w-12 h-12 text-red-500 animate-bounce" />
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Debes iniciar sesión para continuar
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
