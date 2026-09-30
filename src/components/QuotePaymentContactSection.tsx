import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Send,
  CheckCircle2,
  MessageSquare,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Sliders,
  Check,
  RotateCcw,
  Globe,
  Lock,
} from 'lucide-react';
import {
  ContactData,
  INITIAL_CONTACT_DATA,
  RawMaterialProduct,
} from '../data/greenRubberData';
import { GreenRubberLogo } from './GreenRubberLogo';

interface QuotePaymentContactSectionProps {
  products: RawMaterialProduct[];
  preselectedProduct: string;
  preselectedApplication: string;
  preselectedExport: boolean;
  contactData: ContactData;
  onUpdateContactData: (updated: ContactData) => void;
}

export const QuotePaymentContactSection: React.FC<
  QuotePaymentContactSectionProps
> = ({
  products,
  preselectedProduct,
  preselectedApplication,
  preselectedExport,
  contactData,
  onUpdateContactData,
}) => {
  // 12. Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    ciudadPais: '',
    producto: preselectedProduct || 'Caucho Granulado',
    cantidad: '',
    aplicacion: preselectedApplication || '',
    mensaje: '',
    paraExportacion: preselectedExport || false,
    puertoDestino: '',
  });
  const [quoteError, setQuoteError] = useState<string>('');
  const [quoteReceipt, setQuoteReceipt] = useState<{
    reference: string;
    timestamp: string;
    producto: string;
    cantidad: string;
    empresa: string;
    exportacion: boolean;
  } | null>(null);

  // Sync when external CTA preselects a product/application/export flag
  useEffect(() => {
    if (preselectedProduct) {
      setQuoteForm((prev) => ({ ...prev, producto: preselectedProduct }));
    }
  }, [preselectedProduct]);

  useEffect(() => {
    if (preselectedApplication) {
      setQuoteForm((prev) => ({ ...prev, aplicacion: preselectedApplication }));
    }
  }, [preselectedApplication]);

  useEffect(() => {
    setQuoteForm((prev) => ({ ...prev, paraExportacion: preselectedExport }));
  }, [preselectedExport]);

  // 13. Payment Section State
  const [selectedGateway, setSelectedGateway] = useState<string>('Wompi');
  const [paymentConcept, setPaymentConcept] = useState<string>(
    'Pago de Orden / Factura Proforma B2B'
  );
  const [paymentReference, setPaymentReference] = useState<string>('');
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [paymentCurrency, setPaymentCurrency] = useState<'COP' | 'USD'>('COP');
  const [paymentNotice, setPaymentNotice] = useState<string>('');

  // 14. Contact Form & Editable Info State
  const [isEditingContact, setIsEditingContact] = useState<boolean>(false);
  const [contactMessage, setContactMessage] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });
  const [contactSent, setContactSent] = useState<boolean>(false);
  const [contactError, setContactError] = useState<string>('');

  const gateways = [
    { id: 'Wompi', name: 'Wompi Bancolombia', region: 'Colombia · COP' },
    { id: 'Mercado Pago', name: 'Mercado Pago', region: 'Latinoamérica' },
    { id: 'PayU', name: 'PayU Latam', region: 'Multimoneda' },
    { id: 'Stripe', name: 'Stripe', region: 'Internacional · USD' },
    { id: 'PSE', name: 'PSE Débito Bancario', region: 'Pagos en línea CO' },
    { id: 'Tarjetas', name: 'Tarjetas Débito / Crédito', region: 'Visa · Mastercard' },
  ];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteError('');

    if (
      !quoteForm.nombre.trim() ||
      !quoteForm.correo.trim() ||
      !quoteForm.telefono.trim() ||
      !quoteForm.cantidad.trim()
    ) {
      setQuoteError(
        'Por favor completa los campos obligatorios: Nombre, Correo electrónico, Teléfono y Cantidad requerida.'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quoteForm.correo.trim())) {
      setQuoteError('Por favor ingresa un correo electrónico corporativo o personal válido.');
      return;
    }

    const refCode = `GR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuoteReceipt({
      reference: refCode,
      timestamp: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      producto: quoteForm.producto,
      cantidad: quoteForm.cantidad,
      empresa: quoteForm.empresa || quoteForm.nombre,
      exportacion: quoteForm.paraExportacion,
    });
    setPaymentReference(refCode);
  };

  const handlePreparePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const refLabel = paymentReference.trim() || 'GR-ORDEN-PENDIENTE';
    setPaymentNotice(
      `Módulo listo para conectar pasarela (${selectedGateway}). Referencia preparada: ${refLabel} en ${paymentCurrency}. La integración activa de cobro se habilitará al configurar las llaves de comercio.`
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');
    if (!contactMessage.nombre.trim() || !contactMessage.correo.trim() || !contactMessage.mensaje.trim()) {
      setContactError('Por favor ingresa tu nombre, correo electrónico y mensaje.');
      return;
    }
    setContactSent(true);
    setContactMessage({ nombre: '', correo: '', asunto: '', mensaje: '' });
  };

  return (
    <>
      {/* ==================================================
          12. COTIZACIÓN ("¿Buscas materia prima reciclada?")
      ================================================== */}
      <section
        id="cotizacion"
        className="py-20 lg:py-28 bg-[#F8FAFC] border-t border-neutral-200 scroll-mt-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-xs font-medium text-[#138A36]">
                <span>Atención Comercial B2B</span>
                <span aria-hidden="true">·</span>
                <span>Nacional y Proyección Internacional</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202124]">
                ¿Buscas materia prima reciclada?
              </h2>

              <p className="text-base text-[#5F6368] leading-relaxed">
                Cuéntanos la granulometría, volumen y aplicación industrial que necesitas.
                Nuestro equipo estructurará una propuesta técnica y comercial a la medida de tu
                operación.
              </p>

              <div className="p-6 rounded-xl bg-white border border-neutral-200 space-y-4">
                <h3 className="font-display text-base font-bold text-[#202124]">
                  ¿Qué incluye nuestra cotización técnica?
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#5F6368]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#138A36] shrink-0 mt-0.5" />
                    <span>Especificación granulométrica y ficha técnica por lote.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#138A36] shrink-0 mt-0.5" />
                    <span>Opciones de empaque en sacos de 25 kg o Big Bag industrial.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#138A36] shrink-0 mt-0.5" />
                    <span>
                      Condiciones para mercado nacional o proyección de exportación bajo
                      Incoterm® FOB.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
                {quoteReceipt ? (
                  <div className="space-y-6 py-4">
                    <div className="flex items-center gap-3 text-[#075B2A]">
                      <CheckCircle2 className="w-8 h-8 text-[#138A36]" />
                      <div>
                        <div className="text-xs font-mono text-[#5F6368]">
                          Solicitud registrada · Ref. {quoteReceipt.reference}
                        </div>
                        <h3 className="font-display text-2xl font-bold text-[#202124]">
                          Cotización en proceso de análisis
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-[#F8FAFC] border border-neutral-200 space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between py-1 border-b border-neutral-200/70">
                        <span className="font-semibold text-[#202124]">Referencia:</span>
                        <span className="font-mono text-[#138A36] font-semibold">
                          {quoteReceipt.reference}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-200/70">
                        <span className="font-semibold text-[#202124]">Cliente / Empresa:</span>
                        <span className="text-[#5F6368]">{quoteReceipt.empresa}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-200/70">
                        <span className="font-semibold text-[#202124]">Materia prima:</span>
                        <span className="font-mono text-[#202124]">{quoteReceipt.producto}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-200/70">
                        <span className="font-semibold text-[#202124]">Cantidad requerida:</span>
                        <span className="font-mono text-[#202124]">{quoteReceipt.cantidad}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-semibold text-[#202124]">Modalidad:</span>
                        <span className="text-[#075B2A] font-medium">
                          {quoteReceipt.exportacion
                            ? 'Proyección Exportación (Incoterm® FOB)'
                            : 'Suministro Nacional Colombia'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setQuoteReceipt(null)}
                        className="px-4 py-2.5 text-xs font-semibold text-[#5F6368] hover:text-[#202124] border border-neutral-200 rounded-lg"
                      >
                        Nueva solicitud
                      </button>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href="#pago"
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#202124] text-white hover:bg-[#075B2A] rounded-lg transition-colors whitespace-nowrap"
                        >
                          <CreditCard className="w-4 h-4 text-[#78C850]" />
                          <span>Ir a módulo de pago / anticipo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="space-y-5" noValidate>
                    {quoteError && (
                      <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                        {quoteError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="quote-nombre"
                          className="block text-xs font-semibold text-[#202124] mb-1.5"
                        >
                          Nombre completo *
                        </label>
                        <input
                          id="quote-nombre"
                          type="text"
                          required
                          placeholder="Ej. Carlos Mendoza"
                          value={quoteForm.nombre}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, nombre: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="quote-empresa"
                          className="block text-xs font-semibold text-[#202124] mb-1.5"
                        >
                          Empresa
                        </label>
                        <input
                          id="quote-empresa"
                          type="text"
                          placeholder="Nombre de la compañía"
                          value={quoteForm.empresa}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, empresa: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="quote-correo"
                          className="block text-xs font-semibold text-[#202124] mb-1.5"
                        >
                          Correo electrónico *
                        </label>
                        <input
                          id="quote-correo"
                          type="email"
                          required
                          placeholder="nombre@empresa.com"
                          value={quoteForm.correo}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, correo: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="quote-telefono"
                          className="block text-xs font-semibold text-[#202124] mb-1.5"
                        >
                          Teléfono / WhatsApp *
                        </label>
                        <input
                          id="quote-telefono"
                          type="tel"
                          required
                          placeholder="+57 300 000 0000"
                          value={quoteForm.telefono}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, telefono: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="quote-ciudad"
                          className="block text-xs font-semibold text-[#202124] mb-1.5"
                        >
                          Ciudad / País
                        </label>
                        <input
                          id="quote-ciudad"
                          type="text"
                          placeholder="Ej. Bogotá, Colombia / Miami, EE. UU."
                          value={quoteForm.ciudadPais}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, ciudadPais: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="quote-producto"
                          className="block text-xs font-semibold text-[#202124] mb-1.5"
                        >
                          Producto de interés
                        </label>
                        <select
                          id="quote-producto"
                          value={quoteForm.producto}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, producto: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                        >
                          {products.map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="quote-cantidad"
                          className="block text-xs font-semibold text-[#202124] mb-1.5"
                        >
                          Cantidad requerida (kg / toneladas) *
                        </label>
                        <input
                          id="quote-cantidad"
                          type="text"
                          required
                          placeholder="Ej. 5 Toneladas / 500 kg"
                          value={quoteForm.cantidad}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, cantidad: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="quote-aplicacion"
                          className="block text-xs font-semibold text-[#202124] mb-1.5"
                        >
                          Aplicación industrial
                        </label>
                        <input
                          id="quote-aplicacion"
                          type="text"
                          placeholder="Ej. Tapetes para gimnasio, Asfalto, Acústica"
                          value={quoteForm.aplicacion}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, aplicacion: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                        />
                      </div>
                    </div>

                    {/* Export Option Checkbox */}
                    <div className="p-4 rounded-xl bg-[#DFF3E4]/50 border border-[#138A36]/30 space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={quoteForm.paraExportacion}
                          onChange={(e) =>
                            setQuoteForm({
                              ...quoteForm,
                              paraExportacion: e.target.checked,
                            })
                          }
                          className="w-4 h-4 accent-[#075B2A] rounded"
                        />
                        <span className="text-xs sm:text-sm font-semibold text-[#075B2A] flex items-center gap-1.5">
                          <Globe className="w-4 h-4 text-[#138A36]" />
                          <span>Necesito una cotización para exportación (Proyección FOB)</span>
                        </span>
                      </label>

                      {quoteForm.paraExportacion && (
                        <div className="pt-1">
                          <label
                            htmlFor="quote-puerto"
                            className="block text-xs font-medium text-[#075B2A] mb-1"
                          >
                            País / Puerto de destino proyectado (Ej. Estados Unidos · Houston / Miami)
                          </label>
                          <input
                            id="quote-puerto"
                            type="text"
                            placeholder="Indica país o puerto de interés para evaluar términos FOB"
                            value={quoteForm.puertoDestino}
                            onChange={(e) =>
                              setQuoteForm({ ...quoteForm, puertoDestino: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs bg-white border border-[#138A36]/40 rounded-lg focus:outline-none focus:border-[#075B2A]"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="quote-mensaje"
                        className="block text-xs font-semibold text-[#202124] mb-1.5"
                      >
                        Mensaje o requerimientos técnicos adicionales
                      </label>
                      <textarea
                        id="quote-mensaje"
                        rows={3}
                        placeholder="Especifica granulometría deseada, frecuencia de suministro o dudas sobre empaque..."
                        value={quoteForm.mensaje}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, mensaje: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <span className="text-xs text-[#5F6368]">
                        Respuesta comercial estimada en menos de 24 horas hábiles.
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#138A36] hover:bg-[#075B2A] rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Send className="w-4 h-4" />
                        <span>Solicitar cotización</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          13. BOTÓN Y SECCIÓN DE PAGO ("Realiza tu pago de forma segura")
      ================================================== */}
      <section
        id="pago"
        className="py-20 lg:py-24 bg-[#202124] text-white scroll-mt-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2 text-xs font-medium text-[#78C850]">
                <Lock className="w-3.5 h-3.5" />
                <span>Transacciones B2B Protegidas</span>
                <span aria-hidden="true">·</span>
                <span>Arquitectura Lista para Pasarela</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Realiza tu pago de forma segura
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Liquida órdenes de compra, muestras industriales o facturas proforma. Este
                módulo se encuentra estructurado y preparado para conectar la plataforma de
                pago corporativa seleccionada por Green Rubber.
              </p>

              {/* Supported Gateways Ready for Integration */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-mono text-neutral-400">
                  Plataformas compatibles para integración:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {gateways.map((gw) => {
                    const isSelected = selectedGateway === gw.id;
                    return (
                      <button
                        key={gw.id}
                        type="button"
                        onClick={() => {
                          setSelectedGateway(gw.id);
                          setPaymentNotice('');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#075B2A] border-[#78C850] text-white'
                            : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/25'
                        }`}
                      >
                        <div className="font-display text-xs font-bold truncate">
                          {gw.id}
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {gw.region}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Payment Preparation Card */}
            <div className="lg:col-span-7">
              <div className="bg-white text-[#202124] rounded-2xl p-6 sm:p-8 border border-neutral-200 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#138A36] font-semibold">
                      Pasarela seleccionada: {selectedGateway}
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#202124]">
                      Orden de Pago / Compra de Material
                    </h3>
                  </div>
                  <ShieldCheck className="w-7 h-7 text-[#138A36] shrink-0" />
                </div>

                <form onSubmit={handlePreparePayment} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="pay-concept"
                        className="block text-xs font-semibold text-[#202124] mb-1.5"
                      >
                        Concepto de pago
                      </label>
                      <select
                        id="pay-concept"
                        value={paymentConcept}
                        onChange={(e) => setPaymentConcept(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                      >
                        <option value="Pago de Orden / Factura Proforma B2B">
                          Pago de Orden / Factura Proforma B2B
                        </option>
                        <option value="Anticipo de Lote de Caucho Reciclado">
                          Anticipo de Lote de Caucho Reciclado
                        </option>
                        <option value="Solicitud de Muestra Técnica Industrial">
                          Solicitud de Muestra Técnica Industrial
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="pay-ref"
                        className="block text-xs font-semibold text-[#202124] mb-1.5"
                      >
                        Número de cotización o factura
                      </label>
                      <input
                        id="pay-ref"
                        type="text"
                        placeholder="Ej. GR-2026-4810"
                        value={paymentReference}
                        onChange={(e) => setPaymentReference(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm font-mono bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="pay-amount"
                        className="block text-xs font-semibold text-[#202124] mb-1.5"
                      >
                        Valor a pagar (Opcional)
                      </label>
                      <input
                        id="pay-amount"
                        type="text"
                        placeholder="0.00"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#202124] mb-1.5">
                        Moneda de referencia
                      </label>
                      <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setPaymentCurrency('COP')}
                          className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                            paymentCurrency === 'COP'
                              ? 'bg-white text-[#202124] shadow-sm'
                              : 'text-[#5F6368]'
                          }`}
                        >
                          COP (Colombia)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentCurrency('USD')}
                          className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                            paymentCurrency === 'USD'
                              ? 'bg-white text-[#202124] shadow-sm'
                              : 'text-[#5F6368]'
                          }`}
                        >
                          USD (Internacional)
                        </button>
                      </div>
                    </div>
                  </div>

                  {paymentNotice && (
                    <div className="p-4 rounded-xl bg-[#DFF3E4] border border-[#138A36]/40 text-xs text-[#075B2A] leading-relaxed">
                      {paymentNotice}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-200">
                    <span className="text-xs text-[#5F6368]">
                      Compatible con Wompi · Mercado Pago · PayU · Stripe · PSE · Tarjetas
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#138A36] hover:bg-[#075B2A] rounded-lg transition-colors whitespace-nowrap"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pagar / Comprar con {selectedGateway}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          14. CONTACTO ("Conectemos")
      ================================================== */}
      <section id="contacto" className="py-20 lg:py-28 bg-white scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#138A36] mb-3">
                <span>Canales Directos</span>
                <span aria-hidden="true">·</span>
                <span>Alianzas, Proveedores y Clientes</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#202124]">
                Conectemos
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditingContact((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                  isEditingContact
                    ? 'bg-[#075B2A] text-white border-[#075B2A]'
                    : 'bg-neutral-100 text-[#202124] border-neutral-200 hover:border-[#138A36]'
                }`}
              >
                {isEditingContact ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Guardar datos de contacto</span>
                  </>
                ) : (
                  <>
                    <Sliders className="w-3.5 h-3.5 text-[#138A36]" />
                    <span>Editar datos de contacto</span>
                  </>
                )}
              </button>

              {isEditingContact && (
                <button
                  type="button"
                  onClick={() => onUpdateContactData(INITIAL_CONTACT_DATA)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5F6368] hover:text-[#202124] bg-neutral-50 border border-neutral-200 rounded-lg"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Brand & Editable Contact Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-neutral-200 space-y-5">
                <GreenRubberLogo variant="dark" showSlogan={true} size="md" />

                <p className="text-sm text-[#5F6368] leading-relaxed">
                  Estamos listos para atender solicitudes de suministro de materia prima,
                  recepción de llantas fuera de uso y alianzas de economía circular.
                </p>

                {isEditingContact ? (
                  <div className="space-y-3 pt-2 border-t border-neutral-200 text-xs">
                    <div>
                      <label className="block font-semibold text-[#202124] mb-1">
                        Teléfono / WhatsApp visible
                      </label>
                      <input
                        type="text"
                        value={contactData.whatsappDisplay}
                        onChange={(e) =>
                          onUpdateContactData({
                            ...contactData,
                            whatsappDisplay: e.target.value,
                          })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#202124] mb-1">
                        Correo electrónico corporativo
                      </label>
                      <input
                        type="email"
                        value={contactData.email}
                        onChange={(e) =>
                          onUpdateContactData({ ...contactData, email: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#202124] mb-1">
                        Ubicación / Planta
                      </label>
                      <input
                        type="text"
                        value={contactData.location}
                        onChange={(e) =>
                          onUpdateContactData({ ...contactData, location: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#202124] mb-1">
                        Enlace Instagram
                      </label>
                      <input
                        type="url"
                        value={contactData.instagram}
                        onChange={(e) =>
                          onUpdateContactData({ ...contactData, instagram: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#202124] mb-1">
                        Enlace LinkedIn
                      </label>
                      <input
                        type="url"
                        value={contactData.linkedin}
                        onChange={(e) =>
                          onUpdateContactData({ ...contactData, linkedin: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-neutral-300 rounded"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2 border-t border-neutral-200 text-xs sm:text-sm">
                    <div>
                      <span className="font-semibold text-[#202124]">WhatsApp / Teléfono: </span>
                      <span className="font-mono text-[#5F6368]">
                        {contactData.whatsappDisplay}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#202124]">Correo electrónico: </span>
                      <span className="font-mono text-[#5F6368]">{contactData.email}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#202124]">Operación: </span>
                      <span className="text-[#5F6368]">{contactData.location}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#202124]">Horario: </span>
                      <span className="text-[#5F6368]">{contactData.schedule}</span>
                    </div>
                  </div>
                )}

                {/* Direct Social & Channel Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-2.5">
                  <a
                    href={`https://wa.me/${contactData.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#138A36] hover:bg-[#075B2A] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${contactData.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#202124] bg-white border border-neutral-300 hover:border-[#138A36] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#138A36]" />
                    <span>Correo electrónico</span>
                  </a>

                  <a
                    href={contactData.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#202124] bg-white border border-neutral-300 hover:border-[#138A36] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#138A36]" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href={contactData.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#202124] bg-white border border-neutral-300 hover:border-[#138A36] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Facebook className="w-3.5 h-3.5 text-[#138A36]" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href={contactData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-[#202124] bg-white border border-neutral-300 hover:border-[#138A36] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#138A36]" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Contact Message Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-neutral-200 p-6 sm:p-8 bg-white">
                <h3 className="font-display text-xl font-bold text-[#202124] mb-2">
                  Envíanos un mensaje directo
                </h3>
                <p className="text-xs sm:text-sm text-[#5F6368] mb-6">
                  Para alianzas estratégicas, proveedores de llantas fuera de uso o consultas
                  institucionales.
                </p>

                {contactSent ? (
                  <div className="p-6 rounded-xl bg-[#DFF3E4]/60 border border-[#138A36]/40 space-y-3">
                    <div className="flex items-center gap-2 text-[#075B2A] font-display font-bold text-lg">
                      <CheckCircle2 className="w-5 h-5 text-[#138A36]" />
                      <span>Mensaje recibido correctamente</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#202124]">
                      Gracias por comunicarte con Green Rubber. Nuestro equipo responderá a tu
                      correo a la brevedad.
                    </p>
                    <button
                      type="button"
                      onClick={() => setContactSent(false)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#075B2A] rounded-lg"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
                    {contactError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                        {contactError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-nombre"
                          className="block text-xs font-semibold text-[#202124] mb-1.5"
                        >
                          Nombre *
                        </label>
                        <input
                          id="contact-nombre"
                          type="text"
                          value={contactMessage.nombre}
                          onChange={(e) =>
                            setContactMessage({ ...contactMessage, nombre: e.target.value })
                          }
                          placeholder="Tu nombre"
                          className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-correo"
                          className="block text-xs font-semibold text-[#202124] mb-1.5"
                        >
                          Correo electrónico *
                        </label>
                        <input
                          id="contact-correo"
                          type="email"
                          value={contactMessage.correo}
                          onChange={(e) =>
                            setContactMessage({ ...contactMessage, correo: e.target.value })
                          }
                          placeholder="correo@ejemplo.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-asunto"
                        className="block text-xs font-semibold text-[#202124] mb-1.5"
                      >
                        Asunto
                      </label>
                      <input
                        id="contact-asunto"
                        type="text"
                        value={contactMessage.asunto}
                        onChange={(e) =>
                          setContactMessage({ ...contactMessage, asunto: e.target.value })
                        }
                        placeholder="Ej. Alianza de recolección / Suministro industrial"
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-mensaje"
                        className="block text-xs font-semibold text-[#202124] mb-1.5"
                      >
                        Mensaje *
                      </label>
                      <textarea
                        id="contact-mensaje"
                        rows={4}
                        value={contactMessage.mensaje}
                        onChange={(e) =>
                          setContactMessage({ ...contactMessage, mensaje: e.target.value })
                        }
                        placeholder="Escribe tu mensaje para el equipo de Green Rubber..."
                        className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-[#138A36]"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#202124] hover:bg-[#138A36] rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Send className="w-4 h-4" />
                        <span>Enviar mensaje</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
