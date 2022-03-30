## KEYWORM
> 키워드가 들어간 컨텐츠를 수집하여 제공합니다. 

## Usage
```js
const keyworm = require('keyworm')

const articles = await keyworm.search({ 
  platform: 'NAVER_NEWS',
  keyword: '쿠팡',
  term : {
    hour: 0,
    day: 1
  }
})

// => using articles
console.log(articles)
```

## Article Entity
``` js
const article = {
  // article 객체 hash
  hash: 'a13b3c3fceae23afcdbd98c2fa862817'

  // 수집한 플랫폼 
  palaformCode: 'NAVER_NEWS',

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


## keyworm.search()

`search option`
```js
{
  //required
  platform : 'NAVER_NEWS',
  
  //required
  keyword : '쿠팡',   // 컨텐츠를 수집 할 때 사용하는 검색어를 의미합니다.
    
  //optional default day=1  
  term : {           // 컨텐츠 작성 기간에 대한 옵셥입니다
    hour: 0,          // 시간 설정 추후 지원 예정
    day: 1
  }
}
```

__Returns__ 
* `Promise<Article[]>`

__Example__
```js
(async () => {
    const keyworm = require('keyworm')
    const result = await keyworm.search({
      platform: 'NAVER_NEWS',
      keyword: '쿠팡',
      term: {
        hour: 0,
        day: 1
      })
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

### 추후 지원 플랫폼

|**플랫폼**|**지원 유무**|
|:-------:|:-------:|
| [NAVER_NEWS](https://search.naver.com/search.naver?where=news&sm=tab_jum&query=apple) | o |
| [NAVER_VIEW_ALL](https://search.naver.com/search.naver?where=view&sm=tab_jum&query=apple) | o |
| [NAVER_VIEW_CAFE](https://search.naver.com/search.naver?where=cafe&query=apple&srchby=text) | o |
| [NAVER_VIEW_BLOG](https://search.naver.com/search.naver?where=blog&query=apple) | x |
| [GOOGLE_NEWS](https://www.google.com/search?q=apple&tbm=nws) | x |
| GOOGLE_YOUTUBE | x |
| META | x |
| INSTAGRAM | x |
| TWITTER | x |

---------------------------------

### 추후 추가 구현
* 컨텐츠 내부 내용 제공
