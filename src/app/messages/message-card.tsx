import React from 'react';
import MarkAsReadButton from './mark-as-read-button';
import DeleteMesageButton from './delete-message-button';
import { Message } from '@/types';
import { formatDate } from '@/utils/formatDate';

export default function MessageCard({ message }: { message: Message }) {
  return (
    <div
      className={` p-4 rounded-md md:shadow-md md:border border-gray-200`}
      key={message._id}
    >
      <div className='relative bg-white p-4 rounded-md md:shadow-md md:border border-gray-200'>
        <div className={`${message.read && 'opacity-35 line-through'}`}>
          <h2 className='text-xl mb-4'>
            <span className='font-bold'>Property Inquiry:</span> {message.propertyName}
          </h2>

          <ul className='mt-4'>
            <li>
              <strong>Name:</strong> {message.name}
            </li>

            <li>
              <strong>Reply Email:</strong>{' '}
              <a
                href={`mailto:${message.email}`}
                className='text-blue-500'
              >
                {message.email}
              </a>
            </li>
            {message.phone && (
              <li>
                <strong>Reply Phone:</strong>{' '}
                <a
                  href={`tel:${message.phone}`}
                  className='text-blue-500'
                >
                  {message.phone}
                </a>
              </li>
            )}
            <li>
              <strong>Received:</strong> {formatDate(message.createdAt)}
            </li>
          </ul>
          <p className='text-gray-700 py-10'>{message.message}</p>
        </div>
        <MarkAsReadButton
          messageId={message._id}
          read={message.read}
        />
        <DeleteMesageButton messageId={message._id} />
      </div>
    </div>
  );
}
