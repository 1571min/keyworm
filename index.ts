type resource_type =  'URL'
interface ResourceInterface { type: resource_type ; [key: string]: any }
interface HashInterface { resource: string; content: string } 

class Article {
    id: number = 1
    platformCode: string = 'ALL'
    keyword: string = ''
    resource: ResourceInterface = {type:'URL', url: ''}
    hash: HashInterface = {resource: '', content: ''}
}

class ArticleFactory {
    static  createArticle (keyword: string, resource :ResourceInterface, title: string): Article {
        const article  = new Article()
        article.keyword = keyword
        article.resource.url = 'url'
        return article
    }
}
const search =  (keyword: string, platformCode: string, term: string) => {
    const url = ''
    const title = ''

    return ArticleFactory.createArticle('삼성전자', {type: 'URL', url}, title)
}
export  {search}