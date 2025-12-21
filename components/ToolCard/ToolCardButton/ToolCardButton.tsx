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

  const handleView = () => {
    router.push(`/tools/${toolId}`);
  };

  const handleEdit = () => {
    router.push(`/tools/${toolId}/edit`);
  };

  const handleDelete = () => {
    console.log('DELETE TOOL:', toolId);
  };

  return (
    <div>
      {isOwner ? (
        <div className={css.btnContainer}>
          <ButtonComponent
            onClick={handleEdit}
            className={`button button--secondary ${css.editBtn}`}
          >
            Редагувати
          </ButtonComponent>
          <ButtonComponent
            onClick={handleDelete}
            className={`button button--secondary ${css.deleteBtn}`}
          >
            <svg
              // width="24"
              // height="24"
              className={css.deleteIcon}
              aria-hidden="true"
            >
              <use href="/sprite.svg#delete"></use>
            </svg>
          </ButtonComponent>
        </div>
      ) : (
        <ButtonComponent
          onClick={handleView}
          className={`button button--secondary ${className}`}
        >
          Детальніше
        </ButtonComponent>
      )}
    </div>
  );
};
