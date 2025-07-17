"use client"

// ¡IMPORTANTE! Elimina esta línea: import { color } from "framer-motion";
// Los archivos de configuración de Tailwind no deben tener imports de React/Framer Motion.

const config = {
  darkMode: "class", // Correcto
  content: [
    // ¡VERIFICA ESTAS RUTAS! Deben cubrir todos tus archivos .tsx, .jsx, .js, .ts, .mdx
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
        
    },
  },
  plugins: [], // Asegúrate de que tus plugins estén aquí, como tailwindcss-animate si lo usas
}

export default config
