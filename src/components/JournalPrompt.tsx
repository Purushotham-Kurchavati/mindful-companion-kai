
import React, { useState } from 'react';
import { BookText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface JournalPromptProps {
  prompt: string;
}

const JournalPrompt: React.FC<JournalPromptProps> = ({ prompt }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  
  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      toast.success('Journal entry saved');
      setJournalEntry('');
      setIsExpanded(false);
    }
  };
  
  return (
    <div className="my-6 rounded-xl overflow-hidden mindful-card">
      <div className="bg-mindful-light-purple p-4 flex items-start gap-3">
        <BookText className="h-5 w-5 text-mindful-deep-purple mt-0.5" />
        <div>
          <h3 className="font-medium text-mindful-deep-purple mb-1">Journal Prompt</h3>
          <p className="text-sm">{prompt}</p>
        </div>
      </div>
      
      {isExpanded ? (
        <div className="p-4">
          <Textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full h-32 mb-3"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-mindful-purple hover:bg-mindful-deep-purple"
              onClick={handleSaveEntry}
            >
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-mindful-deep-purple border-mindful-light-purple"
            onClick={() => setIsExpanded(true)}
          >
            Reflect on this
          </Button>
        </div>
      )}
    </div>
  );
};

export default JournalPrompt;
