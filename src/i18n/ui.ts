export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'es';

// Textos de interfaz compartidos (nav, footer, botones). El contenido largo de
// cada página vive en su propio archivo, no aquí.
export const ui = {
  es: {
    nav: {
      queHacemos: 'Qué hacemos',
      metodo: 'Método',
      casos: 'Casos',
      elMotor: 'El motor',
      recursos: 'Recursos',
      equipo: 'Equipo',
      contacto: 'Contacto',
    },
    subnav: {
      auditoria: 'Auditoría AgentOps',
      implementacion: 'Implementación de agentes',
      gestionado: 'AgentOps gestionado',
    },
    cta: 'Reservar una primera llamada gratuita',
    ctaShort: 'Llamada gratuita',
    langSwitchLabel: 'Cambiar idioma',
    langSwitchTo: 'English',
    footerTagline: 'Observabilidad, control de coste y criterio técnico verificable desde el día uno.',
    footerRights: 'Todos los derechos reservados.',
    footerLocation: 'Granada, España',
    privacyLink: 'Política de privacidad',
    coverLetterLink: 'Carta de presentación',
    readMore: 'Leer más',
    publishedOn: 'Publicado el',
    noPosts: 'Todavía no hay artículos publicados.',
    pendingTranslation: 'Traducción en camino. Mientras tanto, disponible en español.',
  },
  en: {
    nav: {
      queHacemos: 'What we do',
      metodo: 'Method',
      casos: 'Case studies',
      elMotor: 'The engine',
      recursos: 'Resources',
      equipo: 'Team',
      contacto: 'Contact',
    },
    subnav: {
      auditoria: 'AgentOps Audit',
      implementacion: 'Agent implementation',
      gestionado: 'Managed AgentOps',
    },
    cta: 'Book a free first call',
    ctaShort: 'Free call',
    langSwitchLabel: 'Switch language',
    langSwitchTo: 'Español',
    footerTagline: 'Observability, cost control, and verifiable technical judgment from day one.',
    footerRights: 'All rights reserved.',
    footerLocation: 'Granada, Spain',
    privacyLink: 'Privacy policy',
    coverLetterLink: 'Letter of introduction',
    readMore: 'Read more',
    publishedOn: 'Published on',
    noPosts: 'No articles published yet.',
    pendingTranslation: 'Translation pending. Available in Spanish for now.',
  },
} as const;

export function useUI(lang: Lang) {
  return ui[lang] ?? ui[DEFAULT_LANG];
}

// Rutas con el mismo slug en ambos idiomas — el selector de idioma solo
// necesita cambiar el prefijo /es|en, nunca el resto del path.
export function pathWithLang(pathname: string, lang: Lang): string {
  const rest = pathname.replace(/^\/(es|en)(\/|$)/, '/');
  return `/${lang}${rest}`.replace(/\/+$/, '') || `/${lang}`;
}

export function getLangFromPathname(pathname: string): Lang {
  const match = pathname.match(/^\/(es|en)(\/|$)/);
  return (match?.[1] as Lang) ?? DEFAULT_LANG;
}
