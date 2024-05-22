import { Article } from 'src/api/article';

let data = [
  { articleId: 1, title: 'Title', content: 'XD' },
  { articleId: 2, title: 'Title 2', content: 'XD 2' },
];
let counter = 2;

function addCounter() {
  counter += 1;
}

function addMockedArticle(article: Omit<Article, 'articleId'>) {
  addCounter();
  data.push({ articleId: counter, ...article });
  data = [...data];
}

function deleteMockedArticle(id: number) {
  data = data.filter((e) => e.articleId != id);
}

function editMockedArticle(id: number, article: Article) {
  data = data.filter((e) => e.articleId != id);
  data.push(article);
}
export { data, addMockedArticle, deleteMockedArticle, editMockedArticle };
