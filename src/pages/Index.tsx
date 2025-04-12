
import React, { useState } from 'react';
import Header from '@/components/Header';
import WelcomeCard from '@/components/WelcomeCard';
import ConversationInterface from '@/components/ConversationInterface';

const Index = () => {
  const [showConversation, setShowConversation] = useState(false);
  
  return (
    <div className="min-h-screen mindful-gradient">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {showConversation ? (
          <ConversationInterface />
        ) : (
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="animate-float">
              <WelcomeCard onGetStarted={() => setShowConversation(true)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
