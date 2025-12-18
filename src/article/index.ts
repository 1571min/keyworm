import md5 from 'md5'
import { PLATFORM_CODE } from '../enums'

export interface ResourceInterface {
  url: string
  hash: string
}

export interface ContentInterface {
  title: string
  hash: string
}

export interface HashInterface {
  resource: string
  content: string
}

type Hashable = ResourceInterface | ContentInterface | Article

const getHash = <T extends Hashable>(obj: T): string => {
  const cpy = JSON.parse(JSON.stringify(obj)) as Record<string, unknown>
  delete cpy.hash
  try {
    const js = JSON.stringify(cpy)
    return md5(js)
  } catch {
    return ''
  }
}

export class Article {
  hash: string
  platformCode: PLATFORM_CODE
  keyword: string
  resource: ResourceInterface
  content: ContentInterface

  constructor(platformCode: PLATFORM_CODE = PLATFORM_CODE.ALL) {
    this.platformCode = platformCode
    this.hash = ''
    this.keyword = ''
    this.resource = { url: '', hash: '' }
    this.content = { title: '', hash: '' }
  }

  setKeyword = (keyword: string) => {
    this.keyword = keyword
    this.hash = getHash(this)
  }
  setResource = (url: string) => {
    this.resource.url = url
    this.resource.hash = getHash(this.resource)
  }
  setContent = (title: string) => {
    this.content.title = title
    this.content.hash = getHash(this.content)
  }
}
