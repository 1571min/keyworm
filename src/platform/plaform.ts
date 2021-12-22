import { Article } from '../article/article'

export enum PLAFORM_CODE {
  NAVER = 'NAVER'
}

interface PlatformInterface {
  collect: (keyword: string, term: string) => Promise<Article[]>
}
export class Platform implements PlatformInterface {
  collect = async (keyword: string, term: string) => [new Article()]
}

export class PlatformFactory {
  static generatePlatform = (platfromCode: PLAFORM_CODE) => {}
}
