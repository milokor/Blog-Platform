import { Link } from 'react-router-dom';
import { notification, Pagination, Spin } from 'antd';
import {
  useDeleteFavoriteAnArticleMutation,
  useFavoriteAnArticleMutation,
  useGetArticlesQuery,
} from '../../redux/ArticlesApi/api';
import style from './ArticleList.module.scss';
import { nanoid } from '@reduxjs/toolkit';
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

  const handleClick = async (slug: string, favorited: boolean) => {
    if (favorited) {
      try {
        await deleteFavoriteAnArticle({ slug }).unwrap();
      } catch (error) {
        const err = error as IUnauthorizedError;
        if (err.status === 401) {
          api.error({
            key: 'create-error401',
            message: 'Вам нужно авторизоваться',
            duration: 3,
            showProgress: true,
          });
        }
      }
    } else {
      try {
        await favoriteAnArticle({ slug }).unwrap();
      } catch (error) {
        const err = error as IUnauthorizedError;
        if (err.status === 401) {
          api.error({
            key: 'create-error401',
            message: 'Вам нужно авторизоваться',
            duration: 3,
            showProgress: true,
          });
        }
      }
    }
  };
  const { data, isLoading } = useGetArticlesQuery({ mainPage, pageSize });
  const dispatch = useAppDispatch();
  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        data?.articles.map((art) => {
          return (
            <>
              {contextHolder}
              <div className={style.container} key={nanoid()}>
                <div className={style.containerTop}>
                  <div className={style.titleLikedTagContainer}>
                    <div className={style.titleLikedContainer}>
                      <Link key={nanoid()} to={`/articles/${art.slug}`} className={style.title}>
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
                        {art.tagList.map((t) => {
                          return (
                            <span key={nanoid()} className={style.tagName}>
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
            </>
          );
        })
      )}
      {isLoading ? (
        <Spin />
      ) : (
        <div className={style.paginationContainer}>
          <Pagination
            align="center"
            onChange={(page, pageSize) => {
              const pageCurrent =
                page === 1 ? { mainPage: 0, pageSize } : { mainPage: page * pageSize, pageSize };
              dispatch(setCurrentPage(pageCurrent));
            }}
            total={data?.articlesCount}
            defaultPageSize={20}
          />
        </div>
      )}
    </>
  );
};
