import { search } from '..'
import { PLATFORM_CODE } from '../platform'

describe('search', () => {
  it('NAVER_VIEW', async () => {
    const result = await search({
      platform: PLATFORM_CODE.NAVER_VIEW,
      keyword: '삼성전자',
      termDay: 1
    })
    expect(result.length).toBeGreaterThan(0)
  }, 600000)

  it('NAVER_NEWS', async () => {
    const result = await search({
      platform: PLATFORM_CODE.NAVER_NEWS,
      keyword: '삼성전자',
      termDay: 1
    })
    expect(result.length).toBeGreaterThan(0)
  }, 600000)
})
