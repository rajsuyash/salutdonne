import { useState, useEffect, useRef } from 'react';
import { Phone, Globe, Clock, ChefHat, Star, TrendingUp, Check, ArrowRight, X, Mic } from 'lucide-react';
import { useLanguage, getLeDonnaTranslations, getSharedTranslations } from './i18n';
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

const ParallaxItem = ({ children, speed = 0.1, className = '' }: { children: React.ReactNode; speed?: number; className?: string }) => {
  const scrollY = useScroll();
  const ref = useRef<HTMLDivElement>(null);
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
      <path d="M30 15H55C75 15 90 30 90 50C90 70 75 85 55 85H30V15Z" stroke="url(#logo_gradient_ld)" strokeWidth="8" />
      <path d="M45 50L50 35L55 65L60 45L65 55L70 50" stroke="#E5E5E5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
      <defs>
        <linearGradient id="logo_gradient_ld" x1="30" y1="15" x2="90" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D1D5DB" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default function LeDonna() {
  const { lang } = useLanguage();
  const t = getLeDonnaTranslations(lang);
  const s = getSharedTranslations(lang);

  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollY = useScroll();
  const scrolled = scrollY > 20;

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => setIsPlaying(false));
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  const handleDemo = () => {
    window.open('https://tidycal.com/rajsuyash/200', '_blank');
  };

  const handleCallDemo = () => {
    window.location.href = 'tel:+33XXXXXXXXX';
  };

  return (
    <div className="min-h-screen bg-black text-slate-200">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`max-w-7xl mx-auto px-6 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border border-white/10 mx-4 shadow-2xl' : 'bg-transparent'}`}>
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <LeDonnaLogo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white group-hover:text-gray-300 transition-colors leading-none">Le Donna</span>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 font-medium">{s.brandSubtitle}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`/${lang}/blog`}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Blog
              </a>
              <LanguageSwitcher />
              <button
                onClick={handleDemo}
                className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-all font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                {t.header.trialButton}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <section className="relative bg-black py-32 overflow-hidden min-h-screen flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ParallaxItem speed={-0.2} className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white">{t.hero.badge}</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter">
                  {t.hero.headline1}<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white animate-gradient bg-[length:200%_auto]">{t.hero.headline2}</span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-lg font-light border-l-2 border-white pl-6">
                  {t.hero.description}
                </p>

                <p className="text-lg text-white font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 inline-block">
                  {t.hero.compatibility}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={handleDemo}
                    className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-500 transform hover:scale-105 active:scale-95 font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                  >
                    {t.hero.ctaPrimary} <ArrowRight className="w-5 h-5" />
                  </button>
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
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">{t.hero.phoneDemo.status}</div>
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
                        <p className="text-sm text-slate-300">{t.hero.phoneDemo.message1}</p>
                      </div>
                      <div className="bg-white/90 p-4 rounded-2xl rounded-tr-none ml-auto max-w-[90%] shadow-lg border border-white/10">
                        <p className="text-sm text-black">{t.hero.phoneDemo.message2}</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <div className="text-xs text-slate-500 uppercase tracking-widest">{t.hero.phoneDemo.analysis}</div>
                      <div className="flex items-center text-green-400 text-sm font-bold">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {t.hero.phoneDemo.sentiment}
                      </div>
                    </div>
                  </div>

                  <div className="absolute -right-8 top-1/2 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl animate-float">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 rounded-full p-1.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">{t.hero.phoneDemo.reservation}</div>
                        <div className="text-sm font-bold text-white">{t.hero.phoneDemo.confirmed}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ParallaxItem>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span className="text-xs uppercase tracking-widest text-slate-400">{t.hero.scrollIndicator}</span>
            <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent" />
          </div>
        </section>

        <section className="py-20 bg-black text-white border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.howItWorks.title}</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {[
                { num: 1, title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
                { num: 2, title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
                { num: 3, title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
                { num: 4, title: t.howItWorks.step4Title, desc: t.howItWorks.step4Desc },
              ].map((step) => (
                <div key={step.num} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold">{step.num}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/10">
              <p className="text-sm text-slate-300 text-center leading-relaxed">
                <strong className="text-white">{t.howItWorks.securityLabel}</strong> {t.howItWorks.securityNote}
              </p>
            </div>

            <div className="max-w-3xl mx-auto mt-16">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t.howItWorks.audioTitle}</h3>
                    <p className="text-slate-300 text-base md:text-lg">{t.howItWorks.audioDesc}</p>
                  </div>
                  <button
                    onClick={toggleAudio}
                    className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 group"
                  >
                    {isPlaying ? (
                      <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center gap-1">
                        <div className="w-1 h-4 md:h-5 bg-white rounded-full animate-pulse"></div>
                        <div className="w-1 h-4 md:h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    ) : (
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">{t.features.title}</h2>
              <p className="text-xl text-slate-400 mb-12 text-center">{t.features.subtitle}</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: <TrendingUp className="w-6 h-6 text-white" />, title: t.features.feature1Title, desc: t.features.feature1Desc },
                  { icon: <Globe className="w-6 h-6 text-white" />, title: t.features.feature2Title, desc: t.features.feature2Desc },
                  { icon: <Clock className="w-6 h-6 text-white" />, title: t.features.feature3Title, desc: t.features.feature3Desc },
                  { icon: <ChefHat className="w-6 h-6 text-white" />, title: t.features.feature4Title, desc: t.features.feature4Desc },
                  { icon: <Star className="w-6 h-6 text-white" />, title: t.features.feature5Title, desc: t.features.feature5Desc },
                  { icon: <Check className="w-6 h-6 text-white" />, title: t.features.feature6Title, desc: t.features.feature6Desc },
                ].map((feature, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                    <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-300">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">{t.testimonials.title}</h2>

              <div className="space-y-6">
                {[
                  { text: t.testimonials.testimonial1, author: t.testimonials.testimonial1Author, role: t.testimonials.testimonial1Role },
                  { text: t.testimonials.testimonial2, author: t.testimonials.testimonial2Author, role: t.testimonials.testimonial2Role },
                  { text: t.testimonials.testimonial3, author: t.testimonials.testimonial3Author, role: t.testimonials.testimonial3Role },
                ].map((testimonial, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400 transition-transform duration-300 group-hover:scale-110" style={{transitionDelay: `${j * 50}ms`}} />
                      ))}
                    </div>
                    <p className="text-lg text-slate-300 mb-4 leading-relaxed">{testimonial.text}</p>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-12 border-t border-white/10">
                <p className="text-center text-slate-400 mb-8 text-sm uppercase tracking-wider">{t.testimonials.usedBy}</p>
                <div className="flex flex-wrap justify-center gap-6">
                  {['Le Marais', 'Saint-Germain', 'Op\u00e9ra', '6\u00e8me arrondissement', 'Montmartre'].map((area) => (
                    <div key={area} className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                      <span className="font-semibold text-white">{area}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-white font-semibold mt-8 text-lg">{t.testimonials.restaurantCount}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">{t.pricing.title}</h2>
              <p className="text-xl text-slate-400 mb-12 text-center">{t.pricing.subtitle}</p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">{t.pricing.starterTitle}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">{t.pricing.starterPrice}</span>
                    <span className="text-slate-400">{t.pricing.perMonth}</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-6">{t.pricing.starterSubtext}</p>
                  <ul className="space-y-3 mb-8">
                    {t.pricing.starterFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleDemo}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-full hover:bg-white/20 transition-all duration-500 transform hover:scale-105 active:scale-95 font-semibold"
                  >
                    {t.pricing.starterButton}
                  </button>
                </div>

                <div className="relative bg-gradient-to-b from-white to-gray-200 rounded-3xl p-1 transform scale-105 shadow-2xl shadow-white/20 hover:scale-110 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg animate-pulse">
                    {t.pricing.proPopular}
                  </div>
                  <div className="h-full bg-black/90 backdrop-blur-xl rounded-[1.3rem] p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-scan" />
                    <h3 className="text-2xl font-bold text-white mb-2">{t.pricing.proTitle}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-white">{t.pricing.proPrice}</span>
                      <span className="text-slate-400">{t.pricing.perMonth}</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-6">{t.pricing.proSubtext}</p>
                    <ul className="space-y-3 mb-8 text-white">
                      {t.pricing.proFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300">{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={handleDemo}
                      className="w-full bg-white text-black py-3 rounded-full hover:bg-gray-100 transition-all duration-500 transform hover:scale-105 active:scale-95 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                    >
                      {t.pricing.proButton}
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">{t.pricing.enterpriseTitle}</h3>
                  <div className="mb-6">
                    <span className="text-2xl font-bold text-white">{t.pricing.enterprisePrice}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {t.pricing.enterpriseFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleDemo}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-full hover:bg-white/20 transition-all duration-500 transform hover:scale-105 active:scale-95 font-semibold"
                  >
                    {t.pricing.enterpriseButton}
                  </button>
                </div>
              </div>

              <p className="text-center text-slate-400 mt-8">{t.pricing.footnote}</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">{t.faq.title}</h2>

              <div className="space-y-6">
                {t.faq.items.map((item, i) => (
                  <details key={i} className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all group">
                    <summary className="font-semibold text-lg text-white cursor-pointer list-none flex justify-between items-center">
                      {item.q}
                      <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90 text-slate-400" />
                    </summary>
                    <p className="mt-4 text-slate-300 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black border-t border-white/10 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.final.title}</h2>
              <p className="text-xl text-slate-400 mb-12">{t.final.subtitle}</p>

              <div className="max-w-md mx-auto mb-12">
                <button
                  onClick={handleDemo}
                  className="w-full bg-white text-black px-8 py-5 rounded-full hover:bg-gray-100 transition-all font-bold text-xl shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] flex items-center justify-center gap-2"
                >
                  {t.final.ctaButton} <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-sm text-slate-400 mt-4">{t.final.ctaSubtext}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">🔒</div>
                  <p className="text-sm text-slate-400">{t.final.trust1}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">🇫🇷</div>
                  <p className="text-sm text-slate-400">{t.final.trust2}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">💬</div>
                  <p className="text-sm text-slate-400">{t.final.trust3}</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-400">{t.final.trust4}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-slate-400 py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <LeDonnaLogo className="w-6 h-6" />
              <span className="text-xl font-bold text-white">Le Donna</span>
            </div>
            <p className="mb-4">{t.footer.tagline}</p>
            <p className="text-sm">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>

      <audio
        ref={audioRef}
        src="/audio/booking-table.mp3"
        preload="metadata"
      />
    </div>
  );
}
