
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-mindful-purple" />
        <h1 className="text-xl font-semibold text-mindful-deep-purple">Mindful Companion</h1>
      </div>
    </header>
  );
};

export default Header;
