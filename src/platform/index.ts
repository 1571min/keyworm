import { Article } from '../article'
import { PLATFORM_CODE } from '../enums'
import { PlatformInterface, TermInterface } from '../interfaces'

export class CollectOption {
  keyword = ''
  term: TermInterface = {
    hour: 0,
    day: 1
  }
  platform = PLATFORM_CODE.NAVER_NEWS

  validate(): void {
    if (this.keyword.length == 0) throw new Error('keyword is not exist')
    if (this.term.hour == 0 && this.term.day == 0)
      throw new Error('term option is not set')
    if (this.term.hour > 0) throw new Error('hour type is not support')
  }
}

export class Platform implements PlatformInterface {
  async collect(collectOption: CollectOption) {
    return [new Article()]
  }
}

export * from './naver'
export * from './google'
