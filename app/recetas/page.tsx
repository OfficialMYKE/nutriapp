"use client";

import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import {
  Clock,
  Flame,
  Search,
  ArrowRight,
  Filter,
  Sparkles,
  X,
  List,
  ChefHat,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- TU BASE DE DATOS CON IMÁGENES REALES (50 Recetas) ---
const RAW_RECIPES_DB = [
  // --- DESAYUNOS ---
  {
    id: 1,
    title: "Tostada de Aguacate y Huevo Poché",
    category: "Desayuno",
    cal: "320 kcal",
    time: "10 min",
    tag: "Vegetariano",
    img: "https://mandolina.co/wp-content/uploads/2024/05/tostada-aguacate-1-1200x675.jpg",
  },
  {
    id: 2,
    title: "Pancakes de Avena y Banana",
    category: "Desayuno",
    cal: "350 kcal",
    time: "15 min",
    tag: "Dulce",
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Bowl de Yogur Griego y Berries",
    category: "Desayuno",
    cal: "280 kcal",
    time: "5 min",
    tag: "Rápido",
    img: "https://www.arthritis.org/getmedia/c066809f-3149-48fe-92d8-309459127475/Berry-Chia_1400x900.jpg?width=1400&height=900&ext=.jpg",
  },
  {
    id: 4,
    title: "Shakshuka (Huevos en Salsa)",
    category: "Desayuno",
    cal: "400 kcal",
    time: "25 min",
    tag: "Proteína",
    img: "https://nataliakiako.com.ar/wp-content/uploads/2017/09/tumblr_ovnzuk8JnX1rogx5io1_1280.jpg",
  },
  {
    id: 5,
    title: "Avena Nocturna (Overnight Oats)",
    category: "Desayuno",
    cal: "300 kcal",
    time: "5 min",
    tag: "Prep",
    img: "https://images.cookforyourlife.org/wp-content/uploads/2021/12/OvernightOats.jpg",
  },
  {
    id: 6,
    title: "Tostadas Francesas Fit",
    category: "Desayuno",
    cal: "380 kcal",
    time: "15 min",
    tag: "Dulce",
    img: "https://deliciaskitchen.b-cdn.net/wp-content/uploads/2024/08/tostada-francesa-saludable-french-toast-1170x781.webp",
  },
  {
    id: 7,
    title: "Arepa Reina Pepiada",
    category: "Desayuno",
    cal: "450 kcal",
    time: "20 min",
    tag: "Latino",
    img: "https://imagenes.elpais.com/resizer/v2/D3R3LVQV2JDATLGCJIOCOEH3X4.jpg?auth=d6283ba32626f2c43d89530c401d95f21ab269146c9009cda3c02654fbe56ba8&width=1960&height=1103&smart=true",
  },
  {
    id: 8,
    title: "Huevos Benedictinos Saludables",
    category: "Desayuno",
    cal: "420 kcal",
    time: "20 min",
    tag: "Gourmet",
    img: "https://cncsalud.com/wp-content/uploads/2021/06/huevos-benedictinos.jpeg",
  },
  {
    id: 9,
    title: "Smoothie Bowl de Acai",
    category: "Desayuno",
    cal: "310 kcal",
    time: "10 min",
    tag: "Superfood",
    img: "https://thehintofrosemary.com/wp-content/uploads/2022/04/Acai-smoothie-bowl-without-banana-2.jpg",
  },
  {
    id: 10,
    title: "Omelette de Espinaca y Queso",
    category: "Desayuno",
    cal: "290 kcal",
    time: "10 min",
    tag: "Keto",
    img: "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 11,
    title: "Burrito de Desayuno",
    category: "Desayuno",
    cal: "480 kcal",
    time: "15 min",
    tag: "Contundente",
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 12,
    title: "Waffles de Proteína",
    category: "Desayuno",
    cal: "340 kcal",
    time: "15 min",
    tag: "Fitness",
    img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=600&auto=format&fit=crop",
  },

  // --- ALMUERZOS ---
  {
    id: 13,
    title: "Bowl de Salmón y Quinoa",
    category: "Almuerzo",
    cal: "520 kcal",
    time: "25 min",
    tag: "Omega 3",
    img: "https://karalydon.com/wp-content/uploads/2024/06/Greek-salmon-quinoa-bowls-8-2.jpg",
  },
  {
    id: 14,
    title: "Pasta al Pesto con Pollo",
    category: "Almuerzo",
    cal: "550 kcal",
    time: "20 min",
    tag: "Pasta",
    img: "https://cdn3.myrealfood.app/recipes%2FKhEjpOFa2KR2uNdOj7mz%2Fmain.jpg?alt=media&token=9a33f3a6-14d5-4ee2-be58-8321ec5935bb",
  },
  {
    id: 15,
    title: "Burrito Bowl Mexicano",
    category: "Almuerzo",
    cal: "480 kcal",
    time: "20 min",
    tag: "TexMex",
    img: "https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/Burrito-Bowls-18.jpg",
  },
  {
    id: 16,
    title: "Curry de Garbanzos Vegano",
    category: "Almuerzo",
    cal: "420 kcal",
    time: "30 min",
    tag: "Vegano",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEkoYLEGs5Dp6XYhAqTWDSshkks2HiqJ7lvw&s",
  },
  {
    id: 17,
    title: "Wrap de Atún y Vegetales",
    category: "Almuerzo",
    cal: "350 kcal",
    time: "10 min",
    tag: "Rápido",
    img: "https://storage.googleapis.com/avena-recipes-v2/agtzfmF2ZW5hLWJvdHIZCxIMSW50ZXJjb21Vc2VyGICAkKyViMwKDA/09-05-2022/1652114087387.jpeg",
  },
  {
    id: 18,
    title: "Lasaña de Berenjena",
    category: "Almuerzo",
    cal: "300 kcal",
    time: "40 min",
    tag: "Low Carb",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 19,
    title: "Poke Bowl de Atún",
    category: "Almuerzo",
    cal: "450 kcal",
    time: "20 min",
    tag: "Fresco",
    img: "https://es.cravingsjournal.com/wp-content/uploads/2022/11/poke-bowl-con-mayonesa-picante-3.jpg",
  },
  {
    id: 20,
    title: "Risotto de Champiñones",
    category: "Almuerzo",
    cal: "500 kcal",
    time: "35 min",
    tag: "Italiano",
    img: "https://cocinaconnoelia.com/wp-content/uploads/2023/11/Risotto-scaled.jpg",
  },
  {
    id: 21,
    title: "Ensalada Cobb con Pollo",
    category: "Almuerzo",
    cal: "420 kcal",
    time: "15 min",
    tag: "Keto",
    img: "https://www.196flavors.com/wp-content/uploads/2024/05/Cobb-Salad-FP.jpg",
  },
  {
    id: 22,
    title: "Tacos de Pescado (Baja Style)",
    category: "Almuerzo",
    cal: "380 kcal",
    time: "25 min",
    tag: "Marino",
    img: "https://sabordelobueno.com/wp-content/uploads/2024/01/tacos-pescado-faciles.jpg",
  },
  {
    id: 23,
    title: "Ceviche de Camarón",
    category: "Almuerzo",
    cal: "220 kcal",
    time: "20 min",
    tag: "Fresco",
    img: "https://comedera.com/wp-content/uploads/sites/9/2022/08/Ceviche-de-camarones-ecuatoriano-shutterstock_1997166494.jpg",
  },
  {
    id: 24,
    title: "Pollo Tikka Masala Light",
    category: "Almuerzo",
    cal: "480 kcal",
    time: "35 min",
    tag: "Indio",
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 25,
    title: "Sushi Rolls Caseros",
    category: "Almuerzo",
    cal: "350 kcal",
    time: "40 min",
    tag: "Japonés",
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 26,
    title: "Bistec con Brócoli",
    category: "Almuerzo",
    cal: "460 kcal",
    time: "20 min",
    tag: "Proteína",
    img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=600&auto=format&fit=crop",
  },

  // --- CENAS ---
  {
    id: 27,
    title: "Salmón al Horno con Espárragos",
    category: "Cena",
    cal: "450 kcal",
    time: "25 min",
    tag: "Keto",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTexgemQJG_jg_5UNgVhoqNx852SMK-dUBa0Q&s",
  },
  {
    id: 28,
    title: "Tacos de Lechuga",
    category: "Cena",
    cal: "280 kcal",
    time: "15 min",
    tag: "Ligero",
    img: "https://www.cilantroandcitronella.com/wp-content/uploads/2016/10/tofu-lettuce-cup_1_03-K.jpg",
  },
  {
    id: 29,
    title: "Crema de Calabaza",
    category: "Cena",
    cal: "200 kcal",
    time: "30 min",
    tag: "Vegano",
    img: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 30,
    title: "Pizza Base de Coliflor",
    category: "Cena",
    cal: "320 kcal",
    time: "35 min",
    tag: "Gluten Free",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 31,
    title: "Pollo al Limón con Vegetales",
    category: "Cena",
    cal: "380 kcal",
    time: "25 min",
    tag: "Proteína",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 32,
    title: "Zucchini Noodles",
    category: "Cena",
    cal: "180 kcal",
    time: "15 min",
    tag: "Vegano",
    img: "https://wholesomemadeeasy.com/wp-content/uploads/2020/08/Zucchini-Noodles-Garlic-Parmesan-12-.jpg",
  },
  {
    id: 33,
    title: "Brochetas de Pollo y Pimiento",
    category: "Cena",
    cal: "300 kcal",
    time: "20 min",
    tag: "Grill",
    img: "https://storage.googleapis.com/avena-recipes-v2/2019/10/1571779949883.jpeg",
  },
  {
    id: 34,
    title: "Sopa de Lentejas",
    category: "Cena",
    cal: "350 kcal",
    time: "40 min",
    tag: "Reconfortante",
    img: "https://images.cookforyourlife.org/wp-content/uploads/2018/12/shutterstock_514819156-1536x1022-1.jpg",
  },
  {
    id: 35,
    title: "Pescado Blanco en Papillote",
    category: "Cena",
    cal: "260 kcal",
    time: "20 min",
    tag: "Saludable",
    img: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 36,
    title: "Stir Fry de Tofu y Verduras",
    category: "Cena",
    cal: "320 kcal",
    time: "15 min",
    tag: "Asiático",
    img: "https://jessicainthekitchen.com/wp-content/uploads/2022/05/Vegan-Stir-Fry01030.jpg",
  },
  {
    id: 37,
    title: "Ensalada Caprese",
    category: "Cena",
    cal: "280 kcal",
    time: "5 min",
    tag: "Italiano",
    img: "https://cdn.blog.paulinacocina.net/wp-content/uploads/2024/07/ensalada-caprese-italiana-800x534.jpg",
  },
  {
    id: 38,
    title: "Hamburguesa de Lentejas",
    category: "Cena",
    cal: "360 kcal",
    time: "30 min",
    tag: "Veggie",
    img: "https://www.hola.com/horizon/landscape/15d820bc3c07-hamburguesa-lentejas-age-t.jpg",
  },
  {
    id: 39,
    title: "Champiñones Rellenos",
    category: "Cena",
    cal: "150 kcal",
    time: "25 min",
    tag: "Low Cal",
    img: "https://images.aws.nestle.recipes/original/386f0687d6d84bb9cb82b1c54d45736e_champi%C3%B1ones_rellenos.jpg",
  },
  {
    id: 40,
    title: "Tortilla Española Fit",
    category: "Cena",
    cal: "300 kcal",
    time: "25 min",
    tag: "Español",
    img: "https://petitfitbycris.com/wp-content/uploads/2024/05/DSC0429-1_web-819x1024.jpg",
  },

  // --- SNACKS ---
  {
    id: 41,
    title: "Smoothie Verde Detox",
    category: "Snack",
    cal: "150 kcal",
    time: "5 min",
    tag: "Detox",
    img: "https://iswari.s3.eu-west-3.amazonaws.com/blog/wc9eu4-detox-jugos-y-batidos-que-te-daran-energia-y-salud.jpg",
  },
  {
    id: 42,
    title: "Pudding de Chía",
    category: "Snack",
    cal: "220 kcal",
    time: "120 min",
    tag: "Superfood",
    img: "https://www.recetasnestle.com.ar/sites/default/files/srh_recipes/bcca1f26519a498028b139a2a8b1851b.jpg",
  },
  {
    id: 43,
    title: "Hummus con Zanahoria",
    category: "Snack",
    cal: "180 kcal",
    time: "10 min",
    tag: "Vegano",
    img: "https://images.squarespace-cdn.com/content/v1/644ea2f3486ddf270c1fc2be/5c054e8c-c638-472d-8a92-a6864f403eff/HUMMUS+DE+ZANAHORIAS+ASADAS.jpg",
  },
  {
    id: 44,
    title: "Rollitos de Pepino",
    category: "Snack",
    cal: "120 kcal",
    time: "10 min",
    tag: "Keto",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9DNmIHXPRG70QcoXleU46GJnSsAjnYiveJQ&s",
  },
  {
    id: 45,
    title: "Barritas de Proteína Caseras",
    category: "Snack",
    cal: "250 kcal",
    time: "20 min",
    tag: "Fitness",
    img: "https://www.conasi.eu/blog/wp-content/uploads/2013/07/barritas-proteicas-1.jpg",
  },
  {
    id: 46,
    title: "Manzana con Crema de Cacahuete",
    category: "Snack",
    cal: "200 kcal",
    time: "2 min",
    tag: "Rápido",
    img: "https://storage.googleapis.com/avena-recipes-v2/2019/10/1571782245710.jpeg",
  },
  {
    id: 47,
    title: "Edamame al Vapor",
    category: "Snack",
    cal: "120 kcal",
    time: "5 min",
    tag: "Proteína",
    img: "https://content.cuerpomente.com/medio/2022/05/18/bol-con-edamames_d8c1d3fd_1200x1200.jpg",
  },
  {
    id: 48,
    title: "Chips de Kale (Col Rizada)",
    category: "Snack",
    cal: "80 kcal",
    time: "15 min",
    tag: "Light",
    img: "https://img.bylauragarcia.com/contenedorblog/d82a9609-9945-4357-a6e4-3a0f58c2de90_chipskale.jpg",
  },
  {
    id: 49,
    title: "Galletas de Avena y Pasas",
    category: "Snack",
    cal: "180 kcal",
    time: "20 min",
    tag: "Dulce",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwsZ4Bdln42sJ2SDy_pf33UV-VByxZDJDQg&s",
  },
  {
    id: 50,
    title: "Huevo Duro con Paprika",
    category: "Snack",
    cal: "70 kcal",
    time: "10 min",
    tag: "Keto",
    img: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/Y6IFJEWGSNHIRBPHXCYURY23KI.jpeg",
  },
];

// --- FUNCIÓN HELPER: ENRIQUECER DATOS FALTANTES ---
const getEnrichedRecipes = () => {
  return RAW_RECIPES_DB.map((recipe) => {
    const ingredients = [
      `Ingrediente principal de ${recipe.title}`,
      "Aceite de oliva virgen extra",
      "Especias naturales al gusto",
      "Vegetales frescos de temporada",
      "Una pizca de sal marina",
    ];

    const steps = [
      "Lava y desinfecta todos los ingredientes frescos.",
      "Prepara los cortes necesarios según el estilo del plato.",
      `Cocina el ingrediente principal (${recipe.category === "Desayuno" ? "a la plancha o tostado" : "al fuego medio"}) hasta el punto deseado.`,
      "Integra los acompañamientos y rectifica la sazón.",
      "Sirve inmediatamente para disfrutar de la temperatura ideal.",
    ];

    return { ...recipe, ingredients, steps };
  });
};

export default function RecetasPage() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const recipesData = useMemo(() => getEnrichedRecipes(), []);

  useEffect(() => {
    if (selectedRecipe) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedRecipe]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const categories = ["Todas", "Desayuno", "Almuerzo", "Cena", "Snack"];

  const filteredRecetas = recipesData.filter((receta) => {
    const matchesCategory =
      activeCategory === "Todas" || receta.category === activeCategory;
    const matchesSearch =
      receta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receta.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecetas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecetas.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500/30 relative">
      <Navbar />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="relative pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        {/* HEADER LIMPIO (SIN BADGE) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Recetas <span className="text-zinc-600">Verificadas</span>
            </h1>
            <p className="text-zinc-400 max-w-lg text-lg">
              Explora nuestra colección de <strong>50 recetas únicas</strong>{" "}
              con imágenes auténticas.
            </p>
          </div>

          {/* BARRA DE BÚSQUEDA CORREGIDA (h-10, centrada, colores ajustados) */}
          <div className="w-full lg:w-96 relative group">
            <Search className="absolute left-4 top-1/3 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors z-10 pointer-events-none" />

            {/* Input: altura h-10, padding pl-10, fondo zinc-800 */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar (ej. 'pasta', 'pollo')..."
              className="w-full h-10 pl-10 pr-4 bg-zinc-800 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-zinc-500 shadow-lg"
            />
            <div className="mt-2 text-right text-xs text-zinc-600 font-mono">
              Mostrando {currentItems.length} de {filteredRecetas.length}{" "}
              recetas
            </div>
          </div>
        </div>

        {/* FILTROS */}
        <div className="sticky top-24 z-40 bg-zinc-950/80 backdrop-blur-xl py-4 mb-8 border-b border-white/5 -mx-6 px-6 lg:mx-0 lg:px-0 lg:bg-transparent lg:backdrop-blur-none lg:static lg:border-none">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <div className="p-2.5 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mr-2 flex-shrink-0">
              <Filter className="w-4 h-4 text-zinc-500" />
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border flex-shrink-0 ${activeCategory === cat ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20" : "bg-zinc-900 border-white/5 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-white/10"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID GALERÍA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {currentItems.map((receta) => (
            <div
              key={receta.id}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900/20 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:bg-zinc-900/40 flex flex-col"
            >
              {/* IMAGEN */}
              <div
                className="relative aspect-[4/3] overflow-hidden bg-zinc-900 cursor-pointer"
                onClick={() => setSelectedRecipe(receta)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60" />

                <img
                  src={receta.img}
                  alt={receta.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop";
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale-[10%] group-hover:grayscale-0"
                />
                <div className="absolute bottom-3 left-3 z-20">
                  <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-wider text-emerald-400 shadow-lg">
                    {receta.tag}
                  </div>
                </div>
              </div>

              {/* INFO CARD */}
              <div className="p-5 flex-1 flex flex-col border-t border-white/5">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-100 mb-2 leading-tight group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {receta.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-4 line-clamp-2">
                    Plato verificado y balanceado.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-zinc-400 mb-5 bg-black/20 p-3 rounded-lg border border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-zinc-500" />{" "}
                    <span>{receta.cal}</span>
                  </div>
                  <div className="w-px h-3 bg-white/10"></div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />{" "}
                    <span>{receta.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRecipe(receta)}
                  className="mt-auto w-full py-3 rounded-xl bg-white/5 hover:bg-emerald-600 hover:text-white border border-white/5 text-xs font-bold text-zinc-300 transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                >
                  Ver Receta Completa
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- CONTROLES DE PAGINACIÓN --- */}
        {filteredRecetas.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-8 pb-10">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-zinc-900 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-600 hover:border-emerald-500 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-zinc-400">
              Página <span className="text-white font-bold">{currentPage}</span>{" "}
              de <span className="text-white font-bold">{totalPages}</span>
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-zinc-900 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-600 hover:border-emerald-500 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>

      {/* --- MODAL DETALLE --- */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedRecipe(null)}
          />
          <div className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-2/5 relative h-48 md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />
              <img
                src={selectedRecipe.img}
                alt={selectedRecipe.title}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop";
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                  {selectedRecipe.category}
                </span>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto custom-scrollbar bg-zinc-900">
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedRecipe.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
                <span className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-emerald-500" />{" "}
                  {selectedRecipe.cal}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-emerald-500" />{" "}
                  {selectedRecipe.time}
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-emerald-500" />{" "}
                  {selectedRecipe.tag}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-white font-semibold mb-3 border-b border-white/10 pb-2">
                    <List className="w-4 h-4 text-emerald-500" /> Ingredientes
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedRecipe.ingredients.map(
                      (ing: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-zinc-400 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                          {ing}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-white font-semibold mb-3 border-b border-white/10 pb-2">
                    <ChefHat className="w-4 h-4 text-emerald-500" />{" "}
                    Instrucciones
                  </h3>
                  <div className="space-y-4">
                    {selectedRecipe.steps.map((step: string, i: number) => (
                      <div key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-bold text-emerald-500">
                          {i + 1}
                        </span>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
