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
      <Alert message={'Возникла непредвиденная ошибка'} type={'error'} />
      <Link to={'/'}>Вернуться назад</Link>
    </div>
  );
};
