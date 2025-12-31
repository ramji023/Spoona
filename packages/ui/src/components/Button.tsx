import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${className} text-lg cursor-pointer text-white font-semibold rounded-3xl px-5 py-2 mx-5 bg-orange-400`}
      >
        {children}
      </button>
    </>
  );
}
