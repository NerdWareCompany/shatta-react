import React, { useState } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Sparkles,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type AuthView = 'login' | 'register' | 'forgot' | 'otp' | 'new-password';

interface AuthProps {
  initialView?: AuthView;
  onSuccess?: () => void;
}

export function Auth({ initialView = 'login', onSuccess }: AuthProps) {
  const [view, setView] = useState<AuthView>(initialView);

  // Form States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Form Field Inputs
  const [loginEmail, setLoginEmail] = useState('sarah.mahmoud@example.com');
  const [loginPassword, setLoginPassword] = useState('••••••••');

  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Status Alerts
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fadeUp: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25 } }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Logged in successfully! Redirecting to your account...');
      setTimeout(() => {
        if (onSuccess) onSuccess();
        else window.location.href = '/preview/shatta-homepage/Account';
      }, 1200);
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Account created successfully! Welcome to Shatta.');
      setTimeout(() => {
        if (onSuccess) onSuccess();
        else window.location.href = '/preview/shatta-homepage/Account';
      }, 1200);
    }, 800);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setView('otp');
      setSuccessMessage(`We have sent a 6-digit verification code to ${forgotEmail || 'your email'}.`);
    }, 700);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setView('new-password');
      setSuccessMessage('Code verified! Please enter your new password.');
    }, 600);
  };

  const handleNewPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Password reset successfully! You can now log in.');
      setTimeout(() => {
        setView('login');
        setSuccessMessage(null);
      }, 1500);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-[#C4A35A] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex items-center justify-center min-h-[calc(100vh-200px)]">

        <div className="w-full bg-white border border-[#E8E0D4] rounded-[2.5rem] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">

          {/* LEFT Brand Side Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#1A1A1A] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">

            {/* Background Pattern / Subtle Glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#C4A35A]/20 rounded-full blur-3xl group-hover:bg-[#C4A35A]/30 transition-all duration-700 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#C4A35A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C4A35A]" />
                <span className="text-xs font-bold tracking-widest text-[#C4A35A] uppercase">SHATTA LUXURY</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-4">
                Elevate Your Living Space
              </h2>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                Unlock exclusive collections, custom interior consultations, and personalized order tracking with your Shatta account.
              </p>
            </div>

            <div className="relative z-10 pt-12 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C4A35A]/20 text-[#C4A35A] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs text-white/80">
                  <strong className="text-white block font-medium">Complimentary Shipping</strong>
                  <span>On orders over EGP 5,000 across Egypt.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C4A35A]/20 text-[#C4A35A] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs text-white/80">
                  <strong className="text-white block font-medium">Verified Craftsmanship</strong>
                  <span>100% Authentic Egyptian Cotton & Handcrafted Decor.</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT Form Content Area (7 Cols) */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white relative">

            <AnimatePresence mode="wait">

              {/* LOGIN VIEW */}
              {view === 'login' && (
                <motion.div
                  key="login"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-2">Welcome Back</h3>
                    <p className="text-sm text-[#1A1A1A]/60 font-light">
                      Please enter your credentials to access your account.
                    </p>
                  </div>

                  {successMessage && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="sarah.mahmoud@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-3.5 ps-11 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                        />
                        <Mail className="w-4 h-4 absolute start-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">Password</label>
                        <button
                          type="button"
                          onClick={() => setView('forgot')}
                          className="text-xs text-[#C4A35A] hover:underline font-medium"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-3.5 ps-11 pe-11 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                        />
                        <Lock className="w-4 h-4 absolute start-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute end-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 accent-[#C4A35A] rounded border-[#E8E0D4]"
                        />
                        <span className="text-xs text-[#1A1A1A]/70">Keep me signed in</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#1A1A1A] hover:bg-[#C4A35A] text-white py-4 rounded-full text-xs font-semibold tracking-widest transition-all shadow-md shadow-[#C4A35A]/20 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>LOG IN TO ACCOUNT</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Social Logins */}
                  <div className="pt-4 border-t border-[#E8E0D4]">
                    <div className="text-center text-xs text-[#1A1A1A]/50 mb-4 font-medium">OR CONTINUE WITH</div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => alert("Google Login initiated")}
                        className="flex items-center justify-center gap-2 py-3 px-4 border border-[#E8E0D4] rounded-xl text-xs font-medium text-[#1A1A1A]/80 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.28v3.15C3.25 21.3 7.31 24 12 24z" />
                          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.28C.46 8.21 0 10.05 0 12s.46 3.79 1.28 5.42l4-3.15z" />
                          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.28 6.58l4 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                        </svg>
                        <span>Google</span>
                      </button>

                      <button
                        onClick={() => alert("Apple Login initiated")}
                        className="flex items-center justify-center gap-2 py-3 px-4 border border-[#E8E0D4] rounded-xl text-xs font-medium text-[#1A1A1A]/80 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.09c.66-.82 1.12-1.96.99-3.11-1 .04-2.22.68-2.93 1.5-.63.73-1.18 1.89-1.03 3.01 1.12.09 2.28-.57 2.97-1.4" />
                        </svg>
                        <span>Apple</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-xs text-[#1A1A1A]/60">
                      Don't have an account?{' '}
                      <button
                        onClick={() => { setView('register'); setErrorMessage(null); setSuccessMessage(null); }}
                        className="font-bold text-[#C4A35A] hover:underline"
                      >
                        Create One Now
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* REGISTER VIEW */}
              {view === 'register' && (
                <motion.div
                  key="register"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5"
                >
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-2">Create Your Account</h3>
                    <p className="text-sm text-[#1A1A1A]/60 font-light">
                      Join Shatta to enjoy seamless luxury shopping and privileges.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">First Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Sarah"
                          value={regFirstName}
                          onChange={(e) => setRegFirstName(e.target.value)}
                          className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">Last Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Mahmoud"
                          value={regLastName}
                          onChange={(e) => setRegLastName(e.target.value)}
                          className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="sarah.mahmoud@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+20 10 1234 5678"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="w-full bg-white border border-[#E8E0D4] rounded-xl px-3.5 py-2.5 pe-9 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute end-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">Confirm Password</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            className="w-full bg-white border border-[#E8E0D4] rounded-xl px-3.5 py-2.5 pe-9 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute end-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40"
                          >
                            {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="w-4 h-4 accent-[#C4A35A] rounded border-[#E8E0D4] mt-0.5"
                        />
                        <span className="text-xs text-[#1A1A1A]/70 leading-normal">
                          I agree to the <a href="#terms" className="text-[#C4A35A] underline">Terms & Conditions</a> and <a href="#privacy" className="text-[#C4A35A] underline">Privacy Policy</a>.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#1A1A1A] hover:bg-[#C4A35A] text-white py-3.5 rounded-full text-xs font-semibold tracking-widest transition-all shadow-md shadow-[#C4A35A]/20 flex items-center justify-center gap-2 mt-2"
                    >
                      {isLoading ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>CREATE ACCOUNT</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="text-center pt-2">
                    <p className="text-xs text-[#1A1A1A]/60">
                      Already have an account?{' '}
                      <button
                        onClick={() => { setView('login'); setErrorMessage(null); setSuccessMessage(null); }}
                        className="font-bold text-[#C4A35A] hover:underline"
                      >
                        Sign In Here
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* FORGOT PASSWORD VIEW */}
              {view === 'forgot' && (
                <motion.div
                  key="forgot"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <button
                      onClick={() => setView('login')}
                      className="inline-flex items-center gap-1.5 text-xs text-[#1A1A1A]/60 hover:text-[#C4A35A] mb-4 font-medium"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Login</span>
                    </button>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-2">Reset Password</h3>
                    <p className="text-sm text-[#1A1A1A]/60 font-light">
                      Enter your email address and we'll send you a 6-digit code to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleForgotSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">Registered Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="sarah.mahmoud@example.com"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-3.5 ps-11 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                        />
                        <Mail className="w-4 h-4 absolute start-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#C4A35A] hover:bg-[#B39249] text-white py-4 rounded-full text-xs font-semibold tracking-widest transition-all shadow-md shadow-[#C4A35A]/20 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>SEND RESET CODE</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* OTP CODE STEP */}
              {view === 'otp' && (
                <motion.div
                  key="otp"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-serif text-3xl text-[#1A1A1A] mb-2">Enter Verification Code</h3>
                    <p className="text-xs text-[#1A1A1A]/60 font-light">
                      We've sent a 6-digit code to <strong className="text-[#1A1A1A] font-medium">{forgotEmail || 'your email'}</strong>.
                    </p>
                  </div>

                  {successMessage && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <div className="flex justify-between gap-2">
                      {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={otpCode[idx]}
                          onChange={(e) => {
                            const val = e.target.value;
                            const newCode = [...otpCode];
                            newCode[idx] = val;
                            setOtpCode(newCode);
                            if (val && idx < 5) {
                              const nextInput = document.getElementById(`otp-${idx + 1}`);
                              if (nextInput) nextInput.focus();
                            }
                          }}
                          className="w-11 h-12 text-center text-lg font-bold border border-[#E8E0D4] rounded-xl focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all bg-white"
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#C4A35A] hover:bg-[#B39249] text-white py-3.5 rounded-full text-xs font-semibold tracking-widest transition-all shadow-md shadow-[#C4A35A]/20"
                    >
                      {isLoading ? 'VERIFYING...' : 'VERIFY CODE'}
                    </button>
                  </form>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => alert("Resent code to your email!")}
                      className="text-xs text-[#C4A35A] hover:underline font-medium"
                    >
                      Didn't receive code? Resend Code
                    </button>
                  </div>
                </motion.div>
              )}

              {/* NEW PASSWORD STEP */}
              {view === 'new-password' && (
                <motion.div
                  key="new-password"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-serif text-3xl text-[#1A1A1A] mb-2">Set New Password</h3>
                    <p className="text-xs text-[#1A1A1A]/60 font-light">
                      Please enter and confirm your new secure password.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">New Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-3 ps-11 pe-11 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                        />
                        <KeyRound className="w-4 h-4 absolute start-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute end-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold tracking-widest text-[#1A1A1A]/70 uppercase">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-3 ps-11 pe-11 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                        />
                        <KeyRound className="w-4 h-4 absolute start-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute end-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#C4A35A] hover:bg-[#B39249] text-white py-4 rounded-full text-xs font-semibold tracking-widest transition-all shadow-md shadow-[#C4A35A]/20"
                    >
                      {isLoading ? 'UPDATING...' : 'RESET PASSWORD'}
                    </button>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Auth;
