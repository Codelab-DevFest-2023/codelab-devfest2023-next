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

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  DEFAULT_FIRST_PAGE: 1,
};
