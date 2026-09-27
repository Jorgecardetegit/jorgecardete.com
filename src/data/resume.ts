import type { Localized } from '../i18n';

// La experiencia y la formación de /cv/, sacadas de LinkedIn.
// Las fechas son 'AAAA-MM'; sin `end`, el puesto sigue en curso.
type Point = { lead?: string; text: Localized };
type Role = { title: Localized; start: string; end?: string; points: Point[] };
type Job = { company: string; url?: string; roles: Role[] };

const same = (text: string): Localized => ({ es: text, en: text });

export const experience: Job[] = [
  {
    company: 'Bit2Me',
    url: 'https://bit2me.com/',
    roles: [{
      title: same('Growth Engineer'),
      start: '2026-08',
      points: [{
        text: {
          es: 'Diseño y lanzo experimentos en los embudos de activación, retención y adquisición, y construyo la infraestructura técnica que hay detrás del crecimiento: tracking, automatización y personalización.',
          en: 'Designing and running experiments across the activation, retention and acquisition funnels, and building the technical infrastructure behind growth (tracking, automation, personalization).',
        },
      }],
    }],
  },
  {
    company: 'Grupo Cardete Ventures',
    url: 'https://grupocardeteventures.es',
    roles: [{
      title: { es: 'Fundador y CTO', en: 'Founder & CTO' },
      start: '2024-11',
      points: [{
        text: {
          es: 'Dirijo la tecnología de una empresa de asistencia urgente 24/7 en carretera y transporte exprés en Madrid y Barcelona. Construyo la plataforma que sostiene la operación: despacho, logística y experiencia de cliente para un servicio que llega al conductor en menos de 30 minutos.',
          en: 'Leading technology at a 24/7 urgent roadside assistance and express transport company operating in Madrid and Barcelona. Building the tech platform behind the operation: dispatch, logistics and customer experience for a service that reaches drivers in under 30 minutes.',
        },
      }],
    }],
  },
  {
    company: 'The Deep Hub',
    url: 'https://medium.com/thedeephub',
    roles: [{
      title: { es: 'Fundador', en: 'Founder' },
      start: '2023-09',
      points: [
        {
          text: {
            es: 'Fundé y dirijo The Deep Hub, una publicación técnica sobre data science y machine learning en Medium. La he hecho crecer hasta más de 570 artículos publicados, unos 100 ingenieros e investigadores colaboradores y 2.200 seguidores.',
            en: 'Founded and run The Deep Hub, a technical publication on data science and machine learning hosted on Medium. Grew it to 570+ published articles and ~100 contributing engineers and researchers, with 2.2K followers.',
          },
        },
        {
          text: {
            es: 'Escribo artículos técnicos en profundidad (sobre todo de visión artificial) y edito cada envío a la publicación.',
            en: 'I write in-depth technical pieces (mainly computer vision) and edit every submission to the publication.',
          },
        },
      ],
    }],
  },
  {
    company: 'Zapic',
    url: 'https://zapic.ai',
    roles: [{
      title: { es: 'Fundador', en: 'Founder' },
      start: '2025-01',
      end: '2026-08',
      points: [{
        text: {
          es: 'Asistentes de IA para gestionar redes sociales: Zapic investiga tendencias, genera contenido e interactúa con las comunidades. Llevaba producto, ingeniería y estrategia de la empresa.',
          en: 'Building AI assistants for social media management: Zapic researches trends, generates content and engages with communities. I led product, engineering and company strategy.',
        },
      }],
    }],
  },
  {
    company: 'xFractal',
    url: 'https://www.youtube.com/watch?v=7CRCodieh1g',
    roles: [
      {
        title: same('AI Engineer'),
        start: '2024-12',
        end: '2025-11',
        points: [{
          text: {
            es: 'Lideré las iniciativas de IA con agentes on-chain dentro de Solana.',
            en: 'Led AI initiatives with on-chain AI agents inside Solana.',
          },
        }],
      },
      {
        title: { es: 'Founding Engineer · desarrollador Rust', en: 'Founding Engineer · Rust developer' },
        start: '2024-10',
        end: '2024-12',
        points: [{
          text: {
            es: 'Diseñé e implementé soluciones en Rust, optimizando modelos de IA y orquestando infraestructura escalable en la blockchain.',
            en: 'Designed and implemented solutions in Rust, optimizing AI models and orchestrating scalable infrastructure on the blockchain.',
          },
        }],
      },
    ],
  },
  {
    company: 'Axpe Consulting',
    url: 'https://www.axpe.com/',
    roles: [{
      title: same('Data Scientist'),
      start: '2024-04',
      end: '2025-01',
      points: [
        {
          lead: 'BBVA',
          text: {
            es: 'Chatbot con IA para resolver dudas de regulación bancaria, con agentes sobre Cohere, GPT y Llama que dan respuestas precisas y rápidas.',
            en: 'Developed an AI-powered chatbot to address banking regulatory issues, integrating AI agents on Cohere, GPT and Llama to provide accurate and efficient responses.',
          },
        },
        {
          lead: 'Dragados',
          text: {
            es: 'Con un equipo de data scientists y analistas, visualizaciones en tiempo real de los resultados de los modelos en Grafana, dentro del ecosistema de Databricks.',
            en: 'Collaborated with a team of data scientists and analysts to create real-time model result visualizations in Grafana within the Databricks ecosystem.',
          },
        },
        {
          lead: 'Cosentino',
          text: {
            es: 'Modelo de visión artificial en Azure ML para clasificar la producción, optimizar procesos y asegurar el control de calidad.',
            en: 'Built a computer vision model using Azure ML to classify production outputs, optimizing processes and ensuring quality control.',
          },
        },
        {
          lead: 'Omya',
          text: {
            es: 'Sistema de monitorización y analítica con SAS Viya y Python para seguir en tiempo real las operaciones de la empresa.',
            en: 'Developed a monitoring and analytics system using SAS Viya and Python, providing end-to-end visibility and real-time tracking of company operations.',
          },
        },
        {
          lead: 'Sabadell',
          text: {
            es: 'Framework de pruebas para modelos de speech-to-text (Whisper, Wav2Vec y Kaldi) que mide su rendimiento y precisión en casos reales.',
            en: 'Created a testing framework for speech-to-text models, including Whisper, Wav2Vec and Kaldi, to evaluate their performance and accuracy in real-world applications.',
          },
        },
      ],
    }],
  },
  {
    company: 'Medtronic',
    url: 'https://www.medtronic.com/',
    roles: [{
      title: same('Data Analyst'),
      start: '2023-04',
      end: '2024-04',
      points: [
        {
          lead: 'Salesforce',
          text: {
            es: 'Análisis y gestión de datos con Power BI y Python para sacar conclusiones accionables y mejorar procesos de negocio.',
            en: 'Analyzed and managed data using Power BI and Python to generate actionable insights, improving business processes and decision-making.',
          },
        },
        {
          lead: 'OCR',
          text: {
            es: 'Solución de OCR en Python para automatizar la extracción y el procesado de documentación de licitaciones no estructurada.',
            en: 'Developed an OCR solution in Python to automate the extraction and processing of unstructured tender documentation.',
          },
        },
      ],
    }],
  },
  {
    company: 'FTT DAO',
    roles: [{
      title: same('Community Manager'),
      start: '2022-08',
      end: '2022-11',
      points: [],
    }],
  },
];

export const education = [
  {
    school: 'Universidad Francisco de Vitoria',
    url: 'https://www.ufv.es/',
    degree: {
      es: 'Business Analytics y Administración de Empresas | Programa de Liderazgo Integral',
      en: 'Business Analytics & Business Administration | Integral Leadership Program',
    },
    start: '2020-09',
    end: '2025-05',
  },
];
