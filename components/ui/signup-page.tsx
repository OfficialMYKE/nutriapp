"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Leaf,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  // Sparkles eliminado de aquí
} from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

// --- UI COMPONENTS: ESTILO GLASS / GEMINI (Igual que Login) ---

const InputField = ({
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
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
        // ESTILO GLASS: h-14, rounded-2xl, bg-white/5
        className={`w-full h-14 pl-12 pr-4 rounded-2xl border bg-white/5 text-white text-base placeholder:text-zinc-600 focus:outline-none focus:ring-4 transition-all duration-300
        ${
          error
            ? "border-red-500/50 focus:ring-red-500/10 focus:border-red-500"
            : "border-white/5 focus:ring-emerald-500/10 focus:border-emerald-500/40"
        }`}
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
  error,
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
        className={`w-full h-14 pl-12 pr-12 rounded-2xl border bg-white/5 text-white text-base placeholder:text-zinc-600 focus:outline-none focus:ring-4 transition-all duration-300
        ${
          error
            ? "border-red-500/50 focus:ring-red-500/10 focus:border-red-500"
            : "border-white/5 focus:ring-emerald-500/10 focus:border-emerald-500/40"
        }`}
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

// --- PÁGINA PRINCIPAL DE REGISTRO ---

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      await api.post("/registro", {
        email: formData.email,
        password: formData.password,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/"); // Redirigir al Login
      }, 2000);
    } catch (err: any) {
      console.error("Error en registro:", err);
      const msg =
        err.response?.data?.detail ||
        "Hubo un error al crear la cuenta. Intenta de nuevo.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-zinc-950 text-white font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* LADO IZQUIERDO - FORMULARIO */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Luz ambiental de fondo (Glow) */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center overflow-hidden">
          <div className="w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] opacity-50" />
        </div>

        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 mb-2 group">
              <Leaf className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm">
              Crear cuenta
            </h1>
            <p className="text-zinc-400 text-base font-light">
              Comienza tu transformación hoy
            </p>
          </div>

          {success ? (
            /* MENSAJE DE ÉXITO ESTILO GLASS */
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex flex-col items-center text-center animate-in fade-in zoom-in backdrop-blur-md">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 shadow-inner shadow-emerald-500/10">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                ¡Cuenta creada!
              </h3>
              <p className="text-zinc-400">
                Redirigiendo al inicio de sesión...
              </p>
            </div>
          ) : (
            /* FORMULARIO */
            <form onSubmit={handleSubmit} className="space-y-5 mt-8">
              <InputField
                id="email"
                type="email"
                label="Correo Electrónico"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
              />

              <PasswordField
                id="password"
                label="Contraseña"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={
                  error.includes("contraseña") || error.includes("caracteres")
                }
              />

              <PasswordField
                id="confirmPassword"
                label="Confirmar Contraseña"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={error.includes("coinciden")}
              />

              {/* Error General */}
              {error &&
                !error.includes("contraseña") &&
                !error.includes("coinciden") && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-start gap-3 animate-in zoom-in">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{error}</span>
                  </div>
                )}

              {/* Botón Píldora */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium text-lg transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 border border-white/5"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Registrarse <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-zinc-500 mt-8">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors hover:underline underline-offset-4"
            >
              Inicia Sesión
            </a>
          </p>
        </div>
      </div>

      {/* LADO DERECHO - VISUAL HERO (Igual que Login) */}
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
          {/* SE ELIMINÓ EL DIV DE SPARKLES AQUÍ */}

          <h2 className="text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-xl">
            NutriApp <span className="text-emerald-500">IA</span>
          </h2>
          <div className="space-y-4 border-l-4 border-emerald-500 pl-6 bg-black/20 p-6 rounded-r-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 text-zinc-200 text-lg font-light">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Planes de dieta personalizados
            </div>
            <div className="flex items-center gap-3 text-zinc-200 text-lg font-light">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Recetas generadas por IA
            </div>
            <div className="flex items-center gap-3 text-zinc-200 text-lg font-light">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Seguimiento 24/7
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
