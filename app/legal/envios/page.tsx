import { Metadata } from 'next';
import { Truck, Clock, Package, MapPin, ThermometerSnowflake } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Envíos y Devoluciones | Jimenez Nieto',
    description: 'Información sobre envíos, plazos de entrega y política de devoluciones.',
};

export default function ShippingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-8">
                    Envíos y Devoluciones
                </h1>

                {/* Shipping Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="text-center p-4 bg-stone-50 rounded-lg">
                        <Truck className="w-6 h-6 mx-auto mb-2 text-stone-600" />
                        <p className="text-xs font-medium text-stone-900">Envío Gratis</p>
                        <p className="text-xs text-stone-500">desde 60€</p>
                    </div>
                    <div className="text-center p-4 bg-stone-50 rounded-lg">
                        <Clock className="w-6 h-6 mx-auto mb-2 text-stone-600" />
                        <p className="text-xs font-medium text-stone-900">24-72h</p>
                        <p className="text-xs text-stone-500">Península</p>
                    </div>
                    <div className="text-center p-4 bg-stone-50 rounded-lg">
                        <ThermometerSnowflake className="w-6 h-6 mx-auto mb-2 text-stone-600" />
                        <p className="text-xs font-medium text-stone-900">Cadena de Frío</p>
                        <p className="text-xs text-stone-500">Garantizada</p>
                    </div>
                    <div className="text-center p-4 bg-stone-50 rounded-lg">
                        <Package className="w-6 h-6 mx-auto mb-2 text-stone-600" />
                        <p className="text-xs font-medium text-stone-900">Envasado al Vacío</p>
                        <p className="text-xs text-stone-500">Frescura total</p>
                    </div>
                </div>

                <div className="prose prose-stone max-w-none">
                    {/* Envíos */}
                    <section className="mb-12">
                        <h2 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-2">
                            <Truck className="w-6 h-6" />
                            Política de Envíos
                        </h2>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                            <p className="text-amber-800 font-medium mb-2">🧀 Productos frescos con cadena de frío</p>
                            <p className="text-amber-700 text-sm">
                                Todos nuestros productos se envían envasados al vacío y con embalaje
                                refrigerado para garantizar que lleguen en perfectas condiciones.
                            </p>
                        </div>

                        <h3 className="font-medium text-stone-900 mb-3">Costes de Envío</h3>
                        <table className="w-full text-sm mb-6">
                            <thead className="bg-stone-100">
                                <tr>
                                    <th className="text-left p-3">Destino</th>
                                    <th className="text-left p-3">Coste</th>
                                    <th className="text-left p-3">Gratis desde</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                <tr>
                                    <td className="p-3">Península Española</td>
                                    <td className="p-3">5,95€</td>
                                    <td className="p-3 text-green-600 font-medium">60€</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Islas Baleares</td>
                                    <td className="p-3">9,95€</td>
                                    <td className="p-3 text-green-600 font-medium">90€</td>
                                </tr>
                                <tr>
                                    <td className="p-3 text-stone-400">Canarias, Ceuta y Melilla</td>
                                    <td className="p-3 text-stone-400" colSpan={2}>Consultar</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 className="font-medium text-stone-900 mb-3">Plazos de Entrega</h3>
                        <ul className="list-disc pl-6 text-stone-600 space-y-2 mb-6">
                            <li><strong>Península:</strong> 24-72 horas laborables</li>
                            <li><strong>Baleares:</strong> 3-5 días laborables</li>
                            <li>Los pedidos realizados antes de las 12:00h se procesan el mismo día</li>
                            <li>No se realizan envíos los viernes, sábados ni vísperas de festivos</li>
                        </ul>

                        <h3 className="font-medium text-stone-900 mb-3">Días de Envío</h3>
                        <p className="text-stone-600 mb-6">
                            Para garantizar la frescura de nuestros productos, realizamos envíos de
                            <strong> lunes a jueves</strong>. Los pedidos realizados el jueves tarde,
                            viernes, sábado o domingo se enviarán el lunes siguiente.
                        </p>
                    </section>

                    {/* Devoluciones */}
                    <section className="mb-12">
                        <h2 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-2">
                            <Package className="w-6 h-6" />
                            Política de Devoluciones
                        </h2>

                        <div className="bg-stone-100 rounded-lg p-6 mb-6">
                            <p className="text-stone-700 font-medium mb-2">⚠️ Productos perecederos</p>
                            <p className="text-stone-600 text-sm">
                                Al tratarse de productos alimenticios perecederos, no se admiten
                                devoluciones por cambio de opinión, conforme al artículo 103.d) de
                                la Ley General para la Defensa de los Consumidores y Usuarios.
                            </p>
                        </div>

                        <h3 className="font-medium text-stone-900 mb-3">¿Cuándo sí aceptamos devoluciones?</h3>
                        <ul className="list-disc pl-6 text-stone-600 space-y-2 mb-6">
                            <li>Producto recibido en mal estado (dañado durante el transporte)</li>
                            <li>Producto incorrecto (no corresponde al pedido)</li>
                            <li>Producto defectuoso</li>
                        </ul>

                        <h3 className="font-medium text-stone-900 mb-3">Procedimiento de Reclamación</h3>
                        <ol className="list-decimal pl-6 text-stone-600 space-y-2 mb-6">
                            <li>Contacte con nosotros en las <strong>primeras 24 horas</strong> tras la recepción</li>
                            <li>Envíe fotografías del producto y el embalaje</li>
                            <li>Evaluaremos su caso y le ofreceremos una solución (reembolso o reenvío)</li>
                        </ol>

                        <h3 className="font-medium text-stone-900 mb-3">Contacto para Incidencias</h3>
                        <p className="text-stone-600">
                            Email: <a href="mailto:pedidos@jimeneznieto.es" className="text-amber-700 hover:underline">pedidos@jimeneznieto.es</a><br />
                            Teléfono: <a href="tel:+34926780000" className="text-amber-700 hover:underline">926 78 00 00</a>
                        </p>
                    </section>

                    {/* Conservación */}
                    <section className="mb-12">
                        <h2 className="font-serif text-2xl text-stone-900 mb-6">
                            Consejos de Conservación
                        </h2>
                        <ul className="list-disc pl-6 text-stone-600 space-y-2">
                            <li>Conserve los productos en refrigerador (2-8°C)</li>
                            <li>Una vez abierto el envase al vacío, consuma en 5-7 días</li>
                            <li>Retire el producto del frigorífico 30 minutos antes de consumir para disfrutar de todo su sabor</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
