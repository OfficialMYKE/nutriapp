"use client";

import { useEffect } from "react";
import { HeroWave } from "@/components/ui/ai-input-hero";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();

  // Verificación de seguridad: Solo permitir acceso si hay token
  useEffect(() => {
    // Buscamos el token o el email para saber si está logueado
    const token = localStorage.getItem("token");

    if (!token) {
      // Si no hay sesión, mandamos al usuario al Login (Home)
      router.push("/");
    }
  }, [router]);

  return (
    // Ya no necesitamos pasarle props ni manejar estados aquí.
    // El componente HeroWave es autosuficiente ahora.
    <main className="min-h-screen bg-black">
      <HeroWave />
    </main>
  );
}
