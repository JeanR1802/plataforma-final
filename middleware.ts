import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { hostname } = req.nextUrl;

  // Obtenemos el dominio raíz desde las variables de entorno.
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'gestularia.com';

  // Si el hostname es el dominio raíz (con o sin www) o una URL de Vercel,
  // no hacemos nada y mostramos la página principal.
  if (
    hostname === rootDomain ||
    hostname === `www.${rootDomain}` ||
    hostname.endsWith('.vercel.app')
  ) {
    return NextResponse.next();
  }

  // Si no, es un subdominio de tienda. Extraemos el slug.
  const subdomain = hostname.replace(`.${rootDomain}`, '');

  // Reescribimos la ruta para que apunte a la página de la tienda.
  const rewritePath = `/_stores/${subdomain}${url.pathname}`;
  url.pathname = rewritePath;
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
