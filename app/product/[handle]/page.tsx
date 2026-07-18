import { getAllProducts, type NormalizedProduct } from "@/lib/shopify";
import { ProductDetail, type BundleConfig, type BundleOption } from "@/components/shop/ProductDetail";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        handle: string
    }>
}

const TARTA_PACK_HANDLE = "pack-3-porciones-de-tarta";
const CREAM_PACK_HANDLE = "pack-3-tarrinas-de-crema-100-gr";

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

function isCreamFlavor(product: NormalizedProduct) {
    if (product.handle === CREAM_PACK_HANDLE || product.images.length === 0) {
        return false;
    }

    const searchable = `${product.title} ${product.productType}`.toLocaleLowerCase("es");

    return searchable.includes("crema") && !searchable.includes("pack");
}

function formatCreamName(title: string) {
    const flavor = title
        .replace(/^crema de queso de\s+/i, "")
        .replace(/\s+artesanal(?:,.*)?$/i, "")
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

    let bundle: BundleConfig | undefined;

    if (handle === TARTA_PACK_HANDLE) {
        const options: BundleOption[] = products
            .filter(isTartaFlavor)
            .map((tarta) => ({
                id: tarta.id,
                title: formatTartaName(tarta.title),
                image: tarta.images[0],
            }));

        bundle = {
            options,
            itemSingular: "porción",
            itemPlural: "porciones",
            collageLabel: "Los sabores de tarta disponibles para el pack",
        };
    }

    if (handle === CREAM_PACK_HANDLE) {
        const options: BundleOption[] = products
            .filter(isCreamFlavor)
            .map((cream) => ({
                id: cream.id,
                title: formatCreamName(cream.title),
                image: cream.images[0],
            }));

        bundle = {
            options,
            itemSingular: "tarrina",
            itemPlural: "tarrinas",
            collageLabel: "Las cremas disponibles para el pack",
        };
    }

    return (
        <div className="container mx-auto px-6 md:px-12 py-10 md:py-20 animate-fade-in">
            <ProductDetail product={product} bundle={bundle} />
        </div>
    );
}
