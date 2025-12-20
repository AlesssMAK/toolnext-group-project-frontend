'use client';

import { useRouter } from 'next/navigation';
import ButtonComponent from '@/components/shared/ButtonComponent';

interface ToolCardButtonProps {
  toolId: string;
  className: string;
}

export const ToolCardButton: React.FC<ToolCardButtonProps> = ({ toolId, className }) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/tools/${toolId}`);
  };

  return (
    <ButtonComponent onClick={handleClick} className={`button button--secondary ${className}`}>
      Детальніше
    </ButtonComponent>
  );
};