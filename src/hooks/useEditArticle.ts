import { useGetArticlesOneQuery } from '../redux/ArticlesApi/api';
interface ArticleData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
export const useEditArticle = (slug?: string) => {
  const { data, isLoading } = useGetArticlesOneQuery({ slug }, { skip: !slug });

  return {
    defaultValues: {
      title: data?.article.title || '',
      description: data?.article.description || '',
      body: data?.article.body || '',
      tagList: data?.article.tagList || [],
    } as ArticleData,
    isLoading,
  };
};
