"use client"

type Props = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonComponent = ({ className, onClick, children }: Props) => {
  return (
    <button className={className} onClick={onClick}>{children}</button>
  )
}

export default ButtonComponent