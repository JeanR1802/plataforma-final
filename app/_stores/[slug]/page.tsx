import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

async function getStoreData(slug: string) {
  console.log(`--- [Store Page] Iniciando búsqueda para el slug: "${slug}" ---`);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('[Store Page] ERROR FATAL: Variables de entorno de Supabase NO encontradas.');
    return null;
  }
  console.log('[Store Page] Variables de entorno encontradas correctamente.');

  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log(`[Store Page] Cliente de Supabase creado. Buscando en la tabla 'Store'...`);

  const { data: store, error } = await supabase
    .from('Store')
    .select('name, heroTitle')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('[Store Page] Error de Supabase al ejecutar la consulta:', error);
  }
  
  console.log('[Store Page] Resultado de la búsqueda en Supabase:', store);
  console.log(`--- [Store Page] Fin de la búsqueda para: "${slug}" ---`);
  return store;
}

export default async function StorePage({ params }: { params: { slug: string } }) {
  const store = await getStoreData(params.slug);

  if (!store) {
    console.log(`[Store Page] No se encontró la tienda para "${params.slug}". Se mostrará la página 404.`);
    notFound();
  }

  console.log(`[Store Page] Tienda encontrada para "${params.slug}". Renderizando la página.`);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 text-center">
        <h1 className="text-5xl font-bold text-gray-800">
          Bienvenido a {store.name || 'tu tienda'}
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Estás viendo la tienda del subdominio: <strong>{params.slug}</strong>
        </p>
    </main>
  );
}
