'use client';

import css from './ToolCardButton.module.css';
import { useRouter } from 'next/navigation';
import ButtonComponent from '@/components/shared/ButtonComponent';

interface ToolCardButtonProps {
  toolId: string;
  className?: string;
  isOwner?: boolean;
}

export const ToolCardButton: React.FC<ToolCardButtonProps> = ({
  toolId,
  className,
  isOwner,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tools/${toolId}`);
  };

  return (
    <div>
      {isOwner ? (
        <div className={css.btnContainer}>
          <ButtonComponent
            onClick={handleClick}
            className={`button button--secondary ${css.editBtn}`}
          >
            Редагувати
          </ButtonComponent>
          <ButtonComponent
            onClick={handleClick}
            className={`button button--secondary ${css.deleteBtn}`}
          >
            <svg
              width="24"
              height="24"
              className={css.deleteIcon}
              aria-hidden="true"
            >
              <use href="/sprite.svg#delete"></use>
            </svg>
          </ButtonComponent>
        </div>
      ) : (
        <ButtonComponent
          onClick={handleClick}
          className={`button button--secondary ${className}`}
        >
          Детальніше
        </ButtonComponent>
      )}
    </div>
  );
};
