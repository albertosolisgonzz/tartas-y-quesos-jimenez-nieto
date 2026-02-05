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
                            <li><Link href="/collections/cremas" className="hover:text-stone-900 transition-colors">Cremas de Queso</Link></li>
                            <li><Link href="/collections/all" className="hover:text-stone-900 transition-colors">Todos los Productos</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="font-serif text-sm font-bold tracking-widest mb-6 uppercase">Información</h4>
                        <ul className="space-y-4 text-sm text-stone-600">
                            <li><Link href="/about" className="hover:text-stone-900 transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="/legal/envios" className="hover:text-stone-900 transition-colors">Envíos y Devoluciones</Link></li>
                            <li><Link href="/legal/privacidad" className="hover:text-stone-900 transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/legal/cookies" className="hover:text-stone-900 transition-colors">Política de Cookies</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-sm font-bold tracking-widest mb-6 uppercase">Contacto</h4>
                        <ul className="space-y-3 text-sm text-stone-600">
                            <li>Pl. Pilar, 2</li>
                            <li>13120 Porzuna, Ciudad Real</li>
                            <li className="pt-2">
                                <a href="mailto:info@jimeneznieto.es" className="hover:text-stone-900 transition-colors">
                                    info@jimeneznieto.es
                                </a>
                            </li>
                        </ul>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-stone-400 hover:text-stone-900 transition-colors" aria-label="Facebook">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-stone-500 tracking-wide">
                        © 2026 Tartas y Quesos Jimenez Nieto. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 text-xs text-stone-400">
                        <Link href="/legal/privacidad" className="hover:text-stone-600 transition-colors">Privacidad</Link>
                        <Link href="/legal/cookies" className="hover:text-stone-600 transition-colors">Cookies</Link>
                        <Link href="/legal/envios" className="hover:text-stone-600 transition-colors">Envíos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
