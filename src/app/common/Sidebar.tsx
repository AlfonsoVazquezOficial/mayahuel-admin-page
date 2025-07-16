// Sidebar.tsx
import {
  Menu,
  X,
  User,
  Home,
  CircleHelp,
  Languages,
  Users,
  HandHeart,
  SquareUser,
  Calendar,
  Check,
  ChartArea,
  Warehouse,
  Database,
  Group,
  HashIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";

interface Option {
  name: string;
  path: string;
  icon: ReactNode;
}

interface Translations {
  [key: string]: {
    menu: string;
    options: Option[];
    language: string;
  };
}

interface UserType {
  name: string;
  email: string;
}

const translations: Translations = {
  en: {
    menu: "Menu",
    options: [
      { name: "Home", path: "/", icon: <Home size={18} /> },
      { name: "Suppliers", path: "/suppliers", icon: <Group size={18} /> },
      {
        name: "Categories",
        path: "/categories",
        icon: <SquareUser size={18} />,
      },
      { name: "Tags", path: "/tags", icon: <HashIcon size={18} /> },
      { name: "Products", path: "/products", icon: <Warehouse size={18} /> },
      { name: "Orders", path: "/orders", icon: <Calendar size={18} /> },
      {
        name: "Notifications",
        path: "/notifications",
        icon: <CircleHelp size={18} />,
      },
      {
        name: "Statistics",
        path: "/statistics",
        icon: <ChartArea size={18} />,
      },
    ],
    language: "Language",
  },
  es: {
    menu: "Menú",
    options: [
      { name: "Inicio", path: "/", icon: <Home size={18} /> },
      { name: "Proveedores", path: "/suppliers", icon: <Group size={18} /> },
      {
        name: "Categorias",
        path: "/categories",
        icon: <SquareUser size={18} />,
      },
      { name: "Etiquetas", path: "/tags", icon: <HashIcon size={18} /> },
      { name: "Productos", path: "/products", icon: <Warehouse size={18} /> },
      { name: "Pedidos", path: "/orders", icon: <Calendar size={18} /> },
      {
        name: "Notificaciones",
        path: "/notifications",
        icon: <CircleHelp size={18} />,
      },
      {
        name: "Estadísticas",
        path: "/statistics",
        icon: <ChartArea size={18} />,
      },
    ],
    language: "Idioma",
  },
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [language, setLanguage] = useState<keyof typeof translations>("es");
  const [user, setUser] = useState<UserType | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsOpen(true);
      if (window.innerWidth < 1024) setIsOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && (savedLang === "es" || savedLang === "en")) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "es" : "en";
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md lg:hidden shadow-md hover:bg-gray-700 transition-all"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:relative top-0 left-0 xs:h-screen md:h-[98%] overflow-y-auto bg-brand-b text-gray-800 p-5 flex flex-col gap-5 transition-all duration-300 rounded-md shadow-lg z-50 overflow-x-hidden
    ${
      isMobile
        ? isOpen
          ? "translate-x-0"
          : "-translate-x-full"
        : isOpen
        ? "w-64"
        : "w-16 bg-transparent shadow-none"
    }
  `}
      >
        {isMobile && (
          <button
            className="self-end p-2 hover:bg-brand-c rounded-md transition-all"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        )}

        {!isMobile && (
          <button
            className={`flex items-center hover:bg-brand-c rounded-md transition-all
                ${isOpen ? "gap-2 p-3" : "w-12 h-12 justify-center"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={20} className="shrink-0" />
            {isOpen && <span>{translations[language].menu}</span>}
          </button>
        )}

        {isOpen && (
          <div>
            <h1 className="text-center text-xl font-bold">Plaxoro</h1>
          </div>
        )}

        {isOpen && (
          <>
            {user ? (
              <div className="p-4 bg-brand-c rounded-lg flex flex-col items-center text-center shadow-md">
                <User size={40} className="text-gray-400 mb-2" />
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-3 flex items-center gap-2 shadow-md transition-all"
                  onClick={logout}
                ></button>
              </div>
            ) : null}

            <nav className="flex flex-col gap-2 border-t border-gray-700 pt-4">
              {translations[language].options.map((item, i) => {
                const isActive =
                  pathname === item.path ||
                  pathname.startsWith(item.path + "/");

                return (
                  <button
                    key={i}
                    onClick={() => (window.location.href = item.path)}
                    className={`p-3 rounded-md flex gap-3 items-center transition-all cursor-pointer
                      ${isActive ? "bg-brand-c" : "hover:bg-brand-d"}
                    `}
                  >
                    {item.icon} {item.name}
                  </button>
                );
              })}
            </nav>
          </>
        )}

        {isOpen && (
          <div
            className="mt-auto flex items-center gap-2 p-3 hover:bg-brand-d rounded-md cursor-pointer transition-all"
            onClick={toggleLanguage}
          >
            <Languages size={20} />
            {language === "en" ? "🇺🇸 English" : "🇪🇸 Español"}
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
