'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './AddEditToolForm.module.css';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CategorySelect from '../ToolsPage/FilterBar/Dropdowns/CategorySelect';
import { createTool, updateTool, getCategories } from '@/lib/api/clientApi';

type Props = {
  initialData?: any;
  isEditMode?: boolean;
};

type FormValues = {
  name: string;
  pricePerDay: string | number;
  category: string;
  rentalTerms: string;
  description: string;
  specifications: string;
  photo: File | string | null;
};

export default function AddEditToolForm({
  initialData,
  isEditMode = false,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialData?.photo || '');
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(
    Boolean(initialData?.photo)
  );
  const [categories, setCategories] = useState<
    { _id: string; title: string }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        toast.error('Помилка під час завантаження категорій');
      }
    };

    fetchCategories();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Мінімум 3 символи')
      .max(96, 'Максимум 96 символів')
      .required('Обовʼязкове поле'),

    pricePerDay: Yup.number()
      .min(0, 'Ціна не може бути відʼємною')
      .required('Обовʼязкове поле'),

    category: Yup.string().required('Оберіть категорію'),

    description: Yup.string()
      .min(20, 'Мінімум 20 символів')
      .max(2000, 'Максимум 2000 символів')
      .required('Додайте опис'),

    rentalTerms: Yup.string()
      .min(20, 'Мінімум 20 символів')
      .max(1000, 'Максимум 1000 символів')
      .required('Додайте умови оренди'),

    specifications: Yup.string()
      .required('Додайте характеристики')
      .max(1000, 'Характеристики не можуть перевищувати 1000 символів')
      .test(
        'spec-format',
        'Формат: "Назва: значення" (кожен рядок з двокрапкою). Напр.: "Вага: 7кг"',
        value => {
          if (!value) return false;

          const lines = value
            .split('\n')
            .map(l => l.trim())
            .filter(Boolean);

          return lines.every(line => {
            const parts = line.split(':');
            if (parts.length !== 2) return false;

            const key = parts[0].trim();
            const val = parts[1].trim();

            const keyOk = /^[\p{L}\d][\p{L}\d\s-]{1,}$/u.test(key);

            const valOk = /^[\p{L}\d][\p{L}\d\s.,+\-/%()]{0,}$/u.test(val);

            return keyOk && valOk;
          });
        }
      ),

    photo: Yup.mixed().required('Додайте фото інструменту'),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      name: initialData?.name || '',
      pricePerDay: initialData?.pricePerDay || '',
      category: initialData?.category || '',
      rentalTerms: initialData?.rentalTerms || '',
      description: initialData?.description || '',
      specifications: initialData?.specifications || '',
      photo: initialData?.photo || null,
    },
    enableReinitialize: true,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async values => {
      setIsLoading(true);

      try {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          if (key === 'photo' && value instanceof File) {
            formData.append('image', value);
          } else if (key === 'photo') {
            if (value) formData.append('imageUrl', String(value));
          } else if (value !== null && value !== undefined) {
            formData.append(key, String(value));
          }
        });

        const toolId = initialData?._id || initialData?.id;

        const result = isEditMode
          ? await updateTool({ toolId, formData })
          : await createTool(formData);

        const idToGo = result.data._id || toolId;

        toast.success(
          isEditMode ? 'Оновлено успішно!' : 'Інструмент опубліковано!'
        );
        router.replace(`/tools/${idToGo}`);
      } catch (error) {
        toast.error('Сталася помилка. Спробуйте ще раз.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const showError = (field: keyof FormValues) =>
    (formik.touched[field] || formik.submitCount > 0) &&
    Boolean(formik.errors[field]);

  const errorText = (field: keyof FormValues) =>
    showError(field) ? String(formik.errors[field]) : '';

  const inputClass = (field: keyof FormValues) =>
    `${css.input} ${showError(field) ? css.error : ''}`;

  const textareaClass = (field: keyof FormValues) =>
    `${css.textarea} ${showError(field) ? css.error : ''}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    formik.setFieldTouched('photo', true, false);

    if (!file.type.startsWith('image/')) {
      toast.error('Тільки зображення');
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error('Файл занадто великий (макс 1MB)');
      return;
    }

    formik.setFieldValue('photo', file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setIsPhotoUploaded(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={css.formSection}>
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <div className={css.formFields}>
          {/* Фото */}
          <div className={css.formGroup}>
            <div className={css.photoWrapper}>
              <div className={css.previewContainer}>
                <span className={css.placeholderText}>Фото інструменту</span>

                {isPhotoUploaded ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className={css.previewImg}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl('');
                        formik.setFieldValue('photo', null);
                        formik.setFieldTouched('photo', true, false);
                        setIsPhotoUploaded(false);
                      }}
                      className="button button--secondary"
                    >
                      Видалити фото
                    </button>
                  </>
                ) : (
                  <>
                    <img
                      alt="Preview"
                      className={css.previewImg}
                      srcSet="/images/add_tool_form/AddEditFormMobile.png 375w, /images/add_tool_form/AddEditFormTablet.png 768w, /images/add_tool_form/AddEditFormDesktop.png 1440w"
                      sizes="(max-width: 480px) 375px, (max-width: 1024px) 768px, 1440px"
                    />
                    <label
                      className={`${css.uploadPhotoButton} button button--secondary`}
                    >
                      Завантажити фото
                      <input
                        className={css.hidden}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </>
                )}
              </div>

              {showError('photo') && (
                <p className={css.errorText}>{errorText('photo')}</p>
              )}
            </div>
          </div>

          {/* Назва */}
          <div className={css.formGroup}>
            <label>
              Назва
              <input
                className={inputClass('name')}
                {...formik.getFieldProps('name')}
              />
            </label>
            {showError('name') && (
              <p className={css.errorText}>{errorText('name')}</p>
            )}
          </div>

          {/* Ціна */}
          <div className={css.formGroup}>
            <label>
              Ціна/день
              <input
                type="number"
                className={inputClass('pricePerDay')}
                {...formik.getFieldProps('pricePerDay')}
              />
            </label>
            {showError('pricePerDay') && (
              <p className={css.errorText}>{errorText('pricePerDay')}</p>
            )}
          </div>

          {/* Категорія */}
          <div className={css.formGroup}>
            <CategorySelect
              onSelect={ids => {
                const singleId = ids.length > 0 ? ids[ids.length - 1] : '';
                formik.setFieldValue('category', singleId);
                formik.setFieldTouched('category', true, false); // ✅ важливо
              }}
              selectedTags={
                formik.values.category ? [formik.values.category] : []
              }
              customClassName={{
                wrapper: `${css.categorySelectWrapper} ${showError('category') ? css.error : ''}`,
              }}
            />
            {showError('category') && (
              <p className={css.errorText}>{errorText('category')}</p>
            )}
          </div>

          {/* Умови оренди */}
          <div className={css.formGroup}>
            <label>
              Умови оренди
              <input
                className={inputClass('rentalTerms')}
                {...formik.getFieldProps('rentalTerms')}
              />
            </label>
            {showError('rentalTerms') && (
              <p className={css.errorText}>{errorText('rentalTerms')}</p>
            )}
          </div>

          {/* Опис */}
          <div className={css.formGroup}>
            <label>
              Опис
              <textarea
                className={`${css.textarea} ${
                  (formik.touched.description || formik.submitCount > 0) &&
                  formik.errors.description
                    ? css.error
                    : ''
                }`}
                {...formik.getFieldProps('description')}
              />
            </label>
            {showError('description') && (
              <p className={css.errorText}>{errorText('description')}</p>
            )}
          </div>

          {/* Характеристики */}
          <div className={`${css.formGroup} ${css.margin}`}>
            <label>
              Характеристики
              <textarea
                className={`${css.textarea} ${
                  (formik.touched.specifications || formik.submitCount > 0) &&
                  formik.errors.specifications
                    ? css.error
                    : ''
                }`}
                placeholder={`Вага: 7кг\nПотужність: 4кBт`}
                {...formik.getFieldProps('specifications')}
              />
            </label>
            {showError('specifications') && (
              <p className={css.errorText}>{errorText('specifications')}</p>
            )}
          </div>
        </div>

        {/* Кнопки */}
        <div className={css.buttonGroup}>
          <button
            type="submit"
            disabled={isLoading}
            className={`button button--primary ${css.button}`}
          >
            {isLoading
              ? 'Завантаження...'
              : isEditMode
                ? 'Зберегти зміни'
                : 'Опублікувати'}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className={`button button--secondary ${css.button}`}
          >
            Відмінити
          </button>
        </div>
      </form>
    </div>
  );
}
