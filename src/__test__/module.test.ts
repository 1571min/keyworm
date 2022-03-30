import { search } from '..'
import { PLATFORM_CODE } from '../platform'

describe('search', () => {
  it('NAVER_NEWS', async () => {
    const result = await search({
      platform: PLATFORM_CODE.NAVER_NEWS,
      keyword: '삼성전자',
      term: {
        hour: 0,
        day: 1
      }
    })
    expect(result.length).toBeGreaterThan(0)
    console.log(result.length)
  }, 600000)

  it('NAVER_VIEW_ALL', async () => {
    const result = await search({
      platform: PLATFORM_CODE.NAVER_VIEW_ALL,
      keyword: '주식',
      term: {
        hour: 0,
        day: 1
      }
    })
    expect(result.length).toBeGreaterThan(0)
    console.log(result.length)
  }, 600000)

  it('NAVER_VIEW_CAFE', async () => {
    const result = await search({
      platform: PLATFORM_CODE.NAVER_VIEW_CAFE,
      keyword: '주식',
      term: {
        hour: 0,
        day: 1
      }
    })
    expect(result.length).toBeGreaterThan(0)
    console.log(result.length)
  }, 600000)

  it('NAVER_VIEW_BLOG', async () => {
    const result = await search({
      platform: PLATFORM_CODE.NAVER_VIEW_BLOG,
      keyword: '주식',
      term: {
        hour: 0,
        day: 1
      }
    })
    expect(result.length).toBeGreaterThan(0)
    console.log(result.length)
  }, 600000)
})
