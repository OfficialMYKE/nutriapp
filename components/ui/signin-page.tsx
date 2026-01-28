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

// --- Componentes UI Mejorados ---

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
      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {label}
    </label>
    <div className="relative group">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors pointer-events-none" />
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-11 pl-10 pr-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-zinc-500 text-zinc-900 dark:text-white"
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
    <label
      htmlFor={id}
      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {label}
    </label>
    <div className="relative group">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors pointer-events-none" />
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-11 pl-10 pr-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-zinc-500 text-zinc-900 dark:text-white"
        required
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer z-10"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
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

      // --- CORRECCIÓN CRÍTICA PARA EL LOGIN ---
      const token = res.data.token;

      if (!token) {
        throw new Error("El servidor no envió el token de seguridad.");
      }

      // 1. Guardamos los datos explícitamente
      localStorage.setItem("user_email", formData.email);
      localStorage.setItem("token", token);

      // 2. Verificamos que realmente se guardó antes de redirigir
      if (localStorage.getItem("token")) {
        console.log("Sesión guardada correctamente. Entrando...");

        // 3. Pequeño delay para dar tiempo al navegador a procesar el storage
        setTimeout(() => {
          router.push("/chat");
        }, 100);
      } else {
        throw new Error("Error al guardar la sesión en el navegador.");
      }
    } catch (err: any) {
      console.error("Error login:", err);
      const errorMsg =
        err.response?.data?.detail ||
        err.message || // Capturamos también los errores manuales que lanzamos arriba
        "No se pudo conectar con el servidor.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-zinc-950 text-white font-sans">
      {/* Lado Izquierdo - Formulario */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-900/30 text-emerald-500 mb-4 border border-emerald-500/20 shadow-lg shadow-emerald-900/20">
              <Leaf className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Bienvenido</h1>
            <p className="text-zinc-400">Ingresa para hablar con la IA</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="email"
              type="email"
              label="Email"
              placeholder="tu@email.com"
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
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2 animate-in zoom-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              disabled={loading}
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Ingresar <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500">
            ¿Nuevo aquí?{" "}
            <a
              href="/registro"
              className="text-emerald-500 hover:underline hover:text-emerald-400 transition-colors"
            >
              Crear cuenta
            </a>
          </p>
        </div>
      </div>

      {/* Lado Derecho - Imagen Decorativa */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-12 space-y-4">
          <h2 className="text-5xl font-bold text-white tracking-tight drop-shadow-2xl">
            NutriApp <span className="text-emerald-500">IA</span>
          </h2>
          <p className="text-zinc-200 max-w-md text-lg leading-relaxed drop-shadow-md">
            Tu asistente personal nutricional está esperando. <br />
            Inicia sesión para comenzar tu transformación.
          </p>
        </div>
      </div>
    </div>
  );
}
