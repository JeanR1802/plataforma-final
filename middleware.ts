import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { hostname } = req.nextUrl;

  console.log(`--- [Middleware] Petición recibida para: ${hostname} ---`);

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'gestularia.com';

  if (
    hostname === rootDomain ||
    hostname === `www.${rootDomain}` ||
    hostname.endsWith('.vercel.app')
  ) {
    console.log(`[Middleware] Es un dominio principal o de Vercel. No se hace nada.`);
    return NextResponse.next();
  }

  const subdomain = hostname.replace(`.${rootDomain}`, '');
  console.log(`[Middleware] Subdominio detectado: "${subdomain}"`);

  const rewritePath = `/_stores/${subdomain}${url.pathname}`;
  console.log(`[Middleware] Reescribiendo la ruta a: ${rewritePath}`);
  url.pathname = rewritePath;
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
