
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import MessageBubble from './MessageBubble';
import JournalPrompt from './JournalPrompt';
import MindfulnessExercise from './MindfulnessExercise';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  type?: 'message' | 'journal_prompt' | 'mindfulness_exercise';
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello, I'm your mindful companion. How are you feeling today?",
    sender: 'ai',
    type: 'message',
  },
];

const ConversationInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): Message => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Detect emotions or keywords in the user's message
    const isNegative = /sad|angry|anxious|stressed|worried|depressed|upset|frustrated/.test(lowerCaseMessage);
    const isPositive = /happy|good|great|excellent|amazing|wonderful|joy|excited/.test(lowerCaseMessage);
    const isConfused = /confused|unsure|don't know|uncertain|lost|wondering/.test(lowerCaseMessage);
    const askingForJournal = /journal|write|prompt|reflect/.test(lowerCaseMessage);
    const askingForMindfulness = /mindful|meditate|meditation|breathing|exercise|relax|calm/.test(lowerCaseMessage);
    
    // Generate appropriate response
    if (askingForJournal) {
      return {
        id: Date.now().toString(),
        text: getRandomJournalPrompt(),
        sender: 'ai',
        type: 'journal_prompt',
      };
    } else if (askingForMindfulness) {
      return {
        id: Date.now().toString(),
        text: getRandomMindfulnessExercise(),
        sender: 'ai',
        type: 'mindfulness_exercise',
      };
    } else if (isNegative) {
      return {
        id: Date.now().toString(),
        text: "I notice you might be feeling down. Remember that these feelings are temporary and valid. Would you like to try a quick mindfulness exercise or journal about your feelings?",
        sender: 'ai',
        type: 'message',
      };
    } else if (isPositive) {
      return {
        id: Date.now().toString(),
        text: "It's wonderful that you're feeling good! Taking a moment to appreciate positive emotions can help us build resilience. What's contributing to these positive feelings?",
        sender: 'ai',
        type: 'message',
      };
    } else if (isConfused) {
      return {
        id: Date.now().toString(),
        text: "It sounds like you're seeking clarity. Sometimes writing down our thoughts can help us better understand them. Would you like a journal prompt to explore this further?",
        sender: 'ai',
        type: 'message',
      };
    } else {
      return {
        id: Date.now().toString(),
        text: "Thank you for sharing. I'm here to listen and support you on your journey. Would you like to explore this further with some reflection or mindfulness?",
        sender: 'ai',
        type: 'message',
      };
    }
  };

  const getRandomJournalPrompt = (): string => {
    const prompts = [
      "What are three things you're grateful for today, and why?",
      "Describe a challenge you're facing and three possible ways to approach it.",
      "What has been on your mind lately that you haven't had a chance to process?",
      "Write about a moment today when you felt at peace. What contributed to that feeling?",
      "What would you tell your past self from a year ago? What do you hope your future self would tell you?",
      "What are your core values, and how did your actions today align with them?",
    ];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const getRandomMindfulnessExercise = (): string => {
    const exercises = [
      "Take 5 deep breaths, inhaling for 4 counts and exhaling for 6. Notice how your body feels with each breath.",
      "For the next minute, focus only on the physical sensations in your body. Notice areas of tension and try to relax them.",
      "Look around you and name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      "Imagine a gentle light flowing through your body from head to toe, bringing relaxation to each part it touches.",
      "Take a moment to tune into your current emotions without judgment. Where do you feel them in your body?",
      "Close your eyes and visualize a peaceful place. Spend a few moments noticing the details - what you see, hear, and feel in this tranquil space.",
    ];
    return exercises[Math.floor(Math.random() * exercises.length)];
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      type: 'message',
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateResponse(newUserMessage.text);
      setMessages((prev) => [...prev, aiResponse]);
      setIsProcessing(false);
      
      // Randomly suggest a journal prompt or mindfulness exercise
      if (Math.random() > 0.7 && aiResponse.type === 'message') {
        const followUp = Math.random() > 0.5 
          ? {
              id: Date.now().toString() + '-followup',
              text: getRandomJournalPrompt(),
              sender: 'ai',
              type: 'journal_prompt',
            }
          : {
              id: Date.now().toString() + '-followup',
              text: getRandomMindfulnessExercise(),
              sender: 'ai',
              type: 'mindfulness_exercise',
            };
            
        setTimeout(() => {
          setMessages((prev) => [...prev, followUp]);
        }, 1000);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-2xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          if (message.type === 'journal_prompt') {
            return <JournalPrompt key={message.id} prompt={message.text} />;
          } else if (message.type === 'mindfulness_exercise') {
            return <MindfulnessExercise key={message.id} exercise={message.text} />;
          } else {
            return <MessageBubble key={message.id} message={message} />;
          }
        })}
        {isProcessing && (
          <div className="flex items-center gap-2 text-mindful-deep-purple opacity-70">
            <div className="animate-pulse h-2 w-2 bg-mindful-purple rounded-full"></div>
            <div className="animate-pulse h-2 w-2 bg-mindful-purple rounded-full" style={{ animationDelay: '0.2s' }}></div>
            <div className="animate-pulse h-2 w-2 bg-mindful-purple rounded-full" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-mindful-light-purple">
        <div className="flex gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share your thoughts..."
            className="resize-none min-h-[60px]"
          />
          <Button 
            onClick={handleSend} 
            disabled={!inputValue.trim() || isProcessing}
            className="h-full bg-mindful-purple hover:bg-mindful-deep-purple"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationInterface;
