import { ArrowLeft, Star, Shield, Zap, MessageCircle, RotateCcw, ShoppingCart } from 'lucide-react';
import { Navbar } from './Navbar';
import { User, db } from '../database';

interface NavProps {
  user: User | null;
  onOpenLogin: () => void;
  onNavigateToHome: () => void;
  onNavigateToCategory: (category: string) => void;
  onNavigateToProfile: () => void;
  onNavigateToChat: () => void;
  onLogout: () => void;
}

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
  onOpenLogin: () => void;
  navProps: NavProps;
  user: User | null;
  onStartChat: (chatId: string) => void;
}

const productData = {
  'mobile-legends': {
    name: 'Mobile Legends',
    title: 'Diamond Mobile Legends 100-10000 Diamonds - Proses Instan',
    type: 'Top Up Game',
    emoji: '⚔️',
    gradient: 'from-blue-500 to-purple-600',
    oldPrice: 150000,
    price: 135000,
    discount: 10,
    rating: 4.9,
    sold: 2300,
    stock: 'Tersedia',
    region: 'Global - All Server',
    description: 'Top up Diamond Mobile Legends tercepat dan termurah! Proses otomatis 1-5 menit. Aman, terpercaya, dan sudah melayani ribuan customer. Cukup masukkan User ID dan Zone ID Anda, diamond langsung masuk ke akun.',
    seller: {
      name: 'GameStore Official',
      initial: 'GS',
      rating: 4.9,
      verified: true,
    },
  },
  'free-fire': {
    name: 'Free Fire',
    title: 'Diamond Free Fire 50-10000 Diamonds - Instant Delivery',
    type: 'Top Up Game',
    emoji: '🔥',
    gradient: 'from-orange-500 to-red-600',
    oldPrice: 200000,
    price: 175000,
    discount: 12,
    rating: 4.8,
    sold: 1800,
    stock: 'Tersedia',
    region: 'Indonesia Server',
    description: 'Top up Diamond Free Fire cepat dan murah! Proses otomatis langsung masuk. Aman dan terpercaya. Input ID Free Fire Anda dan diamond akan langsung masuk dalam 1-3 menit.',
    seller: {
      name: 'FF Diamond Pro',
      initial: 'FD',
      rating: 4.8,
      verified: true,
    },
  },
  'genshin-impact': {
    name: 'Genshin Impact',
    title: 'Genesis Crystal Genshin Impact - All Server Available',
    type: 'Top Up Game',
    emoji: '✨',
    gradient: 'from-purple-500 to-pink-600',
    oldPrice: null,
    price: 250000,
    discount: null,
    rating: 5.0,
    sold: 950,
    stock: 'Tersedia',
    region: 'Asia - All UID',
    description: 'Top up Genesis Crystal Genshin Impact untuk semua server! Proses cepat dan aman. Masukkan UID dan Server Anda, crystal akan langsung masuk ke akun dalam 5-10 menit.',
    seller: {
      name: 'Teyvat Shop',
      initial: 'TS',
      rating: 5.0,
      verified: true,
    },
  },
  'pubg-mobile': {
    name: 'PUBG Mobile',
    title: 'UC PUBG Mobile - Fast & Safe Top Up',
    type: 'Top Up Game',
    emoji: '🎯',
    gradient: 'from-yellow-500 to-orange-600',
    oldPrice: 180000,
    price: 160000,
    discount: 11,
    rating: 4.9,
    sold: 1500,
    stock: 'Tersedia',
    region: 'Global Server',
    description: 'Top up UC PUBG Mobile tercepat! Proses otomatis dan aman. Cukup masukkan User ID PUBG Mobile Anda, UC langsung masuk ke akun dalam hitungan menit.',
    seller: {
      name: 'PUBG UC Store',
      initial: 'PU',
      rating: 4.9,
      verified: true,
    },
  },
  'valorant': {
    name: 'Valorant',
    title: 'Valorant Points (VP) - All Region Available',
    type: 'Top Up Game',
    emoji: '💥',
    gradient: 'from-red-500 to-pink-600',
    oldPrice: null,
    price: 220000,
    discount: null,
    rating: 4.7,
    sold: 670,
    stock: 'Tersedia',
    region: 'Global - All Region',
    description: 'Top up Valorant Points untuk beli skin dan battle pass! Proses aman dan cepat. Masukkan Riot ID dan Tagline Anda untuk memulai top up.',
    seller: {
      name: 'Riot Games ID',
      initial: 'RG',
      rating: 4.7,
      verified: true,
    },
  },
  'roblox': {
    name: 'Roblox',
    title: 'Robux Roblox - Premium & Fast Delivery',
    type: 'Top Up Game',
    emoji: '🎮',
    gradient: 'from-green-500 to-blue-600',
    oldPrice: 100000,
    price: 89000,
    discount: 11,
    rating: 4.9,
    sold: 3200,
    stock: 'Tersedia',
    region: 'Global',
    description: 'Top up Robux Roblox dengan harga terbaik! Proses cepat dan aman. Masukkan username Roblox Anda dan robux akan langsung masuk ke akun.',
    seller: {
      name: 'Robux Premium',
      initial: 'RP',
      rating: 4.9,
      verified: true,
    },
  },
};

