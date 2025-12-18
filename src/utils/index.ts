/**
 * 날짜를 지정된 형식의 문자열로 변환합니다.
 * @param separator 구분자 (예: '.', '-', '')
 * @param year 연도
 * @param month 월
 * @param day 일
 * @returns 형식화된 날짜 문자열
 */
export const createDateFormat = (
  separator = '',
  year: number,
  month: number,
  day: number
): string => {
  const paddedMonth = ('00' + month.toString()).slice(-2)
  const paddedDay = ('00' + day.toString()).slice(-2)
  return `${year}${separator}${paddedMonth}${separator}${paddedDay}`
}

/**
 * 크롤링 관련 상수
 */
export const CRAWL_CONFIG = {
  /** 병렬 처리 시 한 번에 처리할 페이지 수 */
  PARALLEL_COUNT: 20,
  /** 최대 페이지 수 */
  MAX_PAGES: 400,
  /** 페이지당 결과 수 */
  RESULTS_PER_PAGE: 10
} as const
