import { Article } from './article'
import { NaverNews, NaverView, PLATFORM_CODE } from './platform'

export const search = async (
  platform: PLATFORM_CODE = PLATFORM_CODE.NAVER_NEWS,
  keyword: string,
  termDays = 1
): Promise<Article[]> => {
  if (platform === PLATFORM_CODE.NAVER_NEWS) {
    const naverNews = new NaverNews()
    return await naverNews.collect(keyword, termDays)
  } else if (platform === PLATFORM_CODE.NAVER_VIEW) {
    const naverView = new NaverView()
    return await naverView.collect(keyword, termDays)
  }
  throw new Error('지원하지 않는 플랫폼입니다.')
}

export * from './article'
export * from './platform'
