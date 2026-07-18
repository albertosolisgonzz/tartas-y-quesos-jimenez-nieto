import { getAllProducts, type NormalizedProduct } from "@/lib/shopify";
import { ProductDetail, type BundleOption } from "@/components/shop/ProductDetail";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        handle: string
    }>
}

const TARTA_PACK_HANDLE = "pack-3-porciones-de-tarta";

function isTartaFlavor(product: NormalizedProduct) {
    if (product.handle === TARTA_PACK_HANDLE || product.images.length === 0) {
        return false;
    }

    const searchable = `${product.title} ${product.productType}`.toLocaleLowerCase("es");

    return searchable.includes("tarta") && !searchable.includes("pack");
}

function formatTartaName(title: string) {
    const flavor = title
        .replace(/^tarta cremosa de\s+/i, "")
        .replace(/^tarta de queso\s*[-–—]?\s*/i, "")
        .trim()
        .toLocaleLowerCase("es");

    return flavor.charAt(0).toLocaleUpperCase("es") + flavor.slice(1);
}

export default async function ProductPage({ params }: PageProps) {
    const { handle } = await params;
    const products = await getAllProducts();
    const product = products.find((candidate) => candidate.handle === handle);

    if (!product) {
        return notFound();
    }

    const bundleOptions: BundleOption[] = handle === TARTA_PACK_HANDLE
        ? products
            .filter(isTartaFlavor)
            .map((tarta) => ({
                id: tarta.id,
                title: formatTartaName(tarta.title),
                image: tarta.images[0],
            }))
        : [];

    return (
        <div className="container mx-auto px-6 md:px-12 py-10 md:py-20 animate-fade-in">
            <ProductDetail product={product} bundleOptions={bundleOptions} />
        </div>
    );
}
