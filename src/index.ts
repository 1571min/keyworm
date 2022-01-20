import { Naver, PLATFORM_CODE } from './platform/platform'

export const search = async (
  keyword: string,
  platform: PLATFORM_CODE,
  termDays: number
) => {
  if (platform === PLATFORM_CODE.NAVER) {
    const naver = new Naver()
    return await naver.collect(keyword, termDays)
  }
  throw new Error('지원하지 않는 플랫폼입니다.')
}

export * from './article/article'
export * from './platform/platform'
