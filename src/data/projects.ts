const desc = 'Descripción del proyecto en una frase.';
const links = [{ label: 'Código', url: '#' }, { label: 'Demo', url: '#' }];

// Cada categoría tiene su color: es la franja de arriba de la tarjeta y sale en la leyenda de /proyectos.
export const categories = {
  ia: { label: 'IA y datos', color: '#2b9476' },
  backend: { label: 'Backend y automatización', color: '#b5623c' },
  hackathon: { label: 'Hackathons', color: '#6b5ea8' },
  web: { label: 'Web', color: '#c9a227' },
  seguridad: { label: 'Seguridad', color: '#3b6fb6' },
} as const;

type Project = {
  name: string;
  year: string;
  languages: string[];
  tags: string[];
  desc: string;
  links: { label: string; url: string }[];
  category: keyof typeof categories;
};

export const projects: Project[] = [
  { name: 'Portfolio personal', year: '2026', languages: ['TypeScript'], tags: ['astro', 'typescript', 'pixel-art'], desc: 'Esta web: portfolio y blog en Astro con contenido en Markdown, iconos pixel-art propios y un mapa jugable para recorrerla.', links: [], category: 'web' },
  { name: 'X-Ray · HackSpain', year: '2026', languages: ['Python', 'TypeScript'], tags: ['hackathon', 'fintech', 'lightgbm'], desc: 'Reto de Embat: un score de salud financiera de 0 a 100 para pymes a partir de su tesorería, con previsión a 3 meses, alertas y un simulador de escenarios.', links: [{ label: 'Demo', url: 'https://xakal-hackspain.vercel.app/' }, { label: 'Código', url: 'https://github.com/xakal-hs/hackspain' }], category: 'hackathon' },
  { name: 'Colosseum', year: '2025', languages: ['Rust'], tags: ['hackathon', 'solana', 'ai-agents', 'rust'], desc: 'Top 10 en el hackathon de Solana de Colosseum con xFractal, una plataforma de trading con agentes de IA.', links: [{ label: 'Vídeo', url: 'https://www.youtube.com/watch?v=7CRCodieh1g' }], category: 'hackathon' },
  { name: 'Home Improvement Scraper', year: '2024', languages: ['Rust', 'Terraform'], tags: ['rust', 'terraform', 'rabbitmq'], desc: 'API de comparación de precios en tiempo real entre Leroy Merlin, BricoDepot y Bauhaus, con workers distribuidos y caché.', links: [{ label: 'Código', url: 'https://github.com/The-Deep-Hub/product-scraper-comparison' }], category: 'backend' },
  { name: 'Cell Vision', year: '2024', languages: ['Python'], tags: ['computer-vision', 'pytorch', 'opencv'], desc: 'Detección y clasificación de células de sangre periférica: segmentación con OpenCV y un ConvNeXt afinado (98,5 % de accuracy), servido en una app Flask.', links: [{ label: 'Código', url: 'https://github.com/Jorgecardetegit/PeripheralDiseaseClassifier' }, { label: 'Modelo', url: 'https://huggingface.co/JorgeGIT/finetuned-Leukemia-cell' }, { label: 'Artículo', url: '/blog/convnext/' }], category: 'ia' },
  { name: 'Parking Detector', year: '2024', languages: ['Python', 'C++'], tags: ['computer-vision', 'tensorflow', 'docker', 'c++'], desc: 'Detector de plazas libres en un parking a partir de vídeo, con una CNN en TensorFlow, desplegado con Docker y Azure.', links: [{ label: 'Código', url: 'https://github.com/TheDeepHub/ParkingDetector' }, { label: 'Artículo', url: '/blog/parking-detector-parte-1/' }, { label: 'Despliegue', url: '/blog/parking-detector-parte-2/' }], category: 'ia' },
  { name: 'Telegram Ops Bot', year: '2024', languages: ['Python'], tags: ['automation', 'docker', 'telegram', 'openai'], desc: 'Bot de Telegram para operar The Deep Hub: busca escritores en Medium, gestiona los envíos por email y genera con IA los posts para redes, con cada tarea en su propio contenedor.', links: [{ label: 'Código', url: 'https://github.com/The-Deep-Hub/telegram-bot-manager' }, { label: 'API de redes', url: 'https://github.com/The-Deep-Hub/social-manager-api' }], category: 'backend' },
  { name: 'Every System Is Broken', year: '20XX', languages: [], tags: ['seguridad', 'hacking'], desc, links, category: 'seguridad' },
  { name: 'Gather Simulator', year: '20XX', languages: [], tags: ['simulacion'], desc, links, category: 'web' },
];
