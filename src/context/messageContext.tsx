'use client';
import { fetchNumberOfUnreadMessages } from '@/app/messages/messageActions';
import { useUser } from '@clerk/nextjs';
import { createContext, useState, useContext, useEffect } from 'react';

export const MessageContext = createContext({
  messages: 0,
  incrementUnreadCount: () => {},
  decrementUnreadCount: () => {},
});

export default function MessageContextProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const fetchUnreadMessages = async () => {
      const unreadMessages = await fetchNumberOfUnreadMessages(user.id);
      setMessages(unreadMessages);
    };

    fetchUnreadMessages();
  }, [user]);

  const incrementUnreadCount = () => {
    setMessages((prevCount) => prevCount + 1);
  };

  const decrementUnreadCount = () => {
    setMessages((prevCount) => prevCount - 1);
  };

  return (
    <MessageContext.Provider value={{ messages, incrementUnreadCount, decrementUnreadCount }}>
      {children}
    </MessageContext.Provider>
  );
}

export const useMessages = () => useContext(MessageContext);
