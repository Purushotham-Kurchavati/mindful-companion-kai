
import React from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeCardProps {
  onGetStarted: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onGetStarted }) => {
  const handleFeatureClick = (feature: string) => {
    // Call onGetStarted to show the conversation interface
    onGetStarted();
    // We'll let the parent component know which feature was clicked
    // The actual implementation will be handled in ConversationInterface
    localStorage.setItem('selectedFeature', feature);
  };

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg border border-mindful-light-purple">
      <div className="mb-6 relative">
        <div className="absolute -top-3 -right-3">
          <Sparkles className="h-6 w-6 text-mindful-purple animate-pulse-slow" />
        </div>
        <div className="h-16 w-16 rounded-full bg-mindful-light-purple flex items-center justify-center">
          <Heart className="h-8 w-8 text-mindful-deep-purple" />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-mindful-deep-purple mb-3">Welcome to Your Mindful Companion</h1>
      
      <p className="text-gray-600 mb-6">
        A safe space to reflect, express yourself, and find moments of clarity through thoughtful conversation and mindfulness practices.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
        <button 
          onClick={() => handleFeatureClick('journaling')}
          className="p-3 bg-mindful-light-purple bg-opacity-50 rounded-lg flex flex-col items-center cursor-pointer hover:bg-opacity-70 transition-all"
        >
          <Feather className="h-5 w-5 text-mindful-deep-purple mb-2" />
          <span className="text-sm font-medium">Journaling</span>
        </button>
        <button 
          onClick={() => handleFeatureClick('mindfulness')}
          className="p-3 bg-mindful-calm-blue bg-opacity-50 rounded-lg flex flex-col items-center cursor-pointer hover:bg-opacity-70 transition-all"
        >
          <Heart className="h-5 w-5 text-mindful-deep-purple mb-2" />
          <span className="text-sm font-medium">Mindfulness</span>
        </button>
        <button 
          onClick={() => handleFeatureClick('reflection')}
          className="p-3 bg-mindful-soft-peach bg-opacity-50 rounded-lg flex flex-col items-center cursor-pointer hover:bg-opacity-70 transition-all"
        >
          <Sparkles className="h-5 w-5 text-mindful-deep-purple mb-2" />
          <span className="text-sm font-medium">Reflection</span>
        </button>
      </div>
      
      <Button 
        onClick={onGetStarted}
        className="w-full bg-mindful-purple hover:bg-mindful-deep-purple text-white"
      >
        Begin Your Journey
      </Button>
    </div>
  );
};

export default WelcomeCard;
