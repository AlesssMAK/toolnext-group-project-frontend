import Link from 'next/link';
import css from './PostListing.module.css';

type NavVariant = 'header' | 'tablet' | 'menu';

type PostListingProps = {
  variant?: NavVariant;
  onItemClick?: () => void;
};

const PostListing = ({ variant = 'header', onItemClick }: PostListingProps) => {
  return (
    <div className={css[variant]}>
      <Link
        href="/"
        prefetch={false}
        className={`${css.btn} button button--primary`}
        onClick={onItemClick}
      >
        Опублікувати оголошення
      </Link>
    </div>
  );
};

export default PostListing;
