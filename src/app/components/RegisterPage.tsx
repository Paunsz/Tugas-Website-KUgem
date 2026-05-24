import { X, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { useState } from 'react';
import { db } from '../database';

interface RegisterPageProps {
  onClose: () => void;
  onNavigateToLogin: () => void;
  onRegisterSuccess: (user: import('../database').User) => void;
}

export default function RegisterPage({ onClose, onNavigateToLogin, onRegisterSuccess }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!formData.username.trim() || formData.username.length < 3) {
      errs.username = 'Username minimal 3 karakter';
    }
    if (!formData.email.includes('@')) {
      errs.email = 'Masukkan email yang valid';
    }
    if (!formData.phone || formData.phone.length < 10) {
      errs.phone = 'Nomor HP minimal 10 digit';
    }
    if (formData.password.length < 6) {
      errs.password = 'Password minimal 6 karakter';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Password tidak cocok';
    }
    if (!formData.agreeTerms) {
      errs.terms = 'Anda harus menyetujui syarat & ketentuan';
    }
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = db.register(formData.username, formData.email, formData.phone, formData.password);
      if (result.success && result.user) {
        // Auto login
        db.login(formData.email, formData.password);
        onRegisterSuccess(result.user);
      } else {
        setErrors({ general: result.error || 'Gagal mendaftar. Coba lagi.' });
      }
      setLoading(false);
    }, 800);
  }

  function update(field: string, value: string | boolean) {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '', general: '' }));
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-[480px] relative animate-in fade-in zoom-in duration-200 my-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F4F6FB] transition-colors z-10"
        >
          <X className="w-5 h-5 text-[#888888]" />
        </button>

        <div className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#1341C4] rounded-xl flex items-center justify-center text-[24px]">💎</div>
              <span className="text-[#1341C4] text-[28px] tracking-tight" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                Kugem
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-[#111111] text-[22px] text-center mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            Daftar Akun Baru
          </h2>
          <p className="text-[#888888] text-[13px] text-center mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>
            Bergabung dengan jutaan gamer di Kugem
          </p>

          {errors.general && (
            <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl px-4 py-3 mb-4">
              <p className="text-[#EF4444] text-[13px]" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-[#555555] text-[13px] block mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input
                  type="text"
                  placeholder="Pilih username unik"
                  value={formData.username}
                  onChange={e => update('username', e.target.value)}
                  className={`w-full border rounded-xl pl-11 pr-4 py-3 text-[14px] outline-none transition-all ${
                    errors.username ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E5E7EB] focus:border-[#1341C4] focus:ring-2 focus:ring-[#E8F0FF]'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              {errors.username && <p className="text-[#EF4444] text-[11px] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-[#555555] text-[13px] block mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input
                  type="email"
                  placeholder="Masukkan email aktif"
                  value={formData.email}
                  onChange={e => update('email', e.target.value)}
                  className={`w-full border rounded-xl pl-11 pr-4 py-3 text-[14px] outline-none transition-all ${
                    errors.email ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E5E7EB] focus:border-[#1341C4] focus:ring-2 focus:ring-[#E8F0FF]'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              {errors.email && <p className="text-[#EF4444] text-[11px] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="text-[#555555] text-[13px] block mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Nomor HP
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={formData.phone}
                  onChange={e => update('phone', e.target.value)}
                  className={`w-full border rounded-xl pl-11 pr-4 py-3 text-[14px] outline-none transition-all ${
                    errors.phone ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E5E7EB] focus:border-[#1341C4] focus:ring-2 focus:ring-[#E8F0FF]'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              {errors.phone && <p className="text-[#EF4444] text-[11px] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-[#555555] text-[13px] block mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 6 karakter"
                  value={formData.password}
                  onChange={e => update('password', e.target.value)}
                  className={`w-full border rounded-xl pl-11 pr-12 py-3 text-[14px] outline-none transition-all ${
                    errors.password ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E5E7EB] focus:border-[#1341C4] focus:ring-2 focus:ring-[#E8F0FF]'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#555555]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[#EF4444] text-[11px] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-[#555555] text-[13px] block mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={e => update('confirmPassword', e.target.value)}
                  className={`w-full border rounded-xl pl-11 pr-12 py-3 text-[14px] outline-none transition-all ${
                    errors.confirmPassword ? 'border-[#EF4444] bg-[#FEF2F2]' : 'border-[#E5E7EB] focus:border-[#1341C4] focus:ring-2 focus:ring-[#E8F0FF]'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#555555]">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[#EF4444] text-[11px] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={e => update('agreeTerms', e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#1341C4] cursor-pointer"
                />
                <span className="text-[#555555] text-[12px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Saya menyetujui{' '}
                  <a href="#" className="text-[#1341C4] hover:underline" style={{ fontWeight: 600 }}>Syarat & Ketentuan</a>
                  {' '}dan{' '}
                  <a href="#" className="text-[#1341C4] hover:underline" style={{ fontWeight: 600 }}>Kebijakan Privasi</a>
                  {' '}Kugem
                </span>
              </label>
              {errors.terms && <p className="text-[#EF4444] text-[11px] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.terms}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1341C4] hover:bg-[#0f3399] disabled:bg-[#9DB5F0] text-white py-3 rounded-xl text-[15px] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
            >
              {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="text-center mt-5 mb-5">
            <span className="text-[#888888] text-[13px]" style={{ fontFamily: 'Inter, sans-serif' }}>Sudah punya akun? </span>
            <button
              onClick={onNavigateToLogin}
              className="text-[#1341C4] text-[13px] hover:underline"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Masuk
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-[#888888] text-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>atau daftar dengan</span>
            </div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button className="border border-[#E5E7EB] hover:bg-[#F4F6FB] rounded-xl py-2.5 flex items-center justify-center gap-2 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-[#555555] text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Google</span>
            </button>
            <button className="border border-[#E5E7EB] hover:bg-[#F4F6FB] rounded-xl py-2.5 flex items-center justify-center gap-2 transition-colors">
              <div className="w-5 h-5 bg-[#1877F2] rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-[#555555] text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
