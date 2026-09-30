export interface RawMaterialProduct {
  id: string;
  name: string;
  subtitle: string;
  granulometria: string;
  presentacion: string;
  peso: string;
  empaque: string;
  aplicaciones: string;
  fichaTecnica: string;
  disponibilidad: string;
  image: string;
  pureza: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  technicalDetail: string;
  outputStage: string;
}

export interface ApplicationItem {
  id: string;
  code: string;
  title: string;
  description: string;
  recommendedMaterial: string;
  technicalSpec: string;
  industries: string[];
  image: string;
}

export interface CircularStep {
  id: number;
  label: string;
  detail: string;
}

export interface ImpactMetric {
  id: string;
  value: string;
  unit: string;
  label: string;
  description: string;
}

export interface ContactData {
  whatsappDisplay: string;
  whatsappNumber: string;
  email: string;
  location: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  schedule: string;
}

export const GENERATED_IMAGES = {
  heroPlant: '/src/assets/images/hero_recycling_plant_1790727574613.jpg',
  rawMaterialGranules: '/src/assets/images/raw_material_granules_1790727584942.jpg',
  acousticPanels: '/src/assets/images/app_acoustic_panels_1790727593228.jpg',
  gymFlooring: '/src/assets/images/app_gym_flooring_1790727601827.jpg',
  modifiedAsphalt: '/src/assets/images/app_modified_asphalt_1790727611433.jpg',
};

