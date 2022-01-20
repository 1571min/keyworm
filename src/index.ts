import { Article } from './article'
import { Naver, PLATFORM_CODE } from './platform'

export const search = async (
  keyword: string,
  platform: PLATFORM_CODE,
  termDays: number
): Promise<Article[]> => {
  if (platform === PLATFORM_CODE.NAVER) {
    const naver = new Naver()
    return await naver.collect(keyword, termDays)
  }
  throw new Error('지원하지 않는 플랫폼입니다.')
}

export * from './article'
export * from './platform'
