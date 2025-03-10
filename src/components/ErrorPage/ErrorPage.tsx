import { Alert } from 'antd';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 100,
        gap: 10,
      }}
    >
      <Alert message={'An unexpected error occurred'} type={'error'} />

      <Link to={'/'}>Вернуться назад</Link>
    </div>
  );
};
