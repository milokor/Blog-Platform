import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import { ArticleList } from './components/ArticleList/ArticleList';
import { ArticlePages } from './pages/ArticlePages/ArticlePages';
import { CreateArticle } from './pages/CreateArticle/CreateArticle';
import { EditProfile } from './pages/EditProfile/EditProfile';
import { SignIn } from './pages/Sign-in/Sign-in';
import { SignUp } from './pages/Sign-up/Sign-up';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { ProtectedRoute } from './ProtectedRouter';
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ArticleList />,
      },
      {
        path: '/articles',
        element: <ArticleList />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/articles/:title',
        element: <ArticlePages />,
      },
      {
        path: '/new-article',
        element: (
          <ProtectedRoute>
            <CreateArticle name="Create new article" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/articles/:slug/edit',
        element: (
          <ProtectedRoute>
            <CreateArticle name="Edit article" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
