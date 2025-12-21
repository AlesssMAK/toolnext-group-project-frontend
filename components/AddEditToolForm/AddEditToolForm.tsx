'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './AddEditToolForm.module.css';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

const CATEGORIES = [
    "Перфоратори та відбійні молотки",
    "Дрилі, шуруповерти та гайковерти",
    "Шліфувальні та полірувальні машини",
    "Пилки та різаки",
    "Плиткорізи та інструменти для плитки",
];

type Props = {
    initialData?: any; // Дані для редагування
    isEditMode?: boolean;
};

export default function AddEditToolForm({ initialData, isEditMode = false }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(initialData?.photo || '');
    
    const validationSchema = Yup.object({
        name: Yup.string().required("Обов'язкове поле"),
        price: Yup.number().positive("Ціна має бути більше 0").required("Обов'язкове поле"),
        category: Yup.string().required("Оберіть категорію"),
        conditions: Yup.string().required("Вкажіть умови"),
        description: Yup.string().required("Додайте опис"),
        characteristics: Yup.string().required("Вкажіть характеристики"),
        photo: Yup.mixed().required("Додайте фото інструменту"),
    });

    const formik = useFormik({
        initialValues: {
            name: initialData?.name || "",
            price: initialData?.price || "",
            category: initialData?.category || "",
            conditions: initialData?.conditions || "",
            description: initialData?.description || "",
            characteristics: initialData?.characteristics || "",
            photo: initialData?.photo || null,
        },
        enableReinitialize: true, // Дозволяє оновлювати форму при зміні initialData
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                   // Якщо це файл — додаємо як файл, інакше як рядок
                    if (key === 'photo' && value instanceof File) {
                        formData.append(key, value);
                    } else if (value !== null) {
                        formData.append(key, String(value));
                    }
                });

                const url = isEditMode ? `/api/tools/${initialData.id}` : "/api/tools";
                const method = isEditMode ? "PUT" : "POST";

                const response = await fetch(url, { method, body: formData });

                if (!response.ok) throw new Error("Помилка на сервері");

                const data = await response.json();
                toast.success(isEditMode ? "Оновлено успішно!" : "Інструмент опубліковано!");
                
                router.push(`/tools/${data.id || initialData.id}`);
                router.refresh();
            } catch (error) {
                toast.error("Сталася помилка. Спробуйте ще раз.");
            } finally {
                setIsLoading(false);
            }
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
            if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Тільки зображення');
                return;
            }
            if (file.size > 1024 * 1024) {
                toast.error('Файл занадто великий (макс 1MB)');
                return;
            }
            
             // Записуємо файл у Formik
            formik.setFieldValue("photo", file);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        };

        return (
            
                <form onSubmit={formik.handleSubmit} className={css.form}>
                    <div className={css.deskGroup}>
                        <div className={css.flexContainer}>
                        <div className={css.wrapper}>
                            <div className={css.photoWrapper}>
                            {/* Відображаємо прев'ю якщо зображення існує */}
                                {previewUrl ? (
                                    <div className={css.previewContainer}>
                                <Image src={previewUrl} alt='Preview' width={300} height={300}  className={css.previewImg}/>
                                <button type="button" onClick={() => {setPreviewUrl(''); formik.setFieldValue('photo', null)}} className={css.removePhoto}>✕</button>
                                    </div>
                                ) : (
                            <label className={css.photoLabel}>
                                <span className={css.placeholderText}>Фото інструменту</span>
                                <picture className={css.toolsWrapper}>
                                    <source
                                        media="(min-width: 1440px)"
                                        srcSet="/images/add_tool_form/placeholder-2x-desk.jpg"
                                    />
                                    <source
                                        media="(min-width: 768px)"
                                        srcSet="/images/add_tool_form/placeholder-2x-tab.jpg"
                                    />
                                    <Image
                                        src="/images/add_tool_form/placeholder-2x-mob.jpg"
                                        alt="Фото інструменту"
                                        width={335}
                                        height={223}
                                        className={css.placeholder}
                                    />
                                </picture>
                                <input id='file-upload' className={css.hidden} type="file" accept="image/*" onChange={handleFileChange} />
                                </label>
                                    )}
                                    {formik.errors.photo && formik.touched.photo && <p className={css.errorText}>{formik.errors.photo as string}</p>}
                                </div>
                        
                        <div className={css.uploadButton}>
                            <label htmlFor='file-upload' className={`button button--secondary ${css.button}`} >
                            {previewUrl ? "Змінити фото" : "Завантажити фото"}
                            </label>
                        </div>
                        </div>

                        <div className={css.formGroup}>
                        <label >
                            Назва
                            <input
                                className={`${css.input} ${formik.touched.name && formik.errors.name ? css.error : ''}`}
                                placeholder="Введіть назву"
                                {...formik.getFieldProps("name")}
                            />
                        </label>
                        {formik.touched.name && formik.errors.name && <p className="">{formik.errors.name as string}</p>}
                        </div>

                        {/* Ціна */}
                        <div className={css.formGroup}>
                        <label >
                            Ціна/день
                            <input
                                type="number"
                                className={`${css.input} ${formik.touched.price && formik.errors.price ? css.error : ''}`}
                                placeholder="500"
                                {...formik.getFieldProps("price")}
                                />
                                {formik.touched.price && formik.errors.price && <p className={css.errorText}>{formik.errors.price as string}</p>}
                        </label>
                        </div>

                        {/* Категорія  */}
                        <div className={css.formGroup}>
                        <label className={css.selectLabel} >
                            Категорія
                                <select className={`${css.select} ${formik.touched.category && formik.errors.category ? css.error : ''}`}{...formik.getFieldProps("category")}>
                                    <option className={css.option} value="">Категорія</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {formik.touched.category && formik.errors.category && <span className={css.error}>{formik.errors.category as string}</span>}
                        </label>
                        </div>

                        <div className={css.formGroup}>
                        <label >
                            Умови оренди
                            <textarea  className={`${css.textarea} ${css.textareaRent} ${formik.touched.conditions  && formik.errors.conditions  ? css.error : ''}`} placeholder="Застава 8000 грн. Станина та бак для води надаються окремо." {...formik.getFieldProps("conditions")} />
                            </label>
                            {formik.touched.conditions && formik.errors.conditions && <p className={css.errorText}>{formik.errors.conditions as string}</p>}
                        </div>

                        <div className={css.formGroup}>
                        <label > Опис
                            <textarea className={`${css.textarea} ${formik.touched.description  && formik.errors.description  ? css.error : ''}`} placeholder="Ваш опис" {...formik.getFieldProps("description")} />
                            </label>
                            {formik.touched.description && formik.errors.description && <p className={css.errorText}>{formik.errors.description as string}</p>}
                        </div>

                        <div className={css.formGroup}>
                        <label >
                            Характеристики
                            <textarea className={`${css.textarea} ${formik.touched.characteristics  && formik.errors.characteristics  ? css.error : ''}`} placeholder="Характеристики інструменту" {...formik.getFieldProps("characteristics")} />
                            </label>
                            {formik.touched.characteristics && formik.errors.characteristics && <p className={css.errorText}>{formik.errors.characteristics as string}</p>}
                        </div>
                        </div>
                        {/* Кнопки */}
                        <div className={css.buttonGroup}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`button button--primary ${css.button}`}
                            >
                                {isLoading ? "Завантаження..." : (isEditMode ? "Зберегти зміни" : "Опублікувати")}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className={`button button--secondary ${css.button}`}
                            >
                                Відмінити
                            </button>
                        </div>
                        </div>
                    </form>
                
            
        );
    }


