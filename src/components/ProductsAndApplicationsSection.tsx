import React, { useState } from 'react';
import {
  FileText,
  Sliders,
  ArrowUpRight,
  Building2,
  Dumbbell,
  Route,
  Volume2,
  Factory,
  Recycle,
  X,
  Check,
  RotateCcw,
} from 'lucide-react';
import {
  RawMaterialProduct,
  APPLICATIONS_DATA,
  INITIAL_PRODUCTS,
} from '../data/greenRubberData';
import { ResilientImage } from './ResilientImage';

interface ProductsAndApplicationsSectionProps {
  products: RawMaterialProduct[];
  onUpdateProducts: (updated: RawMaterialProduct[]) => void;
  onRequestQuoteForProduct: (productName: string, applicationName?: string) => void;
  onOpenPaymentForProduct: (productName: string) => void;
}

export const ProductsAndApplicationsSection: React.FC<
  ProductsAndApplicationsSectionProps
> = ({
  products,
  onUpdateProducts,
  onRequestQuoteForProduct,
  onOpenPaymentForProduct,
}) => {
  const [isEditingCatalog, setIsEditingCatalog] = useState(false);
  const [selectedTechSheet, setSelectedTechSheet] = useState<RawMaterialProduct | null>(
    null
  );
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Todas');

  const industriesList = [
    { id: 'Todas', label: 'Todas las industrias', icon: Factory },
    { id: 'Construcción', label: 'Construcción', icon: Building2 },
    { id: 'Deporte y Fitness', label: 'Deporte y Fitness', icon: Dumbbell },
    { id: 'Infraestructura Vial', label: 'Infraestructura Vial', icon: Route },
    { id: 'Acústica', label: 'Acústica', icon: Volume2 },
    { id: 'Industria', label: 'Industria', icon: Factory },
    { id: 'Economía Circular', label: 'Economía Circular', icon: Recycle },
  ];

  const handleFieldChange = (
    productId: string,
    field: keyof RawMaterialProduct,
    value: string
  ) => {
    const next = products.map((item) =>
      item.id === productId ? { ...item, [field]: value } : item
    );
    onUpdateProducts(next);
  };

  const handleResetCatalog = () => {
    onUpdateProducts(INITIAL_PRODUCTS);
  };

  const filteredApplications =
    selectedIndustry === 'Todas'
      ? APPLICATIONS_DATA
      : APPLICATIONS_DATA.filter((app) => app.industries.includes(selectedIndustry));

  return (
    <>
      {/* ==================================================
          6. PRODUCTOS / MATERIAS PRIMAS ("Materia prima con nuevas posibilidades")
      ================================================== */}
      <section id="productos" className="py-20 lg:py-28 bg-white scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#138A36] mb-3">
                <span>Catálogo B2B de Materias Primas</span>
                <span aria-hidden="true">·</span>
                <span>Especificaciones Personalizables</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202124]">
                Materia prima con nuevas posibilidades
              </h2>
            </div>

            {/* Interactive Catalog Spec Editor Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditingCatalog((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                  isEditingCatalog
                    ? 'bg-[#075B2A] text-white border-[#075B2A]'
                    : 'bg-neutral-100 text-[#202124] border-neutral-200 hover:border-[#138A36]'
                }`}
              >
                {isEditingCatalog ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Guardar fichas técnicas</span>
                  </>
                ) : (
                  <>
                    <Sliders className="w-3.5 h-3.5 text-[#138A36]" />
                    <span>Editar parámetros técnicos</span>
                  </>
                )}
              </button>

              {isEditingCatalog && (
                <button
                  type="button"
                  onClick={handleResetCatalog}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5F6368] hover:text-[#202124] bg-neutral-50 border border-neutral-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar valores base</span>
                </button>
              )}
            </div>
          </div>

          {isEditingCatalog && (
            <div className="mb-8 p-4 rounded-xl bg-[#DFF3E4]/60 border border-[#138A36]/30 text-xs sm:text-sm text-[#075B2A] flex items-center justify-between gap-4">
              <span>
                Modo de edición activo: Puedes actualizar granulometría, presentación, peso,
                empaque, aplicaciones, ficha técnica y disponibilidad de cada línea de producto.
              </span>
            </div>
          )}

          {/* 4 Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <article
                key={product.id}
                className="rounded-xl border border-neutral-200 bg-white overflow-hidden flex flex-col justify-between transition-colors hover:border-[#138A36]/60"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-56 w-full bg-[#202124] overflow-hidden">
                    <ResilientImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202124]/90 via-[#202124]/30 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-xs font-mono text-[#78C850] tabular-nums mb-1">
                          Línea Industrial 0{index + 1} · {product.pureza}
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Subtitle & Technical Table */}
                  <div className="p-6">
                    <p className="text-sm text-[#5F6368] mb-5">{product.subtitle}</p>

                    <dl className="divide-y divide-neutral-200/70 border-y border-neutral-200/70 text-xs sm:text-sm">
                      {(
                        [
                          { key: 'granulometria', label: 'Granulometría' },
                          { key: 'presentacion', label: 'Presentación' },
                          { key: 'peso', label: 'Peso' },
                          { key: 'empaque', label: 'Empaque' },
                          { key: 'aplicaciones', label: 'Aplicaciones' },
                          { key: 'fichaTecnica', label: 'Ficha técnica' },
                          { key: 'disponibilidad', label: 'Disponibilidad' },
                        ] as const
                      ).map((row) => (
                        <div
                          key={row.key}
                          className="py-2.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline"
                        >
                          <dt className="sm:col-span-4 font-semibold text-[#202124]">
                            {row.label}
                          </dt>
                          <dd className="sm:col-span-8 text-[#5F6368] font-mono text-xs tabular-nums">
                            {isEditingCatalog ? (
                              <input
                                type="text"
                                value={product[row.key]}
                                onChange={(e) =>
                                  handleFieldChange(product.id, row.key, e.target.value)
                                }
                                className="w-full px-2.5 py-1 bg-neutral-50 border border-neutral-300 rounded text-[#202124] focus:outline-none focus:border-[#138A36]"
                              />
                            ) : (
                              product[row.key]
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTechSheet(product)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#202124] bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#138A36]" />
                    <span>Ver ficha técnica</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenPaymentForProduct(product.name)}
                      className="px-3.5 py-2 text-xs font-semibold text-[#075B2A] bg-[#DFF3E4] hover:bg-[#78C850]/30 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Comprar lote / Muestra
                    </button>
                    <button
                      type="button"
                      onClick={() => onRequestQuoteForProduct(product.name)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#138A36] hover:bg-[#075B2A] rounded-lg transition-colors whitespace-nowrap"
                    >
                      <span>Solicitar cotización</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          7. APLICACIONES & 11. CLIENTES / INDUSTRIAS
      ================================================== */}
      <section
        id="aplicaciones"
        className="py-20 lg:py-28 bg-[#202124] text-white scroll-mt-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-xs font-medium text-[#78C850] mb-3">
              <span>Soluciones Industriales</span>
              <span aria-hidden="true">·</span>
              <span>Desempeño Técnico Comprobado</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              El caucho reciclado puede convertirse en soluciones para diferentes industrias
            </h2>
          </div>

          {/* 11. CLIENTES / INDUSTRIAS ("Soluciones para diferentes industrias") Interactive Filter Bar */}
          <div className="mb-10">
            <div className="text-xs text-neutral-400 mb-3">
              Soluciones para diferentes industrias — Filtra aplicaciones por sector productivo:
            </div>
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-xl">
              {industriesList.map((ind) => {
                const Icon = ind.icon;
                const isActive = selectedIndustry === ind.id;
                return (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => setSelectedIndustry(ind.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#138A36] text-white shadow-sm'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{ind.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Large Application Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="group rounded-xl bg-white/[0.04] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#78C850]/50 transition-colors"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden">
                    <ResilientImage
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202124] via-[#202124]/35 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                      <div className="text-xs font-mono text-[#78C850] mb-1">
                        Aplicación {app.code} · {app.industries.join(' / ')}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        {app.code}. {app.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                      {app.description}
                    </p>
                    <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-neutral-400">
                      <div>
                        <span className="text-white font-semibold">
                          Materia prima sugerida:{' '}
                        </span>
                        <span className="font-mono text-[#DFF3E4]">
                          {app.recommendedMaterial}
                        </span>
                      </div>
                      <div>
                        <span className="text-white font-semibold">Aporte funcional: </span>
                        <span>{app.technicalSpec}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/10 mt-2">
                  <span className="text-xs text-neutral-400">
                    Disponible bajo especificación B2B
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onRequestQuoteForProduct(app.recommendedMaterial, app.title)
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#138A36] hover:bg-[#2E9F45] text-white rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Cotizar para {app.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Data Sheet Modal */}
      {selectedTechSheet && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tech-sheet-title"
        >
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-neutral-200 shadow-xl space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <div className="text-xs font-mono text-[#138A36] mb-1">
                  {selectedTechSheet.fichaTecnica}
                </div>
                <h3
                  id="tech-sheet-title"
                  className="font-display text-2xl font-bold text-[#202124]"
                >
                  Ficha Técnica · {selectedTechSheet.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTechSheet(null)}
                className="p-2 text-[#5F6368] hover:text-[#202124] rounded-lg"
                aria-label="Cerrar ficha técnica"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <p className="text-[#5F6368]">{selectedTechSheet.subtitle}</p>
              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 space-y-2.5 text-xs">
                <div className="flex justify-between gap-4 py-1 border-b border-neutral-200/70">
                  <span className="font-semibold text-[#202124]">Granulometría:</span>
                  <span className="font-mono text-[#5F6368] text-right">
                    {selectedTechSheet.granulometria}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-neutral-200/70">
                  <span className="font-semibold text-[#202124]">Pureza Polimérica:</span>
                  <span className="font-mono text-[#5F6368] text-right">
                    {selectedTechSheet.pureza}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-neutral-200/70">
                  <span className="font-semibold text-[#202124]">Presentación:</span>
                  <span className="font-mono text-[#5F6368] text-right">
                    {selectedTechSheet.presentacion}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-neutral-200/70">
                  <span className="font-semibold text-[#202124]">Peso por unidad:</span>
                  <span className="font-mono text-[#5F6368] text-right">
                    {selectedTechSheet.peso}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-neutral-200/70">
                  <span className="font-semibold text-[#202124]">Empaque industrial:</span>
                  <span className="font-mono text-[#5F6368] text-right">
                    {selectedTechSheet.empaque}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1">
                  <span className="font-semibold text-[#202124]">Disponibilidad:</span>
                  <span className="font-mono text-[#138A36] font-semibold text-right">
                    {selectedTechSheet.disponibilidad}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedTechSheet(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5F6368] hover:text-[#202124]"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  const name = selectedTechSheet.name;
                  setSelectedTechSheet(null);
                  onRequestQuoteForProduct(name);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#138A36] hover:bg-[#075B2A] rounded-lg transition-colors"
              >
                Solicitar cotización de este material
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
