'use client';
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../common/Button";
import ThemeToggle from "../../common/ThemeToggle";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    // Si el usuario ya está autenticado, redirigir a la página principal
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("✅ Usuario logueado");
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="flex h-screen w-full bg-brand-b dark:bg-gray-900 scrollbar-hide">
      <div className="hidden md:flex w-1/2 relative animate animate-fade-right animate-once">
        <Image
          src="https://placehold.co/600x800"
          alt="Login Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-brand-b dark:bg-gray-900 px-6 py-12 animate-fade-left animate-once">
        <div className="max-w-md w-full space-y-6">
          <div className=" animate-fade-up animate-once">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Iniciar sesión</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-500">
              Ingresa tus datos para continuar.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border bg-brand-a dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-800 rounded-md shadow-sm focus:ring-brand-a focus:border-brand-a dark:focus:ring-gray-300 dark:focus:border-gray-300"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border bg-brand-a dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-800 rounded-md shadow-sm focus:ring-brand-a focus:border-brand-a dark:focus:ring-gray-300 dark:focus:border-gray-300"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-e text-gray-800 dark:bg-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-brand-b dark:hover:bg-gray-600 transition-colors"
              color="secondary"
            >
              Iniciar sesión
            </Button>
          </form>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{" "}
            <a href="/sign-up" className="text-gray-800 dark:text-brand-b">
              Registrarse
            </a>
          </div>

          <div className="flex items-center justify-between mt-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
