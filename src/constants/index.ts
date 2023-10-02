export const API_HEADER = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY ?? 'empty'}`,
};

export const QUERY_PARAMS = {
  PAGE: 'page',
  LANGUAGE: 'language',
  QUERY: 'query',
};

export const DEFAULT_PARAMS = {
  LANGUAGE: 'fr-FR',
};
