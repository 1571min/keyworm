import { PLATFORM_CODE, Platform, PlatformFactory } from '../platform'

describe('[Unit] Platform', () => {
  const fakeKeyword = '삼성전자'
  describe('GOOGLE', () => {
    it('PlatformFactory generate platform Google', () => {
      const google = PlatformFactory.generatePlatform(PLATFORM_CODE.GOOGLE)
      expect(google instanceof Platform).toBe(true)
    })
  })

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

  describe('NAVER_VIEW', () => {
    it('PlatformFactory generate platform Naver View All', () => {
      const naverView = PlatformFactory.generatePlatform(
        PLATFORM_CODE.NAVER_VIEW_ALL
      )
      expect(naverView instanceof Platform).toBe(true)
    })

    it('Platform Naver View All collect articles', async () => {
      const naverView = PlatformFactory.generatePlatform(
        PLATFORM_CODE.NAVER_VIEW_ALL
      )
      if (naverView instanceof Platform) {
        const articles = await naverView.collect(fakeKeyword, 10)
        expect(articles.length).toBeGreaterThanOrEqual(1)
      } else {
        expect(false).toBe(true)
      }
    }, 60000)

    it('PlatformFactory generate platform Naver View Cafe', () => {
      const naverView = PlatformFactory.generatePlatform(
        PLATFORM_CODE.NAVER_VIEW_CAFE
      )
      expect(naverView instanceof Platform).toBe(true)
    })

    it('Platform Naver View Cafe collect articles', async () => {
      const naverView = PlatformFactory.generatePlatform(
        PLATFORM_CODE.NAVER_VIEW_CAFE
      )
      if (naverView instanceof Platform) {
        const articles = await naverView.collect(fakeKeyword, 10)
        expect(articles.length).toBeGreaterThanOrEqual(1)
      } else {
        expect(false).toBe(true)
      }
    }, 60000)

    it('PlatformFactory generate platform Naver View Blog', () => {
      const naverView = PlatformFactory.generatePlatform(
        PLATFORM_CODE.NAVER_VIEW_BLOG
      )
      expect(naverView instanceof Platform).toBe(true)
    })

    it('Platform Naver View Blog collect articles', async () => {
      const naverView = PlatformFactory.generatePlatform(
        PLATFORM_CODE.NAVER_VIEW_BLOG
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
