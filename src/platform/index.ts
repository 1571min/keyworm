import axios from 'axios'
import cheerioModule from 'cheerio'
import qs from 'qs'
import { Article } from '../article'

export enum PLATFORM_CODE {
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE',
  ALL = 'ALL'
}

export interface PlatformInterface {
  collect(keyword: string, termDays: number): Promise<Article[]>
}

export class Platform implements PlatformInterface {
  async collect(keyword: string, termDays: number) {
    return [new Article()]
  }
}

export class Naver extends Platform {
  createDateFormat(separator = '', ...args: number[]) {
    return `${args[0]}${separator}${('00' + args[1].toString()).slice(
      -2
    )}${separator}${('00' + args[2].toString()).slice(-2)}`
  }
  async collect(keyword: string, termDays: number) {
    const now = new Date()
    const yesterday = new Date(new Date().setDate(now.getDate() - termDays))
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
          const article = new Article(PLATFORM_CODE.NAVER)
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

export class Google extends Platform {}

export class PlatformFactory {
  static generatePlatform = (platformCode: PLATFORM_CODE) => {
    if (platformCode === PLATFORM_CODE.NAVER) {
      return new Naver()
    } else if (platformCode === PLATFORM_CODE.GOOGLE) {
      return new Google()
    } else {
      return new Platform()
    }
  }
}
