interface Params {
  url: string;
  params?: Record<string, string>;
}

export function createQueryString({ url, params }: Params) {
  let qs = url;
  if (params && Object.keys(params).length) {
    qs += '?';
    qs += new URLSearchParams(params);
  }
  console.log(qs);
  return qs;
}
