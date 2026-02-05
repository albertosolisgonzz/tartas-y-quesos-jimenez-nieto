import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad | Jimenez Nieto',
    description: 'Información sobre el tratamiento de datos personales en Jimenez Nieto.',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-8">
                    Política de Privacidad
                </h1>

                <div className="prose prose-stone max-w-none">
                    <p className="text-stone-600 mb-8">
                        Última actualización: Febrero 2026
                    </p>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">1. Responsable del Tratamiento</h2>
                        <ul className="text-stone-600 space-y-2">
                            <li><strong>Identidad:</strong> Jimenez Nieto</li>
                            <li><strong>Dirección:</strong> Pl. Pilar, 2, 13120 Porzuna, Ciudad Real, España</li>
                            <li><strong>Contacto:</strong> info@jimeneznieto.es</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">2. Finalidad del Tratamiento</h2>
                        <p className="text-stone-600 mb-4">Tratamos sus datos personales para:</p>
                        <ul className="list-disc pl-6 text-stone-600 space-y-2">
                            <li>Gestionar y procesar sus pedidos</li>
                            <li>Enviar confirmaciones de compra y actualizaciones de envío</li>
                            <li>Responder a sus consultas y solicitudes</li>
                            <li>Enviar comunicaciones comerciales (solo con su consentimiento)</li>
                            <li>Cumplir con obligaciones legales y fiscales</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">3. Base Legal</h2>
                        <p className="text-stone-600">
                            El tratamiento de sus datos se basa en: la ejecución del contrato de compra,
                            su consentimiento expreso, el cumplimiento de obligaciones legales y nuestro
                            interés legítimo en mejorar nuestros servicios.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">4. Conservación de Datos</h2>
                        <p className="text-stone-600">
                            Conservaremos sus datos durante el tiempo necesario para cumplir con las finalidades
                            descritas y, posteriormente, durante los plazos legales establecidos (generalmente
                            5 años para obligaciones fiscales).
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">5. Destinatarios</h2>
                        <p className="text-stone-600 mb-4">
                            Sus datos podrán ser comunicados a:
                        </p>
                        <ul className="list-disc pl-6 text-stone-600 space-y-2">
                            <li>Empresas de transporte para la entrega de pedidos</li>
                            <li>Pasarelas de pago para procesar transacciones</li>
                            <li>Administraciones públicas cuando exista obligación legal</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">6. Sus Derechos</h2>
                        <p className="text-stone-600 mb-4">
                            Conforme al RGPD, usted tiene derecho a:
                        </p>
                        <ul className="list-disc pl-6 text-stone-600 space-y-2">
                            <li><strong>Acceso:</strong> Conocer qué datos tratamos sobre usted</li>
                            <li><strong>Rectificación:</strong> Corregir datos inexactos</li>
                            <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos</li>
                            <li><strong>Limitación:</strong> Restringir el tratamiento en ciertos casos</li>
                            <li><strong>Portabilidad:</strong> Recibir sus datos en formato electrónico</li>
                            <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos</li>
                        </ul>
                        <p className="text-stone-600 mt-4">
                            Para ejercer estos derechos, contacte con nosotros en info@jimeneznieto.es.
                            También puede presentar una reclamación ante la Agencia Española de Protección
                            de Datos (www.aepd.es).
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">7. Seguridad</h2>
                        <p className="text-stone-600">
                            Aplicamos medidas técnicas y organizativas apropiadas para proteger sus datos
                            contra el acceso no autorizado, la pérdida o la destrucción.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
