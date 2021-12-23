import axios from 'axios'
import cheerioModule from 'cheerio'
import qs from 'qs'
import { Article } from '../article/article'

export enum PLATFORM_CODE {
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE'
}

interface PlatformInterface {
  collect(keyword: string, termDays: number): Promise<Article[]>
}
export class Platform implements PlatformInterface {
  async collect(keyword: string, termDays: number) {
    return [new Article()]
  }
}

class Naver extends Platform {
  async collect(keyword: string, termDays: number) {
    const now = new Date()
    const yesterday = new Date(new Date().setDate(now.getDate() - termDays))
    const dayEnd = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    const dayStart = [yesterday.getFullYear(), yesterday.getMonth() + 1, yesterday.getDate()]
    let resultArticles: Article[] = []
    for (let startPage = 1; startPage < 9999; startPage += 10) {
      const rowArticles = await axios.get(
        `https://search.naver.com/search.naver?${qs.stringify({
          de: dayEnd.join('.'),
          ds: dayStart.join('.'),
          where: 'news',
          query: `"${keyword}"`,
          nso: `so:dd,p:from${dayStart.join('')}to${dayEnd.join('')}`,
          sm: 'tab_opt',
          sort: 1,
          field: 0,
          start: startPage,
          pd: 3
        })}`
      )
      const $ = cheerioModule.load(rowArticles.data)
      const collectedArticles: Article[] = []
      $('.news_tit')
        .each((i, el) => {
          const article = new Article()
          article.setContent($(el).text())
          article.setKeyword(keyword)
          article.setResource($(el).attr('href') ?? '')
          collectedArticles.push(article)
        })
        .toArray()
      if (collectedArticles.length === 0) break
      resultArticles = resultArticles.concat(collectedArticles)
    }

    return resultArticles
  }
}

class Google extends Platform {}
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
