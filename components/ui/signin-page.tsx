"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Leaf,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

// --- UI Components: Estilo Glass & Gemini ---

const InputField = ({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
}: any) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="text-sm font-medium text-zinc-400 ml-1 transition-colors group-focus-within:text-emerald-400"
    >
      {label}
    </label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors pointer-events-none z-10" />

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-14 pl-12 pr-4 rounded-2xl border border-white/5 bg-white/5 text-white text-base placeholder:text-zinc-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/40 transition-all duration-300"
        required
      />
    </div>
  </div>
);

const PasswordField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  onTogglePassword,
}: any) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-zinc-400 ml-1">
      {label}
    </label>
    <div className="relative group">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors pointer-events-none z-10" />

      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-14 pl-12 pr-12 rounded-2xl border border-white/5 bg-white/5 text-white text-base placeholder:text-zinc-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/40 transition-all duration-300"
        required
      />

      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer rounded-full hover:bg-white/10"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  </div>
);

// --- Componente Principal ---
export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.token;

      if (!token) {
        throw new Error("El servidor no envió el token de seguridad.");
      }

      localStorage.setItem("user_email", formData.email);
      localStorage.setItem("token", token);

      if (localStorage.getItem("token")) {
        console.log("Sesión guardada correctamente.");
        setTimeout(() => {
          router.push("/chat");
        }, 100);
      } else {
        throw new Error("Error al guardar la sesión.");
      }
    } catch (err: any) {
      console.error("Error login:", err);
      const errorMsg =
        err.response?.data?.detail ||
        err.message ||
        "No se pudo conectar con el servidor.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-zinc-950 text-white font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* LADO IZQUIERDO: Formulario */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Luz ambiental de fondo */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center overflow-hidden">
          <div className="w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] opacity-50" />
        </div>

        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
          {/* Header con Logo */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 mb-2 group">
              <Leaf className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm">
              Bienvenido
            </h1>
            <p className="text-zinc-400 text-base font-light">
              Tu asistente nutricional inteligente
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            <InputField
              id="email"
              type="email"
              label="Correo Electrónico"
              placeholder="hola@ejemplo.com"
              icon={Mail}
              value={formData.email}
              onChange={(e: any) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <PasswordField
              id="password"
              label="Contraseña"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e: any) =>
                setFormData({ ...formData, password: e.target.value })
              }
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-start gap-3 animate-in zoom-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            <button
              disabled={loading}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium text-lg transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 border border-white/5"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Ingresar <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-8">
            ¿Aún no tienes cuenta?{" "}
            <a
              href="/registro"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors hover:underline underline-offset-4"
            >
              Regístrate gratis
            </a>
          </p>
        </div>
      </div>

      {/* LADO DERECHO: Imagen Hero */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-zinc-900 border-l border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[30s] hover:scale-105 ease-linear"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop')",
          }}
        ></div>

        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-end h-full p-16 pb-20 space-y-6 max-w-2xl">
          {/* AQUÍ ESTABA EL ICONO ELIMINADO */}
          <h2 className="text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-xl">
            NutriApp <span className="text-emerald-500">IA</span>
          </h2>
          <p className="text-zinc-200 text-lg leading-relaxed font-light drop-shadow-md border-l-4 border-emerald-500 pl-6 bg-black/20 p-4 rounded-r-xl backdrop-blur-sm">
            "Descubre el poder de una alimentación consciente con la ayuda de
            nuestra inteligencia artificial avanzada."
          </p>
        </div>
      </div>
    </div>
  );
}
