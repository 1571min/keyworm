import axios from 'axios'
import qs from 'qs'

type resource_type = 'URL'
enum PLATFORM_CODE {
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE',
  ALL = 'ALL'
}
interface ResourceInterface {
  type: resource_type
  [key: string]: any
}
interface ContentInterface {
  title: string
}
interface HashInterface {
  resource: string
  content: string
}

export class Article {
  id = 1
  platformCode: PLATFORM_CODE = PLATFORM_CODE.NAVER
  keyword = ''
  resource: ResourceInterface = { type: 'URL', url: '' }
  content: ContentInterface = { title: '' }
  hash: HashInterface = { resource: '', content: '' }
}

export class ArticleFactory {
  static makeHash(data: string) {
    return data
  }

  static createArticle(keyword: string, resource: ResourceInterface, title: string): Article {
    const article = new Article()
    article.keyword = keyword
    article.resource.url = resource['url']
    article.content.title = title
    article.hash.content = this.makeHash(Object.values(article.content).join(''))
    article.hash.content = this.makeHash(Object.values(article.resource).join(''))
    return article
  }
}

const search = async (keyword: string, platformCode: PLATFORM_CODE, term: string) => {
  try {
    const rowArticles = await axios.get(
      `https://search.naver.com/search.naver?${qs.stringify({
        where: 'news',
        query: keyword,
        sm: 'tab_opt',
        sort: 1,
        field: 0,
        pd: 0
      })}`
    )
    return ArticleFactory.createArticle(keyword, { type: 'URL', url: 'test' }, 'test-title')
  } catch (error) {
    throw error
  }
}

const isAccessible = (platformCode: PLATFORM_CODE): boolean => {
  return true
}

export { search, isAccessible, PLATFORM_CODE }
