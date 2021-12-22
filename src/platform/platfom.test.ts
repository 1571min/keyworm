import { PLAFORM_CODE, Platform, PlatformFactory } from './plaform'

describe('[Unit] Platform', () => {
  it('PlatformFactory generate plaform', () => {
    const naver = PlatformFactory.generatePlatform(PLAFORM_CODE.NAVER)
    expect(naver instanceof Platform).toBe(true)
  })
})
