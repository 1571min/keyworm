import { search, PLATFORM_CODE } from '../src'

describe('search', () => {
  it('naver', async () => {
    const result = await search('test', PLATFORM_CODE.NAVER, 1)
    expect(result.length).toBeGreaterThan(0)
  }, 600000)
})
