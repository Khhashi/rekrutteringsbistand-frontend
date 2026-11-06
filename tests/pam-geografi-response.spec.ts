import { pamJsonResponse } from '@/app/api/pam-geografi/pamJsonResponse';
import { expect, test } from '@playwright/test';

test('viderefører feilstatus fra PAM Geografi', async () => {
  const response = new Response(
    JSON.stringify({ error: 'PAM er utilgjengelig' }),
    {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    },
  );

  const result = await pamJsonResponse(response);
  expect(result.status).toBe(503);
  await expect(result.json()).resolves.toEqual({
    error: 'PAM er utilgjengelig',
  });
});

test('beholder 200-status for vellykkede svar fra PAM Geografi', async () => {
  const response = new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await pamJsonResponse(response);
  expect(result.status).toBe(200);
});
