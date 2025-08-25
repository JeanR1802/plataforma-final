// Por ahora, esta página será muy simple.
// Solo confirmará que el enrutamiento del subdominio funciona.

export default function StorePage({ params }: { params: { slug: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-800">
          ¡Subdominio Detectado!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Estás viendo la página para la tienda: <strong>{params.slug}</strong>
        </p>
      </div>
    </main>
  );
}