export const INITIAL_PRODUCTS: RawMaterialProduct[] = [
  {
    id: 'caucho-triturado',
    name: 'Caucho Triturado',
    subtitle: 'Chips de caucho vulcanizado de primera reducción mecánica',
    granulometria: '10 mm – 50 mm (ajustable según requerimiento)',
    presentacion: 'Chips irregulares limpios de corte mecánico',
    peso: 'Bolsas de 25 kg / Big Bag de 500 kg a 1.000 kg',
    empaque: 'Sacos de polipropileno tejido o Big Bag industrial con liner',
    aplicaciones: 'Rellenos de ingeniería civil, drenaje industrial, valorización energética y molienda secundaria',
    fichaTecnica: 'GR-FT-01 · Humedad < 1.5% · Libre de contaminantes externos',
    disponibilidad: 'Bajo pedido / Programación de lote industrial',
    pureza: '98.5% polímero elastomérico recuperado',
    image: GENERATED_IMAGES.rawMaterialGranules,
  },
  {
    id: 'caucho-granulado',
    name: 'Caucho Granulado',
    subtitle: 'Gránulo clasificado libre de acero y fibra textil',
    granulometria: '0.8 mm – 2.5 mm · 2.0 mm – 4.0 mm · 4.0 mm – 6.0 mm',
    presentacion: 'Gránulo uniforme tamizado por mallas calibradas',
    peso: 'Sacos de 25 kg / Big Bag de 600 kg a 1.000 kg',
    empaque: 'Saco valvulado o Big Bag paletizado apto para transporte terrestre y marítimo',
    aplicaciones: 'Tapetes para gimnasios, pisos amortiguantes, canchas sintéticas y paneles de insonorización',
    fichaTecnica: 'GR-FT-02 · Separación magnética y neumática > 99.2%',
    disponibilidad: 'Disponible para cotización nacional y proyección exportación',
    pureza: '99.2% libre de metal y fibra textil',
    image: GENERATED_IMAGES.gymFlooring,
  },
  {
    id: 'caucho-molido',
    name: 'Caucho Molido',
    subtitle: 'Polvo fino de caucho para mezclas asfálticas y compuestos',
    granulometria: 'Malla 20 a Malla 40 (0.42 mm – 0.85 mm)',
    presentacion: 'Polvo elastomérico fino de alta superficie específica',
    peso: 'Sacos de 20 kg – 25 kg / Big Bag de 800 kg',
    empaque: 'Empaque sellado contra humedad sobre estiba tratada NIMF-15',
    aplicaciones: 'Asfalto modificado con caucho (GCR), impermeabilizantes, membranas acústicas y mezclas poliméricas',
    fichaTecnica: 'GR-FT-03 · Granulometría controlada por tamizado continuo',
    disponibilidad: 'Producción programada según especificación técnica',
    pureza: '99.5% libre de partículas ferrosas',
    image: GENERATED_IMAGES.modifiedAsphalt,
  },
  {
    id: 'otros-materiales',
    name: 'Otros Materiales Recuperados',
    subtitle: 'Subproductos valorizables derivados de la separación integral',
    granulometria: 'Acero de talón/cinturón y fibra textil clasificada',
    presentacion: 'Fracción metálica compactada y fibra polimérica separada',
    peso: 'Pacas industriales de 300 kg – 800 kg / Granel controlado',
    empaque: 'Fardos flejados o contenedores industriales según destino',
    aplicaciones: 'Fundición siderúrgica, refuerzo en concretos secundarios y aislamiento termoacústico',
    fichaTecnica: 'GR-FT-04 · Subproductos de economía circular',
    disponibilidad: 'Sujeto a volumen de procesamiento mensual',
    pureza: 'Separación electromagnética y aspiración ciclónica',
    image: GENERATED_IMAGES.acousticPanels,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Recolección',
    description: 'Recuperación y recepción de llantas fuera de uso.',
    technicalDetail:
      'Recepción controlada en planta, pesaje industrial, registro de trazabilidad de origen y verificación de condiciones para ingreso al ciclo productivo.',
    outputStage: 'Llantas registradas y acopiadas bajo protocolo ambiental',
  },
  {
    number: '02',
    title: 'Clasificación',
    description: 'Separación y preparación del material para su procesamiento.',
    technicalDetail:
      'Inspección por tipología de llanta (automóvil, camioneta, transporte pesado), retiro de elementos extraños y destalonado previo.',
    outputStage: 'Material acondicionado por línea de corte',
  },
  {
    number: '03',
    title: 'Trituración',
    description: 'Reducción del tamaño de las llantas mediante procesos industriales.',
    technicalDetail:
      'Cizallado mecánico primario de alto torque que transforma la llanta entera en chips uniformes de caucho triturado.',
    outputStage: 'Caucho triturado primario (10 mm – 50 mm)',
  },
  {
    number: '04',
    title: 'Molienda',
    description: 'Transformación del caucho en diferentes granulometrías según su aplicación.',
    technicalDetail:
      'Granulación progresiva acompañada de separación electromagnética de acero y aspiración neumática de fibra textil, seguida de tamizado vibratorio.',
    outputStage: 'Caucho granulado y caucho molido clasificado por malla',
  },
  {
    number: '05',
    title: 'Nueva aplicación',
    description: 'El material recuperado puede reincorporarse en productos y soluciones para diferentes industrias.',
    technicalDetail:
      'Control de calidad final, empaque técnico en sacos o Big Bags y despacho hacia industrias de construcción, deporte, acústica e infraestructura.',
    outputStage: 'Materia prima lista para la cadena industrial',
  },
];

