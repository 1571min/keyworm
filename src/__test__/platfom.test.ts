import { PLATFORM_CODE, Platform, PlatformFactory } from '../platform'

describe('[Unit] Platform', () => {
  const fakeKeyword = '모두의 주차장'

  it('PlatformFactory generate platform Naver', () => {
    const naver = PlatformFactory.generatePlatform(PLATFORM_CODE.NAVER)
    expect(naver instanceof Platform).toBe(true)
  })

  it('PlatformFactory generate platform Google', () => {
    const google = PlatformFactory.generatePlatform(PLATFORM_CODE.GOOGLE)
    expect(google instanceof Platform).toBe(true)
  })

  it('Platform Naver collect articles', async () => {
    const naver = PlatformFactory.generatePlatform(PLATFORM_CODE.NAVER)
    const articles = await naver.collect(fakeKeyword, 10)
    expect(articles.length).toBeGreaterThanOrEqual(1)
  }, 60000)
})
