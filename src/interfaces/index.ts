import { Article } from '../article'
import { CollectOption } from '../platform'
import { PLATFORM_CODE } from '../enums'

export interface PlatformInterface {
  collect(collectOption: CollectOption): Promise<Article[]>
}

export interface TermInterface {
  hour: number
  day: number
}

export interface SearchOptionInterface {
  keyword: string
  term?: TermInterface
  platform?: PLATFORM_CODE
}
