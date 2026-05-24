import { useState } from 'react';
import { ArrowLeft, ChevronRight, Settings, Package, HelpCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { User, db } from '../database';

interface ProfilePageProps {
  user: User;
  onBack: () => void;
  onNavigateToChat: () => void;
}

export default function ProfilePage({ user, onBack, onNavigateToChat }: ProfilePageProps) {
  const [expandInfo, setExpandInfo] = useState(false);
  const [expandAbout, setExpandAbout] = useState(false);
  const transactions = db.getUserTransactions(user.id);

  const statusGroups = {
    menunggu_pembayaran: transactions.filter(t => t.status === 'menunggu_pembayaran').length,
    menunggu_dikirim: transactions.filter(t => t.status === 'menunggu_dikirim').length,
    sudah_terkirim: transactions.filter(t => t.status === 'sudah_terkirim').length,
    selesai: transactions.filter(t => t.status === 'selesai').length,
  };

  const maxExp = 1000;
  const expPercent = Math.min((user.exp / maxExp) * 100, 100);

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      {/* Header - Blue */}
      <div className="bg-[#1341C4] pb-4">
        {/* Top nav */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-white text-[16px]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Akun Saya</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* User Info */}
        <div className="px-4 pt-2">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-[#4A90D9] rounded-full flex items-center justify-center text-[32px] border-2 border-white/30">👤</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white text-[18px]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>{user.username}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                  <span className="text-[14px]">🪙</span>
                  <span className="text-white text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {user.coin.toLocaleString()} Token
                  </span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                  <span className="text-[14px]">🎟️</span>
                  <span className="text-white text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {user.kupon} Kupon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Level / EXP */}
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90 text-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Quest: <span style={{ fontWeight: 700 }}>Level {user.level}</span>
              </span>
              <div className="flex items-center gap-1">
                <span className="text-white/70 text-[11px]" style={{ fontFamily: 'Inter, sans-serif' }}>{user.exp}/- EXP</span>
                <span className="text-[20px]">🪄</span>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] h-2 rounded-full transition-all"
                style={{ width: `${expPercent}%` }}
              ></div>
            </div>
            <div className="mt-1.5 flex items-center gap-1">
              <span className="text-[10px] text-[#FBBF24]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>+EXP</span>
              <span className="text-[10px] text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>Selesaikan quest untuk naik level</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-xl mx-auto px-4 -mt-2 space-y-3 pb-8">

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-[#E5E7EB]">
            {[
              { name: 'DANA', icon: '💙', color: '#0078D7', action: 'Hubungkan' },
              { name: 'OVO', icon: '💜', color: '#4C3494', action: 'Hubungkan' },
              { name: 'Dompetku', icon: '💛', color: '#F59E0B', amount: user.dompetku },
            ].map((pm) => (
              <button key={pm.name} className="flex flex-col items-center py-4 hover:bg-[#F4F6FB] transition-colors">
                <div className="w-10 h-10 rounded-full mb-2 flex items-center justify-center text-white text-[16px]" style={{ background: pm.color }}>
                  {pm.name.charAt(0)}
                </div>
                <span className="text-[13px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{pm.name}</span>
                {'amount' in pm ? (
                  <span className="text-[13px] text-[#111111]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                    Rp{pm.amount!.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-[12px] text-[#1341C4]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Hubungkan</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mulai Jualan */}
        <button className="w-full bg-white rounded-2xl shadow-sm px-4 py-4 flex items-center gap-3 hover:bg-[#F4F6FB] transition-colors">
          <div className="w-10 h-10 bg-[#E8F0FF] rounded-xl flex items-center justify-center text-[18px]">🏪</div>
          <span className="flex-1 text-[#1341C4] text-[14px] text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Mulai Jualan</span>
          <ChevronRight className="w-5 h-5 text-[#1341C4]" />
        </button>

        {/* Riwayat Aktivitas */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] text-[#111111]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Riwayat Aktivitas</span>
            <button className="text-[12px] text-[#1341C4]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
              Lihat Semua &gt;&gt;
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Menunggu\nPembayaran', emoji: '💳', count: statusGroups.menunggu_pembayaran, color: '#FEF3C7', textColor: '#D97706' },
              { label: 'Menunggu\nDikirim', emoji: '📦', count: statusGroups.menunggu_dikirim, color: '#EFF6FF', textColor: '#2563EB' },
              { label: 'Sudah\nTerkirim', emoji: '🚀', count: statusGroups.sudah_terkirim, color: '#F0FDF4', textColor: '#16A34A' },
              { label: 'Selesai', emoji: '✅', count: statusGroups.selesai, color: '#F5F3FF', textColor: '#7C3AED' },
            ].map((status) => (
              <button key={status.label} className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-[#F4F6FB] transition-colors relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[24px]" style={{ background: status.color }}>
                  {status.emoji}
                </div>
                {status.count > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#EF4444] rounded-full text-white text-[10px] flex items-center justify-center" style={{ fontWeight: 700 }}>
                    {status.count}
                  </span>
                )}
                <span className="text-[10px] text-[#555555] text-center leading-tight" style={{ fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-line' }}>
                  {status.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bantuan */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E5E7EB]">
            <span className="text-[14px] text-[#111111]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Bantuan</span>
          </div>
          {[
            { icon: Package, label: 'Kendala Pesanan', dot: false },
            { icon: HelpCircle, label: 'Pusat Bantuan', dot: false },
            { icon: AlertTriangle, label: 'Daftar Komplain', dot: true },
          ].map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#F4F6FB] transition-colors ${i < 2 ? 'border-b border-[#E5E7EB]' : ''}`}
            >
              <item.icon className="w-5 h-5 text-[#888888]" />
              <span className="flex-1 text-[13px] text-[#111111] text-left" style={{ fontFamily: 'Inter, sans-serif' }}>{item.label}</span>
              {item.dot && <div className="w-2 h-2 bg-[#EF4444] rounded-full"></div>}
              <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
            </button>
          ))}
        </div>

        {/* Informasi dan Komunitas */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandInfo(!expandInfo)}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F6FB] transition-colors"
          >
            <span className="text-[14px] text-[#111111]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Informasi dan Komunitas</span>
            {expandInfo ? <ChevronUp className="w-5 h-5 text-[#888888]" /> : <ChevronDown className="w-5 h-5 text-[#888888]" />}
          </button>
          {expandInfo && (
            <div className="border-t border-[#E5E7EB]">
              {['Forum Komunitas', 'Blog Kugem', 'Media Sosial', 'Program Afiliasi'].map((item, i, arr) => (
                <button
                  key={item}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F6FB] transition-colors ${i < arr.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}
                >
                  <span className="text-[13px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>{item}</span>
                  <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tentang Kami */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandAbout(!expandAbout)}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F6FB] transition-colors"
          >
            <span className="text-[14px] text-[#111111]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>Tentang Kami</span>
            {expandAbout ? <ChevronUp className="w-5 h-5 text-[#888888]" /> : <ChevronDown className="w-5 h-5 text-[#888888]" />}
          </button>
          {expandAbout && (
            <div className="border-t border-[#E5E7EB]">
              {['Tentang Kugem', 'Karir', 'Hubungi Kami', 'Syarat & Ketentuan', 'Kebijakan Privasi'].map((item, i, arr) => (
                <button
                  key={item}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F6FB] transition-colors ${i < arr.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}
                >
                  <span className="text-[13px] text-[#555555]" style={{ fontFamily: 'Inter, sans-serif' }}>{item}</span>
                  <ChevronRight className="w-4 h-4 text-[#CCCCCC]" />
                </button>
              ))}

              {/* SDLC Methodology note */}
              <div className="px-4 py-3 bg-[#F0F9FF] border-t border-[#E5E7EB]">
                <p className="text-[11px] text-[#0369A1] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span style={{ fontWeight: 700 }}>Metodologi Pengembangan: Agile (Scrum)</span>{'\n'}
                  Kugem dikembangkan menggunakan metodologi Agile/Scrum dengan sprint 2 minggu, planning, daily standup, review & retrospective di setiap siklus pengembangan.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Download App */}
        <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
          <p className="text-[13px] text-[#1341C4] mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Download Kugem App</p>
          <div className="flex justify-center gap-3">
            <button className="bg-black text-white rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-[#333] transition-colors">
              <span className="text-[20px]">▶</span>
              <div className="text-left">
                <div className="text-[9px] text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>Get it on</div>
                <div className="text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Google Play</div>
              </div>
            </button>
            <button className="bg-black text-white rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-[#333] transition-colors">
              <span className="text-[20px]"></span>
              <div className="text-left">
                <div className="text-[9px] text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>Download on the</div>
                <div className="text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>App Store</div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-[#AAAAAA]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Kugem v1.0 — Marketplace Gaming Terpercaya 💎
        </p>
      </div>

      {/* Bottom Nav (mobile style) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] flex items-center justify-around py-2 z-40 md:hidden">
        {[
          { icon: '🏠', label: 'Home', onClick: onBack },
          { icon: '⚡', label: 'Beli Cepat', onClick: onBack },
          { icon: '↔️', label: 'Transaksi', onClick: undefined },
          { icon: '❤️', label: 'Favorit', onClick: undefined },
          { icon: '👤', label: 'Akun', onClick: undefined, active: true },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 ${item.active ? 'text-[#1341C4]' : 'text-[#888888]'}`}
          >
            <span className="text-[20px]">{item.icon}</span>
            <span className={`text-[10px] ${item.active ? 'text-[#1341C4]' : 'text-[#888888]'}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: item.active ? 700 : 400 }}>
              {item.label}
            </span>
            {item.active && <div className="w-4 h-0.5 bg-[#1341C4] rounded-full absolute bottom-0"></div>}
          </button>
        ))}
      </div>
    </div>
  );
}
