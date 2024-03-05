import Link from 'next/link';
import React from 'react';

type InfoBoxProps = {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: {
    text: string;
    href: string;
    backgroundColor: string;
    hoverBgColor?: string;
    textColor: string;
  };
  children: React.ReactNode;
};

export default function InfoBox({
  heading,
  backgroundColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  buttonInfo,
  children,
}: InfoBoxProps) {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md ${textColor}`}>
      <h2 className='text-2xl font-bold'>{heading}</h2>
      <p className='mt-2 mb-4'>{children}</p>
      <Link
        href={buttonInfo.href}
        className={`inline-block ${buttonInfo.backgroundColor} ${buttonInfo.textColor} rounded-lg px-4 py-2 ${buttonInfo.hoverBgColor}`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
}
