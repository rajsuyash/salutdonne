import { useState, useEffect, useRef } from 'react';
import { Phone, Globe, Clock, ChefHat, Star, TrendingUp, Check, ArrowRight, X, Mic } from 'lucide-react';
import { translations } from './translations';

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

export default function LeDonna() {
  const [languageToggle, setLanguageToggle] = useState<'fr' | 'en'>('fr');
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollY = useScroll();
  const scrolled = scrollY > 20;
  const t = translations[languageToggle];

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
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
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 font-medium">AI Voice Assistant</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={handleDemo}
                className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-all font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                Essai gratuit 14 jours
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
                  Chaque appel manqué,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white animate-gradient bg-[length:200%_auto]">c'est une table vide</span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-lg font-light border-l-2 border-white pl-6">
                  Le Donna répond à chaque appel, réserve automatiquement, et synchronise avec votre système existant—24h/24, 7j/7.
                </p>

                <p className="text-lg text-white font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 inline-block">
                  Compatible avec TheFork, Zenchef, Guestonline. Installation en moins de 30 minutes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={handleDemo}
                    className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-500 transform hover:scale-105 active:scale-95 font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                  >
                    Voir comment Le Donna réserve une vraie table <ArrowRight className="w-5 h-5" />
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Comment ça marche</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Le téléphone sonne</h3>
                <p className="text-slate-300 text-sm">Un touriste appelle—même pendant le service</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Le Donna répond</h3>
                <p className="text-slate-300 text-sm">En anglais parfait, accueil chaleureux</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Réservation confirmée</h3>
                <p className="text-slate-300 text-sm">Vérifie la disponibilité et réserve</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold">4</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Synchronisation automatique</h3>
                <p className="text-slate-300 text-sm">Apparaît dans votre système</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/10">
              <p className="text-sm text-slate-300 text-center leading-relaxed">
                <strong className="text-white">Garantie de sécurité :</strong> Le Donna ne confirme jamais une réservation sans vérifier d'abord la disponibilité dans votre système.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mt-16">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Réserver une table au restaurant</h3>
                    <p className="text-slate-300 text-base md:text-lg">Écoutez comment Le Donna gère les réservations de restaurant de manière naturelle et efficace.</p>
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Pourquoi les restaurants parisiens choisissent Le Donna</h2>
              <p className="text-xl text-slate-400 mb-12 text-center">Des résultats concrets pour votre restaurant</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                  <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-500">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Récupérez les revenus perdus</h3>
                  <p className="text-slate-300">
                    Transformez les appels manqués en réservations confirmées. Les restaurants utilisant Le Donna rapportent <span className="font-bold text-white">20-35% de réservations en plus</span> de clients internationaux.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                  <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-500">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Parlez la langue de chaque touriste</h3>
                  <p className="text-slate-300">
                    Anglais, espagnol, allemand, italien, mandarin, japonais, portugais, arabe—Le Donna les gère tous couramment.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                  <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-500">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Disponibilité 24h/24, 7j/7</h3>
                  <p className="text-slate-300">
                    Les touristes appellent à des heures étranges. Peut-être sont-ils encore à l'heure de New York. Le Donna est toujours là.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                  <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-500">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Libérez votre personnel</h3>
                  <p className="text-slate-300">
                    Votre équipe devrait servir les clients, pas lutter avec les appels téléphoniques. Laissez Le Donna gérer les téléphones.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                  <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-500">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Améliorez vos avis</h3>
                  <p className="text-slate-300">
                    "Ils étaient si serviables au téléphone !" Les clients internationaux laissent de meilleurs avis quand leur première interaction est fluide.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                  <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-500">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Intégration transparente</h3>
                  <p className="text-slate-300">
                    Le Donna fonctionne avec votre système de réservation existant—TheFork, Zenchef, Guestonline, ou votre propre système.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">La confiance des restaurants à travers Paris</h2>

              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 transition-transform duration-300 group-hover:scale-110" style={{transitionDelay: `${i * 50}ms`}} />
                    ))}
                  </div>
                  <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                    "Nous sommes passés de la perte de 30% des appels en anglais à la conversion de presque tous. Le mois dernier seulement, Le Donna nous a apporté 8 000€ supplémentaires en réservations touristiques."
                  </p>
                  <p className="font-semibold text-white">Olivier M.</p>
                  <p className="text-sm text-slate-400">Propriétaire de Bistrot, 6ème arrondissement</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 transition-transform duration-300 group-hover:scale-110" style={{transitionDelay: `${i * 50}ms`}} />
                    ))}
                  </div>
                  <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                    "Mon personnel redoutait le téléphone. Maintenant Le Donna gère parfaitement les touristes, et nous voyons simplement apparaître les réservations. C'est magique."
                  </p>
                  <p className="font-semibold text-white">Marie-Claire D.</p>
                  <p className="text-sm text-slate-400">Responsable de Restaurant, Saint-Germain</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 transition-transform duration-300 group-hover:scale-110" style={{transitionDelay: `${i * 50}ms`}} />
                    ))}
                  </div>
                  <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                    "Un groupe de touristes japonais a appelé pour réserver pour 12 personnes. Avant Le Donna, nous les aurions perdus. Au lieu de cela, ils sont venus, ont dépensé 1 400€, et ont laissé un avis 5 étoiles."
                  </p>
                  <p className="font-semibold text-white">Thomas R.</p>
                  <p className="text-sm text-slate-400">Propriétaire de Brasserie, Opéra</p>
                </div>
              </div>

              <div className="mt-16 pt-12 border-t border-white/10">
                <p className="text-center text-slate-400 mb-8 text-sm uppercase tracking-wider">Utilisé par des restaurants dans</p>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                    <span className="font-semibold text-white">Le Marais</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                    <span className="font-semibold text-white">Saint-Germain</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                    <span className="font-semibold text-white">Opéra</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                    <span className="font-semibold text-white">6ème arrondissement</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                    <span className="font-semibold text-white">Montmartre</span>
                  </div>
                </div>
                <p className="text-center text-white font-semibold mt-8 text-lg">+ de 200 restaurants à Paris</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Tarification simple et transparente</h2>
              <p className="text-xl text-slate-400 mb-12 text-center">Choisissez le plan qui convient à votre restaurant</p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">149€</span>
                    <span className="text-slate-400">/mois</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-6">≈ 1 table manquée par mois</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Jusqu'à 200 appels/mois</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Anglais + 2 langues supplémentaires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Prise de réservations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Réponses aux questions de base</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleDemo}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-full hover:bg-white/20 transition-all duration-500 transform hover:scale-105 active:scale-95 font-semibold"
                  >
                    Essayer Gratuitement
                  </button>
                </div>

                <div className="relative bg-gradient-to-b from-white to-gray-200 rounded-3xl p-1 transform scale-105 shadow-2xl shadow-white/20 hover:scale-110 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg animate-pulse">
                    Le Plus Populaire
                  </div>
                  <div className="h-full bg-black/90 backdrop-blur-xl rounded-[1.3rem] p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-scan" />
                    <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-white">299€</span>
                      <span className="text-slate-400">/mois</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-6">Se rentabilise avec 3 réservations/semaine</p>
                    <ul className="space-y-3 mb-8 text-white">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">Appels illimités</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">Toutes les 30+ langues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">Gestion complète des réservations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">Questions menu et diététiques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">Messages d'accueil personnalisés</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">Tableau de bord analytique</span>
                      </li>
                    </ul>
                    <button
                      onClick={handleDemo}
                      className="w-full bg-white text-black py-3 rounded-full hover:bg-gray-100 transition-all duration-500 transform hover:scale-105 active:scale-95 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                    >
                      Commencer Maintenant
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                  <div className="mb-6">
                    <span className="text-2xl font-bold text-white">Sur mesure</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Support multi-sites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Intégrations personnalisées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Support prioritaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Gestionnaire de compte dédié</span>
                    </li>
                  </ul>
                  <button
                    onClick={handleDemo}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-full hover:bg-white/20 transition-all duration-500 transform hover:scale-105 active:scale-95 font-semibold"
                  >
                    Nous Contacter
                  </button>
                </div>
              </div>

              <p className="text-center text-slate-400 mt-8">
                Essai gratuit de 14 jours. Aucune carte bancaire requise. Pas de frais d'installation. Annulez à tout moment.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Questions fréquentes</h2>

              <div className="space-y-6">
                <details className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all group">
                  <summary className="font-semibold text-lg text-white cursor-pointer list-none flex justify-between items-center">
                    Les appelants sauront-ils qu'ils parlent à une IA ?
                    <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90 text-slate-400" />
                  </summary>
                  <p className="mt-4 text-slate-300 leading-relaxed">
                    Le Donna semble remarquablement humaine et naturelle. La plupart des appelants ne se rendent pas compte—et ne s'en soucient pas—tant que leur réservation est confirmée rapidement et professionnellement.
                  </p>
                </details>

                <details className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all group">
                  <summary className="font-semibold text-lg text-white cursor-pointer list-none flex justify-between items-center">
                    Et si un appelant a une demande complexe ?
                    <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90 text-slate-400" />
                  </summary>
                  <p className="mt-4 text-slate-300 leading-relaxed">
                    Le Donna peut transférer les appels à votre personnel pour des situations spéciales. Elle gère les appels de routine afin que votre équipe ne traite que les exceptions.
                  </p>
                </details>

                <details className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all group">
                  <summary className="font-semibold text-lg text-white cursor-pointer list-none flex justify-between items-center">
                    Cela fonctionne-t-il avec mon numéro de téléphone actuel ?
                    <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90 text-slate-400" />
                  </summary>
                  <p className="mt-4 text-slate-300 leading-relaxed">
                    Oui. Nous mettons en place un simple transfert d'appel. Vous gardez votre numéro ; Le Donna y répond.
                  </p>
                </details>

                <details className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all group">
                  <summary className="font-semibold text-lg text-white cursor-pointer list-none flex justify-between items-center">
                    Qu'en est-il de mon système de réservation ?
                    <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90 text-slate-400" />
                  </summary>
                  <p className="mt-4 text-slate-300 leading-relaxed">
                    Le Donna s'intègre avec TheFork, Zenchef, Guestonline, Resy et la plupart des grandes plateformes. Intégrations personnalisées disponibles.
                  </p>
                </details>

                <details className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all group">
                  <summary className="font-semibold text-lg text-white cursor-pointer list-none flex justify-between items-center">
                    Le Donna peut-elle aussi gérer les appelants français ?
                    <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90 text-slate-400" />
                  </summary>
                  <p className="mt-4 text-slate-300 leading-relaxed">
                    Absolument. Elle parle couramment le français et répondra dans la langue que l'appelant utilise.
                  </p>
                </details>

                <details className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all group">
                  <summary className="font-semibold text-lg text-white cursor-pointer list-none flex justify-between items-center">
                    Et si je veux annuler ?
                    <ArrowRight className="w-5 h-5 transition-transform group-open:rotate-90 text-slate-400" />
                  </summary>
                  <p className="mt-4 text-slate-300 leading-relaxed">
                    Pas de contrats à long terme. Annulez à tout moment avec un préavis de 30 jours.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black border-t border-white/10 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Prêt à ne plus jamais manquer un appel ?</h2>
              <p className="text-xl text-slate-400 mb-12">
                Rejoignez 200+ restaurants parisiens qui capturent chaque réservation avec Le Donna.
              </p>

              <div className="max-w-md mx-auto mb-12">
                <button
                  onClick={handleDemo}
                  className="w-full bg-white text-black px-8 py-5 rounded-full hover:bg-gray-100 transition-all font-bold text-xl shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] flex items-center justify-center gap-2"
                >
                  Essai gratuit 14 jours <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-sm text-slate-400 mt-4">Aucune carte requise • Installation en 30 minutes</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">🔒</div>
                  <p className="text-sm text-slate-400">Conforme RGPD</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">🇫🇷</div>
                  <p className="text-sm text-slate-400">Fait pour l'hospitalité française</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">💬</div>
                  <p className="text-sm text-slate-400">Support en FR & EN</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-400">4.9/5 de 200+ restaurants</p>
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
        src="https://uegkdaedcqiuqxdidkgt.supabase.co/storage/v1/object/sign/donna/recording%20-%20isolated.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NDkzYmJkZS00MGJjLTQ3YzItODM3MC1hNzM4MDk1ZmZkNDciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJkb25uYS9yZWNvcmRpbmcgLSBpc29sYXRlZC5tcDMiLCJpYXQiOjE3NzE2OTE3ODksImV4cCI6MTgwMzIyNzc4OX0.x2ZXfD-g5IArQM_OrAOOMR_uVWXcN0UB-RYs3GQmESs"
        preload="metadata"
      />
    </div>
  );
}
