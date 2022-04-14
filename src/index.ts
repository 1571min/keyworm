import { Article } from './article'
import {
  CollectOption,
  PLATFORM_CODE,
  PlatformFactory,
  TermInterface
} from './platform'
import { plainToInstance } from 'class-transformer'

export class CollectOptionDto extends CollectOption {
  platform = PLATFORM_CODE.NAVER_NEWS
  term = {
    hour: 0,
    day: 1
  }
}

export interface SearchOptionInterface {
  keyword: string
  term?: TermInterface
  platform?: PLATFORM_CODE
}

export const search = async (
  searchOption: SearchOptionInterface
): Promise<Article[]> => {
  const collectOptionDto = plainToInstance(CollectOptionDto, searchOption)

  const platform = PlatformFactory.generatePlatform(collectOptionDto.platform)
  if (platform === undefined) {
    throw new Error('지원하지 않는 플랫폼입니다.')
  }

  collectOptionDto.validate()

  return await platform.collect(collectOptionDto)
}

export * from './article'
export * from './platform'
