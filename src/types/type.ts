export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    image: string;
    following: boolean;
  };
}
export interface ArticleGet {
  article: Article;
}

export interface articlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface Iform {
  email: string;
  password: string;
}

export interface IformSignIn extends Iform {
  username: string;
  repeatPassword: string;
  agreeTerms: boolean;
}

export interface IformEditProfile {
  username: string;
  email: string;
  password: string;
  image?: string;
}

export interface IProfileEditor {
  user: {
    username: string;
    email: string;
    password: string;
    avatarImage?: string;
  };
}
export interface IRegisterInfo {
  user: {
    email: string;
    password: string;
    username: string;
  };
}
export interface ILoginUser {
  user: {
    email: string;
    image: string;
    token: string;
    username: string;
  };
}

export interface ServerError {
  data?: {
    errors?: {
      username?: string;
      email?: string;
    };
  };
}

export interface ILoginInfo {
  user: {
    email: string;
    password: string;
  };
}

export interface IRegisterGetInfo {
  user: {
    email: string;
    token: string;
    password: string;
  };
}
export interface IProfileInfo {
  profile: {
    following: boolean;
    username: string;
    image: string;
  };
}

export interface ICreateArticle {
  body: string;
  description: string;
  tagList: string[];
  title: string;
}

export interface ICreateApiArticle {
  article: {
    body: string;
    description: string;
    tagList: string[];
    title: string;
  };
}

export interface IError {
  data: string;
  error: string;
  originalStatus: number;
  status: string;
}

export interface IUpdateArticle extends ICreateApiArticle {
  slug: string | undefined;
}

export type CreateProps = {
  name: string;
};

export interface IUnauthorizedError {
  data: {
    errors: {
      message: string;
      error: {
        code: string;
        inner: {
          message: string;
          name: string;
        };
        message: string;
        name: string;
        status: number;
      };
    };
  };
  status: number;
}
export type keyIformSignIn = keyof IformSignIn;
