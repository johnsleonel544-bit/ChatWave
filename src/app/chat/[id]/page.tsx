import React from 'react';
import ChatClient from '@/components/ChatClient';

export default function ChatPage({ params }: { params: { id: string } }) {
  return <ChatClient id={params.id} />;
}
