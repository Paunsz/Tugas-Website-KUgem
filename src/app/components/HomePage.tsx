import { Zap, Gem, Shield, DollarSign, Headphones, Star } from "lucide-react";
import { Navbar } from "./Navbar";
import { User } from "../database";

interface NavProps {
  user: User | null;
  onOpenLogin: () => void;
  onNavigateToHome: () => void;
  onNavigateToCategory: (category: string) => void;
  onNavigateToProfile: () => void;
  onNavigateToChat: () => void;
  onLogout: () => void;
}

interface HomePageProps {
  onNavigateToProduct: (productId: string) => void;
  onNavigateToCategory: (category: string) => void;
  onOpenLogin: () => void;
  navProps: NavProps;
  user: User | null;
}

export default function HomePage({
  onNavigateToProduct,
  onNavigateToCategory,
  onOpenLogin,
  navProps,
  user,
}: HomePageProps) {
  const products = [
    {
      id: "mobile-legends",
      name: "Mobile Legends",
      type: "Diamond MLBB",
      region: "Global",
      oldPrice: "Rp 150.000",
      price: "Rp 135.000",
      discount: "10%",
      sold: "2.3k",
      rating: "4.9",
      gradient: "from-blue-500 to-purple-600",
      emoji: "⚔️",
    },
    {
      id: "free-fire",
      name: "Free Fire",
      type: "Diamond FF",
      region: "Indonesia",
      oldPrice: "Rp 200.000",
      price: "Rp 175.000",
      discount: "12%",
      sold: "1.8k",
      rating: "4.8",
      gradient: "from-orange-500 to-red-600",
      emoji: "🔥",
    },
    {
      id: "genshin-impact",
      name: "Genshin Impact",
      type: "Genesis Crystal",
      region: "Asia",
      oldPrice: null,
      price: "Rp 250.000",
      discount: null,
      sold: "950",
      rating: "5.0",
      gradient: "from-purple-500 to-pink-600",
      emoji: "✨",
    },
    {
      id: "pubg-mobile",
      name: "PUBG Mobile",
      type: "UC PUBGM",
      region: "Global",
      oldPrice: "Rp 180.000",
      price: "Rp 160.000",
      discount: "11%",
      sold: "1.5k",
      rating: "4.9",
      gradient: "from-yellow-500 to-orange-600",
      emoji: "🎯",
    },
    {
      id: "valorant",
      name: "Valorant",
      type: "VP Points",
      region: "Global",
      oldPrice: null,
      price: "Rp 220.000",
      discount: null,
      sold: "670",
      rating: "4.7",
      gradient: "from-red-500 to-pink-600",
      emoji: "💥",
    },
    {
      id: "roblox",
      name: "Roblox",
      type: "Robux",
      region: "Global",
      oldPrice: "Rp 100.000",
      price: "Rp 89.000",
      discount: "11%",
      sold: "3.2k",
      rating: "4.9",
      gradient: "from-green-500 to-blue-600",
      emoji: "🎮",
    },
    // 👇 PRODUK BARU MULAI DARI SINI
    {
      id: "honor-of-kings",
      name: "Honor of Kings",
      type: "Token HoK",
      region: "Asia",
      oldPrice: "Rp 170.000",
      price: "Rp 155.000",
      discount: "9%",
      sold: "890",
      rating: "4.8",
      gradient: "from-amber-500 to-red-600",
      emoji: "👑",
    },
    {
      id: "clash-of-clans",
      name: "Clash of Clans",
      type: "Gems CoC",
      region: "Global",
      oldPrice: "Rp 120.000",
      price: "Rp 108.000",
      discount: "10%",
      sold: "1.1k",
      rating: "4.7",
      gradient: "from-orange-600 to-yellow-500",
      emoji: "🏰",
    },
    {
      id: "honkai-star-rail",
      name: "Honkai Star Rail",
      type: "Oneiric Shard",
      region: "Asia",
      oldPrice: null,
      price: "Rp 265.000",
      discount: null,
      sold: "720",
      rating: "4.9",
      gradient: "from-purple-600 to-blue-500",
      emoji: "🚂",
    },
    {
      id: "arena-of-valor",
      name: "Arena of Valor",
      type: "Voucher AOV",
      region: "Indonesia",
      oldPrice: "Rp 145.000",
      price: "Rp 130.000",
      discount: "10%",
      sold: "650",
      rating: "4.6",
      gradient: "from-blue-600 to-teal-500",
      emoji: "⚡",
    },
    {
      id: "call-of-duty-mobile",
      name: "Call of Duty Mobile",
      type: "CP CODM",
      region: "Global",
      oldPrice: "Rp 190.000",
      price: "Rp 171.000",
      discount: "10%",
      sold: "820",
      rating: "4.8",
      gradient: "from-gray-700 to-orange-600",
      emoji: "🔫",
    },
    {
      id: "league-of-legends-wild-rift",
      name: "LoL Wild Rift",
      type: "Wild Core",
      region: "SEA",
      oldPrice: null,
      price: "Rp 210.000",
      discount: null,
      sold: "540",
      rating: "4.7",
      gradient: "from-blue-700 to-cyan-500",
      emoji: "🎮",
    },
    {
      id: "minecraft",
      name: "Minecraft",
      type: "Minecoins",
      region: "Global",
      oldPrice: "Rp 95.000",
      price: "Rp 85.000",
      discount: "11%",
      sold: "2.1k",
      rating: "4.9",
      gradient: "from-green-600 to-lime-500",
      emoji: "🧱",
    },
    {
      id: "ragnarok-m",
      name: "Ragnarok M",
      type: "Big Cat Coin",
      region: "SEA",
      oldPrice: "Rp 160.000",
      price: "Rp 144.000",
      discount: "10%",
      sold: "480",
      rating: "4.6",
      gradient: "from-indigo-600 to-purple-500",
      emoji: "⚔️",
    },
    {
      id: "dragon-raja",
      name: "Dragon Raja",
      type: "Coupons",
      region: "Global",
      oldPrice: null,
      price: "Rp 195.000",
      discount: null,
      sold: "390",
      rating: "4.5",
      gradient: "from-red-600 to-orange-500",
      emoji: "🐉",
    },
    {
      id: "tower-of-fantasy",
      name: "Tower of Fantasy",
      type: "Tanium",
      region: "Asia",
      oldPrice: "Rp 230.000",
      price: "Rp 207.000",
      discount: "10%",
      sold: "450",
      rating: "4.7",
      gradient: "from-pink-500 to-purple-600",
      emoji: "🗼",
    },
    {
      id: "among-us",
      name: "Among Us",
      type: "Stars & Beans",
      region: "Global",
      oldPrice: "Rp 75.000",
      price: "Rp 68.000",
      discount: "9%",
      sold: "1.9k",
      rating: "4.8",
      gradient: "from-red-500 to-blue-500",
      emoji: "🚀",
    },
    {
      id: "eafc-mobile",
      name: "EA FC Mobile",
      type: "FC Points",
      region: "Global",
      oldPrice: "Rp 185.000",
      price: "Rp 167.000",
      discount: "10%",
      sold: "710",
      rating: "4.6",
      gradient: "from-green-600 to-blue-600",
      emoji: "⚽",
    },
    {
      id: "stumble-guys",
      name: "Stumble Guys",
      type: "Gems",
      region: "Global",
      oldPrice: "Rp 90.000",
      price: "Rp 81.000",
      discount: "10%",
      sold: "1.3k",
      rating: "4.7",
      gradient: "from-yellow-500 to-pink-500",
      emoji: "🏃",
    },
    {
      id: "state-of-survival",
      name: "State of Survival",
      type: "Biocaps",
      region: "Global",
      oldPrice: null,
      price: "Rp 205.000",
      discount: null,
      sold: "380",
      rating: "4.5",
      gradient: "from-gray-700 to-green-600",
      emoji: "🧟",
    },
    {
      id: "garena-shells",
      name: "Garena Shells",
      type: "Garena Shells",
      region: "SEA",
      oldPrice: "Rp 110.000",
      price: "Rp 99.000",
      discount: "10%",
      sold: "920",
      rating: "4.8",
      gradient: "from-orange-500 to-red-500",
      emoji: "🐚",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar {...navProps} showHotTags showCategories />

      {/* Hero Banner */}
      <div className="bg-[#1341C4] px-8 py-4">
        <div className="grid grid-cols-4 gap-3">
          {/* Banner Card 1 - Mobile Legends x Naruto */}
          <div className="h-[200px] rounded-[14px] bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6 flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
              }}
            ></div>
            <div className="relative z-10">
              <span
                className="bg-[#FBBF24] text-[#7C2D12] px-3 py-1 rounded-full text-[10px]"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
              >
                Special Event
              </span>
              <div className="mt-3">
                <h3
                  className="text-white text-[18px] leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                >
                  Mobile Legends
                  <br />x Naruto
                </h3>
              </div>
            </div>
            <button
              className="relative z-10 bg-[rgba(30,30,60,0.85)] border border-white/30 rounded-lg px-4 py-2 text-white text-[12px] w-fit"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Top Up
            </button>
          </div>

          {/* Banner Card 2 - PRAGMATA */}
          <div className="h-[200px] rounded-[14px] bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 p-6 flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
              }}
            ></div>
            <div className="relative z-10">
              <span
                className="bg-[#FBBF24] text-[#7C2D12] px-3 py-1 rounded-full text-[10px]"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
              >
                Special Event
              </span>
              <div className="mt-3">
                <h3
                  className="text-white text-[22px] leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                >
                  PRAGMATA
                </h3>
                <p
                  className="text-white/80 text-[11px] mt-1"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  14% Lebih Murah dari Steam
                </p>
              </div>
            </div>
            <button
              className="relative z-10 bg-[rgba(30,30,60,0.85)] border border-white/30 rounded-lg px-4 py-2 text-white text-[12px] w-fit"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Pre Order!
            </button>
          </div>

          {/* Banner Card 3 - MINECRAFT */}
          <div className="h-[200px] rounded-[14px] bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-6 flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
              }}
            ></div>
            <div className="relative z-10">
              <span
                className="bg-[#22C55E] text-white px-3 py-1 rounded-full text-[10px]"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
              >
                Hot Games
              </span>
              <div className="mt-3">
                <h3
                  className="text-white text-[28px] leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                >
                  MINECRAFT
                </h3>
              </div>
            </div>
            <button
              className="relative z-10 bg-[rgba(30,30,60,0.85)] border border-white/30 rounded-lg px-4 py-2 text-white text-[12px] w-fit"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Explore
            </button>
          </div>

          {/* Banner Card 4 - ROBLOX */}
          <div className="h-[200px] rounded-[14px] bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6 flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
              }}
            ></div>
            <div className="relative z-10">
              <span
                className="bg-purple-600 text-white px-3 py-1 rounded-full text-[10px]"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
              >
                Giftcard
              </span>
              <div className="mt-3">
                <h3
                  className="text-white text-[20px] leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                >
                  RBL ROBLOX
                </h3>
                <p
                  className="text-white/80 text-[11px] mt-1"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  25% more Robux
                </p>
              </div>
            </div>
            <button
              className="relative z-10 bg-[rgba(30,30,60,0.85)] border border-white/30 rounded-lg px-4 py-2 text-white text-[12px] w-fit"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              Top Up!
            </button>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="h-11 bg-[#1341C4] border-t border-white/15 flex items-center justify-center gap-12">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-white/90" />
          <span
            className="text-white/90 text-[13px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Transaksi Aman
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-white/90" />
          <span
            className="text-white/90 text-[13px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Garansi Uang Kembali
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Headphones className="w-4 h-4 text-white/90" />
          <span
            className="text-white/90 text-[13px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Bantuan Customer Care 24/7
          </span>
        </div>
      </div>

      {/* Kategori Ikon */}
      <div className="bg-white border-b border-[#EEEEEE] py-6 px-8">
        <div className="flex gap-0 overflow-x-auto">
          {[
            { name: "Top Up", icon: "💎", color: "bg-blue-100", badge: null },
            {
              name: "Game Key",
              icon: "🔑",
              color: "bg-purple-100",
              badge: "Baru",
            },
            { name: "Akun", icon: "👤", color: "bg-pink-100", badge: null },
            {
              name: "Voucher",
              icon: "🎫",
              color: "bg-yellow-100",
              badge: null,
            },
            { name: "Roblox", icon: "🎮", color: "bg-sky-100", badge: null },
            { name: "Item", icon: "⚔️", color: "bg-green-100", badge: null },
            {
              name: "Koin Game",
              icon: "🪙",
              color: "bg-amber-100",
              badge: null,
            },
            { name: "RPG", icon: "🐉", color: "bg-rose-100", badge: null },
            {
              name: "Random Steam Key",
              icon: "🎲",
              color: "bg-violet-100",
              badge: null,
            },
            {
              name: "Simulation",
              icon: "🌾",
              color: "bg-cyan-100",
              badge: null,
            },
          ].map((category) => (
            <div
              key={category.name}
              onClick={() => onNavigateToCategory(category.name)}
              className="min-w-[100px] flex flex-col items-center gap-2 cursor-pointer relative hover:opacity-80 transition-opacity"
            >
              {category.badge && (
                <div
                  className="absolute top-0 right-4 bg-[#EF4444] text-white px-2 py-0.5 rounded text-[8px] z-10"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
                >
                  {category.badge}
                </div>
              )}
              <div
                className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center text-[32px]`}
              >
                {category.icon}
              </div>
              <span
                className="text-[12px] text-[#555555] text-center"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Beli Cepat Section */}
      <div className="bg-[#1A2E6B] py-6 px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-[#FBBF24] rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#1A2E6B]" />
          </div>
          <h2
            className="text-white text-[20px]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
          >
            Beli Cepat
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {[
            "For You",
            "Mobile",
            "Voucher",
            "PC Game",
            "Streaming",
            "Pulsa",
            "Aplikasi",
            "Console",
          ].map((tab, idx) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-full text-[13px] whitespace-nowrap ${
                idx === 0
                  ? "bg-white text-[#1A2E6B] border border-white"
                  : "bg-transparent text-white/80 border border-white/30"
              }`}
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: idx === 0 ? 600 : 400,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Game Tiles Row */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { name: "Mobile Legends", emoji: "⚔️" },
            { name: "Free Fire", emoji: "🔥" },
            { name: "PUBG Mobile", emoji: "🎯" },
            { name: "Genshin Impact", emoji: "✨" },
            { name: "Honor of Kings", emoji: "👑" },
            { name: "Valorant", emoji: "💥" },
            { name: "Roblox", emoji: "🎮" },
            { name: "Clash of Clans", emoji: "🏰" },
          ].map((game) => (
            <div
              key={game.name}
              className="min-w-[140px] bg-white/10 border border-white/15 rounded-xl overflow-hidden cursor-pointer hover:border-white/40 transition-all"
            >
              <div className="h-20 flex items-center justify-center text-[48px] bg-gradient-to-br from-white/5 to-white/0">
                {game.emoji}
              </div>
              <div className="p-2 text-center">
                <span
                  className="text-white text-[12px]"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
                >
                  {game.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Produk - Top Up */}
      <div className="bg-white py-7 px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Gem className="w-[22px] h-[22px] text-[#1341C4]" />
              <h2
                className="text-[#111111] text-[20px]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
              >
                Top Up hemat, main makin semangat!
              </h2>
            </div>
            <p
              className="text-[#888888] text-[13px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Murah, tanpa ribet, proses kilat, dan 100% aman!
            </p>
          </div>
          <button
            onClick={() => onNavigateToCategory("Top Up")}
            className="border border-[#1341C4] text-[#1341C4] px-4 py-2 rounded-lg text-[13px] hover:bg-[#1341C4] hover:text-white transition-colors"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
          >
            Lihat Semua ›
          </button>
        </div>

        {/* Product Cards Row */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onNavigateToProduct(product.id)}
              className="min-w-[165px] border border-[#E5E7EB] rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-[#1341C4] transition-all"
            >
              {/* Image Area */}
              <div
                className={`h-[110px] bg-gradient-to-br ${product.gradient} flex items-center justify-center text-[56px] relative`}
              >
                {product.discount && (
                  <div
                    className="absolute top-2 left-2 bg-[#EF4444] text-white px-2 py-1 rounded text-[10px]"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
                  >
                    -{product.discount}
                  </div>
                )}
                {product.emoji}
              </div>

              {/* Body */}
              <div className="p-3">
                <h3
                  className="text-[#111111] text-[12px] mb-0.5"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-[#888888] text-[11px] mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {product.type} • {product.region}
                </p>
                {product.oldPrice && (
                  <p
                    className="text-[#AAAAAA] text-[10px] line-through"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {product.oldPrice}
                  </p>
                )}
                <p
                  className="text-[#EF4444] text-[14px] mb-2"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                >
                  {product.price}
                </p>
                <div className="flex items-center justify-between text-[10px]">
                  <span
                    className="text-[#AAAAAA]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Terjual {product.sold}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                    <span
                      className="text-[#F59E0B]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
