'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from './RegistrationBlock.module.css';

export default function RegistrationBlock() {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsDisabled(true);
    router.push('/auth/register');
  };

  return (
    <section className={`${css.registBox} container`}>
      <div className={css.registWrapper}>
        <div className={css.registContent}>
          <h2 className={css.registTitle}>
            Зареєструйтесь і отримайте доступ до інструментів поруч із вами
          </h2>
          <p className={css.registText}>
            Не витрачайте гроші на купівлю — орендуйте зручно та швидко.
            <br />
            Приєднуйтесь до ToolNext вже сьогодні!
          </p>
          <button
            className={css.registButton}
            onClick={handleClick}
            disabled={isDisabled}
          >
            {isDisabled ? 'Завантаження...' : 'Зареєструватися'}
          </button>
        </div>

        <picture className={css.registImageWrapper}>
          <source
            media="(min-width: 1440px)"
            srcSet="/images/register_box/reg-des-2x.jpg"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/images/register_box/reg-tab-2x.jpg"
          />

          <Image
            src="/images/register_box/reg-mob-2x.jpg"
            alt="Інструменти"
            width={335}
            height={223}
            className={css.registImage}
          />
        </picture>
      </div>
    </section>
  );
}
