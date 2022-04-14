import { Article } from '../article'
import { chunk, last } from 'lodash'
import axios from 'axios'
import qs from 'qs'
import cheerioModule from 'cheerio'
import { CollectOption, Platform } from './index'
import { NAVER_VIEW_URL, NAVER_VIEW_WHERE, PLATFORM_CODE } from '../enums'

export class NaverNews extends Platform {
  createDateFormat(separator = '', ...args: number[]) {
    return `${args[0]}${separator}${('00' + args[1].toString()).slice(
      -2
    )}${separator}${('00' + args[2].toString()).slice(-2)}`
  }

  async collect(collectOption: CollectOption) {
    const now = new Date()
    const yesterday = new Date(
      new Date().setDate(now.getDate() - collectOption.term.day)
    )
    const dayEnd = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    const dayStart = [
      yesterday.getFullYear(),
      yesterday.getMonth() + 1,
      yesterday.getDate()
    ]
    let resultArticles: Article[] = []
    const parallelsCount = 20
    const chuckedPageList: number[][] = chunk(
      Array(400)
        .fill(1)
        .map((a, i) => a + 10 * i),
      parallelsCount
    )

    for (const pageList of chuckedPageList) {
      const result = await Promise.allSettled(
        pageList.map(page =>
          axios
            .get(
              `https://search.naver.com/search.naver?${qs.stringify({
                de: this.createDateFormat('.', ...dayEnd),
                ds: this.createDateFormat('.', ...dayStart),
                where: 'news',
                query: `"${collectOption.keyword}"`,
                nso: `so:r,p:from${this.createDateFormat(
                  '',
                  ...dayStart
                )}to${this.createDateFormat('', ...dayEnd)}`,
                sm: 'tab_opt',
                sort: 0,
                field: 0,
                start: page,
                pd: 3
              })}`
            )
            .then(row => {
              const $ = cheerioModule.load(row.data)
              const collectedArticles: Article[] = []
              $('.news_tit')
                .each((i: any, el: any) => {
                  const article = new Article(PLATFORM_CODE.NAVER_NEWS)
                  article.setContent($(el).text())
                  article.setKeyword(collectOption.keyword)
                  article.setResource($(el).attr('href') ?? '')
                  collectedArticles.push(article)
                })
                .toArray()
              if (collectedArticles.length <= 1)
                throw new Error('검색 결과 없음')
              resultArticles = resultArticles.concat(collectedArticles)
            })
        )
      )
      if (result.find(r => r.status === 'rejected')) break
    }

    return resultArticles
  }
}

export class NaverView extends Platform {
  private where = NAVER_VIEW_WHERE.VIEW
  private url = NAVER_VIEW_URL.VIEW
  private code = PLATFORM_CODE.NAVER_VIEW_CAFE

  setWhere(mode: NAVER_VIEW_WHERE) {
    this.where = mode
  }

  setUrl(url: NAVER_VIEW_URL) {
    this.url = url
  }

  setCode(code: PLATFORM_CODE) {
    this.code = code
  }

  createDateFormat(separator = '', ...args: number[]) {
    return `${args[0]}${separator}${('00' + args[1].toString()).slice(
      -2
    )}${separator}${('00' + args[2].toString()).slice(-2)}`
  }

  async collect(collectOption: CollectOption) {
    const now = new Date()
    const yesterday = new Date(
      new Date().setDate(now.getDate() - collectOption.term.day)
    )
    const dayEnd = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    const dayStart = [
      yesterday.getFullYear(),
      yesterday.getMonth() + 1,
      yesterday.getDate()
    ]

    let resultArticles: Article[] = []
    const parallelsCount = 20
    const chuckedPageList: number[][] = chunk(
      Array(400)
        .fill(1)
        .map((a, i) => a + 10 * i),
      parallelsCount
    )

    const cafeDateOption =
      this.url === NAVER_VIEW_URL.CAFE
        ? {
            st: 'date',
            date_option: 99,
            date_from: this.createDateFormat('.', ...dayStart),
            date_to: this.createDateFormat('.', ...dayEnd)
          }
        : {}
    for (const pageList of chuckedPageList) {
      const result = await Promise.allSettled(
        pageList.map(page =>
          axios
            .get(
              `${this.url}?${qs.stringify({
                where: this.where,
                start: page,
                query: `"${collectOption.keyword}"`,
                nso: `so:dd,p:from${this.createDateFormat(
                  '',
                  ...dayStart
                )}to${this.createDateFormat('', ...dayEnd)}`,
                ...cafeDateOption
              })}`
            )
            .then(raw => {
              const $ = cheerioModule.load(raw.data)
              const collectedArticles: Article[] = []
              $('.api_txt_lines.total_tit')
                .each((i: any, el: any) => {
                  const href = $(el).attr('href')
                  if (href) {
                    const article = new Article(this.code)
                    article.setContent($(el).text())
                    article.setKeyword(collectOption.keyword)
                    article.setResource(href)
                    collectedArticles.push(article)
                  }
                })
                .toArray()
              if (
                last(resultArticles)?.hash === last(collectedArticles)?.hash ||
                collectedArticles.length === 0
              )
                throw new Error('검색 결과 없음')
              resultArticles = resultArticles.concat(collectedArticles)
            })
        )
      )
      if (result.find(r => r.status === 'rejected')) break
    }

    return resultArticles
  }
}
