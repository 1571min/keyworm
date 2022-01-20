## KEYWORM
---
> 키워드가 들어간 컨텐츠를 크롤링 해주는 어플리케이션

* ...

## Usage
```js
const keyworm = require('keyworm')

const articles = keyworm.search('google', '')

// => using articles
console.log(articles)
```

## Article Entity
``` js
const t = {
  // article 의 고유값
  id: 1,
  
  // 수집한 플랫폼의 고유 코드 
  palaformCode: 'NAVER',

  // 수집한 article의 키워드
  keyword: '삼성전자',

  // article 출처
  resource: {
    type: 'url',
    url: '기사 원문 URL'
  },

  // article 내용
  contents: {
    title: '기사 제목 타이틀'
  },

  // 수집한 당시에 article의 hash
  hash: {
    resource: '67aa22ea70069612a573d0a572a7c93c',
    contents: 'c95983cde4efbb5caa1fd3ba23ae599a'
  }
}
```


## API
```js
const keyworm = require('keyworm')
```
---------------------------------
</br>


`keyworm.search()`

__Params__ 
* keyword: `string`,
* platformCode: `string` (default all platform),
* termDays: `string` (default last 1 day)

__Returns__ 
* `article[]`

__Example__
```js
keyworm.search({
    keyword: 'apple',
    platform: PLATFORM_CODE.NAVER,
    termDays: 1
})
```
</br>

---------------------------------

* 추후 추가 구현
    * news 페이지 이외에 서비스에서 조회 가능하도록 옵션 추가
* 참조 깃헙
    * https://github.com/dylang/shortid
