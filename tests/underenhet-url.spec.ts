import { lagUnderenhetUrl } from '@/app/api/pam-search/underenhet/underenhetUrl';
import { expect, test } from '@playwright/test';

test('koder spesialtegn i arbeidsgiversoket som en query-parameter', () => {
  const search = 'A&B #1?';
  const url = new URL(
    lagUnderenhetUrl('/api/pam-search/underenhet', search),
    'https://example.test',
  );

  expect([...url.searchParams.entries()]).toEqual([['q', search]]);
});
