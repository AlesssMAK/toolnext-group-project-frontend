'use client';

type Props = {
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
};

const ButtonComponent = ({
  className,
  onClick,
  children,
  type = 'button',
  disabled = false,
  ariaLabel,
}: Props) => {
  const clickAction = onClick ? onClick : () => {};

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={clickAction}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
