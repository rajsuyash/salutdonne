export type SupportedLang = 'en' | 'fr' | 'it';

export interface BlogTranslations {
  blogTitle: string;
  blogSubtitle: string;
  allCategories: string;
  readMore: string;
  readingTime: string;
  backToBlog: string;
  tableOfContents: string;
  sharePost: string;
  relatedPosts: string;
  bookDemo: string;
  bookDemoDesc: string;
  bookDemoButton: string;
  categories: Record<string, string>;
}

export interface SharedTranslations {
  brandSubtitle: string;
  languageNames: {
    en: string;
    fr: string;
    it: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
  payment: {
    subscribeTo: string;
    perMonth: string;
    emailLabel: string;
    emailPlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    redirecting: string;
    continueToPayment: string;
    securePayment: string;
    paymentSuccess: string;
    paymentSuccessDesc: string;
    paymentCanceled: string;
    paymentCanceledDesc: string;
  };
}

export interface AppTranslations {
  nav: {
    audioProof: string;
    problem: string;
    methodology: string;
    useCases: string;
    pricing: string;
    bookDemo: string;
  };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    description: string;
    ctaDemo: string;
    ctaPricing: string;
    scroll: string;
    phoneCard: {
      activeCall: string;
      callerMessage: string;
      aiResponse: string;
      sentimentAnalysis: string;
      positive: string;
      taskCompleted: string;
      bookingConfirmed: string;
    };
  };
  audioProof: {
    title: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    note: string;
  };
  problem: {
    title: string;
    card1Title: string;
    card1Desc: string;
    card1Solution: string;
    card2Title: string;
    card2Desc: string;
    card2Solution: string;
    card3Title: string;
    card3Desc: string;
    card3Solution: string;
  };
  methodology: {
    title: string;
    subtitle: string;
    description: string;
    legacyTitle: string;
    leDonnaTitle: string;
    costPerMinute: string;
    availability: string;
    capacity: string;
    trainingTime: string;
    legacyCost: string;
    legacyAvailability: string;
    legacyCapacity: string;
    legacyTraining: string;
    donnaCost: string;
    donnaAvailability: string;
    donnaCapacity: string;
    donnaTraining: string;
    futureLabel: string;
    replacedAgents: string;
  };
  useCases: {
    title: string;
    subtitle: string;
    cases: Array<{
      industry: string;
      description: string;
    }>;
  };
  pricing: {
    title: string;
    subtitle: string;
    includedLabel: string;
    rateLabel: string;
    perMonth: string;
    plans: Array<{
      title: string;
      tagline: string;
      price: string;
      setup: string;
      includedMinutes: string;
      ratePerMinute: string;
      beyondLabel: string;
      beyondValue: string;
      inheritsTitle?: string;
      features: string[];
      excluded?: string[];
    }>;
    bestValue: string;
    bookOnboarding: string;
  };
  footer: {
    readyTitle: string;
    readyDesc: string;
    requestDemo: string;
    namePlaceholder: string;
    companyPlaceholder: string;
    emailPlaceholder: string;
  };
}

export interface LeDonnaTranslations {
  header: {
    features: string;
    pricing: string;
    contact: string;
    demo: string;
    tryFree: string;
    trialButton: string;
  };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    description: string;
    compatibility: string;
    ctaPrimary: string;
    scrollIndicator: string;
    phoneDemo: {
      status: string;
      message1: string;
      message2: string;
      analysis: string;
      sentiment: string;
      reservation: string;
      confirmed: string;
    };
  };
  howItWorks: {
    title: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    securityNote: string;
    securityLabel: string;
    audioTitle: string;
    audioDesc: string;
  };
  features: {
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    feature5Title: string;
    feature5Desc: string;
    feature6Title: string;
    feature6Desc: string;
  };
  testimonials: {
    title: string;
    testimonial1: string;
    testimonial1Author: string;
    testimonial1Role: string;
    testimonial2: string;
    testimonial2Author: string;
    testimonial2Role: string;
    testimonial3: string;
    testimonial3Author: string;
    testimonial3Role: string;
    usedBy: string;
    restaurantCount: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    starterTitle: string;
    starterPrice: string;
    perMonth: string;
    starterSubtext: string;
    starterFeatures: string[];
    starterButton: string;
    proTitle: string;
    proPrice: string;
    proPopular: string;
    proSubtext: string;
    proFeatures: string[];
    proButton: string;
    enterpriseTitle: string;
    enterprisePrice: string;
    enterpriseFeatures: string[];
    enterpriseButton: string;
    footnote: string;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  final: {
    title: string;
    subtitle: string;
    ctaButton: string;
    ctaSubtext: string;
    trust1: string;
    trust2: string;
    trust3: string;
    trust4: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
}
