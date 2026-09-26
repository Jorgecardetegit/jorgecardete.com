const desc = 'Descripción del proyecto en una frase.';
const links = [{ label: 'Código', url: '#' }, { label: 'Demo', url: '#' }];

export const projects = [
  { name: 'Home Improvement Scraper', year: '2024', tags: ['rust', 'terraform'], desc: 'API de comparación de precios en tiempo real entre Leroy Merlin, BricoDepot y Bauhaus, con workers distribuidos y caché.', links: [{ label: 'Código', url: 'https://github.com/The-Deep-Hub/product-scraper-comparison' }], color: '#b5553f' },
  { name: 'Cell Vision', year: '2024', tags: ['computer-vision', 'pytorch', 'opencv'], desc: 'Detección y clasificación de células de sangre periférica: segmentación con OpenCV y un ConvNeXt afinado (98,5 % de accuracy), servido en una app Flask.', links: [{ label: 'Código', url: 'https://github.com/Jorgecardetegit/PeripheralDiseaseClassifier' }, { label: 'Modelo', url: 'https://huggingface.co/JorgeGIT/finetuned-Leukemia-cell' }, { label: 'Artículo', url: '/blog/convnext/' }], color: '#2b9476' },
  { name: 'Parking Detector', year: '2024', tags: ['computer-vision', 'tensorflow', 'docker', 'c++'], desc: 'Detector de plazas libres en un parking a partir de vídeo, con una CNN en TensorFlow, desplegado con Docker y Azure.', links: [{ label: 'Código', url: 'https://github.com/TheDeepHub/ParkingDetector' }, { label: 'Artículo', url: '/blog/parking-detector-parte-1/' }, { label: 'Despliegue', url: '/blog/parking-detector-parte-2/' }], color: '#b5623c' },
  { name: 'OCR Parser', year: '2023', tags: ['ocr', 'ml', 'parsing'], desc: 'Extracción automática de datos de pliegos de licitación no estructurados con OCR y Python.', links: [], color: '#6b5ea8' },
  { name: 'Every System Is Broken', year: '20XX', tags: ['seguridad', 'hacking'], desc, links, color: '#b5553f' },
  { name: 'Colisseum', year: '20XX', tags: ['hackathon'], desc, links, color: '#2b9476' },
  { name: 'Hackspain', year: '20XX', tags: ['hackathon', 'comunidad'], desc, links, color: '#6b5ea8' },
  { name: 'UFV Parking', year: '20XX', tags: ['computer-vision', 'ufv'], desc, links, color: '#c9a227' },
  { name: 'UFV Labs', year: '20XX', tags: ['universidad', 'laboratorio'], desc, links, color: '#c9a227' },
  { name: 'Gather Simulator', year: '20XX', tags: ['simulacion'], desc, links, color: '#c9a227' },
];
