import { shouldRedirectToLogin } from '@/proxy-auth';
import { expect, test } from '@playwright/test';

test.describe('proxy-autentisering', () => {
  test('sender en uautorisert redirect-forespørsel til innlogging', () => {
    const requestUrl = new URL(
      'https://example.test/admin/dashboard?redirect=anything',
    );

    expect(shouldRedirectToLogin(requestUrl, null, false, false)).toBe(true);
  });

  test('lar ikke autentiserte forespørsler bli sendt til innlogging', () => {
    const requestUrl = new URL('https://example.test/admin/dashboard');

    expect(
      shouldRedirectToLogin(requestUrl, 'Bearer token', false, false),
    ).toBe(false);
  });

  test('slipper gjennom OAuth2-ruter uten autentisering', () => {
    const requestUrl = new URL(
      'https://example.test/oauth2/login?redirect=%2Fadmin%2Fdashboard',
    );

    expect(shouldRedirectToLogin(requestUrl, null, false, false)).toBe(false);
  });
});
