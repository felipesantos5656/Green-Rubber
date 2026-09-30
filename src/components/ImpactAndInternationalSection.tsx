import React, { useState } from 'react';
import {
  Sliders,
  Check,
  RotateCcw,
  Ship,
  Anchor,
  Globe,
  Factory,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ImpactMetric, INITIAL_IMPACT_METRICS } from '../data/greenRubberData';

interface ImpactAndInternationalSectionProps {
  metrics: ImpactMetric[];
  onUpdateMetrics: (updated: ImpactMetric[]) => void;
  onRequestExportQuote: () => void;
}

export const ImpactAndInternationalSection: React.FC<
  ImpactAndInternationalSectionProps
> = ({ metrics, onUpdateMetrics, onRequestExportQuote }) => {
  const [isEditingImpact, setIsEditingImpact] = useState(false);
  const [selectedCorridorStep, setSelectedCorridorStep] = useState<number>(0);

  const corridorSteps = [
    {
      step: '01',
      title: 'COLOMBIA 🇨🇴',
      subtitle: 'Planta de Transformación Industrial',
      detail:
        'Procesamiento mecánico de llantas fuera de uso, control granulométrico, empaque en Big Bags o sacos paletizados y preparación documental para despacho.',
      fobOwner: 'Responsabilidad Green Rubber (Vendedor)',
      icon: Factory,
    },
    {
      step: '02',
      title: 'PUERTO COLOMBIANO',
      subtitle: 'Logística Portuaria y Aduana de Exportación',
      detail:
        'Transporte terrestre nacional hacia puerto marítimo colombiano convenido, trámites aduaneros de exportación y carga efectiva a bordo del buque.',
      fobOwner: 'Transferencia de riesgo bajo Incoterm® FOB a bordo del buque',
      icon: Anchor,
    },
    {
      step: '03',
      title: 'TRANSPORTE MARÍTIMO',
      subtitle: 'Ruta Marítima Internacional',
      detail:
        'Tránsito oceánico en contenedores hacia puertos de destino internacional conforme a la programación naviera contratada por el comprador.',
      fobOwner: 'Responsabilidad y costos a cargo del Comprador bajo FOB',
      icon: Ship,
    },
    {
      step: '04',
      title: 'ESTADOS UNIDOS 🇺🇸',
      subtitle: 'Mercado Objetivo de Expansión',
      detail:
        'Recepción en puerto de destino e incorporación de materia prima reciclada en cadenas industriales de construcción, deporte, acústica e infraestructura.',
      fobOwner: 'Proyección de expansión comercial hacia Estados Unidos',
      icon: Globe,
    },
  ];

  const handleMetricChange = (id: string, newValue: string) => {
    const updated = metrics.map((m) =>
      m.id === id ? { ...m, value: newValue } : m
    );
    onUpdateMetrics(updated);
  };

  return (
    <>
      {/* ==================================================
          9. IMPACTO AMBIENTAL ("Nuestro impacto")
      ================================================== */}
      <section
        id="impacto"
        className="py-20 lg:py-28 bg-[#DFF3E4]/45 border-b border-neutral-200 scroll-mt-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#075B2A] mb-3">
                <span>Sostenibilidad Medible</span>
                <span aria-hidden="true">·</span>
                <span>Indicadores Operativos Editables</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202124]">
                Nuestro impacto
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditingImpact((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                  isEditingImpact
                    ? 'bg-[#075B2A] text-white border-[#075B2A]'
                    : 'bg-white text-[#202124] border-neutral-300 hover:border-[#138A36]'
                }`}
              >
                {isEditingImpact ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Guardar indicadores</span>
                  </>
                ) : (
                  <>
                    <Sliders className="w-3.5 h-3.5 text-[#138A36]" />
                    <span>Editar contadores operativos</span>
                  </>
                )}
              </button>

              {isEditingImpact && (
                <button
                  type="button"
                  onClick={() => onUpdateMetrics(INITIAL_IMPACT_METRICS)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5F6368] hover:text-[#202124] bg-white border border-neutral-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar a +000</span>
                </button>
              )}
            </div>
          </div>

          {/* 4 Editable Counters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white rounded-xl p-6 border border-neutral-200/90 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-[#5F6368] mb-3">
                    Indicador · {metric.unit}
                  </div>
                  {isEditingImpact ? (
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => handleMetricChange(metric.id, e.target.value)}
                      aria-label={metric.label}
                      className="w-full font-mono text-3xl font-bold text-[#138A36] bg-neutral-50 border border-[#138A36] rounded-lg px-3 py-1.5 mb-3 tabular-nums focus:outline-none"
                    />
                  ) : (
                    <div className="font-mono text-4xl sm:text-5xl font-bold text-[#075B2A] tracking-tight tabular-nums mb-3">
                      [ {metric.value} ]
                    </div>
                  )}
                  <h3 className="font-display text-lg font-bold text-[#202124] mb-2">
                    {metric.label}
                  </h3>
                </div>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mandatory Transparency Note & Quote */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <p className="text-xs font-mono text-[#5F6368]">
                Estos indicadores serán actualizados con datos reales de nuestra operación.
              </p>
              <blockquote className="font-display text-lg sm:text-xl font-bold text-[#075B2A]">
                “Cada llanta aprovechada representa una oportunidad para recuperar materiales y
                reincorporarlos a nuevos ciclos productivos.”
              </blockquote>
            </div>
            <div className="text-xs text-[#138A36] font-semibold shrink-0">
              Economía Circular en Colombia
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          10. COMERCIO INTERNACIONAL ("De Colombia al mundo")
      ================================================== */}
      <section id="comercio" className="py-20 lg:py-28 bg-white scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Strategic Vision & FOB Explanation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-medium text-[#138A36]">
                <span>Proyección Internacional</span>
                <span aria-hidden="true">·</span>
                <span>Visión de Expansión hacia Estados Unidos</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202124]">
                De Colombia al mundo
              </h2>

              <p className="text-base text-[#5F6368] leading-relaxed">
                Green Rubber proyecta el crecimiento de sus operaciones hacia mercados
                internacionales, desarrollando capacidades para ofrecer materias primas
                recicladas a clientes que buscan soluciones dentro de modelos de economía
                circular.
              </p>

              <p className="text-sm text-[#202124] font-medium leading-relaxed">
                Preparados para conectar a Colombia con mercados internacionales mediante
                estándares técnicos B2B, trazabilidad granulométrica y alistamiento logístico.
              </p>

              {/* Dedicated FOB Block */}
              <div className="p-6 sm:p-7 rounded-xl bg-[#202124] text-white space-y-4 border border-neutral-800">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#78C850]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>PROYECCIÓN DE EXPORTACIÓN · INCOTERMS®</span>
                  </div>
                  <span className="font-mono text-xs text-neutral-400">Modalidad FOB</span>
                </div>

                <h3 className="font-display text-xl font-bold text-white">
                  Proyección de Exportación (Free On Board — FOB)
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  En operaciones internacionales, Green Rubber contempla el uso de Incoterms®
                  adecuados a las condiciones comerciales acordadas con el comprador. Para
                  operaciones bajo FOB, la responsabilidad y el riesgo se transfieren conforme a
                  las reglas establecidas para dicho término, una vez la mercancía ha sido
                  cargada a bordo del buque en el puerto de embarque convenido.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onRequestExportQuote}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#138A36] hover:bg-[#2E9F45] text-white rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Solicitar cotización con proyección de exportación</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Corridor Map COLOMBIA -> PUERTO -> MARÍTIMO -> EE. UU. */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-neutral-200 bg-[#F8FAFC] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#202124]">
                      Ruta proyectada de conexión comercial
                    </h3>
                    <p className="text-xs text-[#5F6368] mt-0.5">
                      Selecciona cada nodo logístico para revisar el alcance operativo
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#075B2A] font-semibold">
                    CO → US
                  </span>
                </div>

                {/* Vertical Visual Corridor Chain */}
                <div className="space-y-3">
                  {corridorSteps.map((node, index) => {
                    const Icon = node.icon;
                    const isSelected = selectedCorridorStep === index;
                    return (
                      <div key={node.step}>
                        <button
                          type="button"
                          onClick={() => setSelectedCorridorStep(index)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-4 ${
                            isSelected
                              ? 'bg-[#075B2A] text-white border-[#075B2A] shadow-sm'
                              : 'bg-white text-[#202124] border-neutral-200 hover:border-[#138A36]'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-white/15 text-[#78C850]'
                                : 'bg-[#DFF3E4] text-[#075B2A]'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`font-display text-base font-bold ${
                                  isSelected ? 'text-white' : 'text-[#202124]'
                                }`}
                              >
                                {node.title}
                              </span>
                              <span
                                className={`font-mono text-xs tabular-nums ${
                                  isSelected ? 'text-[#78C850]' : 'text-[#5F6368]'
                                }`}
                              >
                                Etapa {node.step}
                              </span>
                            </div>
                            <div
                              className={`text-xs font-medium mt-0.5 ${
                                isSelected ? 'text-[#DFF3E4]' : 'text-[#138A36]'
                              }`}
                            >
                              {node.subtitle}
                            </div>
                            {isSelected && (
                              <div className="mt-3 pt-3 border-t border-white/15 space-y-2 text-xs text-[#DFF3E4]/90">
                                <p className="leading-relaxed">{node.detail}</p>
                                <div className="font-mono text-[11px] text-[#78C850]">
                                  Alcance FOB: {node.fobOwner}
                                </div>
                              </div>
                            )}
                          </div>
                        </button>

                        {index < corridorSteps.length - 1 && (
                          <div
                            className="flex justify-center py-1 text-[#138A36] font-mono text-sm"
                            aria-hidden="true"
                          >
                            ↓
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
