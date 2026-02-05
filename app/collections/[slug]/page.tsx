import { getProductsByCategory, CATEGORIES } from '@/lib/shopify';
import { ProductGrid } from '@/components/shop/ProductGrid';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CollectionPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return CATEGORIES.map((category) => ({
        slug: category.slug,
    }));
}

export async function generateMetadata({ params }: CollectionPageProps) {
    const { slug } = await params;
    const category = CATEGORIES.find(c => c.slug === slug);

    if (!category) {
        return { title: 'Colección no encontrada' };
    }

    return {
        title: `${category.label} | Jimenez Nieto`,
        description: `Descubre nuestra selección de ${category.label.toLowerCase()} artesanales.`,
    };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { slug } = await params;
    const category = CATEGORIES.find(c => c.slug === slug);

    if (!category) {
        notFound();
    }

    const products = await getProductsByCategory(slug);

    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
                    <Link href="/" className="hover:text-amber-700">Inicio</Link>
                    <span>/</span>
                    <Link href="/collections/all" className="hover:text-amber-700">Colecciones</Link>
                    <span>/</span>
                    <span className="text-stone-900">{category.label}</span>
                </nav>

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
                        {category.label}
                    </h1>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Descubre nuestra selección de {category.label.toLowerCase()} artesanales,
                        elaborados con los mejores ingredientes y recetas tradicionales.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/collections/${cat.slug}`}
                            className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all ${cat.slug === slug
                                ? 'bg-stone-900 text-white'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                        >
                            {cat.label}
                        </Link>
                    ))}
                    <Link
                        href="/collections/all"
                        className="px-6 py-2 rounded-full text-sm uppercase tracking-wider bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all"
                    >
                        Todos
                    </Link>
                </div>

                {/* Products Grid */}
                <ProductGrid products={products} />
            </div>
        </main>
    );
}
