'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './AddEditToolForm.module.css';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

const CATEGORIES = [
  'Перфоратори та відбійні молотки',
  'Дрилі, шуруповерти та гайковерти',
  'Шліфувальні та полірувальні машини',
  'Пилки та різаки',
  'Плиткорізи та інструменти для плитки',
];

type Props = {
  initialData?: any;
  isEditMode?: boolean;
};

export default function AddEditToolForm({
  initialData,
  isEditMode = false,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialData?.photo || '');

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Мінімум 3 символи')
      .max(96, 'Максимум 96 символів')
      .required('Обовʼязкове поле'),

    price: Yup.number()
      .min(0, 'Ціна не може бути відʼємною')
      .required('Обовʼязкове поле'),

    category: Yup.string().required('Оберіть категорію'),

    description: Yup.string()
      .min(20, 'Мінімум 20 символів')
      .max(2000, 'Максимум 2000 символів')
      .required('Додайте опис'),

    specifications: Yup.string()
      .max(1000, 'Характеристики не можуть перевищувати 1000 символів')
      .nullable(),

    photo: Yup.mixed().required('Додайте фото інструменту'),
  });

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      price: initialData?.price || '',
      category: initialData?.category || '',
      description: initialData?.description || '',
      specifications: initialData?.specifications || '',
      photo: initialData?.photo || null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async values => {
      setIsLoading(true);

      try {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          if (key === 'photo' && value instanceof File) {
            formData.append(key, value);
          } else if (value !== null) {
            formData.append(key, String(value));
          }
        });

        const url = isEditMode ? `/api/tools/${initialData.id}` : '/api/tools';

        const method = isEditMode ? 'PUT' : 'POST';

        const response = await fetch(url, { method, body: formData });

        if (!response.ok) throw new Error('Помилка на сервері');

        const data = await response.json();

        toast.success(
          isEditMode ? 'Оновлено успішно!' : 'Інструмент опубліковано!'
        );

        router.push(`/tools/${data.id || initialData.id}`);
        router.refresh();
      } catch (error) {
        toast.error('Сталася помилка. Спробуйте ще раз.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

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
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={css.formSection}>
      <div className="container">
        <form onSubmit={formik.handleSubmit} className={css.form}>
          <div className={css.formGroup}>
            <div className={css.photoWrapper}>
              {previewUrl ? (
                <div className={css.previewContainer}>
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={300}
                    height={300}
                    className={css.previewImg}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl('');
                      formik.setFieldValue('photo', null);
                    }}
                    className={css.removePhoto}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className={css.photoLabel}>
                  <span className={css.placeholderText}>Фото інструменту</span>
                  <Image
                    src="/images/add_tool_form/placeholder-2x-mob.jpg"
                    alt="Фото інструменту"
                    width={335}
                    height={223}
                  />
                  <input
                    className={css.hidden}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              )}
              {formik.touched.photo && formik.errors.photo && (
                <p className={css.errorText}>{formik.errors.photo as string}</p>
              )}
            </div>
          </div>

          <div className={css.formGroup}>
            <label>
              Назва
              <input
                className={`${css.input} ${
                  formik.touched.name && formik.errors.name ? css.error : ''
                }`}
                {...formik.getFieldProps('name')}
              />
            </label>
            {formik.touched.name && formik.errors.name && (
              <p className={css.errorText}>{formik.errors.name as string}</p>
            )}
          </div>

          {/* Ціна */}
          <div className={css.formGroup}>
            <label>
              Ціна/день
              <input
                type="number"
                className={`${css.input} ${
                  formik.touched.price && formik.errors.price ? css.error : ''
                }`}
                {...formik.getFieldProps('price')}
              />
            </label>
            {formik.touched.price && formik.errors.price && (
              <p className={css.errorText}>{formik.errors.price as string}</p>
            )}
          </div>

          {/* Категорія */}
          <div className={css.formGroup}>
            <label>
              Категорія
              <select
                className={`${css.input} ${
                  formik.touched.category && formik.errors.category
                    ? css.error
                    : ''
                }`}
                {...formik.getFieldProps('category')}
              >
                <option value="">Категорія</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            {formik.touched.category && formik.errors.category && (
              <p className={css.errorText}>
                {formik.errors.category as string}
              </p>
            )}
          </div>

          {/* Опис */}
          <div className={css.formGroup}>
            <label>
              Опис
              <textarea
                className={`${css.textarea} ${
                  formik.touched.description && formik.errors.description
                    ? css.error
                    : ''
                }`}
                {...formik.getFieldProps('description')}
              />
            </label>
            {formik.touched.description && formik.errors.description && (
              <p className={css.errorText}>
                {formik.errors.description as string}
              </p>
            )}
          </div>

          {/* Характеристики */}
          <div className={css.formGroup}>
            <label>
              Характеристики
              <textarea
                className={css.textarea}
                {...formik.getFieldProps('specifications')}
              />
            </label>
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
    </div>
  );
}
