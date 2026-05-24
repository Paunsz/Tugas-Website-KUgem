import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { db, User } from '../database';

interface LoginPageProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  onNavigateToRegister: () => void;
}

export default function LoginPage({ onClose, onLoginSuccess, onNavigateToRegister }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Isi email dan password terlebih dahulu');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = db.login(email, password);
      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else {
        setError(result.error || 'Login gagal. Periksa kembali email & password.');
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-[440px] relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F4F6FB] transition-colors"
        >
          <X className="w-5 h-5 text-[#888888]" />
        </button>

        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#1341C4] rounded-xl flex items-center justify-center text-[24px]">💎</div>
              <span className="text-[#1341C4] text-[28px] tracking-tight" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                Kugem
              </span>
            </div>
          </div>

          <h2 className="text-[#111111] text-[24px] text-center mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            Masuk ke Kugem
          </h2>
          <p className="text-[#888888] text-[14px] text-center mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Masuk untuk melanjutkan belanja
          </p>

          {error && (
            <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl px-4 py-3 mb-4">
              <p className="text-[#EF4444] text-[13px]" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="text-[#555555] text-[13px] block mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
                <input
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  className="w-full border border-[#E5E7EB] rounded-xl pl-12 pr-4 py-3 text-[14px] outline-none focus:border-[#1341C4] focus:ring-2 focus:ring-[#E8F0FF] transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label className="text-[#555555] text-[13px] block mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  className="w-full border border-[#E5E7EB] rounded-xl pl-12 pr-12 py-3 text-[14px] outline-none focus:border-[#1341C4] focus:ring-2 focus:ring-[#E8F0FF] transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#555555]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[#1341C4] text-[13px] hover:underline" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Lupa Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1341C4] hover:bg-[#0f3399] disabled:bg-[#9DB5F0] text-white py-3 rounded-xl text-[15px] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          <div className="text-center mb-6">
            <span className="text-[#888888] text-[13px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Belum punya akun?{' '}
            </span>
            <button
              onClick={onNavigateToRegister}
              className="text-[#1341C4] text-[13px] hover:underline"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Daftar Sekarang
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-[#888888] text-[13px]" style={{ fontFamily: 'Inter, sans-serif' }}>atau</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full border border-[#E5E7EB] hover:bg-[#F4F6FB] rounded-xl py-3 flex items-center justify-center gap-3 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-[#555555] text-[14px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Lanjutkan dengan Google</span>
            </button>

            <button className="w-full border border-[#E5E7EB] hover:bg-[#F4F6FB] rounded-xl py-3 flex items-center justify-center gap-3 transition-colors">
              <div className="w-5 h-5 bg-[#1877F2] rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-[#555555] text-[14px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Lanjutkan dengan Facebook</span>
            </button>
          </div>

          <p className="text-[#AAAAAA] text-[11px] text-center mt-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Dengan masuk, Anda menyetujui{' '}
            <a href="#" className="text-[#1341C4] hover:underline">Syarat & Ketentuan</a>
            {' '}dan{' '}
            <a href="#" className="text-[#1341C4] hover:underline">Kebijakan Privasi</a>
            {' '}Kugem
          </p>
        </div>
      </div>
    </div>
  );
}
