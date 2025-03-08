import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './ArticlePages.module.scss';
import { Button, Tooltip, Popconfirm, notification, Spin } from 'antd';
import {
  useDeleteArticleMutation,
  useDeleteFavoriteAnArticleMutation,
  useFavoriteAnArticleMutation,
  useGetArticleQuery,
} from '../../redux/ArticlesApi/api';
import Markdown from 'markdown-to-jsx';
import { dateParse } from '../../utils/dateParse';
import { useAppSelector } from '../../redux/store';
import { IError, IUnauthorizedError } from '../../types/type';
import { Liked } from '../../components/UI/Icon/Liked';
import { NoLiked } from '../../components/UI/Icon/noLiked';
export const ArticlePages = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.users.auth);
  const [deleteArticle] = useDeleteArticleMutation();
  const [favoriteAnArticle] = useFavoriteAnArticleMutation();
  const [deleteFavoriteAnArticle] = useDeleteFavoriteAnArticleMutation();
  const { data, isLoading } = useGetArticleQuery({ title }, { skip: !title });
  const [api, contextHolder] = notification.useNotification();
  const onDeleteArticle = async (slug: string | undefined): Promise<void> => {
    try {
      await deleteArticle({ slug: slug }).unwrap();
      navigate('/');
    } catch (error) {
      const err = error as IError;
      if (err.originalStatus === 403) {
        api.error({
          key: 'create-error403',
          message: 'Это не ваша статья, вы не можете ее удалять',
        });
      }
    }
  };
  const handleClick = async (slug: string | undefined, favorited: boolean | undefined) => {
    try {
      if (favorited) {
        await deleteFavoriteAnArticle({ slug }).unwrap();
      } else {
        await favoriteAnArticle({ slug }).unwrap();
      }
    } catch (error) {
      const err = error as IUnauthorizedError;
      if (err.status === 401) {
        api.error({
          key: 'auth-error',
          message: 'Вам нужно авторизоваться',
          duration: 3,
        });
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={style.container}>
          {contextHolder}
          <div className={style.containerTop}>
            <div className={style.titleLikedTagContainer}>
              <div className={style.titleLikedContainer}>
                <p className={style.title}>{data?.article.title}</p>
                <button
                  type="button"
                  className={style.liked}
                  onClick={() => handleClick(data?.article.slug, data?.article.favorited)}
                >
                  {data?.article.favorited ? <Liked /> : <NoLiked />}
                  <span className={style.like}>{data?.article.favoritesCount}</span>
                </button>
              </div>
              <div className={style.titleTagContainer}>
                <div className={style.tag}>
                  {data?.article.tagList === null
                    ? data?.article.tagList || []
                    : data?.article.tagList.map((t, index) => {
                        if (t === null) {
                          return;
                        }
                        return (
                          <span
                            key={`${data?.article.slug}-${t}-${index}`}
                            className={style.tagName}
                          >
                            {t}
                          </span>
                        );
                      })}
                </div>
              </div>
            </div>
            <div className={style.profileContainer}>
              <div className={style.leftBlock}>
                <span className={style.name}>{data?.article.author.username}</span>
                <span className={style.date}>{dateParse(data?.article.createdAt)}</span>
              </div>
              <img src={data?.article.author.image} alt="profile" />
              <div className={style.buttonContainer}>
                <Tooltip title={auth ? 'Delete' : 'Need authorization'}>
                  <Popconfirm
                    title="Are you sure to delete this article?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => onDeleteArticle(title)}
                  >
                    <Button danger disabled={!auth}>
                      Delete
                    </Button>
                  </Popconfirm>
                </Tooltip>
                <Link to={`/articles/${title}/edit`}>
                  <Tooltip title={auth ? 'Edit' : 'Need authorization'}>
                    <Button type="primary" style={{ backgroundColor: '#52c41a' }} disabled={!auth}>
                      Edit
                    </Button>
                  </Tooltip>
                </Link>
              </div>
            </div>
          </div>
          <div className={style.bottomContainer}>
            <p className={style.description}>{data?.article.description}</p>
          </div>
          <div className={style.markdownContainer}>
            <Markdown>{data?.article.body ?? ''}</Markdown>
          </div>
        </div>
      )}
    </>
  );
};
