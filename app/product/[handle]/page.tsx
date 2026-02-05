import { getAllProducts } from "@/lib/shopify";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        handle: string
    }>
}

export default async function ProductPage({ params }: PageProps) {
    const { handle } = await params;
    const products = await getAllProducts();
    const product = products.find((p: any) => p.handle === handle);

    if (!product) {
        return notFound();
    }

    return (
        <div className="container mx-auto px-6 md:px-12 py-10 md:py-20 animate-fade-in">
            <ProductDetail product={product} />
        </div>
    );
}
