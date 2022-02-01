import { Article } from './article'
import { NaverNews, NaverView, PLATFORM_CODE } from './platform'

class SearchOption {
  platform = PLATFORM_CODE.NAVER_NEWS
  keyword = ''
  termDay = 1
}
export const search = async (
  searchOption: SearchOption
): Promise<Article[]> => {
  if (searchOption.platform === PLATFORM_CODE.NAVER_NEWS) {
    const naverNews = new NaverNews()
    return await naverNews.collect(searchOption.keyword, searchOption.termDay)
  } else if (searchOption.platform === PLATFORM_CODE.NAVER_VIEW) {
    const naverView = new NaverView()
    return await naverView.collect(searchOption.keyword, searchOption.termDay)
  }
  throw new Error('지원하지 않는 플랫폼입니다.')
}

export * from './article'
export * from './platform'
