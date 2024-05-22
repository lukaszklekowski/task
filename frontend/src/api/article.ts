import {
  data,
  addMockedArticle,
  editMockedArticle,
  deleteMockedArticle,
} from '../mocks/mocks';
export interface LoginResponse {
  authorization: string;
}

export interface Article {
  articleId: number;
  title: string;
  content: string;
}

export async function fetchArticles(): Promise<Article[]> {
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await delay(1000);
  return data;
}

export async function addArticle(data: Omit<Article, 'articleId'>): Promise<void> {
  // await getCrudifulAxios().post<
  //     null,
  //     AxiosResponse<void>
  // >('/articles', data);
  addMockedArticle(data);
  return;
}

export async function editArticle(
  articleId: number,
  data: Article
): Promise<void> {
  // await getCrudifulAxios().put<
  //     null,
  //     AxiosResponse<void>
  // >(`/articles/${articleId}`, data);
  editMockedArticle(articleId, data);
  return;
}

export async function deleteArticle(articleId: number): Promise<void> {
  deleteMockedArticle(articleId);
  // await getCrudifulAxios().delete<
  //     null,
  //     AxiosResponse<void>
  // >(`/articles/${articleId}`);
  return;
}
