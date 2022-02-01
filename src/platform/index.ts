import axios from 'axios'
import cheerioModule from 'cheerio'
import qs from 'qs'
import { Article } from '../article'

export enum PLATFORM_CODE {
  NAVER_NEWS = 'NAVER_NEWS',
  NAVER_VIEW = 'NAVER_VIEW',
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

export class NaverView extends Platform {
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
    const url = `https://search.naver.com/search.naver?${qs.stringify({
      mode: 'normal',
      where: 'view',
      query: `"${keyword}"`,
      nso: `so:dd,p::from${this.createDateFormat(
        '',
        ...dayStart
      )}to${this.createDateFormat('', ...dayEnd)}`
    })}`

    const rowArticles = await axios.get(url)
    const $ = cheerioModule.load(rowArticles.data)
    const collectedArticles: Article[] = []
    $('.api_txt_lines')
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
    resultArticles = resultArticles.concat(collectedArticles)

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
    } else if (platformCode === PLATFORM_CODE.NAVER_VIEW) {
      return new NaverView()
    } else {
      return undefined
    }
  }
}
