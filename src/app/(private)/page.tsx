'use client';

import React from "react";
import { ArrowRight } from "lucide-react";
import BasePage from "../common/BasePage";

const Home: React.FC = () => {
  return (
    <BasePage title={""} description={null}>
      <div className="flex flex-col items-center justify-center px-6">
        {/* Encabezado animado */}
        <h1
          className="text-4xl sm:text-5xl font-bold text-center mb-6"
        >
          Bienvenido a <span className="dark:text-gray-200 text-gray-400">Eth</span><span className="text-amber-400">os</span>
        </h1>

        {/* Subtítulo */}
        <p
          className="text-lg dark:text-gray-200 text-gray-800 text-center max-w-lg"
        >
          Bienvenido a Ethos, tu plataforma de gestión de joyería. Aquí podrás administrar tus productos, pedidos y clientes de manera eficiente y sencilla.
        </p>

        {/* Botón de acción */}
        <button
          className="mt-6 px-6 py-3 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 bg-brand-e hover:bg-brand-b text-gray-800 rounded-lg flex items-center space-x-2 font-semibold transition-all"
        >
          <span>Vamos</span>
          <ArrowRight size={18} />
        </button>

        {/* Tarjeta destacada */}
        <div
          className="mt-12 w-full max-w-xl p-6 dark:bg-gray-700 dark:border-gray-500 bg-gray-200 rounded-lg shadow-lg border border-gray-300 text-center"
        >
          <h2 className="text-2xl font-semibold dark:text-gray-200 text-gray-800">
            Nuestra Misión
          </h2>
          <p className="dark:text-gray-200 text-gray-700 mt-3">
            En Ethos, nos dedicamos a ofrecerte las mejores herramientas para gestionar tu negocio de joyería. Desde la administración de inventario hasta el seguimiento de pedidos, estamos aquí para ayudarte a crecer.
          </p>
        </div>
      </div>
    </BasePage>
  );
};

export default Home;
