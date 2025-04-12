
import React, { useState } from 'react';
import { Heart, Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface MindfulnessExerciseProps {
  exercise: string;
}

const MindfulnessExercise: React.FC<MindfulnessExerciseProps> = ({ exercise }) => {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const startExercise = () => {
    setIsActive(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsActive(false);
          setIsCompleted(true);
          toast.success('Mindfulness exercise completed!');
          return 100;
        }
        return prev + 0.5;
      });
    }, 50); // 50ms * 200 steps = ~10 seconds total
    
    return () => clearInterval(interval);
  };
  
  return (
    <div className="my-6 rounded-xl overflow-hidden mindful-card">
      <div className="bg-mindful-calm-blue p-4 flex items-start gap-3">
        <Heart className="h-5 w-5 text-mindful-deep-purple mt-0.5" />
        <div>
          <h3 className="font-medium text-mindful-deep-purple mb-1">Mindfulness Exercise</h3>
          <p className="text-sm">{exercise}</p>
        </div>
      </div>
      
      <div className="p-4">
        {isActive && (
          <div className="mb-4">
            <Progress value={progress} className="h-2 bg-mindful-light-purple" />
            <p className="text-xs text-center mt-1 text-mindful-deep-purple">Take your time...</p>
          </div>
        )}
        
        <div className="flex justify-end">
          {!isActive && !isCompleted ? (
            <Button
              size="sm"
              className="bg-mindful-purple hover:bg-mindful-deep-purple"
              onClick={startExercise}
            >
              <Play className="h-4 w-4 mr-1" />
              Begin
            </Button>
          ) : isCompleted ? (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completed
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MindfulnessExercise;
