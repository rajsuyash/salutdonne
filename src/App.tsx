import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageSquare,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  Menu,
  X,
  ChevronRight,
  Play,
  Mic,
  BarChart,
  Globe,
  CreditCard,
  Lock,
  ArrowRight,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { useLanguage, getAppTranslations, getSharedTranslations } from './i18n';
import LanguageSwitcher from './components/LanguageSwitcher';

const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
};

const useParallax = (speed = 0.5) => {
  const scrollY = useScroll();
  return { transform: `translateY(${scrollY * speed}px)` };
};

const VideoBackground = () => (
  <div className="absolute inset-0 overflow-hidden -z-20">
    <div className="absolute inset-0 bg-black/80 z-10" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover scale-110"
      poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    >
      <source src="https://cdn.coverr.co/videos/coverr-abstract-digital-lines-background-2708/1080p.mp4" type="video/mp4" />
    </video>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-500 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]",
    secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
    glow: "bg-white text-black shadow-lg shadow-white/50 hover:shadow-white/75 hover:bg-gray-100",
    ghost: "text-slate-400 hover:text-white"
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Section = ({ children, className = '', id = '' }) => (
  <section id={id} className={`relative py-24 px-4 md:px-8 overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

const ParallaxItem = ({ children, speed = 0.1, className = '' }) => {
  const scrollY = useScroll();
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      setOffset((scrollY - elementTop) * speed);
    }
  }, [scrollY, speed]);

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${offset}px)` }}>
      {children}
    </div>
  );
};

