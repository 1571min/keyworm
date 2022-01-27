import { search } from '..'
import { PLATFORM_CODE } from '../platform'

describe('search', () => {
  it('naver', async () => {
    const result = await search(PLATFORM_CODE.NAVER_VIEW, '삼성전자', 1)
    console.log(result)
    console.log(result.length)
    expect(result.length).toBeGreaterThan(0)
  }, 600000)
})
