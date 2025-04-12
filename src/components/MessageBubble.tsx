
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Message } from '../types/conversation';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'message-bubble-user bg-mindful-purple text-white' : 'message-bubble-ai bg-white border border-mindful-light-purple'} p-3 shadow-sm`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-mindful-purple" />
            <span className="text-sm font-medium text-mindful-deep-purple">Mindful Companion</span>
          </div>
        )}
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
