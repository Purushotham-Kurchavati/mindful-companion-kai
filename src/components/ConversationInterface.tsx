
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import MessageBubble from './MessageBubble';
import JournalPrompt from './JournalPrompt';
import MindfulnessExercise from './MindfulnessExercise';
import { Message } from '../types/conversation';

interface ConversationInterfaceProps {
  initialFeature?: string | null;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello, I'm your mindful companion. How are you feeling today?",
    sender: 'ai',
    type: 'message',
  },
];

// Sample mindful responses from the training data
const trainingResponses: {[key: string]: string} = {
  'overwhelmed': "I'm here for you. Would you like to talk about what's causing this feeling? Sometimes, naming the stressors helps ease the weight.",
  'off': "That's okay—some days feel heavy without explanation. Would you like to reflect with a journaling prompt? Try: 'What emotions have been visiting me lately, and what might they be trying to tell me?'",
  'fight': "That sounds painful. Conflicts with loved ones can shake us deeply. Would writing about what happened from both perspectives help you process it?",
  'not motivated': "It's okay to slow down. Sometimes rest is productive too. Would you like to try a 1-minute breathing exercise with me?",
  'mess up': "That sounds like a tough thought. Let's try to reframe it gently: 'I may make mistakes, but I'm also learning and growing every day.' What's one thing you learned from your recent experience?",
  'can\'t sleep': "Sounds like your thoughts are spinning. Would it help to do a quick brain dump? Try writing everything on your mind here—I'll listen without judgment.",
  'control': "That's a powerful intention. Let's explore a journaling prompt: 'What are three small actions I can take today that align with the life I want?'",
  'pointless': "That's a heavy feeling, and I'm here with you. You're not alone. Sometimes revisiting what matters to you can help. Would you like to reflect on what's brought you joy in the past?",
  'negative thoughts': "Let's meet those thoughts with compassion. Try this: 'If I were talking to a friend feeling this way, what would I say to them?' Often, the kindness we offer others can guide how we speak to ourselves.",
  'listen': "I'm listening. Take your time—write as much or as little as you need. I'm here to hold space for your thoughts.",
  'anxious': "Exams can bring a lot of pressure. Let's do a 2-minute grounding practice. First, take a deep breath. Now, tell me: What's one thing you can control right now?",
  'calm': "Try this simple bedtime ritual: breathe in for 4, hold for 4, breathe out for 6. Do this three times, and focus on letting go of the day's weight.",
  'self-doubt': "That's something many of us face, and I hear you. Let's explore: 'What strengths have helped me get through past challenges?' You're stronger than you think.",
  'consistent': "Absolutely. Would you like me to send you a daily check-in or mindfulness prompt? Together, we can build a rhythm that works for you."
};

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({ initialFeature }) => {
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

  // Handle initial feature selection
  useEffect(() => {
    if (initialFeature) {
      let initialMessage = "";
      
      if (initialFeature === 'journaling') {
        initialMessage = getRandomJournalPrompt();
        addAiMessage(initialMessage, 'journal_prompt');
      } else if (initialFeature === 'mindfulness') {
        initialMessage = getRandomMindfulnessExercise();
        addAiMessage(initialMessage, 'mindfulness_exercise');
      } else if (initialFeature === 'reflection') {
        initialMessage = "Let's take a moment to reflect on your day. What's something that happened today that you're grateful for?";
        addAiMessage(initialMessage, 'message');
      }
    }
  }, [initialFeature]);

  const addAiMessage = (text: string, type: string) => {
    const newAiMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'ai',
      type: type,
    };
    
    setMessages(prev => [...prev, newAiMessage]);
  };

  const generateResponse = (userMessage: string): Message => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check for training data matches first
    for (const [keyword, response] of Object.entries(trainingResponses)) {
      if (lowerCaseMessage.includes(keyword)) {
        return {
          id: Date.now().toString(),
          text: response,
          sender: 'ai',
          type: 'message',
        };
      }
    }
    
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
      "What's something I've been avoiding, and what would it feel like to face it with courage?",
      "What emotions have been visiting me lately, and what might they be trying to tell me?",
      "What are three small actions I can take today that align with the life I want?",
      "What strengths have helped me get through past challenges?",
      "If I were talking to a friend feeling this way, what would I say to them?"
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
      "Try this simple ritual: breathe in for 4, hold for 4, breathe out for 6. Do this three times, and focus on letting go of the day's weight.",
      "Take a deep breath. Now, tell me: What's one thing you can control right now?",
      "Do a quick grounding practice: Feel your feet on the ground, your body supported, and take three slow breaths."
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
              sender: 'ai' as const,
              type: 'journal_prompt',
            }
          : {
              id: Date.now().toString() + '-followup',
              text: getRandomMindfulnessExercise(),
              sender: 'ai' as const,
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
