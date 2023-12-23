interface Params {
  url: string;
  params?: object;
}

export function createQueryString({ url, params }: Params) {
  let qs = url;
  if (params && Object.keys(params).length) {
    qs += '?';
    qs += new URLSearchParams(params as Record<string, string>);
  }

  return qs;
}
