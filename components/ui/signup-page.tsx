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
} from "lucide-react";
import api from "@/lib/api"; // Tu conexión con Python
import { useRouter } from "next/navigation"; // Para redirigir al usuario

// --- COMPONENTES UI REUTILIZABLES ---

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
      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-11 pl-10 pr-3 rounded-xl border bg-white dark:bg-zinc-900/50 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all
        ${
          error
            ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
            : "border-zinc-200 dark:border-zinc-800 focus:ring-emerald-500/20 focus:border-emerald-500"
        }`}
        required
      />
    </div>
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> {error}
      </p>
    )}
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
    <label
      htmlFor={id}
      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {label}
    </label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-11 pl-10 pr-10 rounded-xl border bg-white dark:bg-zinc-900/50 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all
        ${
          error
            ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
            : "border-zinc-200 dark:border-zinc-800 focus:ring-emerald-500/20 focus:border-emerald-500"
        }`}
        required
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
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

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled,
  loading,
}: any) => {
  const base =
    "h-11 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 w-full disabled:opacity-70 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20",
    outline:
      "border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
};

// --- PÁGINA PRINCIPAL DE REGISTRO ---

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Estados para la lógica
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Validación Frontend
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
      // 2. Conexión con Backend (Python)
      const response = await api.post("/registro", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Registro exitoso:", response.data);
      setSuccess(true);

      // 3. Redirección después de 2 segundos a la HOME (Login)
      setTimeout(() => {
        router.push("/");
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
    <div className="min-h-screen flex w-full bg-white dark:bg-zinc-950">
      {/* LADO IZQUIERDO - FORMULARIO */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Crea tu cuenta
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Comienza tu viaje hacia una vida saludable
            </p>
          </div>

          {/* MENSAJE DE ÉXITO */}
          {success ? (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl flex flex-col items-center text-center animate-in fade-in zoom-in">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">
                ¡Cuenta creada!
              </h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                Redirigiendo al login...
              </p>
            </div>
          ) : (
            /* FORMULARIO */
            <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Crea una contraseña segura"
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />

              <PasswordField
                id="confirmPassword"
                label="Confirmar Contraseña"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={error}
              />

              <div className="pt-2">
                <Button type="submit" loading={loading}>
                  {loading ? "Creando cuenta..." : "Registrarse"}
                </Button>
              </div>

              {/* Error General del Backend */}
              {error && !error.includes("contraseñas") && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}
            </form>
          )}

          <p className="text-center text-sm text-zinc-500">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/"
              className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Inicia Sesión
            </a>
          </p>
        </div>
      </div>

      {/* LADO DERECHO - VISUAL */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-bl from-zinc-900 via-emerald-950 to-zinc-900" />

        <div className="absolute inset-0 opacity-40">
          <div className="absolute bottom-20 -right-10 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center h-full w-full">
          <div className="max-w-md space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 rounded-full"></div>
              <h2 className="relative text-4xl font-bold text-white tracking-tight leading-tight">
                El primer paso hacia tu mejor versión.
              </h2>
            </div>

            <div className="grid gap-4 text-left text-zinc-400 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Planes de dieta con IA</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Análisis nutricional instantáneo</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Seguimiento de progreso 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
