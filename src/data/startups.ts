import type { Localized } from '../i18n';

// Las startups de /startups; el juego las enseña en la casa amarilla.
export const startups: { name: string; role: Localized; desc: Localized; url: string; label: string; color: string }[] = [
  {
    name: 'Grupo Cardete Ventures',
    role: { es: 'Cofundador y CTO', en: 'Co-founder & CTO' },
    desc: {
      es: 'Asistencia urgente 24/7 en carretera y transporte exprés en Madrid y Barcelona, en menos de 30 minutos. Me encargo de la tecnología.',
      en: '24/7 urgent roadside assistance and express delivery in Madrid and Barcelona, in under 30 minutes. I run the technology.',
    },
    url: 'https://grupocardeteventures.es', label: 'grupocardeteventures.es', color: '#b5623c',
  },
  {
    name: 'Zapic',
    role: { es: 'Cofundador', en: 'Co-founder' },
    desc: {
      es: 'Agentes de IA que llevan las redes sociales de una marca como si fueran parte del equipo. Marketing que suena a ti.',
      en: 'AI agents that run a brand’s social media as if they were part of the team. Marketing that sounds like you.',
    },
    url: 'https://zapic.ai', label: 'zapic.ai', color: '#6b5ea8',
  },
  {
    name: 'Fractal',
    role: { es: 'Founding engineer y AI engineer', en: 'Founding engineer & AI engineer' },
    desc: {
      es: 'Una red de agentes especializados sobre Solana que analizan el mercado en tiempo real y convierten esa información en decisiones de trading.',
      en: 'A network of specialised agents on Solana that analyse the market in real time and turn it into trading decisions.',
    },
    url: 'https://www.youtube.com/watch?v=7CRCodieh1g', label: 'xfractal.com', color: '#2b9476',
  },
  {
    name: 'The Deep Hub',
    role: { es: 'Fundador', en: 'Founder' },
    desc: {
      es: 'Publicación técnica en Medium sobre data science y machine learning, con más de 570 artículos de unos 100 autores.',
      en: 'A technical Medium publication on data science and machine learning, with 570+ articles from around 100 authors.',
    },
    url: 'https://medium.com/thedeephub', label: 'thedeephub.com', color: '#c9a227',
  },
];
