'use client';
import Image from "next/image";
import React, { useState } from "react";
import Button from "../../common/Button";
import ThemeToggle from "../../common/ThemeToggle";
import { Eye, EyeOff } from "lucide-react";
import { postFunction } from "../../lib/FetchUtils";
import { POST_CREATE_SYSTEM_USER_URI } from "../../lib/URIS";
import { CreateUser } from "../../lib/types";

interface AddResponse {
  isCompleted: boolean;
}

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 🔹 Handler para capturar los datos
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      displayName: formData.get("displayName"),
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
    };

    if (data.password !== data.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Datos del formulario:", data);
    const formDataTyped: CreateUser = {
      displayName: data.displayName as string,
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
    };
    postCreateSystemUser(formDataTyped);
  };

  const postCreateSystemUser = async (userData : CreateUser) => {
      try {
        const uri = POST_CREATE_SYSTEM_USER_URI;
        const data = await postFunction<AddResponse>(
          uri,
          userData,
          false
        );
  
        console.log("Respuesta del servidor:", data);
  
        if (data) {
          console.log("Usuario guardado exitosamente");
        } else {
          console.error("Error al guardar el usuario");
        }
      } catch (error) {
        console.error("Error saving the user:", error);
      } finally {
      }
    };

  return (
    <div className="flex h-screen w-full bg-brand-b dark:bg-gray-900 scrollbar-hide">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 relative animate animate-fade-right animate-once">
        <Image
          src="https://placehold.co/600x800"
          alt="Sign Up Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-brand-b dark:bg-gray-900 px-6 py-12 animate-fade-left animate-once">
        <div className="max-w-md w-full space-y-6">
          <div className="animate-fade-up animate-once">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Crear cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-500">
              Regístrate para empezar a usar la plataforma.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Usuario */}
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nombre de usuario
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                required
                className="mt-1 w-full px-4 py-2 border bg-brand-a dark:bg-gray-800 
                text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-800 
                rounded-md shadow-sm focus:ring-brand-a focus:border-brand-a 
                dark:focus:ring-gray-300 dark:focus:border-gray-300"
                placeholder="ej: jperez92"
              />
            </div>

            {/* Nombre completo */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 w-full px-4 py-2 border bg-brand-a dark:bg-gray-800 
                text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-800 
                rounded-md shadow-sm focus:ring-brand-a focus:border-brand-a 
                dark:focus:ring-gray-300 dark:focus:border-gray-300"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Correo */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 w-full px-4 py-2 border bg-brand-a dark:bg-gray-800 
                text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-800 
                rounded-md shadow-sm focus:ring-brand-a focus:border-brand-a 
                dark:focus:ring-gray-300 dark:focus:border-gray-300"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="mt-1 w-full px-4 py-2 border bg-brand-a dark:bg-gray-800 
                  text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-800 
                  rounded-md shadow-sm focus:ring-brand-a focus:border-brand-a 
                  dark:focus:ring-gray-300 dark:focus:border-gray-300 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  name="confirm-password"
                  required
                  className="mt-1 w-full px-4 py-2 border bg-brand-a dark:bg-gray-800 
                  text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-800 
                  rounded-md shadow-sm focus:ring-brand-a focus:border-brand-a 
                  dark:focus:ring-gray-300 dark:focus:border-gray-300 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Botón */}
            <Button
              type="submit"
              className="w-full bg-brand-e text-gray-800 dark:bg-gray-700 
              dark:text-gray-300 py-2 px-4 rounded-md hover:bg-brand-b 
              dark:hover:bg-gray-600 transition-colors"
              color="secondary"
            >
              Registrarse
            </Button>
          </form>

          {/* Link login */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-gray-800 dark:text-brand-b">
              Iniciar sesión
            </a>
          </div>

          {/* Theme toggle */}
          <div className="flex items-center justify-between mt-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
