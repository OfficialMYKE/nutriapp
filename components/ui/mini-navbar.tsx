"use client";

import React, { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* LOGO MÁS SOBRIO */}
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-900/30 p-2 rounded-lg backdrop-blur-sm border border-emerald-500/20">
            <Leaf className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="font-semibold text-white tracking-wide text-lg">
            NutriApp
          </span>
        </div>

        {/* MENÚ DE ESCRITORIO (Centrado y limpio) */}
        <nav className="hidden md:flex items-center gap-8 bg-black/20 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/5">
          {["Planes", "Recetas", "Nosotros"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* BOTONES (Sin verde fosforito) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Entrar
          </button>
          <button className="px-5 py-2 text-sm font-medium text-white bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/30 rounded-full transition-all shadow-lg shadow-emerald-900/20 backdrop-blur-sm">
            Registrarse
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* DESPLEGABLE MÓVIL */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-zinc-900/95 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex flex-col gap-4 md:hidden">
          {["Planes", "Recetas", "Nosotros"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-zinc-300 text-lg py-2 border-b border-white/5"
            >
              {item}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            <button className="w-full py-3 rounded-xl bg-white/5 text-white">
              Entrar
            </button>
            <button className="w-full py-3 rounded-xl bg-emerald-700 text-white">
              Registrarse
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
