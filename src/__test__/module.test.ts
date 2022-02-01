import { search } from '..'
import { PLATFORM_CODE } from '../platform'

describe('search', () => {
  it('NAVER_NEWS', async () => {
    const result = await search({
      platform: PLATFORM_CODE.NAVER_NEWS,
      keyword: '삼성전자',
      termDay: 1
    })
    expect(result.length).toBeGreaterThan(0)
  }, 600000)

  it('NAVER_VIEW_ALL', async () => {
    const result = await search({
      platform: PLATFORM_CODE.NAVER_VIEW_ALL,
      keyword: 'KG89',
      termDay: 10
    })
    expect(result.length).toBeGreaterThan(0)
  }, 600000)

  it('NAVER_VIEW_CAFE', async () => {
    const result = await search({
      platform: PLATFORM_CODE.NAVER_VIEW_CAFE,
      keyword: 'KG89',
      termDay: 10
    })
    expect(result.length).toBeGreaterThan(0)
  }, 600000)

  it('NAVER_VIEW_BLOG', async () => {
    const result = await search({
      platform: PLATFORM_CODE.NAVER_VIEW_BLOG,
      keyword: 'KG89',
      termDay: 10
    })
    expect(result.length).toBeGreaterThan(0)
  }, 600000)
})
