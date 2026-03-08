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
];
