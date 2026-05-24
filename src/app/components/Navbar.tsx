import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, Bell, Mail, Settings, ChevronRight, Package, Heart, MessageCircle, HelpCircle, AlertTriangle, Edit3, LogOut } from 'lucide-react';
import { User } from '../database';

interface NavbarProps {
  user: User | null;
  onOpenLogin: () => void;
  onNavigateToHome: () => void;
  onNavigateToCategory: (category: string) => void;
  onNavigateToProfile: () => void;
  onNavigateToChat: () => void;
  onLogout: () => void;
  showHotTags?: boolean;
  showCategories?: boolean;
}

export function Navbar({
  user,
  onOpenLogin,
  onNavigateToHome,
  onNavigateToCategory,
  onNavigateToProfile,
  onNavigateToChat,
  onLogout,
  showHotTags = false,
  showCategories = false,
}: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const userInitial = user?.username?.charAt(0).toUpperCase() || 'U';

  return (
    <>
      {/* Top Bar */}
      <div className="h-8 bg-white border-b border-[#EEEEEE] flex items-center justify-end px-8 gap-5">
        <span className="text-[12px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>🛡️ Bantuan</span>
        <span className="text-[12px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>🇮🇩 ID - IDR | ID</span>
        <span className="text-[12px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>📱 Download Kugem App ▾</span>
      </div>

      {/* Navbar */}
      <div className="h-[60px] bg-[#1341C4] flex items-center px-8 gap-6 relative">
        {/* Logo */}
        <button onClick={onNavigateToHome} className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[20px]">💎</div>
          <span className="text-white text-[22px] tracking-tight" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Kugem</span>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-[700px] bg-white rounded-lg flex items-center px-4 h-[42px]">
          <Search className="w-5 h-5 text-[#888888] mr-2" />
          <input
            type="text"
            placeholder="Cari Game, Diamond, Hero, Akun..."
            className="flex-1 outline-none text-[14px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          <div className="bg-[#E8F0FF] text-[#1341C4] px-3 py-1 rounded text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            ENTER ↵
          </div>
        </div>

        {/* Right: Auth area */}
        {user ? (
          <div className="flex items-center gap-3 ml-auto" ref={dropdownRef}>
            <button onClick={onNavigateToChat} className="text-white/80 hover:text-white">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="text-white/80 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full text-[9px] text-white flex items-center justify-center" style={{ fontWeight: 700 }}>1</span>
            </button>
            <button className="text-white/80 hover:text-white">
              <ShoppingCart className="w-5 h-5" />
            </button>

            {/* User Avatar Button */}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 rounded-lg px-3 py-1.5 transition-colors"
            >
              <div className="w-7 h-7 bg-[#FBBF24] rounded-full flex items-center justify-center text-[#7C2D12] text-[13px]" style={{ fontWeight: 700 }}>
                {userInitial}
              </div>
              <span className="text-white text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                {user.username}
              </span>
              <span className="text-white/70 text-[10px]">▾</span>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute top-[60px] right-8 w-[360px] bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] z-50 overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>
                {/* User Header */}
                <div className="bg-[#1A2E6B] p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#4A90D9] rounded-full flex items-center justify-center text-white text-[22px]">👤</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-[15px]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>{user.username}</span>
                        <Edit3 className="w-3.5 h-3.5 text-white/60 cursor-pointer hover:text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <span className="text-[16px]">🪙</span>
                      <span className="text-white text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{user.coin.toLocaleString()} Coin</span>
                    </div>
                    <div className="bg-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <span className="text-[16px]">🎟️</span>
                      <span className="text-white text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{user.kupon} Kupon</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="grid grid-cols-3 border-b border-[#E5E7EB]">
                  {[
                    { name: 'DANA', color: '#0078D7', action: 'Hubungkan' },
                    { name: 'OVO', color: '#4C3494', action: 'Hubungkan' },
                    { name: 'Dompetku', color: '#F59E0B', action: `Rp ${user.dompetku.toLocaleString()}` },
                  ].map((pm) => (
                    <button key={pm.name} className="flex flex-col items-center py-3 hover:bg-[#F4F6FB] transition-colors">
                      <div className="w-8 h-8 rounded-full mb-1 flex items-center justify-center text-white text-[10px]" style={{ background: pm.color, fontWeight: 700 }}>
                        {pm.name.charAt(0)}
                      </div>
                      <span className="text-[11px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{pm.name}</span>
                      <span className={`text-[11px] ${pm.name === 'Dompetku' ? 'text-[#111]' : 'text-[#1341C4]'}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: pm.name === 'Dompetku' ? 700 : 600 }}>
                        {pm.action}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Riwayat Pembelian */}
                <div className="px-4 py-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] text-[#111]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Riwayat Pembelian</span>
                    <button className="text-[12px] text-[#1341C4]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Lihat Semua &gt;&gt;</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Menunggu\nPembayaran', emoji: '💳', color: '#FBBF24' },
                      { label: 'Menunggu\nDikirim', emoji: '📦', color: '#60A5FA' },
                      { label: 'Sudah\nTerkirim', emoji: '🚀', color: '#34D399' },
                      { label: 'Selesai', emoji: '✅', color: '#A78BFA' },
                    ].map((status) => (
                      <button key={status.label} className="flex flex-col items-center gap-1 p-2 hover:bg-[#F4F6FB] rounded-lg transition-colors">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px]" style={{ background: `${status.color}22` }}>
                          {status.emoji}
                        </div>
                        <span className="text-[10px] text-[#555555] text-center leading-tight" style={{ fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-line' }}>
                          {status.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  {[
                    { icon: Heart, label: 'Produk Favorit', dot: false },
                    { icon: Mail, label: 'Kotak Pesan', dot: false, onClick: onNavigateToChat },
                    { icon: Package, label: 'Kendala Pesanan', dot: false },
                    { icon: HelpCircle, label: 'Pusat Bantuan', dot: false },
                    { icon: AlertTriangle, label: 'Daftar Komplain', dot: true },
                    { icon: Settings, label: 'Pengaturan', dot: false },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { item.onClick?.(); setShowDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F4F6FB] transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-[#888888]" />
                      <span className="flex-1 text-[13px] text-[#111111] text-left" style={{ fontFamily: 'Inter, sans-serif' }}>{item.label}</span>
                      {item.dot && <div className="w-2 h-2 bg-[#EF4444] rounded-full"></div>}
                      <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
                    </button>
                  ))}

                  <button
                    onClick={() => { onLogout(); setShowDropdown(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FEF2F2] transition-colors border-t border-[#E5E7EB] mt-1"
                  >
                    <LogOut className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-[13px] text-[#EF4444]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Keluar</span>
                  </button>
                </div>

                {/* Profile Page Link */}
                <div className="border-t border-[#E5E7EB] p-3">
                  <button
                    onClick={() => { onNavigateToProfile(); setShowDropdown(false); }}
                    className="w-full bg-[#1341C4] hover:bg-[#0f3399] text-white py-2.5 rounded-xl text-[13px] transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                  >
                    Lihat Profil Lengkap
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="ml-auto bg-white text-[#1341C4] px-6 py-2 rounded-lg text-[14px] hover:bg-[#F4F6FB] transition-colors flex-shrink-0"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
          >
            Masuk
          </button>
        )}
      </div>

      {/* Hot Tags Bar */}
      {showHotTags && (
        <div className="h-9 bg-[#1341C4] border-t border-white/15 flex items-center px-8 gap-3 overflow-x-auto">
          {['Robux 5 Hari', 'Akun Blox Fruit', 'Fish It', 'Token HoK', 'MLBB', 'Genshin Impact'].map((tag) => (
            <span
              key={tag}
              className="bg-white/15 border border-white/25 rounded-full px-3 py-1 text-white text-[12px] whitespace-nowrap cursor-pointer hover:bg-white/25 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Menu Kategori Bar */}
      {showCategories && (
        <div className="h-11 bg-[#1341C4] border-t border-white/15 flex items-center px-8 gap-6 overflow-x-auto">
          {[
            { label: '⊞ Kategori', category: null },
            { label: 'Steam Voucher', category: 'Voucher' },
            { label: 'Growtopia DL', category: 'Item' },
            { label: 'Steam Key', category: 'Game Key' },
            { label: 'Roblox Games', category: 'Roblox' },
            { label: 'Mobile Legends WDP', category: 'Top Up' },
            { label: 'Free Fire Diamonds', category: 'Top Up' },
          ].map((item, idx) => (
            <span
              key={item.label}
              onClick={() => item.category && onNavigateToCategory(item.category)}
              className={`text-[13px] whitespace-nowrap cursor-pointer hover:text-white transition-colors ${
                idx === 0 ? 'text-white border-b-2 border-[#FBBF24] pb-3' : 'text-white/85 pb-3'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
