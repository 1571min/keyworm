import { Article } from '../article'
describe('[Unit] Article', () => {
  const keyword1 = 'keyworm'
  const keyword2 = 'keywormaaaaaa'
  const resourceUrl = 'naver.com'
  const contentTitle = 'Title'

  let article: Article
  beforeAll(() => {
    article = new Article()
  })
  it('Article keyword', () => {
    article.setKeyword(keyword1)
    expect(article.keyword).toBe(keyword1)
    expect(article.hash).toBe('487ED9F1804A44563BFC97A0E2CBF3C4'.toLowerCase())

    article.setKeyword(keyword2)
    expect(article.keyword).toBe(keyword2)
    expect(article.hash).toBe('99E2978A31FD92616D85E456A81A2A94'.toLowerCase())
  })

  it('Article Resource', () => {
    article.setResource(resourceUrl)
    expect(article.resource.url).toBe(resourceUrl)
    expect(article.resource.hash).toBe('482e1998f251b312e37ca9da0a9abd8d')
  })

  it('Article Content', () => {
    article.setContent(contentTitle)
    expect(article.content.title).toBe(contentTitle)
    expect(article.content.hash).toBe('a0160197f1b372fb377d5ac6936aa336')
  })
})
