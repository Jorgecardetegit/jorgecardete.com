const desc = 'Descripción del proyecto en una frase.';
const links = [{ label: 'Código', url: '#' }, { label: 'Demo', url: '#' }];

export const projects = [
  { name: 'Home Improvement Scraper', year: '2024', tags: ['rust', 'terraform', 'rabbitmq'], desc: 'API de comparación de precios en tiempo real entre Leroy Merlin, BricoDepot y Bauhaus, con workers distribuidos y caché.', links: [{ label: 'Código', url: 'https://github.com/The-Deep-Hub/product-scraper-comparison' }], color: '#b5553f' },
  { name: 'Cell Vision', year: '2024', tags: ['computer-vision', 'pytorch', 'opencv'], desc: 'Detección y clasificación de células de sangre periférica: segmentación con OpenCV y un ConvNeXt afinado (98,5 % de accuracy), servido en una app Flask.', links: [{ label: 'Código', url: 'https://github.com/Jorgecardetegit/PeripheralDiseaseClassifier' }, { label: 'Modelo', url: 'https://huggingface.co/JorgeGIT/finetuned-Leukemia-cell' }, { label: 'Artículo', url: '/blog/convnext/' }], color: '#2b9476' },
  { name: 'Parking Detector', year: '2024', tags: ['computer-vision', 'tensorflow', 'docker', 'c++'], desc: 'Detector de plazas libres en un parking a partir de vídeo, con una CNN en TensorFlow, desplegado con Docker y Azure.', links: [{ label: 'Código', url: 'https://github.com/TheDeepHub/ParkingDetector' }, { label: 'Artículo', url: '/blog/parking-detector-parte-1/' }, { label: 'Despliegue', url: '/blog/parking-detector-parte-2/' }], color: '#b5623c' },
  { name: 'Every System Is Broken', year: '20XX', tags: ['seguridad', 'hacking'], desc, links, color: '#b5553f' },
  { name: 'Colosseum', year: '2024', tags: ['hackathon', 'solana', 'ai-agents'], desc: 'Top 10 en el hackathon de Solana de Colosseum con xFractal, una plataforma de trading con agentes de IA.', links: [{ label: 'Vídeo', url: 'https://www.youtube.com/watch?v=7CRCodieh1g' }], color: '#2b9476' },
  { name: 'X-Ray · HackSpain', year: '2026', tags: ['hackathon', 'fintech', 'lightgbm'], desc: 'Reto de Embat: un score de salud financiera de 0 a 100 para pymes a partir de su tesorería, con previsión a 3 meses, alertas y un simulador de escenarios.', links: [{ label: 'Demo', url: 'https://xakal-hackspain.vercel.app/' }, { label: 'Código', url: 'https://github.com/xakal-hs/hackspain' }], color: '#6b5ea8' },
  { name: 'UFV Labs', year: '20XX', tags: ['universidad', 'laboratorio'], desc, links, color: '#c9a227' },
  { name: 'Gather Simulator', year: '20XX', tags: ['simulacion'], desc, links, color: '#c9a227' },
];
