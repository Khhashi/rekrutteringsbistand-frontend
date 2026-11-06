export const lagUnderenhetUrl = (baseUrl: string, søkeord: string) =>
  `${baseUrl}?q=${encodeURIComponent(søkeord)}`;