export const APPLICATIONS_DATA: ApplicationItem[] = [
  {
    id: 'paneles-insonorizacion',
    code: 'A',
    title: 'Paneles de Insonorización',
    description:
      'Materiales desarrollados a partir de caucho reciclado para aplicaciones de aislamiento y control acústico.',
    recommendedMaterial: 'Caucho Granulado (1.0 – 3.0 mm) · Caucho Molido',
    technicalSpec: 'Alta absorción de vibraciones e impacto sonoro en muros, entrepisos y recintos industriales.',
    industries: ['Acústica', 'Construcción', 'Industria'],
    image: GENERATED_IMAGES.acousticPanels,
  },
  {
    id: 'tapetes-gimnasios',
    code: 'B',
    title: 'Tapetes para Gimnasios',
    description:
      'Materia prima para productos deportivos y superficies de protección para gimnasios y espacios de entrenamiento.',
    recommendedMaterial: 'Caucho Granulado (1.5 – 4.0 mm)',
    technicalSpec: 'Resiliencia mecánica, absorción de alto impacto, tracción antideslizante y durabilidad.',
    industries: ['Deporte y Fitness', 'Construcción'],
    image: GENERATED_IMAGES.gymFlooring,
  },
  {
    id: 'asfalto-modificado',
    code: 'C',
    title: 'Asfalto Modificado',
    description:
      'El caucho reciclado puede utilizarse como componente en soluciones para infraestructura vial, según las especificaciones técnicas correspondientes.',
    recommendedMaterial: 'Caucho Molido (Malla 30 – Malla 40)',
    technicalSpec: 'Mejora la resistencia al ahuellamiento, fatiga térmica y fisuración en carpetas asfálticas.',
    industries: ['Infraestructura Vial', 'Construcción'],
    image: GENERATED_IMAGES.modifiedAsphalt,
  },
  {
    id: 'nuevos-productos',
    code: 'D',
    title: 'Nuevos Productos',
    description:
      'Materia prima para desarrollar productos innovadores dentro de modelos de economía circular.',
    recommendedMaterial: 'Caucho Triturado · Granulado · Molido',
    technicalSpec: 'Base polimérica versátil para moldeados industriales, topes viales, calzado y compuestos.',
    industries: ['Economía Circular', 'Industria'],
    image: GENERATED_IMAGES.rawMaterialGranules,
  },
];

export const CIRCULAR_STEPS: CircularStep[] = [
  {
    id: 1,
    label: 'Llanta fuera de uso',
    detail: 'Residuo posconsumo que requiere gestión técnica para evitar disposición inadecuada.',
  },
  {
    id: 2,
    label: 'Recuperación',
    detail: 'Recolección logística y recepción controlada en planta de aprovechamiento en Colombia.',
  },
  {
    id: 3,
    label: 'Trituración',
    detail: 'Reducción mecánica inicial en equipos industriales de corte de alta capacidad.',
  },
  {
    id: 4,
    label: 'Molienda',
    detail: 'Refinamiento granulométrico y separación limpia de acero y componente textil.',
  },
  {
    id: 5,
    label: 'Materia prima',
    detail: 'Caucho triturado, granulado y molido estandarizado bajo parámetros de calidad B2B.',
  },
  {
    id: 6,
    label: 'Nuevos productos',
    detail: 'Incorporación en pisos deportivos, paneles acústicos, mezclas asfálticas y piezas moldeadas.',
  },
  {
    id: 7,
    label: 'Nuevo valor',
    detail: 'Permanencia del material en el ciclo productivo reduciendo la huella ambiental.',
  },
];

export const INITIAL_IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'llantas',
    value: '+000',
    unit: 'unidades',
    label: 'Llantas aprovechadas',
    description: 'Neumáticos fuera de uso gestionados e integrados a la línea de transformación.',
  },
  {
    id: 'material',
    value: '000 t',
    unit: 'toneladas',
    label: 'Material recuperado',
    description: 'Volumen total de componentes recuperados mediante separación mecánica.',
  },
  {
    id: 'caucho',
    value: '000',
    unit: 'toneladas',
    label: 'Toneladas de caucho transformado',
    description: 'Materia prima procesada en granulometrías listas para uso industrial.',
  },
  {
    id: 'aplicaciones',
    value: '000',
    unit: 'soluciones',
    label: 'Productos / aplicaciones',
    description: 'Desarrollos industriales y líneas de aplicación abastecidas con caucho reciclado.',
  },
];

export const INITIAL_CONTACT_DATA: ContactData = {
  whatsappDisplay: '+57 (300) 000-0000',
  whatsappNumber: '573000000000',
  email: 'comercial@greenrubber.com.co',
  location: 'Colombia · Planta de Transformación y Oficinas Comerciales',
  instagram: 'https://instagram.com/greenrubber.co',
  facebook: 'https://facebook.com/greenrubber.co',
  linkedin: 'https://linkedin.com/company/green-rubber-colombia',
  schedule: 'Lunes a Viernes · 7:30 a.m. – 5:30 p.m. (GMT-5)',
};
