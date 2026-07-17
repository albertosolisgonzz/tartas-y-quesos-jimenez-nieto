// Actualización del catálogo de Shopify — julio 2026
// Uso: node --env-file=.env.local scripts/actualizar-catalogo.mjs <backup|plan|apply|verify>
//
//   backup  → guarda el catálogo actual completo en catalogo-backup-<fecha>.json
//   plan    → muestra qué cambiaría, sin tocar nada
//   apply   → aplica los cambios (requiere backup previo en esta sesión)
//   verify  → compara el catálogo real con el objetivo y lista desviaciones
//
// Requiere en .env.local:
//   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN  (ya existe)
//   SHOPIFY_ADMIN_ACCESS_TOKEN        (token shpat_… con read/write_products)

import { writeFileSync, existsSync } from 'node:fs';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const API = '2024-10';

if (!domain) {
    console.error('Falta NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN en .env.local');
    process.exit(1);
}
if (!adminToken) {
    console.error('Falta SHOPIFY_ADMIN_ACCESS_TOKEN en .env.local (token shpat_… con permisos read_products y write_products).');
    process.exit(1);
}

async function admin(query, variables) {
    const res = await fetch(`https://${domain}/admin/api/${API}/graphql.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': adminToken,
        },
        body: JSON.stringify({ query, variables }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const json = await res.json();
    if (json.errors) throw new Error('GraphQL: ' + JSON.stringify(json.errors));
    return json.data;
}

// ——— Catálogo objetivo ———

const round2 = (n) => (Math.round(n * 100) / 100).toFixed(2);

const TAMANOS_QUESO = [
    ['Cuña octavo - 430gr', 0.43],
    ['Cuña cuarto - 860gr', 0.86],
    ['Medio - 1,7kg', 1.7],
    ['Entero - 3,4kg', 3.4],
];

const queso = (precioKilo) =>
    TAMANOS_QUESO.map(([name, kg]) => ({ name, price: round2(precioKilo * kg) }));

const crema = () => [
    { name: '100 gr', price: '3.25' },
    { name: '1000 gr', price: '25.00' },
];

const tarta = () => [
    { name: 'Una porción', price: '3.20' },
    { name: '330 gr', price: '6.50' },
    { name: '1 kg', price: '16.50' },
    { name: '2 kg', price: '29.00' },
];

// match: título EXACTO actual en Shopify. newTitle: renombrado opcional.
// create: true → producto nuevo (status ACTIVE).
const OBJETIVO = [
    // Quesos de cabra (€/kg)
    { match: 'QUESO DE CABRA - TIERNO', option: 'Tamaño', variants: queso(14.93) },
    { match: 'QUESO DE CABRA - SEMICURADO', option: 'Tamaño', variants: queso(15.93) },
    { match: 'QUESO DE CABRA - CURADO', option: 'Tamaño', variants: queso(18.54) },
    { match: 'QUESO DE CABRA - CURADO EN ROMERO', option: 'Tamaño', variants: queso(18.54) },
    { match: 'QUESO DE CABRA - AÑEJO EN ACEITE', option: 'Tamaño', variants: queso(21.64) },
    { match: 'QUESO DE CABRA - FRESCO', create: true, option: 'Tamaño', variants: queso(12.3) },
    {
        match: 'RULO DE CABRA', option: 'Tamaño', variants: [
            { name: 'Kilo - 1000gr', price: '14.30' },
            { name: '115 gr', price: '2.00' },
        ]
    },
    // Quesos de oveja (€/kg)
    { match: 'QUESO DE OVEJA - SEMICURADO', option: 'Tamaño', variants: queso(16.8) },
    { match: 'QUESO DE OVEJA - CURADO', option: 'Tamaño', variants: queso(18.04) },
    { match: 'QUESO DE OVEJA CURADO - EN ROMERO', option: 'Tamaño', variants: queso(18.04) },
    { match: 'QUESO DE OVEJA CURADO - AÑEJO', option: 'Tamaño', variants: queso(22.31) },
    { match: 'QUESO DE OVEJA CURADO - AÑEJO EN ACEITE', option: 'Tamaño', variants: queso(21.67) },
    // Cremas: unificar las tres de «3 uds» al formato estándar 100g/1kg
    { match: 'CREMA DE QUESO DE CABRA', option: 'Peso', variants: crema() },
    {
        match: 'Crema de queso de cabra con miel - 3 uds, 100 gr',
        newTitle: 'Crema de Queso de Cabra con Miel', option: 'Peso', variants: crema()
    },
    {
        match: 'Crema de Queso de Oveja con Jamón Ibérico Artesanal, 3 uds, 100 gr',
        newTitle: 'Crema de Queso de Oveja con Jamón Ibérico', option: 'Peso', variants: crema()
    },
    // (las otras 5 cremas ya están en 100gr/1000gr a 3,25/25 — no se tocan)
    // Tartas: los 6 sabores al mismo precio (idempotente para las ya correctas)
    { match: 'TARTA DE QUESO CLÁSICA', option: 'Tamaño', variants: tarta() },
    { match: 'TARTA CREMOSA DE PISTACHO', option: 'Tamaño', variants: tarta() },
    { match: 'TARTA DE QUESO - LOTUS', option: 'Tamaño', variants: tarta() },
    { match: 'TARTA DE QUESO - OREO', option: 'Tamaño', variants: tarta() },
    { match: 'TARTA DE QUESO - DULCE DE LECHE', option: 'Tamaño', variants: tarta() },
    { match: 'TARTA DE QUESO - KINDER', option: 'Tamaño', variants: tarta() },
    // Packs promocionales
    {
        match: 'Pack 3 tarrinas de crema (100 gr)', create: true, option: 'Title', variants: [
            { name: 'Default Title', price: '9.00' },
        ]
    },
    {
        match: 'Pack 3 porciones de tarta', create: true, option: 'Title', variants: [
            { name: 'Default Title', price: '9.00' },
        ]
    },
];

// ——— Operaciones ———

async function fetchCatalogo() {
    const data = await admin(`
        query {
            products(first: 100) {
                nodes {
                    id
                    title
                    handle
                    status
                    options { name values }
                    variants(first: 30) {
                        nodes { id title price sku inventoryQuantity }
                    }
                }
            }
        }
    `);
    return data.products.nodes;
}

const backupPath = () => {
    const d = new Date();
    const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    return `catalogo-backup-${stamp}.json`;
};

async function backup() {
    const productos = await fetchCatalogo();
    const path = backupPath();
    writeFileSync(path, JSON.stringify(productos, null, 2));
    console.log(`✓ Copia de seguridad de ${productos.length} productos en ${path}`);
}

function planCambios(productos) {
    const porTitulo = new Map(productos.map((p) => [p.title, p]));
    const cambios = [];
    for (const objetivo of OBJETIVO) {
        const actual = porTitulo.get(objetivo.match);
        if (!actual && !objetivo.create) {
            cambios.push({ tipo: 'AVISO', titulo: objetivo.match, detalle: 'No existe en la tienda: se omite (revisar título)' });
            continue;
        }
        if (!actual && objetivo.create) {
            cambios.push({ tipo: 'CREAR', titulo: objetivo.match, detalle: objetivo.variants.map((v) => `${v.name}=${v.price}€`).join(' · ') });
            continue;
        }
        const actualVars = actual.variants.nodes.map((v) => `${v.title}=${Number(v.price).toFixed(2)}`).join(' · ');
        const nuevoVars = objetivo.variants.map((v) => `${v.name}=${v.price}`).join(' · ');
        if (actualVars === nuevoVars && !objetivo.newTitle) {
            cambios.push({ tipo: 'OK', titulo: objetivo.match, detalle: 'Ya está correcto' });
        } else {
            cambios.push({
                tipo: 'CAMBIAR', titulo: objetivo.match,
                detalle: `${actualVars}  →  ${nuevoVars}${objetivo.newTitle ? `  (título → «${objetivo.newTitle}»)` : ''}`
            });
        }
    }
    return cambios;
}

async function plan() {
    const productos = await fetchCatalogo();
    for (const c of planCambios(productos)) {
        console.log(`[${c.tipo}] ${c.titulo}\n        ${c.detalle}`);
    }
}

async function apply() {
    if (!existsSync(backupPath())) {
        console.error(`No existe ${backupPath()}. Ejecuta primero: backup`);
        process.exit(1);
    }
    const productos = await fetchCatalogo();
    const porTitulo = new Map(productos.map((p) => [p.title, p]));

    for (const objetivo of OBJETIVO) {
        const actual = porTitulo.get(objetivo.match);
        if (!actual && !objetivo.create) {
            console.log(`⚠ Omitido (no encontrado): ${objetivo.match}`);
            continue;
        }

        const input = {
            ...(actual ? { id: actual.id } : {}),
            title: objetivo.newTitle || objetivo.match,
            ...(objetivo.create ? { status: 'ACTIVE' } : {}),
            productOptions: [{
                name: objetivo.option,
                position: 1,
                values: objetivo.variants.map((v) => ({ name: v.name })),
            }],
            variants: objetivo.variants.map((v) => ({
                optionValues: [{ optionName: objetivo.option, name: v.name }],
                price: v.price,
            })),
        };

        const data = await admin(`
            mutation productSet($input: ProductSetInput!) {
                productSet(input: $input, synchronous: true) {
                    product { id title variants(first: 30) { nodes { title price } } }
                    userErrors { field message }
                }
            }
        `, { input });

        const errores = data.productSet.userErrors;
        if (errores.length > 0) {
            console.error(`✗ ${objetivo.match}: ${JSON.stringify(errores)}`);
        } else {
            const p = data.productSet.product;
            console.log(`✓ ${p.title}: ${p.variants.nodes.map((v) => `${v.title}=${v.price}`).join(' · ')}`);
        }
    }
    console.log('\nHecho. Ejecuta "verify" para comprobar el resultado.');
}

async function verify() {
    const productos = await fetchCatalogo();
    const cambios = planCambios(productos);
    const pendientes = cambios.filter((c) => c.tipo !== 'OK');
    if (pendientes.length === 0) {
        console.log(`✓ Catálogo verificado: los ${cambios.length} productos coinciden con el objetivo.`);
    } else {
        console.log('Desviaciones encontradas:');
        for (const c of pendientes) console.log(`[${c.tipo}] ${c.titulo}\n        ${c.detalle}`);
        process.exitCode = 1;
    }
}

const modo = process.argv[2];
const modos = { backup, plan, apply, verify };
if (!modos[modo]) {
    console.error('Uso: node --env-file=.env.local scripts/actualizar-catalogo.mjs <backup|plan|apply|verify>');
    process.exit(1);
}
await modos[modo]();
