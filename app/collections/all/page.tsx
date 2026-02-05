import { getAllProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/shop/ProductCard";

export const metadata = {
    title: "Todos los Productos | Tartas y Quesos Jimenez Nieto",
    description: "Descubre nuestra selección completa de tartas artesanales y quesos curados de la mejor calidad.",
};

export default async function AllProductsPage() {
    const products = await getAllProducts();

    return (
        <div className="pt-28 pb-20">
            {/* Page Header */}
            <div className="container mx-auto px-6 md:px-12 mb-16">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-stone-400">
                        Nuestra Selección
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                        Todos los Productos
                    </h1>
                    <p className="text-stone-600 text-lg font-light leading-relaxed">
                        Explora nuestra colección completa de tartas artesanales y quesos curados,
                        elaborados con ingredientes de primera calidad y mucho amor.
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <section className="container mx-auto px-6 md:px-12">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-stone-500 text-lg">No hay productos disponibles en este momento.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                handle={product.handle}
                                price={product.variants[0]?.price?.amount || "0"}
                                currency={product.variants[0]?.price?.currencyCode || "EUR"}
                                images={product.images || []}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Product Count */}
            <div className="container mx-auto px-6 md:px-12 mt-16 text-center">
                <p className="text-stone-400 text-sm">
                    Mostrando {products.length} {products.length === 1 ? 'producto' : 'productos'}
                </p>
            </div>
        </div>
    );
}
