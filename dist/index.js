"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
class Article {
    constructor() {
        this.id = 1;
        this.platformCode = 'ALL';
        this.keyword = '';
        this.resource = { type: 'URL', url: '' };
        this.hash = { resource: '', content: '' };
    }
}
class ArticleFactory {
    static createArticle(keyword, resource, title) {
        const article = new Article();
        article.keyword = keyword;
        article.resource.url = 'url';
        return article;
    }
}
const search = (keyword, platformCode, term) => __awaiter(void 0, void 0, void 0, function* () {
    const url = '';
    const title = '';
    return ArticleFactory.createArticle('삼성전자', { type: 'URL', url }, title);
});
exports.search = search;
