'use client';
import { useState } from 'react';
import ChatForm from './components/ChatForm';
import EmailForm from './components/EmailForm';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4">
     
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 text-center ${
              activeTab === 'chat'
                ? 'border-b-2 border-blue-500 font-semibold'
                : 'text-gray-500'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-2 text-center ${
              activeTab === 'email'
                ? 'border-b-2 border-blue-500 font-semibold'
                : 'text-gray-500'
            }`}
          >
            Email
          </button>
        </div>

        <div>
          {activeTab === 'chat' ? <ChatForm /> : <EmailForm />}
        </div>
      </div>
    </div>
  );
}
