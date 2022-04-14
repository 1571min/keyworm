import { Article } from './article'
import { CollectOption, Google, NaverNews, NaverView } from './platform'
import { plainToInstance } from 'class-transformer'
import { NAVER_VIEW_URL, NAVER_VIEW_WHERE, PLATFORM_CODE } from './enums'
import { SearchOptionInterface } from './interfaces'

export class PlatformFactory {
  static generatePlatform = (platformCode: PLATFORM_CODE) => {
    if (platformCode === PLATFORM_CODE.NAVER_NEWS) {
      return new NaverNews()
    } else if (platformCode === PLATFORM_CODE.GOOGLE) {
      return new Google()
    } else if (platformCode === PLATFORM_CODE.NAVER_VIEW_ALL) {
      const naverView = new NaverView()
      naverView.setWhere(NAVER_VIEW_WHERE.VIEW)
      naverView.setUrl(NAVER_VIEW_URL.VIEW)
      naverView.setCode(PLATFORM_CODE.NAVER_VIEW_ALL)
      return naverView
    } else if (platformCode === PLATFORM_CODE.NAVER_VIEW_BLOG) {
      const naverView = new NaverView()
      naverView.setWhere(NAVER_VIEW_WHERE.BLOG)
      naverView.setUrl(NAVER_VIEW_URL.BLOG)
      naverView.setCode(PLATFORM_CODE.NAVER_VIEW_BLOG)
      return naverView
    } else if (platformCode === PLATFORM_CODE.NAVER_VIEW_CAFE) {
      const naverView = new NaverView()
      naverView.setWhere(NAVER_VIEW_WHERE.CAFE)
      naverView.setUrl(NAVER_VIEW_URL.CAFE)
      naverView.setCode(PLATFORM_CODE.NAVER_VIEW_CAFE)
      return naverView
    } else {
      return undefined
    }
  }
}

export const search = async (
  searchOption: SearchOptionInterface
): Promise<Article[]> => {
  const collectOption = plainToInstance(CollectOption, searchOption)

  const platform = PlatformFactory.generatePlatform(collectOption.platform)
  if (platform === undefined) {
    throw new Error('지원하지 않는 플랫폼입니다.')
  }

  collectOption.validate()

  return await platform.collect(collectOption)
}

export * from './interfaces'
export * from './enums'
export * from './article'
export * from './platform'
