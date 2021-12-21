테이블
platform
* name
* cotentsUrl
* executedAt

article
* platformSeq
* title
* url
* archiveHTML
* createdAt
* updatedAt

필요서비스
* API
    * 기사 조회
        * params (flatformSeq, 없으면 모든 flatform 조회)    
* BATCH
    * 최근 1일 동안의 데이터만 수집
    * 수집된 데이터 중복 여부 체크
    

(추후 추가 구현)
* API
    * keyword 등록
        * params : keyword, batchSchadule, platform
    * keyword 삭제
        * params : keyword, platformSeq
        
