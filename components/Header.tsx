
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Star, Users, LogOut, Brain, User } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (view: ViewType) => {
    onViewChange(view);
    setIsDropdownOpen(false);
  };

  const handleSignOut = () => {
    // Simulating sign out with a page reload
    window.location.reload();
  };

  return (
    <header className="bg-black text-white px-8 py-3 flex flex-col items-center sticky top-0 z-40 shadow-md">
      {/* Top Logo Section */}
      <div className="flex flex-col items-center mb-2">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => handleNavClick('home')}>
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
      <div className="w-full flex justify-between items-center max-w-7xl mt-2 relative">
        <div className="flex gap-6">
          <button 
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-2 text-[11px] uppercase tracking-wider transition-colors ${currentView === 'home' ? 'text-white border-b border-white pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            <Users size={14} />
            All Players
          </button>
          <button 
            onClick={() => handleNavClick('interested')}
            className={`flex items-center gap-2 text-[11px] uppercase tracking-wider transition-colors ${currentView === 'interested' ? 'text-yellow-400 border-b border-yellow-400 pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            <Star size={14} />
            Interested Players
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex flex-col items-end text-[11px] hover:text-blue-400 transition-colors ${isDropdownOpen ? 'text-blue-400' : ''}`}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <span>Dan Connerty</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900">Dan Connerty</p>
                <p className="text-[10px] text-gray-500">Head Coach</p>
              </div>
              
              <div className="py-1">
                <button 
                  onClick={() => handleNavClick('coaches-nterpret')}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 flex items-center gap-2 ${currentView === 'coaches-nterpret' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                >
                  <Brain size={14} />
                  COACHES NTERPRET
                </button>
                <button 
                  onClick={() => handleNavClick('my-profile')}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 flex items-center gap-2 ${currentView === 'my-profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                >
                  <User size={14} />
                  My Profile
                </button>
              </div>
              
              <div className="border-t border-gray-100 py-1 mt-1">
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
