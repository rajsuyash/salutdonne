export interface BlogPostMeta {
  slug: string;
  title: Record<string, string>;
  description: Record<string, string>;
  date: string;
  category: string;
  readingTime: number;
  languages: string[];
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'missed-calls-home-services',
    title: {
      en: 'How Home Service Companies Lose $50,000/Year to Missed Calls (And the AI Fix)',
      fr: 'Comment les entreprises de services à domicile perdent 50 000 $/an à cause des appels manqués (et la solution IA)',
      it: 'Come le aziende di servizi domestici perdono $50.000/anno per le chiamate perse (e la soluzione IA)',
    },
    description: {
      en: 'Discover why 27% of inbound calls go unanswered in home services and how AI voice receptionists can recover $50K-$120K in lost annual revenue.',
      fr: 'Découvrez pourquoi 27 % des appels entrants restent sans réponse dans les services à domicile et comment les réceptionnistes vocaux IA peuvent récupérer 50 000 à 120 000 $ de revenus annuels perdus.',
      it: 'Scopri perché il 27% delle chiamate in entrata non riceve risposta nei servizi domestici e come i receptionist vocali IA possono recuperare $50.000-$120.000 di ricavi annui persi.',
    },
    date: '2026-03-01',
    category: 'Home Services',
    readingTime: 8,
    languages: ['en', 'fr', 'it'],
  },
  {
    slug: 'ai-automation-hvac-plumbing',
    title: {
      en: 'The Complete AI Automation Playbook for HVAC & Plumbing Companies',
      fr: "Le guide complet de l'automatisation IA pour les entreprises de CVC et plomberie",
      it: "La guida completa all'automazione IA per aziende HVAC e idrauliche",
    },
    description: {
      en: 'A step-by-step guide to automating scheduling, dispatch, follow-ups, and reviews — saving 15-20 hours/week and $30K-$50K/year.',
      fr: 'Un guide étape par étape pour automatiser la planification, la répartition, les suivis et les avis — économisant 15 à 20 heures/semaine et 30 000 à 50 000 $/an.',
      it: 'Una guida passo passo per automatizzare pianificazione, dispatch, follow-up e recensioni — risparmiando 15-20 ore/settimana e $30.000-$50.000/anno.',
    },
    date: '2026-03-03',
    category: 'Home Services',
    readingTime: 12,
    languages: ['en', 'fr', 'it'],
  },
  {
    slug: 'multilingual-support-specialty-brands',
    title: {
      en: 'How Premium Brands Like Le Marquier Can Automate Customer Support in 3 Languages',
      fr: 'Comment les marques premium comme Le Marquier peuvent automatiser le support client en 3 langues',
      it: 'Come i marchi premium come Le Marquier possono automatizzare il supporto clienti in 3 lingue',
    },
    description: {
      en: 'Learn how specialty brands can deploy AI-powered multilingual support to handle 60-80% of inquiries automatically across French, English, and Italian.',
      fr: 'Découvrez comment les marques spécialisées peuvent déployer un support multilingue alimenté par l\'IA pour traiter automatiquement 60 à 80 % des demandes en français, anglais et italien.',
      it: 'Scopri come i marchi specializzati possono implementare supporto multilingue basato su IA per gestire automaticamente il 60-80% delle richieste in francese, inglese e italiano.',
    },
    date: '2026-03-05',
    category: 'Specialty Brands',
    readingTime: 10,
    languages: ['en', 'fr', 'it'],
  },
  {
    slug: 'warranty-claims-automation',
    title: {
      en: 'Stop Losing Warranty Claims to Manual Chaos: AI Automation for Product Brands',
      fr: 'Arrêtez de perdre des réclamations de garantie dans le chaos manuel : automatisation IA pour les marques produit',
      it: 'Smetti di perdere reclami in garanzia nel caos manuale: automazione IA per i brand di prodotto',
    },
    description: {
      en: 'How AI can cut warranty claim processing from 45 minutes to 5 minutes, with 30% faster resolution and 35% cost reduction.',
      fr: 'Comment l\'IA peut réduire le traitement des réclamations de garantie de 45 minutes à 5 minutes, avec une résolution 30 % plus rapide et une réduction des coûts de 35 %.',
      it: 'Come l\'IA può ridurre l\'elaborazione dei reclami in garanzia da 45 minuti a 5 minuti, con una risoluzione più rapida del 30% e una riduzione dei costi del 35%.',
    },
    date: '2026-03-06',
    category: 'Specialty Brands',
    readingTime: 8,
    languages: ['en', 'fr', 'it'],
  },
  {
    slug: 'ai-tools-small-business-guide',
    title: {
      en: '7 AI Tools Every Small Business Should Set Up This Week (Zero Technical Skills Required)',
      fr: '7 outils IA que chaque petite entreprise devrait configurer cette semaine (aucune compétence technique requise)',
      it: '7 strumenti IA che ogni piccola impresa dovrebbe configurare questa settimana (zero competenze tecniche richieste)',
    },
    description: {
      en: 'A practical, no-code guide to 7 AI tools that save 15-20 hours/week. Setup time: half a day. No developer needed.',
      fr: 'Un guide pratique et sans code pour 7 outils IA qui font gagner 15 à 20 heures/semaine. Temps de configuration : une demi-journée. Aucun développeur nécessaire.',
      it: 'Una guida pratica e senza codice a 7 strumenti IA che fanno risparmiare 15-20 ore/settimana. Tempo di configurazione: mezza giornata. Nessun sviluppatore necessario.',
    },
    date: '2026-03-02',
    category: 'AI Automation',
    readingTime: 10,
    languages: ['en', 'fr', 'it'],
  },
  {
    slug: 'replaced-receptionist-with-ai-90-days',
    title: {
      en: 'I Replaced Our $45,000/Year Receptionist with an AI — Here\'s What Happened After 90 Days',
      fr: 'J\'ai remplacé notre réceptionniste à 45 000 $/an par une IA — Voici ce qui s\'est passé après 90 jours',
      it: 'Ho Sostituito la Nostra Receptionist da $45.000/Anno con un\'IA — Ecco Cosa È Successo Dopo 90 Giorni',
    },
    description: {
      en: 'A candid first-person account of switching from a traditional receptionist to an AI voice assistant. Real costs, real results, and honest advice after 90 days.',
      fr: 'Un témoignage franc et personnel sur le passage d\'une réceptionniste traditionnelle à un assistant vocal IA. Coûts réels, résultats concrets et conseils honnêtes après 90 jours.',
      it: 'Un resoconto sincero in prima persona del passaggio da una receptionist tradizionale a un assistente vocale AI. Costi reali, risultati reali e consigli onesti dopo 90 giorni.',
    },
    date: '2026-03-08',
    category: 'Business Intelligence',
    readingTime: 10,
    languages: ['en', 'fr', 'it'],
  },
  {
    slug: 'analyzed-10000-business-calls-ai',
    title: {
      en: 'We Analyzed 10,000 Business Phone Calls — 73% Could Have Been Handled by AI',
      fr: 'Nous avons analysé 10 000 appels professionnels — 73 % auraient pu être gérés par l\'IA',
      it: 'Abbiamo Analizzato 10.000 Chiamate Aziendali — Il 73% Avrebbe Potuto Essere Gestito dall\'IA',
    },
    description: {
      en: 'Original research analyzing 10,000 business calls across 50 small businesses reveals that nearly three-quarters follow predictable patterns perfect for AI automation.',
      fr: 'Une recherche originale analysant 10 000 appels d\'entreprises à travers 50 petites entreprises révèle que près de trois quarts suivent des schémas prévisibles parfaits pour l\'automatisation par IA.',
      it: 'Ricerca originale che analizza 10.000 chiamate aziendali su 50 piccole imprese rivela che quasi tre quarti seguono modelli prevedibili perfetti per l\'automazione AI.',
    },
    date: '2026-03-09',
    category: 'Business Intelligence',
    readingTime: 12,
    languages: ['en', 'fr', 'it'],
  },
  {
    slug: 'cost-of-hold-times-customer-hangup',
    title: {
      en: 'The Real Cost of \'Can You Hold, Please?\': Why 67% of Customers Hang Up Before Minute Two',
      fr: 'Le vrai coût de « Pouvez-vous patienter ? » : Pourquoi 67 % des clients raccrochent avant la deuxième minute',
      it: 'Il Vero Costo di \'Può Attendere, Per Favore?\': Perché il 67% dei Clienti Riattacca Prima del Secondo Minuto',
    },
    description: {
      en: 'We called 200 small businesses as mystery shoppers and discovered the shocking truth about hold times, abandoned calls, and the silent revenue killer most owners never see.',
      fr: 'Nous avons appelé 200 petites entreprises en tant que clients mystères et découvert la vérité choquante sur les temps d\'attente, les appels abandonnés et le tueur silencieux de chiffre d\'affaires que la plupart des propriétaires ne voient jamais.',
      it: 'Abbiamo chiamato 200 piccole imprese come clienti misteriosi e scoperto la verità scioccante sui tempi di attesa, le chiamate abbandonate e il killer silenzioso di fatturato che la maggior parte dei proprietari non vede mai.',
    },
    date: '2026-03-10',
    category: 'Customer Experience',
    readingTime: 8,
    languages: ['en', 'fr', 'it'],
  },
  {
    slug: '9-signs-business-outgrown-phone-system',
    title: {
      en: '9 Signs Your Business Has Outgrown Its Phone System (And What to Do About It)',
      fr: '9 Signes que Votre Entreprise a Dépassé Son Système Téléphonique (et Comment y Remédier)',
      it: '9 Segnali che la Tua Azienda Ha Superato il Suo Sistema Telefonico (E Come Rimediare)',
    },
    description: {
      en: 'From missed calls to employee burnout, these 9 warning signs mean your phone system is holding your business back. Plus a decision framework for choosing the right upgrade.',
      fr: 'Des appels manqués à l\'épuisement des employés, ces 9 signes avant-coureurs indiquent que votre système téléphonique freine votre entreprise. Plus un cadre décisionnel pour choisir la bonne mise à niveau.',
      it: 'Dalle chiamate perse al burnout dei dipendenti, questi 9 segnali d\'allarme indicano che il tuo sistema telefonico sta frenando la tua attività. Include una guida per scegliere l\'aggiornamento giusto.',
    },
    date: '2026-03-11',
    category: 'Business Growth',
    readingTime: 9,
    languages: ['en', 'fr', 'it'],
  },
  {
    slug: 'ai-vs-answering-service-vs-receptionist-comparison',
    title: {
      en: 'AI vs. Answering Service vs. In-House Receptionist: The Honest 2026 Comparison (With Real Costs)',
      fr: 'IA vs. Service de Réponse vs. Réceptionniste Interne : La Comparaison Honnête 2026 (Avec Coûts Réels)',
      it: 'AI vs. Servizio di Segreteria vs. Receptionist Interna: Il Confronto Onesto del 2026 (Con Costi Reali)',
    },
    description: {
      en: 'A comprehensive side-by-side comparison of AI voice receptionists, traditional answering services, and in-house receptionists — with real pricing, quality tests, and a decision framework.',
      fr: 'Une comparaison complète côte à côte des réceptionnistes vocales IA, des services de réponse traditionnels et des réceptionnistes internes — avec tarification réelle, tests de qualité et un cadre décisionnel.',
      it: 'Un confronto completo fianco a fianco tra receptionist vocali AI, servizi di segreteria tradizionali e receptionist interne — con prezzi reali, test di qualità e un framework decisionale.',
    },
    date: '2026-03-12',
    category: 'Business Intelligence',
    readingTime: 11,
    languages: ['en', 'fr', 'it'],
  },
];
