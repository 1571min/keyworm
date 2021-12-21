import axios from 'axios'
import md5 from 'md5'
import qs from 'qs'
import { v1 as uuidv1 } from 'uuid'

export type resource_type = 'URL'
export enum PLATFORM_CODE {
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE',
  ALL = 'ALL'
}

export interface ResourceInterface {
  type: resource_type
  [key: string]: any
}

export interface ContentInterface {
  title: string
}

export interface HashInterface {
  resource: string
  content: string
}

export interface PlatformInterface {
  url: string
  params: any
  collect: (keyword: string, term: string) => Promise<Article[]>
  isAccessible: () => Promise<boolean>
}

export class Article {
  id = ''
  platformCode: PLATFORM_CODE = PLATFORM_CODE.ALL
  keyword = ''
  resource: ResourceInterface = { type: 'URL', url: '' }
  content: ContentInterface = { title: '' }
  hash: HashInterface = { resource: '', content: '' }
}

export class ArticleFactory {
  static makeHash(data: string) {
    return md5(data)
  }

  static createArticle(keyword: string, resource: ResourceInterface, title: string): Article {
    const article = new Article()
    article.id = uuidv1()
    article.keyword = keyword
    article.resource = resource
    article.content.title = title
    article.hash.content = this.makeHash(Object.values(article.content).join(''))
    article.hash.resource = this.makeHash(Object.values(article.resource).join(''))
    return article
  }
}

export const search = async (keyword: string, platformCode: PLATFORM_CODE, term: string) => {
  try {
    // switch platformCode
    // naver url
    // const rowArticles = await axios.get(
    //   `https://search.naver.com/search.naver?${qs.stringify({
    //     where: 'news',
    //     query: keyword,
    //     sm: 'tab_opt',
    //     sort: 1,
    //     field: 0,
    //     pd: 0
    //   })}`
    // )
    return [ArticleFactory.createArticle(keyword, { type: 'URL', url: 'test' }, 'test-title')]
  } catch (error) {
    throw error
  }
}

export const isAccessible = (platformCode: PLATFORM_CODE): boolean => {
  try {
    // switch platformCode
    return true
  } catch (error) {
    throw error
  }
}
