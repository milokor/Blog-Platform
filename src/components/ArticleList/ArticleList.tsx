import { Link } from 'react-router-dom';
import { notification, Pagination, Spin } from 'antd';
import {
  useDeleteFavoriteAnArticleMutation,
  useFavoriteAnArticleMutation,
  useGetArticlesQuery,
} from '../../redux/ArticlesApi/api';
import style from './ArticleList.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setCurrentPage } from '../../redux/ArticleSlice/ArticleSlice';
import { dateParse } from '../../utils/dateParse';
import { Liked } from '../UI/Icon/Liked';
import { NoLiked } from '../UI/Icon/noLiked';
import { IUnauthorizedError } from '../../types/type';
export const ArticleList = () => {
  const [favoriteAnArticle] = useFavoriteAnArticleMutation();
  const [deleteFavoriteAnArticle] = useDeleteFavoriteAnArticleMutation();
  const [api, contextHolder] = notification.useNotification();
  const page = useAppSelector((state) => state.article);
  const { mainPage, pageSize } = page;
  const { data, isLoading } = useGetArticlesQuery({ mainPage, pageSize });
  const dispatch = useAppDispatch();
  const handleClick = async (slug: string, favorited: boolean) => {
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
      {contextHolder}
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        data?.articles.map((art) => {
          return (
            <div className={style.container} key={art.slug}>
              <div className={style.containerTop}>
                <div className={style.titleLikedTagContainer}>
                  <div className={style.titleLikedContainer}>
                    <Link to={`/articles/${art.slug}`} className={style.title}>
                      {art.title}
                    </Link>
                    <button
                      type="button"
                      className={style.liked}
                      onClick={() => handleClick(art.slug, art.favorited)}
                    >
                      {art.favorited ? <Liked /> : <NoLiked />}
                      <span className={style.like}>{art.favoritesCount}</span>
                    </button>
                  </div>
                  <div className={style.titleTagContainer}>
                    <div className={style.tag}>
                      {art.tagList === null
                        ? art.tagList || []
                        : art.tagList.map((t, index) => {
                            return (
                              <span key={`${art.slug}-${t}-${index}`} className={style.tagName}>
                                {t}
                              </span>
                            );
                          })}
                    </div>
                  </div>
                </div>
                <div className={style.profileContainer}>
                  <div className={style.leftBlock}>
                    <span className={style.name}>{art.author.username}</span>
                    <span className={style.date}>{dateParse(art.createdAt)}</span>
                  </div>
                  <img src={art.author.image} alt="profile" />
                </div>
              </div>
              <div className={style.bottomContainer}>
                <p className={style.description}>{art.description}</p>
              </div>
            </div>
          );
        })
      )}
      {!isLoading && (
        <div className={style.paginationContainer}>
          <Pagination
            align="center"
            current={Math.floor(mainPage / pageSize) + 1}
            onChange={(page, pageSize) => {
              const newPage = page - 1;
              dispatch(
                setCurrentPage({
                  mainPage: newPage * pageSize,
                  pageSize,
                }),
              );
            }}
            total={data?.articlesCount}
            pageSize={pageSize}
          />
        </div>
      )}
    </>
  );
};