export default function ProductDetail({ productId, onBack, onOpenLogin, navProps, user, onStartChat }: ProductDetailProps) {
  const product = productData[productId as keyof typeof productData];

  function handleChat() {
    if (!user) { onOpenLogin(); return; }
    if (!product) return;
    const chat = db.createOrGetChat(user.id, `seller_${productId}`, product.seller.name, product.seller.initial, product.title.substring(0, 40));
    onStartChat(chat.id);
  }

  function handleBuy() {
    if (!user) { onOpenLogin(); return; }
    if (!product) return;
    db.addTransaction(user.id, productId, product.name, product.price);
    alert(`Pembelian ${product.name} berhasil! Cek riwayat transaksi di profil Anda.`);
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F4F6FB] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[20px] text-[#111111]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            Produk tidak ditemukan
          </h2>
          <button
            onClick={onBack}
            className="mt-4 bg-[#1341C4] text-white px-6 py-2 rounded-lg text-[14px]"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <Navbar {...navProps} />
      {/* Breadcrumb */}
      <div className="bg-[#1341C4] px-8 py-2 flex items-center gap-3">
        <button
          onClick={onBack}
          className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[12px] transition-colors"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali
        </button>
        <span className="text-white/70 text-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Beranda › {product.name} › {product.title.substring(0, 30)}...
        </span>
      </div>

      {/* Detail Body */}
      <div className="px-8 py-6">
        <div className="flex gap-5">
          {/* Left Column */}
          <div className="flex-1">
            {/* Product Image */}
            <div className={`h-[300px] bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center text-[120px] mb-5 relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulance type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }}></div>
              <div className="relative z-10">{product.emoji}</div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl p-6">
              <span className="inline-block bg-[#E0F2FE] text-[#0369A1] px-3 py-1 rounded-full text-[11px] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {product.type}
              </span>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[#1341C4] text-[13px] block mb-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {product.name}
                  </span>
                  <h1 className="text-[#111111] text-[20px] leading-tight" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    {product.title}
                  </h1>
                </div>
              </div>

              <p className="text-[#555555] text-[13px] leading-relaxed mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-[#F3F4F6] px-3 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-[#555555]" />
                  <span className="text-[11px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>Escrow Aman</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F3F4F6] px-3 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-[#555555]" />
                  <span className="text-[11px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>Proses Instan</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F3F4F6] px-3 py-2 rounded-full">
                  <MessageCircle className="w-4 h-4 text-[#555555]" />
                  <span className="text-[11px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>CS 24/7</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F3F4F6] px-3 py-2 rounded-full">
                  <RotateCcw className="w-4 h-4 text-[#555555]" />
                  <span className="text-[11px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>Garansi Refund</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Buy Box */}
          <div className="w-[320px]">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sticky top-6">
              {/* Price Section */}
              <div className="mb-4">
                <span className="text-[#888888] text-[12px] block mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Harga
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#EF4444] text-[24px]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[#AAAAAA] text-[14px] line-through" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Rp {product.oldPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <span className="inline-block bg-[#FEE2E2] text-[#EF4444] px-2 py-0.5 rounded text-[11px] mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Hemat {product.discount}%
                  </span>
                )}
              </div>

              {/* Rating & Sold */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-[#111111] text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {product.rating}
                  </span>
                </div>
                <div className="w-px h-4 bg-[#E5E7EB]"></div>
                <span className="text-[#888888] text-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Terjual {product.sold.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Stock & Region */}
              <div className="mb-4 pb-4 border-b border-[#E5E7EB]">
                <div className="flex justify-between mb-2">
                  <span className="text-[#888888] text-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>Stok</span>
                  <span className="text-[#22C55E] text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {product.stock}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888] text-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>Region</span>
                  <span className="text-[#111111] text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {product.region}
                  </span>
                </div>
              </div>

              {/* Seller Info */}
              <div className="mb-5 pb-5 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#1341C4] rounded-full flex items-center justify-center text-white text-[14px]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    {product.seller.initial}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[#111111] text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                        {product.seller.name}
                      </span>
                      {product.seller.verified && (
                        <span className="text-[#22C55E] text-[11px]">✓</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="text-[#555555] text-[11px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {product.seller.rating} • Terverifikasi
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleBuy}
                  className="w-full bg-[#1341C4] hover:bg-[#0f3399] text-white py-3 rounded-xl text-[15px] flex items-center justify-center gap-2 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {user ? 'Beli Sekarang' : 'Masuk untuk Beli'}
                </button>
                <button
                  onClick={handleChat}
                  className="w-full bg-white hover:bg-[#F4F6FB] border-2 border-[#1341C4] text-[#1341C4] py-3 rounded-xl text-[14px] flex items-center justify-center gap-2 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat Penjual
                </button>
              </div>

              {/* Escrow Note */}
              <div className="mt-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg p-3 flex gap-2">
                <Shield className="w-4 h-4 text-[#0369A1] flex-shrink-0 mt-0.5" />
                <p className="text-[#0369A1] text-[12px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  🔒 Dana ditahan sistem Kugem hingga barang diterima
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
