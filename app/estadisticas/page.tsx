"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import api from "@/lib/api";
import {
  Activity,
  BarChart3,
  BrainCircuit,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Database,
  Save,
  TrendingUp,
  Calculator,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

// --- ESTILOS CSS PARA LA SCROLLBAR (Inyectados en JS) ---
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #3f3f46;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #52525b;
  }
`;

// --- COMPONENTE CUSTOM TOOLTIP (Para que se vea bien en la gráfica) ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // payload[0] es x (peso), payload[1] es y (calorías)
    return (
      <div className="bg-zinc-950/90 border border-zinc-700 p-4 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-zinc-400 text-xs font-semibold mb-2 uppercase tracking-wider">
          Datos Registrados
        </p>
        <div className="space-y-1">
          <p className="text-sm text-white">
            Peso:{" "}
            <span className="font-bold text-emerald-400">
              {payload[0].value} kg
            </span>
          </p>
          <p className="text-sm text-white">
            Calorías:{" "}
            <span className="font-bold text-emerald-400">
              {payload[1].value} kcal
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

interface Metrics {
  estado: string;
  mse: number | null;
  r2: number | null;
}

interface TrainingRow {
  id: number;
  peso: string;
  altura: string;
  calorias: string;
}

export default function EstadisticasPage() {
  const [metrics, setMetrics] = useState<Metrics>({
    estado: "Cargando...",
    mse: null,
    r2: null,
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [dataRows, setDataRows] = useState<TrainingRow[]>([
    { id: 1, peso: "", altura: "", calorias: "" },
    { id: 2, peso: "", altura: "", calorias: "" },
    { id: 3, peso: "", altura: "", calorias: "" },
  ]);
  const [testSize, setTestSize] = useState(0.2);

  const [simulacion, setSimulacion] = useState({ peso: "", altura: "" });
  const [resultadoSimulacion, setResultadoSimulacion] = useState<number | null>(
    null,
  );
  const [loadingSimulacion, setLoadingSimulacion] = useState(false);

  const chartData = dataRows
    .filter(
      (r) =>
        r.peso &&
        r.calorias &&
        !isNaN(parseFloat(r.peso)) &&
        !isNaN(parseFloat(r.calorias)),
    )
    .map((r) => ({
      x: parseFloat(r.peso),
      y: parseFloat(r.calorias),
      z: 1,
    }));

  const loadMetrics = async () => {
    try {
      const res = await api.get("/ml/metrics");
      setMetrics(res.data);
    } catch (error) {
      console.error(error);
      setMetrics({ estado: "Offline", mse: 0, r2: 0 });
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  const handleInputChange = (
    id: number,
    field: keyof TrainingRow,
    value: string,
  ) => {
    setDataRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const addRow = () => {
    const newId =
      dataRows.length > 0 ? Math.max(...dataRows.map((r) => r.id)) + 1 : 1;
    setDataRows([
      ...dataRows,
      { id: newId, peso: "", altura: "", calorias: "" },
    ]);
  };

  const deleteRow = (id: number) => {
    if (dataRows.length <= 2) {
      alert("Necesitas al menos 2 datos para entrenar.");
      return;
    }
    setDataRows(dataRows.filter((row) => row.id !== id));
  };

  const loadExampleData = () => {
    setDataRows([
      { id: 1, peso: "60", altura: "1.65", calorias: "2000" },
      { id: 2, peso: "75", altura: "1.75", calorias: "2500" },
      { id: 3, peso: "85", altura: "1.80", calorias: "2800" },
      { id: 4, peso: "95", altura: "1.85", calorias: "3100" },
      { id: 5, peso: "55", altura: "1.60", calorias: "1800" },
      { id: 6, peso: "70", altura: "1.70", calorias: "2300" },
      { id: 7, peso: "100", altura: "1.90", calorias: "3400" },
    ]);
  };

  const handleTrainModel = async () => {
    setLoading(true);
    setStatusMsg(null);

    try {
      const cleanData = dataRows.filter(
        (r) => r.peso && r.altura && r.calorias,
      );
      if (cleanData.length < 3)
        throw new Error("Ingresa al menos 3 filas completas.");

      const payload = {
        peso: cleanData.map((r) => parseFloat(r.peso)),
        altura: cleanData.map((r) => parseFloat(r.altura)),
        calorias_reales: cleanData.map((r) => parseFloat(r.calorias)),
        config: { test_size: testSize, random_state: 42 },
      };

      await api.post("/ml/train", payload);
      await loadMetrics();
      setStatusMsg({
        type: "success",
        text: `Modelo entrenado con ${cleanData.length} casos.`,
      });
    } catch (error: any) {
      const msg =
        error.response?.data?.error || error.message || "Error al entrenar.";
      setStatusMsg({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleSimular = async () => {
    setLoadingSimulacion(true);
    setResultadoSimulacion(null);
    try {
      const peso = parseFloat(simulacion.peso);
      const altura = parseFloat(simulacion.altura);

      if (!peso || !altura) return;

      const res = await api.post("/ml/predict", { peso, altura });
      setResultadoSimulacion(res.data.prediccion_calorias);
    } catch (error) {
      console.error("Error simulando:", error);
      alert("Error al predecir. Asegúrate de que el modelo esté entrenado.");
    } finally {
      setLoadingSimulacion(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500/30 relative overflow-hidden">
      {/* Inyectamos estilos del scrollbar */}
      <style jsx global>
        {scrollbarStyles}
      </style>

      <Navbar />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-500/10 blur-[150px] pointer-events-none" />

      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Laboratorio de <span className="text-emerald-500">IA</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg">
            Administra el cerebro de NutriApp: Entrena el modelo con datos
            históricos y verifica su aprendizaje en tiempo real.
          </p>
        </div>

        {/* MÉTRICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Estado del Sistema"
            value={metrics.estado}
            icon={Activity}
            color="emerald"
            sub="Estado actual"
          />
          <MetricCard
            title="Precisión (R² Score)"
            value={
              metrics.r2 !== null ? `${(metrics.r2 * 100).toFixed(2)}%` : "N/A"
            }
            icon={BarChart3}
            color="blue"
            sub="Objetivo: > 80%"
          />
          <MetricCard
            title="Margen de Error (MSE)"
            value={metrics.mse !== null ? metrics.mse.toFixed(2) : "N/A"}
            icon={BrainCircuit}
            color="purple"
            sub="Objetivo: Bajo"
          />
        </div>

        {/* GRID PRINCIPAL (TABLA + GRÁFICA) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* TABLA INPUT */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-500" /> Dataset
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={loadExampleData}
                  className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-white/5 transition-colors"
                >
                  Ejemplo
                </button>
                <button
                  onClick={addRow}
                  className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-emerald-400 rounded-lg border border-emerald-500/20 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Fila
                </button>
              </div>
            </div>

            {/* AQUI ESTA LA MAGIA DEL SCROLL: Agregamos la clase 'custom-scrollbar' */}
            <div className="overflow-x-auto mb-4 rounded-xl border border-white/5 flex-grow custom-scrollbar max-h-[300px]">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-zinc-900 z-10">
                  <tr className="text-zinc-400 text-[10px] uppercase tracking-wider border-b border-white/5">
                    <th className="p-3">Peso (kg)</th>
                    <th className="p-3">Altura (m)</th>
                    <th className="p-3 text-emerald-400">Calorías</th>
                    <th className="p-3 text-center">x</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-zinc-900/20">
                  {dataRows.map((row) => (
                    <tr key={row.id} className="group hover:bg-white/[0.02]">
                      <td className="p-2">
                        <input
                          type="number"
                          value={row.peso}
                          onChange={(e) =>
                            handleInputChange(row.id, "peso", e.target.value)
                          }
                          className="w-full bg-transparent border border-zinc-700 focus:border-emerald-500 rounded px-2 py-1 text-sm text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                          placeholder="0"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          step="0.01"
                          value={row.altura}
                          onChange={(e) =>
                            handleInputChange(row.id, "altura", e.target.value)
                          }
                          className="w-full bg-transparent border border-zinc-700 focus:border-emerald-500 rounded px-2 py-1 text-sm text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={row.calorias}
                          onChange={(e) =>
                            handleInputChange(
                              row.id,
                              "calorias",
                              e.target.value,
                            )
                          }
                          className="w-full bg-emerald-900/10 border border-emerald-500/20 focus:border-emerald-500 rounded px-2 py-1 text-sm text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                          placeholder="0"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => deleteRow(row.id)}
                          className="text-zinc-600 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs text-zinc-500">
                Test Split: {(testSize * 100).toFixed(0)}%
              </span>
              <button
                onClick={handleTrainModel}
                disabled={loading}
                className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 text-sm ${loading ? "bg-zinc-800 text-zinc-500" : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg"}`}
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}{" "}
                {loading ? "Procesando..." : "Entrenar Modelo"}
              </button>
            </div>

            {statusMsg && (
              <div
                className={`mt-4 p-3 rounded-lg text-xs flex items-center gap-2 ${statusMsg.type === "success" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}
              >
                {statusMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}{" "}
                {statusMsg.text}
              </div>
            )}
          </div>

          {/* GRÁFICA */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-sm flex flex-col min-h-[400px]">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />{" "}
              <h2 className="text-xl font-bold text-white">Dispersión</h2>
            </div>
            <div className="flex-grow w-full min-h-[300px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="Peso"
                      unit="kg"
                      stroke="#71717a"
                      tick={{ fill: "#71717a", fontSize: 12 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="Calorías"
                      unit="kcal"
                      stroke="#71717a"
                      tick={{ fill: "#71717a", fontSize: 12 }}
                    />

                    {/* TOOLTIP CORREGIDO: USAMOS CONTENT */}
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ strokeDasharray: "3 3", stroke: "#52525b" }}
                    />

                    <Scatter name="Datos" data={chartData} fill="#34d399" />
                  </ScatterChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-zinc-600">
                  Sin datos
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIMULADOR */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-40 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                <Calculator className="w-6 h-6 text-emerald-500" />
                Simulador de Predicción
              </h2>
              <p className="text-zinc-400 text-sm">
                Prueba el modelo recién entrenado. Ingresa un caso hipotético
                para ver qué inferencia realiza la IA.
              </p>
            </div>

            <div className="w-full md:w-2/3 flex flex-col sm:flex-row gap-4 items-end">
              <div className="space-y-2 w-full">
                <label className="text-xs text-zinc-500 font-medium ml-1">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 80"
                  value={simulacion.peso}
                  onChange={(e) =>
                    setSimulacion({ ...simulacion, peso: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2 w-full">
                <label className="text-xs text-zinc-500 font-medium ml-1">
                  Altura (m)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 1.80"
                  step="0.01"
                  value={simulacion.altura}
                  onChange={(e) =>
                    setSimulacion({ ...simulacion, altura: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <button
                onClick={handleSimular}
                disabled={
                  loadingSimulacion || !simulacion.peso || !simulacion.altura
                }
                className={`h-[50px] px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${loadingSimulacion ? "bg-zinc-800 text-zinc-500 w-full sm:w-auto" : "bg-white text-black hover:bg-emerald-400 w-full sm:w-auto"}`}
              >
                {loadingSimulacion ? (
                  "Calculando..."
                ) : (
                  <>
                    Probar <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {resultadoSimulacion !== null && (
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center animate-in fade-in slide-in-from-bottom-2">
              <div className="text-center">
                <p className="text-zinc-500 text-sm mb-1 font-medium uppercase tracking-widest flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> IA Predice
                </p>
                <div className="text-5xl font-black text-white">
                  {Math.round(resultadoSimulacion)}{" "}
                  <span className="text-xl text-emerald-500 font-bold">
                    kcal
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  color,
  sub,
}: {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  sub: string;
}) {
  const colors: Record<string, string> = {
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };
  const theme = colors[color];
  return (
    <div
      className={`bg-zinc-900/50 border p-6 rounded-3xl backdrop-blur-md ${theme.split(" ")[2]}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2.5 rounded-xl ${theme.split(" ")[1]}`}>
          <Icon className={`w-6 h-6 ${theme.split(" ")[0]}`} />
        </div>
        <h4 className="text-zinc-400 text-sm font-medium uppercase">{title}</h4>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-zinc-500">{sub}</p>
    </div>
  );
}
