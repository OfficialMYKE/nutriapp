"use client";

import React, { useState, useEffect } from "react";
import {
  Leaf,
  Menu,
  X,
  LogOut,
  MessageSquare,
  LayoutGrid,
  ChefHat,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ESTADOS PARA EL SCROLL
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { name: "Arquitectura", path: "/planes", icon: LayoutGrid },
    { name: "Recetas", path: "/recetas", icon: ChefHat },
    { name: "Nosotros", path: "/nosotros", icon: Info },
  ];

  // 1. EFECTO: Comprobar sesión
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  // 2. EFECTO: Lógica de Esconder/Mostrar Navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si estamos en el tope absoluto (0px), siempre mostrar
      if (currentScrollY < 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Si bajamos (current > last) -> Ocultar
      // Si subimos (current < last) -> Mostrar
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push("/");
  };

  return (
    <header
      // APLICAMOS LA CLASE PARA MOVER LA BARRA
      className={`fixed top-0 left-0 w-full z-50 px-6 py-6 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link
          href={isLoggedIn ? "/chat" : "/"}
          className="flex items-center gap-2.5 group"
        >
          <div className="bg-emerald-900/30 p-2 rounded-lg backdrop-blur-sm border border-emerald-500/20 group-hover:bg-emerald-900/50 transition-colors">
            <Leaf className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="font-semibold text-white tracking-wide text-lg">
            NutriApp
          </span>
        </Link>

        {/* MENÚ DE ESCRITORIO */}
        <nav className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/5 shadow-xl">
          {navLinks.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* BOTONES DE ACCIÓN */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link href="/chat">
                <button
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    pathname === "/chat"
                      ? "text-emerald-400"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" /> Chat IA
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-medium text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-full transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/">
                <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                  Entrar
                </button>
              </Link>
              <Link href="/registro">
                <button className="px-5 py-2 text-sm font-medium text-white bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/30 rounded-full transition-all shadow-lg shadow-emerald-900/20 backdrop-blur-sm">
                  Registrarse
                </button>
              </Link>
            </>
          )}
        </div>

        {/* MENÚ MÓVIL TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/5"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* DESPLEGABLE MÓVIL */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 bg-zinc-950/90 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 flex flex-col gap-2 md:hidden animate-in fade-in slide-in-from-top-5 shadow-2xl z-50">
          <div className="flex flex-col gap-1 mb-4">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-2 mb-1">
              Navegación
            </span>
            {navLinks.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-zinc-300 hover:bg-white/5"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="h-px bg-white/10 my-1" />

          <div className="flex flex-col gap-3 mt-2">
            {isLoggedIn ? (
              <>
                <Link href="/chat" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium flex justify-center gap-2 shadow-lg shadow-emerald-900/20">
                    <MessageSquare className="w-5 h-5" /> Ir al Chat
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-500/10 text-red-200 border border-red-500/20 font-medium flex justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" /> Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 rounded-xl bg-zinc-800/50 text-white border border-white/5">
                    Entrar
                  </button>
                </Link>
                <Link href="/registro" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 rounded-xl bg-emerald-700 text-white">
                    Registrarse
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
