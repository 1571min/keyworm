## KEYWORM
---
> 키워드가 들어간 컨텐츠

* ...

## Usage
```js
const keyworm = require('keyworm')

const articles = await keyworm.search('NAVER', '')

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
(async () => {
    const keyworm = require('keyworm')
    const result = await keyworm.search('쿠팡','NAVER', 1)
    console.log(result)
})()

/*
[
  Article {
    hash: '6d813453a2f2e1c22310d649e74cec72',
    keyword: '쿠팡',
    resource: {
      url: 'https://www.hankyung.com/economy/article/2022012032891',
      hash: 'a13b3c3fceae23afcdbd98c2fa862817'
    },
    content: {
      title: "SPC삼립 '제빵왕' 넘어 종합푸드社 도전",
      hash: '3e4c4d9284b31dc011ec9e5030bdb9cc'
    }
  }, ...
]
*/

```
</br>

---------------------------------

* 추후 추가 구현
    * news 페이지 이외에 서비스에서 조회 가능하도록 옵션 추가
* 참조 깃헙
    * https://github.com/dylang/shortid
