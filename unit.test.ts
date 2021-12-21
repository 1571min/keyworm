import { ArticleFactory, isAccessible, PLATFORM_CODE, search } from './index'

describe('unit test', () => {
  it('article generate hash', () => {
    const article = ArticleFactory.createArticle('test', { type: 'URL', URL: 'test' }, 'test-title')
    const fakeContentHash = ''
    const fakeResourceHash = ''
    expect(article.hash.content).toBe(fakeContentHash)
    expect(article.hash.resource).toBe(fakeResourceHash)
  })

  it('search', async () => {
    const articles = await search('삼성전자', PLATFORM_CODE.NAVER, '1h')
    const fakeArticle = {}
    expect(articles).toStrictEqual(fakeArticle)
  })

  it('isAccessible - true', async () => {
    const result = await isAccessible(PLATFORM_CODE.NAVER)
    expect(result).toBe(true)
  })

  it('isAccessible - false', async () => {
    const result = await isAccessible(PLATFORM_CODE.GOOGLE)
    expect(result).toBe(false)
  })
})
