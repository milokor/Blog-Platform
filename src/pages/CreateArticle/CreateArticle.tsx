import { Controller, useForm } from 'react-hook-form';
import { Button, Form, Input, notification, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate, useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { CreateProps, ICreateArticle, IError } from '../../types/type';
import {
  useCreateArticleMutation,
  useEditArticleMutation,
} from '../../redux/ArticlesApi/articlesApi';
import style from './CreateArticle.module.scss';
import { useEditArticle } from '../../hooks/useEditArticle';

export const CreateArticle: FC<CreateProps> = ({ name }) => {
  const [createArticle] = useCreateArticleMutation();
  const [editArticle] = useEditArticleMutation();
  const [api, contextHolder] = notification.useNotification();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { defaultValue, isLoading } = useEditArticle(slug);
  const [error, setError] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<ICreateArticle>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: [''],
    },
  });
  useEffect(() => {
    if (defaultValue && !isLoading) {
      reset({
        ...defaultValue,
        tagList: defaultValue.tagList.length > 0 ? defaultValue.tagList : [''],
      });
    }
  }, [reset, isLoading]);
  useEffect(() => {
    if (name === 'Create new article') {
      reset({
        title: '',
        description: '',
        body: '',
        tagList: [''],
      });
    }
  }, [name]);
  useEffect(() => {
    if (error) {
      api.error({
        key: 'create-error',
        message: 'An unexpected error occurred, please try again.',
        onClose: () => setError(false),
      });
    }
    return () => api.destroy('create-error');
  }, [error, api]);

  const onSubmit = async (data: ICreateArticle) => {
    if (name === 'Edit article') {
      try {
        await editArticle({
          article: { ...data },
          slug,
        }).unwrap();
        navigate('/');
      } catch (error) {
        const err = error as IError;
        if (err.originalStatus === 403) {
          api.error({
            key: 'create-error403',
            message: "It's not your article, you can't change it",
          });
        }
      }
    } else {
      try {
        await createArticle({ article: { ...data } }).unwrap();
        navigate('/');
      } catch (error) {
        setError(true);
      }
    }
  };
  const handleTagRemove = (removeFn: (index: number) => void, index: number) => {
    removeFn(index);
    const currentTags = getValues('tagList');
    const newTags = currentTags.filter((_: any, i: number) => i !== index);
    setValue('tagList', newTags);
  };
  return (
    <>
      {isLoading ? (
        <div className={style.spinner}>
          <Spin />
        </div>
      ) : (
        <div className={style.container}>
          {contextHolder}
          <h2 className={style.title}>{name}</h2>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item
              label="Title"
              validateStatus={errors.title ? 'error' : ''}
              help={errors.title ? errors.title?.message : ''}
            >
              <Controller
                name="title"
                control={control}
                rules={{ required: 'The field must not be empty' }}
                render={({ field }) => <Input {...field} placeholder="Title" />}
              />
            </Form.Item>
            <Form.Item
              label="Short description"
              validateStatus={errors.description ? 'error' : ''}
              help={errors.description ? errors.description?.message : ''}
            >
              <Controller
                name="description"
                control={control}
                rules={{ required: 'The field must not be empty' }}
                render={({ field }) => <Input {...field} placeholder="Title" />}
              />
            </Form.Item>
            <Form.Item
              label="Text"
              validateStatus={errors.body ? 'error' : ''}
              help={errors.body ? errors.body?.message : ''}
            >
              <Controller
                name="body"
                control={control}
                rules={{ required: 'The field must not be empty' }}
                render={({ field }) => (
                  <TextArea {...field} placeholder="Text" style={{ height: 168, resize: 'none' }} />
                )}
              />
            </Form.Item>

            <Form.List
              name="tagList"
              initialValue={defaultValue.tagList.length === 0 ? [''] : defaultValue.tagList}
            >
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {fields.map(({ key }, index) => {
                    const error = errors.tagList?.[index];
                    return (
                      <Form.Item
                        label={index === 0 ? 'Tags' : ''}
                        key={key}
                        style={{ marginBottom: 0 }}
                        validateStatus={error ? 'error' : ''}
                        help={error?.message || ''}
                      >
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Controller
                            name={`tagList.${index}`}
                            control={control}
                            rules={{
                              required: 'Must be 2 characters or more',
                              minLength: {
                                value: 2,
                                message: 'Must be 2 characters or more',
                              },
                            }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Tag"
                                style={{ width: 300, height: 40 }}
                              />
                            )}
                          />
                          <div style={{ display: 'flex', gap: 8 }}>
                            {fields.length > 1 && (
                              <Button
                                type="link"
                                className={style.buttonDelete}
                                danger
                                onClick={() => handleTagRemove(remove, index)}
                              >
                                Delete
                              </Button>
                            )}
                            {index === fields.length - 1 && (
                              <Button
                                type="link"
                                className={style.buttonAdd}
                                onClick={() => add('')}
                              >
                                Add tag
                              </Button>
                            )}
                          </div>
                        </div>
                      </Form.Item>
                    );
                  })}
                </div>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: 120, marginTop: 20 }}>
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};
