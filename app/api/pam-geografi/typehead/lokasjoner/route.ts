import { skalMocke } from '@/util/env';
import { nanoid } from 'nanoid';
import { pamJsonResponse } from '@/app/api/pam-geografi/pamJsonResponse';

export async function GET() {
  const id = nanoid();
  const requestUrl = skalMocke
    ? 'http://mock-api/api/pam-geografi/typehead/lokasjoner'
    : `${process.env.PAM_GEOGRAFI_URL}/rest/typeahead/lokasjoner`;
  const response = await fetch(requestUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache, no-store',
      'Nav-CallId': id,
    },
  });
  return pamJsonResponse(response);
}
