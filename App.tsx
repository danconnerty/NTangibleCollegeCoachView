
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ParticipantTable from './components/ParticipantTable';
import CoachesNterpret from './components/CoachesNterpret';
import MyProfile from './components/MyProfile';
import { ViewType, Player } from './types';
import { MOCK_PLAYERS } from './mockData';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [players, setPlayers] = useState<Player[]>(MOCK_PLAYERS);
  
  // Filter States
  const [selectedPosition, setSelectedPosition] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedGradYear, setSelectedGradYear] = useState<string>('All');

  const positions = ['All', 'Pitcher', 'Catcher', 'Infielder', 'Outfielder', 'Shortstop', 'First Base', 'Third Base'];
  const levels = ['All', 'High School', 'NCAA', 'JUCO', 'PRO'];
  const gradYears = ['All', '2025', '2026', '2027', '2028', '2029', '2030'];

  // Handle view change
  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const FilterSection = ({ title, options, selected, onSelect }: { title: string, options: string[], selected: string, onSelect: (val: string) => void }) => (
    <div className="mb-8">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-3 py-2 rounded-lg text-[11px] font-bold transition-all border ${
              selected === opt 
                ? 'bg-black text-white border-black shadow-sm' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'coaches-nterpret':
        return <CoachesNterpret />;
      case 'my-profile':
        return <MyProfile />;
      case 'home':
      case 'interested':
      default:
        return (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-light text-gray-900 tracking-tight">
                {currentView === 'home' ? 'Future Stars Series' : 'Interested Prospects'}
              </h1>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Filters</h2>
                    <button 
                      onClick={() => { setSelectedPosition('All'); setSelectedLevel('All'); setSelectedGradYear('All'); }}
                      className="text-[10px] text-blue-600 font-bold uppercase hover:underline"
                    >
                      Reset
                    </button>
                  </div>

                  <FilterSection 
                    title="Position" 
                    options={positions} 
                    selected={selectedPosition} 
                    onSelect={setSelectedPosition} 
                  />

                  <FilterSection 
                    title="Level of Play" 
                    options={levels} 
                    selected={selectedLevel} 
                    onSelect={setSelectedLevel} 
                  />

                  <FilterSection 
                    title="Graduation Class" 
                    options={gradYears} 
                    selected={selectedGradYear} 
                    onSelect={setSelectedGradYear} 
                  />

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <p className="text-[10px] text-blue-700 font-medium leading-relaxed uppercase tracking-wider">
                        Filters are applied instantly to the athlete database view.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Table Content */}
              <div className="flex-grow overflow-hidden">
                <ParticipantTable 
                  view={currentView} 
                  players={players} 
                  setPlayers={setPlayers} 
                  externalPositionFilter={selectedPosition}
                  externalLevelFilter={selectedLevel}
                  externalGradYearFilter={selectedGradYear}
                />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header currentView={currentView} onViewChange={handleViewChange} />
      
      <main className="flex-grow container mx-auto px-8 py-10 max-w-[1600px]">
        {renderContent()}
      </main>

      <footer className="py-8 flex flex-col items-center border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2 text-[11px] text-gray-400 tracking-widest uppercase font-bold">
          <span>NTANGIBLE</span>
          <span className="text-gray-300">|</span>
          <span>© 2024</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
