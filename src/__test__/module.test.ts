import { search } from '..'
import { PLATFORM_CODE } from '../platform'

describe('search', () => {
  it('naver', async () => {
    const result = await search(PLATFORM_CODE.NAVER_NEWS, 'test', 1)
    expect(result.length).toBeGreaterThan(0)
  }, 600000)
})
