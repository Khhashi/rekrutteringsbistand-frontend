export function shouldRedirectToLogin(
  requestUrl: URL,
  authorization: string | null,
  local: boolean,
  testMode: boolean,
): boolean {
  if (
    requestUrl.pathname.startsWith('/api/') ||
    requestUrl.pathname.includes('/oauth2/') ||
    requestUrl.pathname === '/favicon.ico'
  ) {
    return false;
  }

  return authorization == null && !local && !testMode;
}
