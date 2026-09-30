import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Recycle,
  Leaf,
  Factory,
  Globe,
  MessageSquare,
  FileText,
  CreditCard,
} from 'lucide-react';
import {
  GENERATED_IMAGES,
  INITIAL_PRODUCTS,
  INITIAL_IMPACT_METRICS,
  INITIAL_CONTACT_DATA,
  RawMaterialProduct,
  ImpactMetric,
  ContactData,
} from './data/greenRubberData';
import { GreenRubberLogo } from './components/GreenRubberLogo';
import { ResilientImage } from './components/ResilientImage';
import { ProcessAndCircularSection } from './components/ProcessAndCircularSection';
import { ProductsAndApplicationsSection } from './components/ProductsAndApplicationsSection';
import { ImpactAndInternationalSection } from './components/ImpactAndInternationalSection';
import { QuotePaymentContactSection } from './components/QuotePaymentContactSection';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVisionIndex, setActiveVisionIndex] = useState(0);
  const [activeLegalModal, setActiveLegalModal] = useState<
    'privacidad' | 'terminos' | 'datos' | null
  >(null);

  // Persistent state for editable catalog, impact metrics, and contact details
  const [products, setProducts] = useState<RawMaterialProduct[]>(() => {
    try {
      const saved = localStorage.getItem('gr_products_v1');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>(() => {
    try {
      const saved = localStorage.getItem('gr_impact_v1');
      return saved ? JSON.parse(saved) : INITIAL_IMPACT_METRICS;
    } catch {
      return INITIAL_IMPACT_METRICS;
    }
  });

  const [contactData, setContactData] = useState<ContactData>(() => {
    try {
      const saved = localStorage.getItem('gr_contact_v1');
      return saved ? JSON.parse(saved) : INITIAL_CONTACT_DATA;
    } catch {
      return INITIAL_CONTACT_DATA;
    }
  });

  const [preselectedProduct, setPreselectedProduct] = useState<string>('Caucho Granulado');
  const [preselectedApplication, setPreselectedApplication] = useState<string>('');
  const [preselectedExport, setPreselectedExport] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('gr_products_v1', JSON.stringify(products));
    } catch {
      // Ignore storage errors
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('gr_impact_v1', JSON.stringify(impactMetrics));
    } catch {
      // Ignore storage errors
    }
  }, [impactMetrics]);

  useEffect(() => {
    try {
      localStorage.setItem('gr_contact_v1', JSON.stringify(contactData));
    } catch {
      // Ignore storage errors
    }
  }, [contactData]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestQuote = (
    productName?: string,
    applicationName?: string,
    forExport = false
  ) => {
    if (productName) setPreselectedProduct(productName);
    if (applicationName !== undefined) setPreselectedApplication(applicationName);
    setPreselectedExport(forExport);
    scrollToSection('cotizacion');
  };

  const handleOpenPayment = (productName?: string) => {
    if (productName) setPreselectedProduct(productName);
    scrollToSection('pago');
  };

  const visionStages = [
    {
      region: 'COLOMBIA',
      phase: 'Consolidación Nacional',
      detail:
        'Fortalecimiento de la capacidad instalada de recolección, trituración y molienda para abastecer las industrias de construcción, deporte e infraestructura en el territorio colombiano.',
    },
    {
      region: 'AMÉRICA',
      phase: 'Articulación Regional',
      detail:
        'Estandarización de fichas técnicas, empaque industrial y logística portuaria para atender cadenas de suministro regionales bajo modelos de economía circular.',
    },
    {
      region: 'ESTADOS UNIDOS',
      phase: 'Mercado Objetivo de Expansión',
      detail:
        'Proyección de exportación bajo términos Incoterms® como FOB, conectando la materia prima reciclada colombiana con fabricantes e importadores en Estados Unidos.',
    },
    {
      region: 'MUNDO',
      phase: 'Conexión Global Sostenible',
      detail:
        'Posicionar a Green Rubber como un referente latinoamericano en la transformación industrial de llantas fuera de uso hacia mercados globales.',
    },
  ];

  const legalContent = {
    privacidad: {
      title: 'Política de Privacidad',
      body: 'Green Rubber protege la confidencialidad de la información suministrada por clientes, proveedores y aliados comerciales a través de este portal corporativo. Los datos recopilados en los formularios de cotización y contacto se utilizan exclusivamente para estructurar propuestas técnicas, gestionar relaciones comerciales B2B y brindar soporte sobre nuestros productos de caucho reciclado.',
    },
    terminos: {
      title: 'Términos y Condiciones Comerciales',
      body: 'Las especificaciones granulométricas, presentaciones de empaque y condiciones de despacho se formalizan en cada orden de compra o cotización oficial emitida por Green Rubber. En operaciones con proyección internacional bajo el Incoterm® FOB, las obligaciones y transferencia de riesgo se rigen por las reglas oficiales de la Cámara de Comercio Internacional (ICC) acordadas contractualmente.',
    },
    datos: {
      title: 'Autorización y Tratamiento de Datos Personales',
      body: 'En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia, el titular autoriza a Green Rubber para recolectar, almacenar y tratar sus datos corporativos de contacto con fines comerciales, técnicos y administrativos. El titular podrá conocer, actualizar o solicitar la supresión de sus datos escribiendo a nuestro correo electrónico corporativo.',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202124]">
      {/* ==================================================
          TOP BAR CONTRACT (Strictly 3 Zones: Brand, Nav Links, Actions)
      ================================================== */}
      <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#inicio"
          className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#075B2A] whitespace-nowrap shrink-0"
        >
          Green Rubber
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav
          className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#5F6368]"
          aria-label="Navegación principal"
        >
          <a
            href="#inicio"
            className="hover:text-[#075B2A] transition-colors whitespace-nowrap"
          >
            Inicio
          </a>
          <a
            href="#nosotros"
            className="hover:text-[#075B2A] transition-colors whitespace-nowrap"
          >
            Nosotros
          </a>
          <a
            href="#proceso"
            className="hover:text-[#075B2A] transition-colors whitespace-nowrap"
          >
            Proceso
          </a>
          <a
            href="#productos"
            className="hover:text-[#075B2A] transition-colors whitespace-nowrap"
          >
            Productos
          </a>
          <a
            href="#aplicaciones"
            className="hover:text-[#075B2A] transition-colors whitespace-nowrap"
          >
            Aplicaciones
          </a>
          <a
            href="#impacto"
            className="hidden xl:inline-block hover:text-[#075B2A] transition-colors whitespace-nowrap"
          >
            Impacto
          </a>
          <a
            href="#comercio"
            className="hidden xl:inline-block hover:text-[#075B2A] transition-colors whitespace-nowrap"
          >
            Comercio Internacional
          </a>
          <a
            href="#contacto"
            className="hidden xl:inline-block hover:text-[#075B2A] transition-colors whitespace-nowrap"
          >
            Contacto
          </a>
        </nav>

        {/* Zone 3: 1–2 Primary Actions + Mobile Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleRequestQuote()}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#138A36] hover:bg-[#075B2A] rounded-lg transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline">Solicitar Cotización</span>
            <span className="sm:hidden">Cotizar</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenPayment()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#202124] hover:bg-[#075B2A] rounded-lg transition-colors whitespace-nowrap"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#78C850]" />
            <span>Comprar / Pagar</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-[#202124] hover:bg-neutral-100 rounded-lg"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 z-30 bg-white border-b border-neutral-200 shadow-lg px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-[#202124]">
            <button
              type="button"
              onClick={() => scrollToSection('inicio')}
              className="text-left py-2 hover:text-[#138A36]"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('nosotros')}
              className="text-left py-2 hover:text-[#138A36]"
            >
              Nosotros
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('proceso')}
              className="text-left py-2 hover:text-[#138A36]"
            >
              Proceso
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('productos')}
              className="text-left py-2 hover:text-[#138A36]"
            >
              Productos
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('aplicaciones')}
              className="text-left py-2 hover:text-[#138A36]"
            >
              Aplicaciones
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('impacto')}
              className="text-left py-2 hover:text-[#138A36]"
            >
              Impacto
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('comercio')}
              className="text-left py-2 hover:text-[#138A36]"
            >
              Comercio Internacional
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contacto')}
              className="text-left py-2 hover:text-[#138A36]"
            >
              Contacto
            </button>
          </div>
          <div className="pt-3 border-t border-neutral-200 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleRequestQuote()}
              className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#138A36] rounded-lg text-center"
            >
              Solicitar Cotización
            </button>
            <button
              type="button"
              onClick={() => handleOpenPayment()}
              className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#202124] rounded-lg text-center"
            >
              Comprar / Pagar
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* ==================================================
            1. HERO / PORTADA
        ================================================== */}
        <section
          id="inicio"
          className="relative bg-[#202124] text-white overflow-hidden scroll-mt-16"
        >
          {/* Background High-Impact Industrial Image with Measured Scrim */}
          <div className="absolute inset-0">
            <ResilientImage
              src={GENERATED_IMAGES.heroPlant}
              alt="Planta industrial de reciclaje y trituración de llantas Green Rubber en Colombia"
              className="w-full h-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#202124]/95 via-[#202124]/85 to-[#075B2A]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#202124] via-transparent to-transparent" />
          </div>

          <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-3xl space-y-6">
              {/* Corporate Emblem & Slogan Lockup */}
              <div className="pb-2">
                <GreenRubberLogo variant="light" showSlogan={true} size="lg" />
              </div>

              {/* Unboxed Metadata Lead-In */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#78C850]">
                <span>DE RESIDUO A RECURSO</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#DFF3E4]">
                  Transformación Industrial de Caucho en Colombia
                </span>
              </div>

              {/* Hero Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Transformamos llantas usadas en nuevas oportunidades
              </h1>

              {/* Hero Subtitle */}
              <p className="text-base sm:text-lg text-[#DFF3E4]/90 leading-relaxed max-w-2xl">
                En Green Rubber convertimos residuos de llantas en materias primas reutilizables
                para soluciones de construcción, deporte, aislamiento acústico e infraestructura.
              </p>

              {/* Slogan Statement */}
              <p className="text-sm font-display font-semibold text-[#78C850]">
                “De residuo a recurso, de Colombia al mundo”
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleRequestQuote()}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#138A36] hover:bg-[#2E9F45] rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  <span>Solicitar cotización</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('proceso')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Conoce nuestro proceso</span>
                </button>
              </div>
            </div>

            {/* 4 Strategic Indicators Bar below Hero */}
            <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3.5">
                <Recycle className="w-5 h-5 text-[#78C850] shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-bold text-white">
                    Economía circular
                  </div>
                  <div className="text-xs text-neutral-300 mt-0.5">
                    Reincorporación continua de materiales a cadenas productivas
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Leaf className="w-5 h-5 text-[#78C850] shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-bold text-white">
                    Aprovechamiento de residuos
                  </div>
                  <div className="text-xs text-neutral-300 mt-0.5">
                    Gestión técnica de llantas fuera de uso sin combustión
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Factory className="w-5 h-5 text-[#78C850] shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-bold text-white">
                    Transformación industrial
                  </div>
                  <div className="text-xs text-neutral-300 mt-0.5">
                    Trituración y molienda con control granulométrico B2B
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Globe className="w-5 h-5 text-[#78C850] shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-bold text-white">
                    Proyección internacional
                  </div>
                  <div className="text-xs text-neutral-300 mt-0.5">
                    Preparados para conectar a Colombia con mercados internacionales
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            2. SECCIÓN "NOSOTROS", 3. MISIÓN & 4. VISIÓN
        ================================================== */}
        <section id="nosotros" className="py-20 lg:py-28 bg-white scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {/* About Narrative & 3 Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#138A36]">
                  <span>Quiénes Somos</span>
                  <span aria-hidden="true">·</span>
                  <span>Industria Colombiana de Reciclaje de Caucho</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202124]">
                  Transformamos el problema en una oportunidad
                </h2>

                <p className="text-base text-[#5F6368] leading-relaxed">
                  Green Rubber nace con el propósito de aportar a la economía circular mediante
                  el aprovechamiento de llantas fuera de uso. A través de procesos de
                  transformación y molienda, convertimos este residuo en materiales que pueden
                  reincorporarse a diferentes cadenas productivas.
                </p>

                <p className="text-base text-[#202124] font-medium leading-relaxed">
                  Nuestro enfoque combina innovación, responsabilidad ambiental y desarrollo
                  empresarial para generar soluciones con valor agregado.
                </p>
              </div>

              {/* Three Cards: RECICLAR, TRANSFORMAR, REUTILIZAR */}
              <div className="lg:col-span-6 grid grid-cols-1 gap-4">
                <div className="p-6 rounded-xl bg-[#F8FAFC] border border-neutral-200 flex items-start gap-4">
                  <span className="font-mono text-sm font-bold text-[#138A36] tabular-nums mt-0.5">
                    01.
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#202124]">
                      Reciclar
                    </h3>
                    <p className="text-sm text-[#5F6368] mt-1 leading-relaxed">
                      Recuperamos materiales provenientes de llantas fuera de uso.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#F8FAFC] border border-neutral-200 flex items-start gap-4">
                  <span className="font-mono text-sm font-bold text-[#138A36] tabular-nums mt-0.5">
                    02.
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#202124]">
                      Transformar
                    </h3>
                    <p className="text-sm text-[#5F6368] mt-1 leading-relaxed">
                      Procesamos y molemos el caucho mediante procesos controlados.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#F8FAFC] border border-neutral-200 flex items-start gap-4">
                  <span className="font-mono text-sm font-bold text-[#138A36] tabular-nums mt-0.5">
                    03.
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#202124]">
                      Reutilizar
                    </h3>
                    <p className="text-sm text-[#5F6368] mt-1 leading-relaxed">
                      Convertimos el material recuperado en una materia prima con nuevas
                      aplicaciones.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. MISIÓN & 4. VISIÓN */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* 3. MISIÓN (Elegant card with dark green background #075B2A) */}
              <div className="lg:col-span-5 rounded-2xl bg-[#075B2A] text-white p-8 sm:p-10 flex flex-col justify-between border border-[#138A36]/40">
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#78C850]">
                    Propósito Corporativo
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    Nuestra misión
                  </h3>
                  <p className="text-sm sm:text-base text-[#DFF3E4]/90 leading-relaxed">
                    Transformar llantas fuera de uso en materias primas y soluciones
                    reutilizables, mediante procesos responsables e innovadores que contribuyan
                    a la economía circular, reduzcan el impacto ambiental de los residuos y
                    generen valor para nuestros clientes, aliados y comunidades.
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-white/15 flex items-center justify-between text-xs text-[#DFF3E4]/80">
                  <span>Compromiso Industrial y Ambiental</span>
                  <span className="font-mono text-[#78C850]">Green Rubber</span>
                </div>
              </div>

              {/* 4. VISIÓN + Graphic Progression COLOMBIA -> AMÉRICA -> ESTADOS UNIDOS -> MUNDO */}
              <div className="lg:col-span-7 rounded-2xl bg-[#F8FAFC] border border-neutral-200 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#138A36] font-semibold">
                    Horizonte Estratégico · Visión de Expansión hacia Estados Unidos
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#202124]">
                    Nuestra visión
                  </h3>
                  <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed">
                    Ser una empresa referente en Colombia en el aprovechamiento y transformación
                    de llantas fuera de uso, consolidando soluciones innovadoras para diferentes
                    industrias y desarrollando progresivamente nuestra presencia en mercados
                    internacionales, con Estados Unidos como uno de nuestros mercados de
                    expansión.
                  </p>
                </div>

                {/* Interactive Graphic Representation: COLOMBIA -> AMÉRICA -> ESTADOS UNIDOS -> MUNDO */}
                <div className="pt-4 border-t border-neutral-200 space-y-4">
                  <div className="text-xs font-semibold text-[#202124]">
                    Ruta de Proyección Estratégica — Explora cada etapa:
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {visionStages.map((item, idx) => {
                      const isCurrent = idx === activeVisionIndex;
                      return (
                        <button
                          key={item.region}
                          type="button"
                          onClick={() => setActiveVisionIndex(idx)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isCurrent
                              ? 'bg-[#202124] text-white border-[#202124]'
                              : 'bg-white text-[#202124] border-neutral-200 hover:border-[#138A36]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                            <span className={isCurrent ? 'text-[#78C850]' : 'text-[#138A36]'}>
                              0{idx + 1}
                            </span>
                            {idx < visionStages.length - 1 && (
                              <span
                                className={isCurrent ? 'text-[#78C850]' : 'text-neutral-400'}
                                aria-hidden="true"
                              >
                                →
                              </span>
                            )}
                          </div>
                          <div className="font-display text-xs font-bold truncate">
                            {item.region}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs text-[#5F6368]">
                    <span className="font-semibold text-[#075B2A]">
                      {visionStages[activeVisionIndex].region} —{' '}
                      {visionStages[activeVisionIndex].phase}:{' '}
                    </span>
                    <span>{visionStages[activeVisionIndex].detail}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PROCESO & 8. ECONOMÍA CIRCULAR */}
        <ProcessAndCircularSection
          onRequestQuote={(productName) => handleRequestQuote(productName)}
        />

        {/* 6. PRODUCTOS, 7. APLICACIONES & 11. CLIENTES / INDUSTRIAS */}
        <ProductsAndApplicationsSection
          products={products}
          onUpdateProducts={setProducts}
          onRequestQuoteForProduct={(prod, app) => handleRequestQuote(prod, app, false)}
          onOpenPaymentForProduct={(prod) => handleOpenPayment(prod)}
        />

        {/* 9. IMPACTO AMBIENTAL & 10. COMERCIO INTERNACIONAL */}
        <ImpactAndInternationalSection
          metrics={impactMetrics}
          onUpdateMetrics={setImpactMetrics}
          onRequestExportQuote={() =>
            handleRequestQuote('Caucho Granulado', 'Proyección Exportación FOB', true)
          }
        />

        {/* 12. COTIZACIÓN, 13. PAGO & 14. CONTACTO */}
        <QuotePaymentContactSection
          products={products}
          preselectedProduct={preselectedProduct}
          preselectedApplication={preselectedApplication}
          preselectedExport={preselectedExport}
          contactData={contactData}
          onUpdateContactData={setContactData}
        />
      </main>

      {/* ==================================================
          15. FOOTER PROFESIONAL
      ================================================== */}
      <footer className="bg-[#202124] text-white border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <GreenRubberLogo variant="light" showSlogan={true} size="md" />
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
                Transformación industrial de llantas fuera de uso en caucho triturado, granulado
                y molido para cadenas productivas en Colombia con visión de expansión
                internacional.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-4 space-y-3">
              <div className="font-display text-sm font-bold text-white">
                Navegación Corporativa
              </div>
              <ul className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
                <li>
                  <a href="#inicio" className="hover:text-[#78C850] transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#nosotros" className="hover:text-[#78C850] transition-colors">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#proceso" className="hover:text-[#78C850] transition-colors">
                    Proceso
                  </a>
                </li>
                <li>
                  <a href="#productos" className="hover:text-[#78C850] transition-colors">
                    Productos
                  </a>
                </li>
                <li>
                  <a href="#aplicaciones" className="hover:text-[#78C850] transition-colors">
                    Aplicaciones
                  </a>
                </li>
                <li>
                  <a href="#impacto" className="hover:text-[#78C850] transition-colors">
                    Impacto
                  </a>
                </li>
                <li>
                  <a href="#comercio" className="hover:text-[#78C850] transition-colors">
                    Comercio internacional
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="hover:text-[#78C850] transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Information Column */}
            <div className="lg:col-span-3 space-y-3">
              <div className="font-display text-sm font-bold text-white">
                Información Legal
              </div>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('privacidad')}
                    className="hover:text-[#78C850] transition-colors text-left"
                  >
                    Política de privacidad
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('terminos')}
                    className="hover:text-[#78C850] transition-colors text-left"
                  >
                    Términos y condiciones
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('datos')}
                    className="hover:text-[#78C850] transition-colors text-left"
                  >
                    Tratamiento de datos
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <p>© 2026 Green Rubber. Todos los derechos reservados.</p>
            <p className="text-neutral-500">
              De residuo a recurso, de Colombia al mundo
            </p>
          </div>
        </div>
      </footer>

      {/* ==================================================
          FLOATING STRATEGIC BUTTONS (WhatsApp + Solicitar Cotización)
      ================================================== */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => handleRequestQuote()}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#202124] hover:bg-[#075B2A] border border-white/15 rounded-xl shadow-lg transition-colors whitespace-nowrap"
        >
          <FileText className="w-3.5 h-3.5 text-[#78C850]" />
          <span>Solicitar cotización</span>
        </button>

        <a
          href={`https://wa.me/${contactData.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#138A36] hover:bg-[#075B2A] rounded-xl shadow-lg transition-colors whitespace-nowrap"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>

      {/* Legal Notice Modal */}
      {activeLegalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-neutral-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="font-display text-xl font-bold text-[#202124]">
                {legalContent[activeLegalModal].title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="p-1.5 text-[#5F6368] hover:text-[#202124] rounded-lg"
                aria-label="Cerrar ventana legal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-[#5F6368] leading-relaxed">
              {legalContent[activeLegalModal].body}
            </p>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#138A36] hover:bg-[#075B2A] rounded-lg"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
