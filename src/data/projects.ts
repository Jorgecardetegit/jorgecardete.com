import { postPath, type Lang, type Localized } from '../i18n';

// Cada categoría tiene su color: es la franja de arriba de la tarjeta en /proyectos.
export const categories = {
  ia: { color: '#2b9476' },
  backend: { color: '#b5623c' },
  hackathon: { color: '#6b5ea8' },
  web: { color: '#c9a227' },
  seguridad: { color: '#3b6fb6' },
} as const;

const linkLabels = {
  code: { es: 'Código', en: 'Code' },
  demo: { es: 'Demo', en: 'Demo' },
  video: { es: 'Vídeo', en: 'Video' },
  model: { es: 'Modelo', en: 'Model' },
  article: { es: 'Artículo', en: 'Article' },
  deployment: { es: 'Despliegue', en: 'Deployment' },
  socialApi: { es: 'API de redes', en: 'Social API' },
} satisfies Record<string, Localized>;

// Un enlace va a una URL externa o a un post del blog (su ruta depende del idioma).
type Link = { label: keyof typeof linkLabels } & ({ url: string } | { post: string });

type Project = {
  name: Localized;
  year: string;
  /** Aún en desarrollo: la tarjeta muestra «Próximamente» en lugar del año. */
  soon?: boolean;
  languages: string[];
  tags: string[];
  desc: Localized;
  links: Link[];
  category: keyof typeof categories;
};

export const projectLinks = (p: Project, lang: Lang) =>
  p.links.map((link) => ({
    label: linkLabels[link.label][lang],
    url: 'post' in link ? postPath(link.post, lang) : link.url,
  }));

const same = (text: string): Localized => ({ es: text, en: text });

export const projects: Project[] = [
  {
    name: { es: 'Portfolio personal', en: 'Personal portfolio' },
    year: '2026', languages: ['TypeScript'], tags: ['astro', 'typescript', 'pixel-art'],
    desc: {
      es: 'Esta web: portfolio y blog en Astro con contenido en Markdown, iconos pixel-art propios y un mapa jugable para recorrerla.',
      en: 'This site: a portfolio and blog built with Astro and Markdown content, custom pixel-art icons and a playable map to explore it.',
    },
    links: [], category: 'web',
  },
  {
    name: same('X-Ray · HackSpain'),
    year: '2026', languages: ['Python', 'TypeScript'], tags: ['hackathon', 'fintech', 'lightgbm'],
    desc: {
      es: 'Reto de Embat: un score de salud financiera de 0 a 100 para pymes a partir de su tesorería, con previsión a 3 meses, alertas y un simulador de escenarios.',
      en: 'Embat challenge: a 0–100 financial health score for SMEs built from their treasury data, with a 3-month forecast, alerts and a scenario simulator.',
    },
    links: [{ label: 'demo', url: 'https://xakal-hackspain.vercel.app/' }, { label: 'code', url: 'https://github.com/xakal-hs/hackspain' }],
    category: 'hackathon',
  },
  {
    name: same('Colosseum'),
    year: '2025', languages: ['Rust'], tags: ['hackathon', 'solana', 'ai-agents', 'rust'],
    desc: {
      es: 'Top 10 en el hackathon de Solana de Colosseum con xFractal, una plataforma de trading con agentes de IA.',
      en: 'Top 10 at the Colosseum Solana hackathon with xFractal, a trading platform powered by AI agents.',
    },
    links: [{ label: 'video', url: 'https://www.youtube.com/watch?v=7CRCodieh1g' }],
    category: 'hackathon',
  },
  {
    name: same('Home Improvement Scraper'),
    year: '2024', languages: ['Rust', 'Terraform'], tags: ['rust', 'terraform', 'rabbitmq'],
    desc: {
      es: 'API de comparación de precios en tiempo real entre Leroy Merlin, BricoDepot y Bauhaus, con workers distribuidos y caché.',
      en: 'Real-time price comparison API across Leroy Merlin, BricoDepot and Bauhaus, with distributed workers and caching.',
    },
    links: [{ label: 'code', url: 'https://github.com/The-Deep-Hub/product-scraper-comparison' }],
    category: 'backend',
  },
  {
    name: same('Cell Vision'),
    year: '2024', languages: ['Python'], tags: ['computer-vision', 'pytorch', 'opencv'],
    desc: {
      es: 'Detección y clasificación de células de sangre periférica: segmentación con OpenCV y un ConvNeXt afinado (98,5 % de accuracy), servido en una app Flask.',
      en: 'Detection and classification of peripheral blood cells: OpenCV segmentation and a fine-tuned ConvNeXt (98.5% accuracy), served in a Flask app.',
    },
    links: [
      { label: 'code', url: 'https://github.com/Jorgecardetegit/PeripheralDiseaseClassifier' },
      { label: 'model', url: 'https://huggingface.co/JorgeGIT/finetuned-Leukemia-cell' },
      { label: 'article', post: 'convnext' },
    ],
    category: 'ia',
  },
  {
    name: same('Parking Detector'),
    year: '2024', languages: ['Python', 'C++'], tags: ['computer-vision', 'tensorflow', 'docker', 'c++'],
    desc: {
      es: 'Detector de plazas libres en un parking a partir de vídeo, con una CNN en TensorFlow, desplegado con Docker y Azure.',
      en: 'Detects free parking spaces from video with a TensorFlow CNN, deployed with Docker and Azure.',
    },
    links: [
      { label: 'code', url: 'https://github.com/TheDeepHub/ParkingDetector' },
      { label: 'article', post: 'parking-detector-parte-1' },
      { label: 'deployment', post: 'parking-detector-parte-2' },
    ],
    category: 'ia',
  },
  {
    name: same('Telegram Ops Bot'),
    year: '2024', languages: ['Python'], tags: ['automation', 'docker', 'telegram', 'openai'],
    desc: {
      es: 'Bot de Telegram para operar The Deep Hub: busca escritores en Medium, gestiona los envíos por email y genera con IA los posts para redes, con cada tarea en su propio contenedor.',
      en: 'Telegram bot to run The Deep Hub: it finds writers on Medium, handles email submissions and generates social posts with AI, each task in its own container.',
    },
    links: [
      { label: 'code', url: 'https://github.com/The-Deep-Hub/telegram-bot-manager' },
      { label: 'socialApi', url: 'https://github.com/The-Deep-Hub/social-manager-api' },
    ],
    category: 'backend',
  },
  {
    name: same('Every System Is Broken'),
    year: '', soon: true, languages: [], tags: ['perps', 'hyperliquid', 'trading'],
    desc: {
      es: 'Un sistema de trading de perpetuos con Hyperliquid por detrás.',
      en: 'A perpetual futures trading system powered by Hyperliquid.',
    },
    links: [], category: 'backend',
  },
  {
    name: same('Gather Simulator'),
    year: '', soon: true, languages: [], tags: ['simulation', 'startups'],
    desc: {
      es: 'Un Gather simulado para emprendedores.',
      en: 'A simulated Gather for entrepreneurs.',
    },
    links: [], category: 'web',
  },
];
