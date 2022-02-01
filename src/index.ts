import { Article } from './article'
import { PLATFORM_CODE, PlatformFactory } from './platform'

class SearchOption {
  platform = PLATFORM_CODE.NAVER_NEWS
  keyword = ''
  termDay = 1
}

export const search = async (
  searchOption: SearchOption
): Promise<Article[]> => {
  const platform = PlatformFactory.generatePlatform(searchOption.platform)
  if (platform === undefined) {
    throw new Error('지원하지 않는 플랫폼입니다.')
  }

  return await platform.collect(searchOption.keyword, searchOption.termDay)
}

export * from './article'
export * from './platform'
