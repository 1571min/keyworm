## KEYWORM
---
> 키워드가 들어간 기사를 수집하여 제공합니다. 

## Usage
```js
const keyworm = require('keyworm')

const articles = await keyworm.search('NAVER', '')

// => using articles
console.log(articles)
```

## Article Entity
``` js
const article = {
  // article 객체 hash
  hash: 'a13b3c3fceae23afcdbd98c2fa862817'

  // 수집한 플랫폼 
  palaformCode: 'NAVER',

  // 수집한 article의 키워드
  keyword: '삼성전자',

  // article 출처, resource hash 정보
  resource: {
      url: 'https://www.hankyung.com/economy/article/2022012032891',
      hash: 'a13b3c3fceae23afcdbd98c2fa862817'
  }

  // article 내용, resource hash 정보 
  content: {
      title: "SPC삼립 '제빵왕' 넘어 종합푸드社 도전",
      hash: '3e4c4d9284b31dc011ec9e5030bdb9cc'
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
* platformCode: `string` (default all platform) (현재 NAVER 만 지원),
* termDays: `string` (default last 1 day)

__Returns__ 
* `Promise<Article[]>`

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
    * resource 내부 내용을 parsing 해서 제공
* 참조 깃헙
    * https://github.com/dylang/shortid
