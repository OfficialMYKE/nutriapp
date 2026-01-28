"use client";

import React, { useState, useEffect } from "react";
import { Leaf, Menu, X, LogOut, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Para saber en qué página estamos

  // 1. EFECTO: Comprobar si hay sesión activa al cargar
  useEffect(() => {
    // Verificamos si existe el token en el navegador
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]); // Se ejecuta cada vez que cambiamos de ruta

  // 2. FUNCIÓN: Cerrar Sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    setIsLoggedIn(false);
    setIsOpen(false); // Cerrar menú móvil si está abierto
    router.push("/"); // Redirigir al Login
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* LOGO (Clickeable -> Va al inicio o al chat) */}
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
        <nav className="hidden md:flex items-center gap-8 bg-black/20 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/5">
          {["Planes", "Recetas", "Nosotros"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* BOTONES INTELIGENTES (Cambian según el estado) */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Si está LOGUEADO mostramos esto: */}
              <Link href="/chat">
                <button className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4" /> Chat
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
              {/* Si NO está logueado mostramos esto: */}
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
          className="md:hidden text-white p-2"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* DESPLEGABLE MÓVIL (También inteligente) */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-zinc-900/95 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-5">
          {["Planes", "Recetas", "Nosotros"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-zinc-300 text-lg py-2 border-b border-white/5"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}

          <div className="flex flex-col gap-3 mt-2">
            {isLoggedIn ? (
              <>
                <Link href="/chat" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium flex justify-center gap-2">
                    <MessageSquare className="w-5 h-5" /> Ir al Chat
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-500/20 text-red-200 border border-red-500/30 font-medium flex justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" /> Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 rounded-xl bg-white/5 text-white">
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
