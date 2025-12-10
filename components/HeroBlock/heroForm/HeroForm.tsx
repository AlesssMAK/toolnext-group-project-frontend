'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './HeroForm.module.css';

const validationSchema = Yup.object({
  search: Yup.string()
    .min(2, 'Пошуковий запит має містити мінімум 2 символи')
    .max(100, 'Пошуковий запит має містити максимум 100 символів')
    .required("Це поле обов'язкове"),
});

const HeroForm = () => {
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Дриль алмазного свердління "
          value={formik.values.search}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${styles.input} ${
            formik.touched.search && formik.errors.search ? styles.inputError : ''
          }`}
        />
        {formik.touched.search && formik.errors.search && (
          <div className={styles.error}>{formik.errors.search}</div>
        )}
      </div>
      <button type="submit" className={styles.button}>
        Пошук
      </button>
    </form>
  );
};

export default HeroForm;