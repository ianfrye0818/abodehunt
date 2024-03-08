'use client';

type ClientButtonProps = {
  callback: () => void;
  text?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function ClientButton({ callback, text, children, className }: ClientButtonProps) {
  return (
    <button
      onClick={callback}
      className={className}
    >
      {text && text}
      {children && children}
    </button>
  );
}
