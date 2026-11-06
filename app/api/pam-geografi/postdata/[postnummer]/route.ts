import { skalMocke } from '@/util/env';
import { nanoid } from 'nanoid';
import { pamJsonResponse } from '@/app/api/pam-geografi/pamJsonResponse';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postnummer: string }> },
) {
  const postnummer = (await params).postnummer;
  const id = nanoid();
  const requestUrl = skalMocke
    ? `http://mock-api/api/pam-geografi/postdata/${postnummer}`
    : `${process.env.PAM_GEOGRAFI_URL}/rest/postdata/${postnummer}`;
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
