import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-stone-50 border-t border-stone-200 pt-20 pb-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h3 className="font-serif text-lg font-bold tracking-wider mb-6">JIMENEZ NIETO</h3>
                        <p className="text-stone-600 text-sm leading-relaxed mb-6">
                            Artesanía, tradición y sabor. Seleccionamos los mejores ingredientes para ofrecerte tartas y quesos de calidad excepcional.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="font-serif text-sm font-bold tracking-widest mb-6 uppercase">Explorar</h4>
                        <ul className="space-y-4 text-sm text-stone-600">
                            <li><Link href="/collections/tartas" className="hover:text-stone-900 transition-colors">Tartas de Queso</Link></li>
                            <li><Link href="/collections/quesos" className="hover:text-stone-900 transition-colors">Quesos Curados</Link></li>
                            <li><Link href="/collections/novedades" className="hover:text-stone-900 transition-colors">Novedades</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="font-serif text-sm font-bold tracking-widest mb-6 uppercase">Nosotros</h4>
                        <ul className="space-y-4 text-sm text-stone-600">
                            <li><Link href="/about" className="hover:text-stone-900 transition-colors">La Historia</Link></li>
                            <li><Link href="/contact" className="hover:text-stone-900 transition-colors">Contacto</Link></li>
                            <li><Link href="/faq" className="hover:text-stone-900 transition-colors">Envíos y Devoluciones</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif text-sm font-bold tracking-widest mb-6 uppercase">Newsletter</h4>
                        <p className="text-stone-600 text-sm mb-4">Suscríbete para recibir novedades exclusivas.</p>
                        <form className="flex border-b border-stone-300 pb-2">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="bg-transparent w-full focus:outline-none text-stone-900 placeholder-stone-400 text-sm"
                            />
                            <button className="text-xs uppercase tracking-widest font-bold hover:text-stone-500">Enviar</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-stone-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-stone-500 tracking-wide">© 2026 Tartas y Quesos Jimenez Nieto.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors"><Facebook className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
