"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Zap,
  Shield,
  Brain,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function NosotrosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // FUNCIÓN: Manejar la navegación inteligente
  const handleStart = () => {
    setLoading(true);
    // Verificamos si existe sesión
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/chat");
    } else {
      router.push("/registro"); // O "/login" según tu preferencia de conversión
    }
    // No ponemos setLoading(false) porque la página cambiará
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32">
        {/* --- 1. HERO --- */}
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md mb-4 shadow-lg shadow-emerald-900/10 hover:bg-white/10 transition-colors cursor-default">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-zinc-200">
              Powered by{" "}
              <span className="text-white font-bold">Gemini 1.5 Pro</span>
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Nutrición <br />
            <span className="text-emerald-500">Inteligente</span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Hemos integrado el modelo de lenguaje más avanzado de Google y lo
            hemos entrenado con ingeniería de prompts experta para entender tu
            biología.
          </p>
        </div>

        {/* --- 2. EL PRODUCTO (Interactive Demo Look) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto Explicativo */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Más que un chat, <br /> un experto en tu bolsillo.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                A diferencia de las apps tradicionales donde tú introduces datos
                manualmente, NutriApp usa <strong>IA Generativa</strong> para
                entender el contexto.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Razonamiento Profundo",
                  desc: "Analiza combinaciones de alimentos y sus efectos.",
                },
                {
                  title: "Contexto Infinito",
                  desc: "Recuerda tus alergias y gustos en cada conversación.",
                },
                {
                  title: "Respuestas Naturales",
                  desc: "Habla como quieras, sin comandos robóticos.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/20 transition-colors group cursor-default"
                >
                  <div className="mt-1 w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEMO VISUAL */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[100px] opacity-50 pointer-events-none" />

            <div className="relative bg-zinc-950 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[600px] hover:shadow-emerald-900/20 transition-shadow duration-500">
              <div className="px-6 py-4 border-b border-white/5 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      NutriApp AI
                    </p>
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
                      En línea
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 space-y-6 overflow-hidden relative">
                <div className="flex justify-end">
                  <div className="bg-emerald-600 text-white px-5 py-3 rounded-3xl rounded-tr-sm text-sm shadow-md max-w-[85%]">
                    Tengo pollo y aguacate, pero solo 15 min. ¿Qué hago?
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-zinc-800 text-zinc-200 px-5 py-3 rounded-3xl rounded-tl-sm text-sm border border-white/5 shadow-md max-w-[90%] space-y-2">
                    <p>
                      ¡Te propongo unos{" "}
                      <strong>Tacos de Lechuga Express</strong>!
                    </p>
                    <ul className="list-disc list-inside text-zinc-400 text-xs space-y-1 ml-1">
                      <li>Desmenuza el pollo (5 min)</li>
                      <li>Haz puré el aguacate con limón</li>
                      <li>Úsalo sobre hojas de lechuga</li>
                    </ul>
                    <div className="pt-2">
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md border border-emerald-500/20">
                        ~320 kcal
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input falso interactivo que lleva al chat */}
              <div
                onClick={handleStart}
                className="p-4 bg-zinc-900/80 border-t border-white/5 backdrop-blur-xl cursor-pointer hover:bg-zinc-900 transition-colors"
              >
                <div className="h-12 bg-white/5 rounded-full border border-white/5 flex items-center px-4 justify-between pointer-events-none">
                  <span className="text-zinc-500 text-sm">
                    Pruébalo tú mismo...
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-zinc-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. CARACTERÍSTICAS TÉCNICAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "Ultra Rápido",
              text: "Conectado directamente a la API de Google Cloud para respuestas en milisegundos.",
            },
            {
              icon: Shield,
              title: "Datos Seguros",
              text: "Tus consultas son anónimas. No usamos tus datos personales para entrenar modelos públicos.",
            },
            {
              icon: Brain,
              title: "Memoria Adaptativa",
              text: "El sistema aprende de tus conversaciones pasadas para afinar sus recomendaciones.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 text-zinc-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* --- 4. CTA FINAL FUNCIONAL --- */}
        <div className="text-center py-10 border-t border-white/5">
          <h3 className="text-3xl font-bold text-white mb-8">
            Prueba la tecnología ahora
          </h3>

          <button
            onClick={handleStart}
            disabled={loading}
            className="group relative inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-emerald-900/20 hover:scale-105 hover:shadow-emerald-900/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <MessageSquare className="w-5 h-5" />
            )}

            {loading ? "Cargando..." : "Iniciar Chat Gratis"}

            {!loading && (
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            )}
          </button>
          <p className="mt-6 text-sm text-zinc-500">
            Sin tarjeta de crédito • Plan gratuito disponible
          </p>
        </div>
      </main>
    </div>
  );
}
