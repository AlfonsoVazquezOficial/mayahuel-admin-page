import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import ThemeToggle from "../common/ThemeToggle";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full bg-brand-b dark:bg-gray-900 scrollbar-hide">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 relative animate animate-fade-right animate-once">
        <Image
          src="https://placehold.co/600x800"
          alt="Login Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-brand-b dark:bg-gray-900 px-6 py-12 animate-fade-left animate-once">
        <div className="max-w-md w-full space-y-6">
          <div className=" animate-fade-up animate-once">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Iniciar sesión</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-500">
              Ingresa tus datos para continuar.
            </p>
          </div>
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 w-full px-4 py-2 border bg-brand-a dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-800 rounded-md shadow-sm focus:ring-brand-a focus:border-brand-a dark:focus:ring-gray-300 dark:focus:border-gray-300"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                required
                className="mt-1 w-full px-4 py-2 border bg-brand-a dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-800 rounded-md shadow-sm focus:ring-brand-a focus:border-brand-a dark:focus:ring-gray-300 dark:focus:border-gray-300"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full bg-brand-e text-gray-800 dark:bg-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-brand-b dark:hover:bg-gray-600 transition-colors" color="secondary">
              Iniciar sesión
            </Button>

          </form>
          <div className="flex items-center justify-between mt-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
