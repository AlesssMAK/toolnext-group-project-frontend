import css from './ProfilePlaceHolder.module.css';
import Link from 'next/link';

interface ProfilePlaceHolderProps {
  isOwner: boolean;
}

const ProfilePlaceHolder = ({ isOwner }: ProfilePlaceHolderProps) => {
  const buttonPath = isOwner ? 'manage-tools/new' : '/';
  const buttonText = isOwner ? 'Опублікувати інструмент' : 'Всі інструменти';

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.wrapper}>
          <p className={css.text}>
            {isOwner
              ? 'У вас ще не опубліковано жодного інструменту'
              : 'У цього користувача ще не опубліковано жодного інструменту'}
          </p>
          <p className={css.subtext}>
            {isOwner
              ? 'Мерщій обулікуйте своє перше оголошення, щоб почати отримувати пасивний дохід'
              : 'У нас є великий вибір інструментів від інших користувачів'}
          </p>
          <Link href={buttonPath} className={`button button--primary ${css.btn}`}>
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfilePlaceHolder;
