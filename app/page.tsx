import { getAllProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/shop/ProductGrid";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/home/Hero";
import { FormatsSection } from "@/components/home/FormatsSection";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen">
      {/* Dynamic Hero Section */}
      <Hero />

      {/* Products Section with Filters */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="mb-6 md:mb-8">
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-1">
              Nuestros Productos
            </h2>
            <p className="text-stone-500 text-sm">
              Haz clic en cualquier producto para comprarlo
            </p>
          </div>

          {/* Products Grid with Filters - Limited to 4 products */}
          <ProductGrid
            products={products}
            limit={4}
            showFilters={true}
            showViewAll={true}
          />
        </div>
      </section>

      {/* Nuestra Tienda - Location Section */}
      <section className="py-10 md:py-16 bg-stone-50">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-serif text-2xl md:text-4xl text-stone-900 mb-2">
              Nuestra Tienda
            </h2>
            <p className="text-stone-500 text-sm md:text-base">
              Visítanos en Porzuna, Ciudad Real
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Google Maps */}
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Plaza+Pilar+2,+13120+Porzuna,+Ciudad+Real,+Spain&zoom=17"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Ubicación de Jimenez Nieto"
              ></iframe>
            </div>

            {/* Foto de la Fachada */}
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl shadow-lg bg-stone-200">
              <Image
                src="/images/fachada.jpg"
                alt="Fachada de Jimenez Nieto"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Address Info */}
          <div className="mt-6 md:mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-stone-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm md:text-base">Pl. Pilar, 2, 13120 Porzuna, Ciudad Real</span>
            </div>
          </div>
        </div>
      </section>

      {/* Formats Section */}
      <FormatsSection />
    </div>
  );
}
