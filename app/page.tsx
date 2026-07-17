import { getAllProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/shop/ProductGrid";
import Image from "next/image";
import { Hero } from "@/components/home/Hero";
import { ProductCategoriesSection } from "@/components/home/ProductCategoriesSection";
import { InnovationBanner } from "@/components/home/InnovationBanner";

// Refresca el catálogo cada 5 minutos sin necesidad de redesplegar
export const revalidate = 300;

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen">
      {/* Dynamic Hero Section */}
      <Hero />

      {/* Products Section with Filters */}
      <section className="py-16 md:py-24 bg-[#FCFBF9]">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
            <p className="text-stone-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">
              Selección Exclusiva
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1A1412] mb-4">
              Nuestros Productos
            </h2>
            <div className="w-12 h-[1px] bg-stone-300 mx-auto"></div>
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

      {/* Unified Product Categories + Formats Section */}
      <ProductCategoriesSection />


      {/* Innovation Banner */}
      <InnovationBanner />

      {/* Nuestra Tienda - Location Section */}
      <section className="py-16 md:py-24 bg-white text-stone-900">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-stone-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">
              Visítanos
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1A1412] mb-4">
              Nuestra Tienda
            </h2>
            <div className="w-12 h-[1px] bg-stone-300 mx-auto"></div>
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
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm shadow-xl bg-stone-100 border border-stone-200">
              <Image
                src="/images/fachada.jpg"
                alt="Fachada de Jimenez Nieto"
                fill
                className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Address Info */}
          <div className="mt-10 md:mt-12 text-center">
            <div className="inline-flex items-center justify-center p-6 border border-stone-200 bg-[#FCFBF9] rounded-sm max-w-xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-4 text-stone-600">
                <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-sm md:text-base tracking-wide font-light text-center md:text-left">
                  <strong className="block text-[#1A1412] font-medium mb-1">Jimenez Nieto</strong>
                  Pl. Pilar, 2, 13120 Porzuna, Ciudad Real
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
