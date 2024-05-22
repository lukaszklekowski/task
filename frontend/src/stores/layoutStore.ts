import { defineStore } from 'pinia';
import {
  editArticle,
  fetchArticles,
  deleteArticle,
  addArticle,
} from '../api/article';
import { Article } from 'src/api/article';

export type UserData = {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
};
export type ArticlesStore = {
  articles: Article[];
};

export const useArticlesStore = defineStore('articleStore', {
  state: (): ArticlesStore => {
    return {
      articles: [],
    };
  },
  getters: {
    getArticles: (state) => state.articles,
  },
  actions: {
    async loadArticles() {
      const response = await fetchArticles();
      this.articles = response;
    },
    async editArticle(data: Article) {
      await editArticle(data.articleId, data);
    },
    async createArticle(data: Omit<Article, 'articleId'>) {
      await addArticle(data);
    },
    async deleteArticle(articleId: number) {
      await deleteArticle(articleId);
    },
  },
});
