import { search } from '..'
import { PLATFORM_CODE } from '../platform'

describe('search', () => {
  it('naver', async () => {
    const result = await search('test', PLATFORM_CODE.NAVER, 1)
    expect(result.length).toBeGreaterThan(0)
  }, 600000)
})
