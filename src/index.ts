import { Article } from './article'
import { CollectOption, PLATFORM_CODE, PlatformFactory } from './platform'

class SearchOption extends CollectOption {
  platform = PLATFORM_CODE.NAVER_NEWS
}

export const search = async (searchOption: any): Promise<Article[]> => {
  const option = new SearchOption()
  option.keyword = searchOption['keyword']
  option.term = searchOption['term'] ?? {
    hour: 0,
    day: 1
  }
  option.platform = searchOption['platform']

  const platform = PlatformFactory.generatePlatform(searchOption.platform)
  if (platform === undefined) {
    throw new Error('지원하지 않는 플랫폼입니다.')
  }

  option.validate()

  return await platform.collect(option)
}

export * from './article'
export * from './platform'
