import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Ambil token cookie admin
  const adminToken = request.cookies.get('admin_token')?.value;

  // 1. Proteksi: Jika mencoba akses /admin (selain /admin/login) TANPA token -> Lempar ke /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Jika SUDAH login tetapi mencoba buka /admin/login -> Lempar ke /admin
  if (pathname === '/admin/login' && adminToken) {
    const dashboardUrl = new URL('/admin', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Tentukan rute mana saja yang diproses oleh middleware ini
export const config = {
  matcher: ['/admin/:path*'],
};
