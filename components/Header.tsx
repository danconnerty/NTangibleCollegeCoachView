
import React from 'react';
import { ChevronDown, Star, Users } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-black text-white px-8 py-3 flex flex-col items-center sticky top-0 z-40 shadow-md">
      {/* Top Logo Section */}
      <div className="flex flex-col items-center mb-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-lg">
              N
            </div>
            <h1 className="text-xl tracking-[0.2em] font-light">TANGIBLE</h1>
          </div>
          <p className="text-[10px] tracking-[0.4em] text-gray-400 mt-1 uppercase">N Control</p>
        </div>
      </div>

      {/* Navigation and User Section */}
      <div className="w-full flex justify-between items-center max-w-7xl mt-2">
        <div className="flex gap-6">
          <button 
            onClick={() => onViewChange('home')}
            className={`flex items-center gap-2 text-[11px] uppercase tracking-wider transition-colors ${currentView === 'home' ? 'text-white border-b border-white pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            <Users size={14} />
            All Players
          </button>
          <button 
            onClick={() => onViewChange('interested')}
            className={`flex items-center gap-2 text-[11px] uppercase tracking-wider transition-colors ${currentView === 'interested' ? 'text-yellow-400 border-b border-yellow-400 pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            <Star size={14} />
            Interested Players
          </button>
        </div>

        <div className="flex flex-col items-end text-[11px]">
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-400 transition-colors">
            <span>Dan Connerty</span>
            <ChevronDown size={12} />
          </div>
          <span className="text-gray-500 uppercase tracking-tighter font-medium">Testing Groups</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