const LeDonnaLogo = ({ className = "w-10 h-10" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
      <path d="M30 15H55C75 15 90 30 90 50C90 70 75 85 55 85H30V15Z" stroke="url(#logo_gradient)" strokeWidth="8" />
      <path d="M45 50L50 35L55 65L60 45L65 55L70 50" stroke="#E5E5E5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
      <defs>
        <linearGradient id="logo_gradient" x1="30" y1="15" x2="90" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D1D5DB" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const PaymentModal = ({ plan, onClose, onSuccess }) => {
  const { lang } = useLanguage();
  const s = getSharedTranslations(lang);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        'create-checkout-session',
        {
          body: {
            plan,
            email: formData.email,
            name: formData.name,
            company: formData.company,
          },
        }
      );

      if (functionError) {
        throw functionError;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to create checkout session');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-black border border-white/10 rounded-3xl max-w-lg w-full shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-white via-gray-300 to-white" />

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white">{s.payment.subscribeTo} {plan.title}</h3>
              <p className="text-slate-400 mt-1 flex items-baseline">
                <span className="text-xl text-white font-bold">${plan.price}</span>
                <span className="text-sm ml-1">{s.payment.perMonth}</span>
              </p>
            </div>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handlePayment} className="space-y-5">
            <div className="space-y-4">
              <div className="group">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">{s.payment.emailLabel}</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={s.payment.emailPlaceholder}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">{s.payment.nameLabel}</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={s.payment.namePlaceholder}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">{s.payment.companyLabel}</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder={s.payment.companyPlaceholder}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${loading ? 'bg-gray-800 cursor-not-allowed text-gray-400' : 'bg-white text-black hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{s.payment.redirecting}</span>
                </>
              ) : (
                <>
                  <span>{s.payment.continueToPayment}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-center text-slate-500 mt-4 flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" />
              {s.payment.securePayment}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const { lang } = useLanguage();
  const t = getAppTranslations(lang);
  const s = getSharedTranslations(lang);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCancelMessage, setShowCancelMessage] = useState(false);
  const [isPlayingRestaurant, setIsPlayingRestaurant] = useState(false);
  const [isPlayingProduct, setIsPlayingProduct] = useState(false);
  const restaurantAudioRef = useRef(null);
  const productAudioRef = useRef(null);
  const scrollY = useScroll();
  const scrolled = scrollY > 20;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success')) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      window.history.replaceState({}, '', window.location.pathname);
    }
    if (urlParams.get('canceled')) {
      setShowCancelMessage(true);
      setTimeout(() => setShowCancelMessage(false), 5000);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleBookDemo = () => {
    window.open('https://tidycal.com/rajsuyash/200', '_blank');
  };

  const toggleRestaurantAudio = () => {
    if (restaurantAudioRef.current) {
      if (isPlayingRestaurant) {
        restaurantAudioRef.current.pause();
        restaurantAudioRef.current.currentTime = 0;
        setIsPlayingRestaurant(false);
      } else {
        if (productAudioRef.current && isPlayingProduct) {
          productAudioRef.current.pause();
          productAudioRef.current.currentTime = 0;
          setIsPlayingProduct(false);
        }
        restaurantAudioRef.current.play().catch(() => setIsPlayingRestaurant(false));
        setIsPlayingRestaurant(true);
      }
    }
  };

  const toggleProductAudio = () => {
    if (productAudioRef.current) {
      if (isPlayingProduct) {
        productAudioRef.current.pause();
        productAudioRef.current.currentTime = 0;
        setIsPlayingProduct(false);
      } else {
        if (restaurantAudioRef.current && isPlayingRestaurant) {
          restaurantAudioRef.current.pause();
          restaurantAudioRef.current.currentTime = 0;
          setIsPlayingRestaurant(false);
        }
        productAudioRef.current.play().catch(() => setIsPlayingProduct(false));
        setIsPlayingProduct(true);
      }
    }
  };

  useEffect(() => {
    const audio = restaurantAudioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlayingRestaurant(false);
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  useEffect(() => {
    const audio = productAudioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlayingProduct(false);
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  const navItems = [
    { label: t.nav.audioProof, id: 'audio-proof' },
    { label: t.nav.problem, id: 'problem' },
    { label: t.nav.methodology, id: 'methodology' },
    { label: t.nav.useCases, id: 'use-cases' },
    { label: t.nav.pricing, id: 'pricing' },
  ];

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: lang === 'fr' ? 'Conversations hyper-r\u00e9alistes' : lang === 'it' ? 'Conversazioni iper-realistiche' : 'Hyper-Real Conversations',
      desc: lang === 'fr' ? 'Des mod\u00e8les de raisonnement qui r\u00e9fl\u00e9chissent et r\u00e9agissent comme un humain.' : lang === 'it' ? 'Modelli di ragionamento che pensano e reagiscono come un umano.' : 'Reasoning models that pause, think, and react like a human. No scripts, just intellect.',
      colSpan: "md:col-span-2"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: lang === 'fr' ? 'Disponibilit\u00e9 infinie' : lang === 'it' ? 'Disponibilit\u00e0 infinita' : 'Infinite Availability',
      desc: lang === 'fr' ? 'Les fuseaux horaires sont obsol\u00e8tes. Couverture 24/7/365 sans heures suppl\u00e9mentaires.' : lang === 'it' ? 'I fusi orari sono obsoleti. Copertura 24/7/365 senza straordinari.' : 'Time zones are obsolete. 24/7/365 coverage without overtime pay.',
      colSpan: "md:col-span-1"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: lang === 'fr' ? 'Ex\u00e9cution instantan\u00e9e' : lang === 'it' ? 'Esecuzione istantanea' : 'Instant Execution',
      desc: lang === 'fr' ? 'De l\'intention \u00e0 l\'action en millisecondes. R\u00e9servations, ventes, support.' : lang === 'it' ? 'Dall\'intenzione all\'azione in millisecondi. Prenotazioni, vendite, supporto.' : 'From intent to action in milliseconds. Bookings, sales, support.',
      colSpan: "md:col-span-1"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: lang === 'fr' ? 'Cerveau omnicanal' : lang === 'it' ? 'Cervello omnicanale' : 'Omnichannel Brain',
      desc: lang === 'fr' ? 'Une seule conscience \u00e0 travers Voix, SMS, Email et WhatsApp.' : lang === 'it' ? 'Una sola coscienza attraverso Voce, SMS, Email e WhatsApp.' : 'One consciousness across Voice, SMS, Email, and WhatsApp.',
      colSpan: "md:col-span-2"
    }
  ];

  return (
    <div className="font-sans text-slate-200 antialiased bg-black selection:bg-white/20 selection:text-white overflow-x-hidden">

      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-[60] bg-green-500/90 backdrop-blur-xl border border-green-400/20 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-5 duration-500 flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          <div>
            <p className="font-bold">{s.payment.paymentSuccess}</p>
            <p className="text-sm text-green-100">{s.payment.paymentSuccessDesc}</p>
          </div>
        </div>
      )}

      {showCancelMessage && (
        <div className="fixed top-4 right-4 z-[60] bg-black/90 backdrop-blur-xl border border-white/10 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-5 duration-500 flex items-center gap-3">
          <X className="w-6 h-6" />
          <div>
            <p className="font-bold">{s.payment.paymentCanceled}</p>
            <p className="text-sm text-slate-300">{s.payment.paymentCanceledDesc}</p>
          </div>
        </div>
      )}

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`max-w-7xl mx-auto px-6 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border border-white/10 mx-4 shadow-2xl' : 'bg-transparent'}`}>
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <LeDonnaLogo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white group-hover:text-gray-300 transition-colors leading-none">Le Donna</span>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 font-medium">{s.brandSubtitle}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </a>
              ))}
              <a
                href={`/${lang}/blog`}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </a>
              <LanguageSwitcher />
              <Button variant="glow" className="py-2 px-6 text-sm rounded-lg" onClick={handleBookDemo}>
                {t.nav.bookDemo}
              </Button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <VideoBackground />

        <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <ParallaxItem speed={-0.2} className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-white">{t.hero.badge}</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
              {t.hero.headline1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white animate-gradient bg-[length:200%_auto]">
                {t.hero.headline2}
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-lg leading-relaxed font-light border-l-2 border-white pl-6">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button variant="primary" onClick={() => document.getElementById('audio-proof').scrollIntoView()}>
                <Play className="w-4 h-4 mr-2" />
                {t.hero.ctaDemo}
              </Button>
              <Button variant="secondary" className="group" onClick={() => document.getElementById('pricing').scrollIntoView()}>
                {t.hero.ctaPricing}
              </Button>
            </div>
          </ParallaxItem>

          <ParallaxItem speed={0.1} className="relative hidden lg:block">
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-gray-300/20 rounded-[3rem] blur-xl transform rotate-6" />

              <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-scan" />

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/50">
                      <Mic className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">{t.hero.phoneCard.activeCall}</div>
                      <div className="font-mono text-white">00:42</div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                     {[1,3,2,4,2,3,1].map((h, i) => (
                       <div key={i} className="w-1 bg-white rounded-full animate-music" style={{height: `${h * 6}px`, animationDelay: `${i * 0.1}s`}}></div>
                     ))}
                  </div>
                </div>

                <div className="space-y-6 my-auto">
                   <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 backdrop-blur-sm">
                    <p className="text-sm text-slate-300">{t.hero.phoneCard.callerMessage}</p>
                  </div>
                  <div className="bg-white/90 p-4 rounded-2xl rounded-tr-none ml-auto max-w-[90%] shadow-lg border border-white/10">
                    <p className="text-sm text-black">{t.hero.phoneCard.aiResponse}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                   <div className="text-xs text-slate-500 uppercase tracking-widest">{t.hero.phoneCard.sentimentAnalysis}</div>
                   <div className="flex items-center text-green-400 text-sm font-bold">
                     <TrendingUp className="w-4 h-4 mr-1" />
                     {t.hero.phoneCard.positive}
                   </div>
                </div>
              </div>

              <div className="absolute -right-8 top-1/2 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 rounded-full p-1.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{t.hero.phoneCard.taskCompleted}</div>
                    <div className="text-sm font-bold text-white">{t.hero.phoneCard.bookingConfirmed}</div>
                  </div>
                </div>
              </div>
            </div>
          </ParallaxItem>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-xs uppercase tracking-widest text-slate-400">{t.hero.scroll}</span>
          <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent" />
        </div>
      </div>

      <Section id="audio-proof" className="bg-black">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.audioProof.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/50 transition-all group cursor-pointer" onClick={toggleProductAudio}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{t.audioProof.card1Title}</h3>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isPlayingProduct ? 'bg-white/40 animate-pulse' : 'bg-white/20 group-hover:bg-white/30'}`}>
                {isPlayingProduct ? <div className="flex space-x-1">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-1 bg-white rounded-full animate-music" style={{height: `${i * 4}px`, animationDelay: `${i * 0.1}s`}}></div>
                  ))}
                </div> : <Play className="w-6 h-6 text-white" />}
              </div>
            </div>
            <p className="text-slate-400 text-sm">{t.audioProof.card1Desc}</p>
            <audio ref={productAudioRef} src="/audio/choosing-barbeque.mp3" preload="metadata" />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/50 transition-all group cursor-pointer" onClick={toggleRestaurantAudio}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{t.audioProof.card2Title}</h3>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isPlayingRestaurant ? 'bg-white/40 animate-pulse' : 'bg-white/20 group-hover:bg-white/30'}`}>
                {isPlayingRestaurant ? <div className="flex space-x-1">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-1 bg-white rounded-full animate-music" style={{height: `${i * 4}px`, animationDelay: `${i * 0.1}s`}}></div>
                  ))}
                </div> : <Play className="w-6 h-6 text-white" />}
              </div>
            </div>
            <p className="text-slate-400 text-sm">{t.audioProof.card2Desc}</p>
            <audio ref={restaurantAudioRef} src="/audio/booking-table.mp3" preload="metadata" />
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm max-w-2xl mx-auto">
          <span className="font-semibold text-slate-400">Note:</span> {t.audioProof.note}
        </p>
      </Section>

      <Section id="problem" className="bg-gradient-to-b from-black to-black">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.problem.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-red-500/20 hover:border-red-500/40 transition-all">
            <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.problem.card1Title}</h3>
            <p className="text-slate-400 leading-relaxed mb-4">{t.problem.card1Desc}</p>
            <p className="text-white font-semibold">{t.problem.card1Solution}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-red-500/20 hover:border-red-500/40 transition-all">
            <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.problem.card2Title}</h3>
            <p className="text-slate-400 leading-relaxed mb-4">{t.problem.card2Desc}</p>
            <p className="text-white font-semibold">{t.problem.card2Solution}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-red-500/20 hover:border-red-500/40 transition-all">
            <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Phone className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.problem.card3Title}</h3>
            <p className="text-slate-400 leading-relaxed mb-4">{t.problem.card3Desc}</p>
            <p className="text-white font-semibold">{t.problem.card3Solution}</p>
          </div>
        </div>
      </Section>

      <Section id="methodology" className="py-32">
        <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-white/5 -z-10" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-3xl border border-red-500/20 transform scale-90 origin-right opacity-60 hover:opacity-100 transition-all duration-500">
               <div className="flex items-center gap-4 mb-6 text-red-400">
                 <X className="w-8 h-8" />
                 <h3 className="text-2xl font-bold">{t.methodology.legacyTitle}</h3>
               </div>
               <div className="space-y-4 text-slate-400">
                 <div className="flex justify-between border-b border-white/5 pb-2">
                   <span>{t.methodology.costPerMinute}</span>
                   <span className="text-white font-mono">{t.methodology.legacyCost}</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                   <span>{t.methodology.availability}</span>
                   <span className="text-white font-mono">{t.methodology.legacyAvailability}</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                   <span>{t.methodology.capacity}</span>
                   <span className="text-white font-mono">{t.methodology.legacyCapacity}</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                   <span>{t.methodology.trainingTime}</span>
                   <span className="text-white font-mono">{t.methodology.legacyTraining}</span>
                 </div>
               </div>
            </div>

            <div className="absolute top-10 -right-4 md:-right-12 bg-black/90 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl shadow-white/20 transform md:scale-105 z-10 hover:-translate-y-2 transition-transform duration-500">
               <div className="absolute -top-4 -right-4 bg-white text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">{t.methodology.futureLabel}</div>
               <div className="flex items-center gap-4 mb-6 text-white">
                 <Zap className="w-8 h-8" />
                 <h3 className="text-2xl font-bold text-white">{t.methodology.leDonnaTitle}</h3>
               </div>
               <div className="space-y-4 text-slate-300">
                 <div className="flex justify-between items-center border-b border-white/30 pb-2">
                   <span>{t.methodology.costPerMinute}</span>
                   <span className="text-green-400 font-bold font-mono text-xl">{t.methodology.donnaCost}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/30 pb-2">
                   <span>{t.methodology.availability}</span>
                   <span className="text-white font-mono text-lg">{t.methodology.donnaAvailability}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/30 pb-2">
                   <span>{t.methodology.capacity}</span>
                   <span className="text-white font-mono text-lg">{t.methodology.donnaCapacity}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/30 pb-2">
                   <span>{t.methodology.trainingTime}</span>
                   <span className="text-white font-mono text-lg">{t.methodology.donnaTraining}</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="order-1 md:order-2 text-left md:pl-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t.methodology.title} <br /><span className="text-white">{t.methodology.subtitle}</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">{t.methodology.description}</p>
            <div className="flex items-center gap-4 text-sm font-medium text-white">
               <div className="flex -space-x-4">
                  {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gray-700 border-2 border-black" />)}
               </div>
               <p>{t.methodology.replacedAgents}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="use-cases" className="bg-gradient-to-b from-black to-black">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.useCases.title}</h2>
          <p className="text-slate-400 text-lg">{t.useCases.subtitle}</p>
        </div>

        <div className="flex overflow-x-auto pb-12 gap-6 snap-x hide-scrollbar">
          {t.useCases.cases.map((useCase, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/50 transition-colors snap-center">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-white">
                {[<Zap className="w-6 h-6" />, <Calendar className="w-6 h-6" />, <Phone className="w-6 h-6" />][i]}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{lang === 'fr' ? 'Id\u00e9al pour ' : lang === 'it' ? 'Perfetto per ' : 'Perfect for '}{useCase.industry}</h3>
              <p className="text-slate-300 leading-relaxed">{useCase.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="pricing" className="relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.pricing.title}</h2>
          <p className="text-slate-400">{t.pricing.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {t.pricing.plans.map((plan, index) => {
            const recommended = index === 1;
            return (
              <div key={index} className={`relative p-1 rounded-3xl ${recommended ? 'bg-gradient-to-b from-white to-gray-300 shadow-2xl shadow-white/20 -translate-y-4' : 'bg-black/50 border border-white/10'}`}>
                <div className="h-full bg-black/90 backdrop-blur-xl rounded-[1.3rem] p-8 flex flex-col">
                  {recommended && (
                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                       {t.pricing.bestValue}
                     </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-xl font-medium text-slate-300 mb-2">{plan.title}</h3>
                    <div className="flex items-baseline gap-1">
                      {plan.price !== 'Custom' && <span className="text-sm align-top text-slate-500">$</span>}
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      {plan.price !== 'Custom' && <span className="text-slate-500">/mo</span>}
                    </div>
                    <p className="text-slate-500 mt-4 text-sm">{plan.desc}</p>
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-center text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-white mr-3 flex-shrink-0" />
                        {feat}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={recommended ? 'glow' : 'secondary'}
                    className="w-full"
                    onClick={() => {
                      if (plan.price === "200") {
                        window.open('https://tidycal.com/rajsuyash/200', '_blank');
                      } else if (plan.price === "500") {
                        window.open('https://tidycal.com/rajsuyash/500', '_blank');
                      } else {
                        window.open('https://tidycal.com/rajsuyash/custom', '_blank');
                      }
                    }}
                  >
                    {plan.price === "Custom" ? t.pricing.contactSales : t.pricing.bookOnboarding}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <footer id="contact" className="bg-black text-slate-400 py-20 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <LeDonnaLogo className="w-10 h-10" />
                <span className="text-3xl font-bold text-white">Le Donna</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">{t.footer.readyTitle}</h3>
              <p className="mb-8 text-lg">{t.footer.readyDesc}</p>
              <div className="space-y-4">
                 <a href="mailto:rajsuyash@gmail.com" className="flex items-center text-white hover:text-gray-300 transition-colors">
                   <MessageSquare className="w-5 h-5 mr-3" /> rajsuyash@gmail.com
                 </a>
                 <div className="flex items-center text-white">
                   <Phone className="w-5 h-5 mr-3" /> +33 07 66 15 84 99
                 </div>
                 <div className="flex items-start text-white">
                   <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                   <span>28 Av Simon Bolivar, <br/>75019 France</span>
                 </div>
              </div>
            </div>

            <form className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder={t.footer.namePlaceholder} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white outline-none transition-colors" />
                <input placeholder={t.footer.companyPlaceholder} className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white outline-none transition-colors" />
              </div>
              <input type="email" placeholder={t.footer.emailPlaceholder} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white outline-none transition-colors" />
              <Button variant="glow" className="w-full" onClick={handleBookDemo}>{t.footer.requestDemo}</Button>
            </form>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-sm">
            <p>{s.footer.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">{s.footer.privacy}</a>
              <a href="#" className="hover:text-white">{s.footer.terms}</a>
              <a href="#" className="hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
      </footer>

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSuccess={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
