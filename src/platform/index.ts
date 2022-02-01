import axios from 'axios'
import cheerioModule from 'cheerio'
import qs from 'qs'
import { Article } from '../article'
import { last } from 'lodash'

export enum PLATFORM_CODE {
  NAVER_NEWS = 'NAVER_NEWS',
  NAVER_VIEW_ALL = 'NAVER_VIEW_ALL',
  NAVER_VIEW_BLOG = 'NAVER_VIEW_BLOG',
  NAVER_VIEW_CAFE = 'NAVER_VIEW_CAFE',
  GOOGLE = 'GOOGLE',
  ALL = 'ALL'
}

export interface PlatformInterface {
  collect(keyword: string, termDay: number): Promise<Article[]>
}

export class Platform implements PlatformInterface {
  async collect(keyword: string, termDay: number) {
    return [new Article()]
  }
}

export class NaverNews extends Platform {
  createDateFormat(separator = '', ...args: number[]) {
    return `${args[0]}${separator}${('00' + args[1].toString()).slice(
      -2
    )}${separator}${('00' + args[2].toString()).slice(-2)}`
  }
  async collect(keyword: string, termDay: number) {
    const now = new Date()
    const yesterday = new Date(new Date().setDate(now.getDate() - termDay))
    const dayEnd = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    const dayStart = [
      yesterday.getFullYear(),
      yesterday.getMonth() + 1,
      yesterday.getDate()
    ]
    let resultArticles: Article[] = []
    for (let startPage = 1; startPage < 4000; startPage += 10) {
      const url = `https://search.naver.com/search.naver?${qs.stringify({
        de: this.createDateFormat('.', ...dayEnd),
        ds: this.createDateFormat('.', ...dayStart),
        where: 'news',
        query: `"${keyword}"`,
        nso: `so:r,p:from${this.createDateFormat(
          '',
          ...dayStart
        )}to${this.createDateFormat('', ...dayEnd)}`,
        sm: 'tab_opt',
        sort: 0,
        field: 0,
        start: startPage,
        pd: 3
      })}`

      const rowArticles = await axios.get(url)
      const $ = cheerioModule.load(rowArticles.data)
      const collectedArticles: Article[] = []
      $('.news_tit')
        .each((i, el) => {
          const article = new Article(PLATFORM_CODE.NAVER_NEWS)
          article.setContent($(el).text())
          article.setKeyword(keyword)
          article.setResource($(el).attr('href') ?? '')
          collectedArticles.push(article)
        })
        .toArray()
      resultArticles = resultArticles.concat(collectedArticles)
      if (collectedArticles.length <= 1) break
    }

    return resultArticles
  }
}

const enum NAVER_VIEW_WHERE {
  VIEW = 'view',
  CAFE = 'article',
  BLOG = 'blog'
}

const enum NAVER_VIEW_URL {
  VIEW = 'https://s.search.naver.com/p/review/search.naver',
  CAFE = 'https://s.search.naver.com/p/cafe/search.naver?',
  BLOG = 'https://s.search.naver.com/p/blog/search.naver'
}

const enum NAVER_VIEW_TYPE {
  VIEW = 'VIEW',
  CAFE = 'CAFE',
  BLOG = 'BLOG'
}

export class NaverView extends Platform {
  private where = NAVER_VIEW_WHERE.VIEW
  private url = NAVER_VIEW_URL.VIEW

  setWhere(mode: NAVER_VIEW_WHERE) {
    this.where = mode
  }

  setUrl(url: NAVER_VIEW_URL) {
    this.url = url
  }

  setType(type: NAVER_VIEW_TYPE) {
    const url = ''
    switch (type) {
      case NAVER_VIEW_TYPE.VIEW:
      case NAVER_VIEW_TYPE.CAFE:
      case NAVER_VIEW_TYPE.BLOG:
      default:
        break
    }
  }

  createDateFormat(separator = '', ...args: number[]) {
    return `${args[0]}${separator}${('00' + args[1].toString()).slice(
      -2
    )}${separator}${('00' + args[2].toString()).slice(-2)}`
  }
  async collect(keyword: string, termDay: number) {
    const now = new Date()
    const yesterday = new Date(new Date().setDate(now.getDate() - termDay))
    const dayEnd = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    const dayStart = [
      yesterday.getFullYear(),
      yesterday.getMonth() + 1,
      yesterday.getDate()
    ]
    let resultArticles: Article[] = []
    for (let startPage = 1; startPage < 4000; startPage += 30) {
      const cafeDateOption =
        this.url === NAVER_VIEW_URL.CAFE
          ? {
              st: 'date',
              date_option: 99,
              date_from: this.createDateFormat('.', ...dayStart),
              date_to: this.createDateFormat('.', ...dayEnd)
            }
          : {}
      const url = `${this.url}?${qs.stringify({
        where: this.where,
        start: startPage,
        query: `"${keyword}"`,
        nso: `so:dd,p:from${this.createDateFormat(
          '',
          ...dayStart
        )}to${this.createDateFormat('', ...dayEnd)}`,
        ...cafeDateOption
      })}`

      const rowArticles = await axios.get(url)
      const $ = cheerioModule.load(rowArticles.data)
      const collectedArticles: Article[] = []
      $('.api_txt_lines.total_tit')
        .each((i, el) => {
          const href = $(el).attr('href')
          if (href) {
            const article = new Article(PLATFORM_CODE.NAVER_NEWS)
            article.setContent($(el).text())
            article.setKeyword(keyword)
            article.setResource(href)
            collectedArticles.push(article)
          }
        })
        .toArray()
      if (
        last(resultArticles)?.hash === last(collectedArticles)?.hash ||
        collectedArticles.length === 0
      )
        break
      resultArticles = resultArticles.concat(collectedArticles)
    }

    return resultArticles
  }
}

export class Google extends Platform {}

export class PlatformFactory {
  static generatePlatform = (platformCode: PLATFORM_CODE) => {
    if (platformCode === PLATFORM_CODE.NAVER_NEWS) {
      return new NaverNews()
    } else if (platformCode === PLATFORM_CODE.GOOGLE) {
      return new Google()
    } else if (platformCode === PLATFORM_CODE.NAVER_VIEW_ALL) {
      const naverView = new NaverView()
      naverView.setWhere(NAVER_VIEW_WHERE.VIEW)
      naverView.setUrl(NAVER_VIEW_URL.VIEW)
      return naverView
    } else if (platformCode === PLATFORM_CODE.NAVER_VIEW_BLOG) {
      const naverView = new NaverView()
      naverView.setWhere(NAVER_VIEW_WHERE.BLOG)
      naverView.setUrl(NAVER_VIEW_URL.BLOG)
      return naverView
    } else if (platformCode === PLATFORM_CODE.NAVER_VIEW_CAFE) {
      const naverView = new NaverView()
      naverView.setWhere(NAVER_VIEW_WHERE.CAFE)
      naverView.setUrl(NAVER_VIEW_URL.CAFE)
      return naverView
    } else {
      return undefined
    }
  }
}
