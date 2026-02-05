import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Cookies | Jimenez Nieto',
    description: 'Información sobre el uso de cookies en nuestra web.',
};

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-8">
                    Política de Cookies
                </h1>

                <div className="prose prose-stone max-w-none">
                    <p className="text-stone-600 mb-8">
                        Última actualización: Febrero 2026
                    </p>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">¿Qué son las cookies?</h2>
                        <p className="text-stone-600">
                            Las cookies son pequeños archivos de texto que los sitios web almacenan en su
                            dispositivo cuando los visita. Se utilizan para recordar sus preferencias,
                            mejorar su experiencia de navegación y analizar el uso del sitio.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">Tipos de Cookies que Utilizamos</h2>

                        <div className="bg-stone-50 p-6 rounded-lg mb-4">
                            <h3 className="font-medium text-stone-900 mb-2">Cookies Esenciales</h3>
                            <p className="text-stone-600 text-sm">
                                Necesarias para el funcionamiento básico del sitio. Incluyen cookies de
                                sesión y del carrito de compra. No requieren consentimiento.
                            </p>
                        </div>

                        <div className="bg-stone-50 p-6 rounded-lg mb-4">
                            <h3 className="font-medium text-stone-900 mb-2">Cookies de Análisis</h3>
                            <p className="text-stone-600 text-sm">
                                Nos ayudan a entender cómo interactúan los usuarios con nuestra web,
                                permitiéndonos mejorar la experiencia. Utilizamos herramientas como
                                Google Analytics.
                            </p>
                        </div>

                        <div className="bg-stone-50 p-6 rounded-lg">
                            <h3 className="font-medium text-stone-900 mb-2">Cookies de Marketing</h3>
                            <p className="text-stone-600 text-sm">
                                Utilizadas para mostrar anuncios relevantes. Solo se activan con su
                                consentimiento expreso.
                            </p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">Gestión de Cookies</h2>
                        <p className="text-stone-600 mb-4">
                            Puede gestionar sus preferencias de cookies de las siguientes formas:
                        </p>
                        <ul className="list-disc pl-6 text-stone-600 space-y-2">
                            <li>Utilizando el banner de cookies que aparece al visitar nuestra web</li>
                            <li>Configurando las preferencias de su navegador</li>
                            <li>Eliminando las cookies almacenadas en su dispositivo</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">Cómo Desactivar Cookies en su Navegador</h2>
                        <ul className="list-disc pl-6 text-stone-600 space-y-2">
                            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                            <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                            <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                            <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-serif text-xl text-stone-900 mb-4">Cookies de Terceros</h2>
                        <p className="text-stone-600">
                            Algunos servicios de terceros pueden establecer sus propias cookies.
                            Consulte las políticas de privacidad de cada proveedor:
                        </p>
                        <ul className="list-disc pl-6 text-stone-600 space-y-2 mt-4">
                            <li>Shopify (procesamiento de pagos y carrito)</li>
                            <li>Google Analytics (análisis de tráfico)</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
