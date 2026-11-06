import { isLocal } from './util/env';
import { shouldRedirectToLogin } from './proxy-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const testMode = process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE === 'true';

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-path', requestUrl.pathname + requestUrl.search);

  if (
    shouldRedirectToLogin(
      requestUrl,
      requestHeaders.get('authorization'),
      isLocal,
      testMode,
    )
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/oauth2/login';
    redirectUrl.searchParams.set(
      'redirect',
      requestUrl.pathname + requestUrl.search,
    );

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'], // Next 16 kompatibel sti
  missing: [{ type: 'header', key: 'x-path' }],
};
