export enum PLATFORM_CODE {
  NAVER_NEWS = 'NAVER_NEWS',
  NAVER_VIEW_ALL = 'NAVER_VIEW_ALL',
  NAVER_VIEW_BLOG = 'NAVER_VIEW_BLOG',
  NAVER_VIEW_CAFE = 'NAVER_VIEW_CAFE',
  GOOGLE = 'GOOGLE',
  ALL = 'ALL'
}

export const enum NAVER_VIEW_WHERE {
  VIEW = 'view',
  CAFE = 'article',
  BLOG = 'blog'
}

export const enum NAVER_VIEW_URL {
  VIEW = 'https://s.search.naver.com/p/review/search.naver',
  CAFE = 'https://s.search.naver.com/p/cafe/search.naver?',
  BLOG = 'https://s.search.naver.com/p/blog/search.naver'
}
