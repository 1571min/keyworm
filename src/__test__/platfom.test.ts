import { PLATFORM_CODE, Platform, PlatformFactory } from '../platform'

describe('[Unit] Platform', () => {
  const fakeKeyword = '모두의 주차장'

  describe('NAVER_NEWS', () => {
    it('PlatformFactory generate platform Naver News', () => {
      const naverNews = PlatformFactory.generatePlatform(
        PLATFORM_CODE.NAVER_NEWS
      )
      expect(naverNews instanceof Platform).toBe(true)
    })

    it('Platform Naver News collect articles', async () => {
      const naverNews = PlatformFactory.generatePlatform(
        PLATFORM_CODE.NAVER_NEWS
      )
      if (naverNews instanceof Platform) {
        const articles = await naverNews.collect(fakeKeyword, 10)
        expect(articles.length).toBeGreaterThanOrEqual(1)
      } else {
        expect(false).toBe(true)
      }
    }, 60000)
  })

  describe('GOOGLE', () => {
    it('PlatformFactory generate platform Google', () => {
      const google = PlatformFactory.generatePlatform(PLATFORM_CODE.GOOGLE)
      expect(google instanceof Platform).toBe(true)
    })
  })

  describe('NAVER_VIEW', () => {
    it('PlatformFactory generate platform Naver View', () => {
      const naverView = PlatformFactory.generatePlatform(
        PLATFORM_CODE.NAVER_VIEW
      )
      expect(naverView instanceof Platform).toBe(true)
    })

    it('Platform Naver View collect articles', async () => {
      const naverView = PlatformFactory.generatePlatform(
        PLATFORM_CODE.NAVER_VIEW
      )
      if (naverView instanceof Platform) {
        const articles = await naverView.collect(fakeKeyword, 10)
        expect(articles.length).toBeGreaterThanOrEqual(1)
      } else {
        expect(false).toBe(true)
      }
    }, 60000)
  })
})
