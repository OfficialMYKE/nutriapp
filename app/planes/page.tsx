import { Navbar } from "@/components/ui/mini-navbar";
import {
  Cpu,
  Server,
  Database,
  Code2,
  Globe,
  Shield,
  Terminal,
} from "lucide-react";

export default function ArchitecturePage() {
  // Datos basados en tu código main.py
  const stack = [
    {
      name: "Backend Core",
      role: "Procesamiento & API",
      description: "Servidor de alto rendimiento construido con Python.",
      tools: [
        "FastAPI (Asynchronous)",
        "SQLAlchemy ORM",
        "Python 3.10+",
        "Gestión de Sesiones (In-Memory)",
        "Middleware CORS Seguro",
      ],
      icon: Server,
      highlight: false,
    },
    {
      name: "Motor de IA",
      role: "Cerebro Cognitivo",
      description: "Inteligencia artificial generativa integrada.",
      tools: [
        "Google Gemini 2.5 Flash",
        "Google GenAI Client SDK",
        "Ingeniería de Prompts (System Role)",
        "Contexto Persistente",
        "Respuestas en Streaming",
      ],
      icon: Cpu,
      highlight: true, // Resaltamos la IA porque es el core del negocio
    },
    {
      name: "Datos & Seguridad",
      role: "Persistencia",
      description: "Almacenamiento seguro de usuarios e historiales.",
      tools: [
        "Base de Datos Relacional (SQL)",
        "Autenticación Propia (Auth)",
        "Historial de Chat en Nube",
        "Validación con Pydantic",
        "Variables de Entorno (.env)",
      ],
      icon: Database,
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header Técnico */}
        <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
            <Terminal className="w-3 h-3" />
            <span className="text-xs font-bold uppercase tracking-widest">
              System Architecture v1.0
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Cómo funciona <span className="text-emerald-500">NutriApp</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Una visión transparente de nuestra infraestructura tecnológica,
            diseñada para ser rápida, escalable y segura.
          </p>
        </div>

        {/* Grid de Tecnologías */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stack.map((tech, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 flex flex-col group
              ${
                tech.highlight
                  ? "bg-emerald-900/10 border-emerald-500/50 shadow-2xl shadow-emerald-900/20 z-10 scale-105"
                  : "bg-zinc-900/40 border-white/5 hover:bg-zinc-900/60"
              }`}
            >
              <div className="mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-colors ${
                    tech.highlight
                      ? "bg-emerald-500 text-white border-emerald-400"
                      : "bg-white/5 text-zinc-400 border-white/10 group-hover:bg-white/10 group-hover:text-emerald-400"
                  }`}
                >
                  <tech.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-1 text-white">
                  {tech.name}
                </h3>
                <p className="text-sm font-medium text-emerald-500 uppercase tracking-wide">
                  {tech.role}
                </p>
                <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                  {tech.description}
                </p>
              </div>

              {/* Separador */}
              <div
                className={`h-px w-full my-4 ${tech.highlight ? "bg-emerald-500/20" : "bg-white/10"}`}
              />

              <div className="space-y-3 flex-1">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Especificaciones:
                </span>
                <ul className="space-y-2">
                  {tech.tools.map((tool, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-zinc-300"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${tech.highlight ? "bg-emerald-400" : "bg-zinc-600"}`}
                      />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer extra: Info de Seguridad o Datos */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 flex items-start gap-4 hover:border-emerald-500/30 transition-colors">
            <Shield className="w-6 h-6 text-emerald-500 mt-1" />
            <div>
              <h4 className="text-white font-bold mb-1">Seguridad de Datos</h4>
              <p className="text-sm text-zinc-400">
                Implementamos autenticación robusta y segregación de datos por
                usuario mediante SQLAlchemy.
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5 flex items-start gap-4 hover:border-blue-500/30 transition-colors">
            <Globe className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h4 className="text-white font-bold mb-1">API RESTful</h4>
              <p className="text-sm text-zinc-400">
                Endpoints optimizados con FastAPI para una comunicación
                cliente-servidor de baja latencia.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
