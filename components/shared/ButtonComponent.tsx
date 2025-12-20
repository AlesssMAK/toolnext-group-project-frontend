"use client"

type Props = {
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const ButtonComponent = ({ className, onClick, children }: Props) => {
  const clickAction = onClick ? onClick : () => {};

  return (
    <button className={className} onClick={clickAction}>
      {children}
    </button>
  );
}

export default ButtonComponent