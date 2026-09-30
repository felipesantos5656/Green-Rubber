import React, { useState } from 'react';
import {
  Truck,
  Layers,
  Cog,
  Filter,
  PackageCheck,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PROCESS_STEPS, CIRCULAR_STEPS } from '../data/greenRubberData';

interface ProcessAndCircularSectionProps {
  onRequestQuote: (productName?: string) => void;
}

export const ProcessAndCircularSection: React.FC<ProcessAndCircularSectionProps> = ({
  onRequestQuote,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [activeCircularId, setActiveCircularId] = useState<number>(1);

  const stepIcons = [Truck, Filter, Cog, Layers, PackageCheck];
  const activeStep = PROCESS_STEPS[activeStepIndex];
  const activeCircular =
    CIRCULAR_STEPS.find((item) => item.id === activeCircularId) || CIRCULAR_STEPS[0];

  return (
    <>
      {/* ==================================================
          5. NUESTRO PROCESO ("Del residuo a la materia prima")
      ================================================== */}
      <section
        id="proceso"
        className="py-20 lg:py-28 bg-[#F8FAFC] border-y border-neutral-200/80 scroll-mt-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium text-[#138A36] mb-3">
                <span>Ingeniería de Transformación</span>
                <span aria-hidden="true">·</span>
                <span>5 Etapas Controladas</span>
                <span aria-hidden="true">·</span>
                <span>Trazabilidad Mecánica</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202124]">
                Del residuo a la materia prima
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#5F6368] max-w-md leading-relaxed">
              Procesamos llantas fuera de uso mediante líneas mecánicas de corte, trituración y
              molienda libre de combustión, garantizando granulometrías consistentes.
            </p>
          </div>

          {/* Interactive 5-Step Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            {PROCESS_STEPS.map((step, index) => {
              const IconComponent = stepIcons[index] || Cog;
              const isSelected = index === activeStepIndex;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  className={`group text-left p-6 rounded-xl border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#202124] text-white border-[#202124] shadow-md'
                      : 'bg-white text-[#202124] border-neutral-200 hover:border-[#138A36]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className={`font-mono text-sm font-semibold tabular-nums ${
                          isSelected ? 'text-[#78C850]' : 'text-[#138A36]'
                        }`}
                      >
                        {step.number}.
                      </span>
                      <IconComponent
                        className={`w-5 h-5 transition-transform duration-150 group-hover:scale-105 ${
                          isSelected ? 'text-[#78C850]' : 'text-[#5F6368]'
                        }`}
                      />
                    </div>
                    <h3
                      className={`font-display text-lg font-bold mb-2 ${
                        isSelected ? 'text-white' : 'text-[#202124]'
                      }`}
                    >
                      {step.number}. {step.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        isSelected ? 'text-neutral-300' : 'text-[#5F6368]'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  <div
                    className={`mt-6 pt-4 border-t text-xs font-medium flex items-center justify-between ${
                      isSelected
                        ? 'border-white/15 text-[#78C850]'
                        : 'border-neutral-100 text-[#5F6368] group-hover:text-[#138A36]'
                    }`}
                  >
                    <span className="whitespace-nowrap">Ver detalle técnico</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detail Inspector */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-[#5F6368] font-mono tabular-nums">
                <span className="text-[#075B2A] font-semibold">
                  Etapa {activeStep.number} de 05
                </span>
                <span aria-hidden="true">·</span>
                <span>Operación Industrial Controlada</span>
              </div>
              <h4 className="font-display text-xl font-bold text-[#202124]">
                {activeStep.number}. {activeStep.title}: {activeStep.description}
              </h4>
              <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed">
                {activeStep.technicalDetail}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#075B2A]">
                <CheckCircle2 className="w-4 h-4 text-[#138A36] shrink-0" />
                <span>Resultado de etapa: {activeStep.outputStage}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto justify-end">
              <button
                type="button"
                onClick={() =>
                  setActiveStepIndex((prev) => (prev + 1) % PROCESS_STEPS.length)
                }
                className="px-4 py-2.5 text-xs font-semibold text-[#202124] bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap"
              >
                Siguiente etapa
              </button>
              <button
                type="button"
                onClick={() => onRequestQuote()}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#138A36] hover:bg-[#075B2A] rounded-lg transition-colors whitespace-nowrap"
              >
                Solicitar cotización
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          8. ECONOMÍA CIRCULAR ("Convertimos residuos en recursos")
      ================================================== */}
      <section className="py-20 lg:py-24 bg-[#075B2A] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Narrative & Selected Node Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-xs text-[#DFF3E4]/80 font-medium">
                <span>Ciclo Continuo del Caucho</span>
                <span aria-hidden="true">·</span>
                <span>Reincorporación Productiva</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Convertimos residuos en recursos
              </h2>

              <p className="text-base text-[#DFF3E4]/90 leading-relaxed">
                Nuestro modelo busca mantener los materiales en circulación durante el mayor
                tiempo posible, reduciendo la necesidad de disponer las llantas fuera de uso y
                generando nuevas oportunidades de aprovechamiento.
              </p>

              {/* Interactive Selected Stage Box */}
              <div className="p-6 rounded-xl bg-[#202124]/45 border border-[#78C850]/30 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#78C850] font-mono tabular-nums">
                  <span>Fase Circular 0{activeCircular.id} / 07</span>
                  <RefreshCw className="w-4 h-4" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {activeCircular.label}
                </h3>
                <p className="text-sm text-[#DFF3E4]/85 leading-relaxed">
                  {activeCircular.detail}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onRequestQuote()}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold bg-[#78C850] text-[#202124] hover:bg-white rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Integrar caucho reciclado en mi empresa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Circular Chain Diagram */}
            <div className="lg:col-span-7">
              <div className="bg-[#202124]/35 border border-white/15 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <span className="text-xs font-medium text-[#DFF3E4]/80">
                    Diagrama de Economía Circular · Haz clic en cada eslabón para explorar
                  </span>
                  <span className="font-mono text-xs text-[#78C850] tabular-nums">
                    7 Eslabones
                  </span>
                </div>

                {/* Flow Diagram Chain */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {CIRCULAR_STEPS.map((node, idx) => {
                    const isCurrent = node.id === activeCircularId;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setActiveCircularId(node.id)}
                        className={`text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 ${
                          idx === CIRCULAR_STEPS.length - 1 ? 'sm:col-span-2' : ''
                        } ${
                          isCurrent
                            ? 'bg-white text-[#202124] border-white shadow-sm'
                            : 'bg-[#075B2A]/70 text-white border-white/15 hover:border-[#78C850]/60'
                        }`}
                      >
                        <span
                          className={`font-mono text-xs font-bold px-2 py-1 rounded tabular-nums shrink-0 ${
                            isCurrent
                              ? 'bg-[#138A36] text-white'
                              : 'bg-white/10 text-[#78C850]'
                          }`}
                        >
                          0{node.id}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`font-display text-sm font-bold truncate ${
                                isCurrent ? 'text-[#202124]' : 'text-white'
                              }`}
                            >
                              {node.label}
                            </span>
                            <span
                              className={`text-xs font-mono shrink-0 ${
                                isCurrent ? 'text-[#138A36]' : 'text-[#78C850]'
                              }`}
                              aria-hidden="true"
                            >
                              {idx < CIRCULAR_STEPS.length - 1 ? '↓' : '↺'}
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-1 line-clamp-2 ${
                              isCurrent ? 'text-[#5F6368]' : 'text-[#DFF3E4]/80'
                            }`}
                          >
                            {node.detail}
                          </p>
                        </div>
                      </button>
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
