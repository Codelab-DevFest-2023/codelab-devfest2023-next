import { ParsedUrlQuery } from 'querystring';

const objectToURLSearchParams = (paramsObject: {
  [key: string]: string | string[] | undefined;
}) => {
  const urlSearchParams = new URLSearchParams();

  for (const key in paramsObject) {
    const value = paramsObject[key];

    if (typeof value === 'string') {
      urlSearchParams.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        urlSearchParams.append(key, item);
      });
    }
  }

  return urlSearchParams;
};

const transformParsedUrlQuery = (
  query: ParsedUrlQuery | undefined,
): { [key: string]: string | string[] | undefined } => {
  const transformedQuery: { [key: string]: string | string[] | undefined } = {};

  if (!query) {
    return transformedQuery;
  }

  for (const key in query) {
    const value = query[key];

    if (Array.isArray(value)) {
      transformedQuery[key] = value;
    } else if (typeof value === 'string') {
      transformedQuery[key] = value;
    } else {
      transformedQuery[key] = undefined;
    }
  }
  return transformedQuery;
};

export { objectToURLSearchParams, transformParsedUrlQuery };
