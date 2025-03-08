import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
export const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
