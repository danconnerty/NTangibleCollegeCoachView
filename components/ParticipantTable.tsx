
import React, { useState, useMemo, useCallback } from 'react';
import { Search, ChevronDown, ChevronUp, Star, Cpu, CheckCircle2, AlertTriangle, Target, Loader2 } from 'lucide-react';
import { Player, ViewType } from '../types';
import ScoutingModal from './ScoutingModal';

type SortField = 'graduationYear' | 'clutchFactor' | 'name' | 'position' | 'level' | 'fitScore';
type SortDirection = 'asc' | 'desc';

interface ParticipantTableProps {
  view: ViewType;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  externalPositionFilter: string;
  externalLevelFilter: string;
  externalGradYearFilter: string;
}

const ParticipantTable: React.FC<ParticipantTableProps> = ({ 
  view, 
  players, 
  setPlayers, 
  externalPositionFilter, 
  externalLevelFilter,
  externalGradYearFilter 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('clutchFactor');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [analyzingIds, setAnalyzingIds] = useState<Set<string>>(new Set());

  const toggleInterest = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayers(prev => prev.map(p => 
      p.id === id ? { ...p, isInterested: !p.isInterested } : p
    ));
  };

  const runAnalysis = useCallback((id: string) => {
    setAnalyzingIds(prev => new Set(prev).add(id));
    
    // 5-second loading time
    setTimeout(() => {
      setPlayers(prev => prev.map(p => {
        if (p.id === id) {
          const score = p.fitScore ?? Math.floor(Math.random() * 81) + 10;
          return { ...p, fitScore: score };
        }
        return p;
      }));
      
      setAnalyzingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 5000);
  }, [setPlayers]);

  const selectedPlayer = useMemo(() => 
    players.find(p => p.id === selectedPlayerId) || null, 
  [players, selectedPlayerId]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      const isNumeric = ['clutchFactor', 'graduationYear', 'fitScore'].includes(field);
      setSortDirection(isNumeric ? 'desc' : 'asc');
    }
  };

  const processedPlayers = useMemo(() => {
    let result = [...players];

    if (view === 'interested') {
      result = result.filter(p => p.isInterested);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.position.toLowerCase().includes(q)
      );
    }

    if (externalPositionFilter !== 'All') {
      result = result.filter(p => p.position === externalPositionFilter);
    }

    if (externalLevelFilter !== 'All') {
      result = result.filter(p => p.level === externalLevelFilter);
    }

    if (externalGradYearFilter !== 'All') {
      result = result.filter(p => String(p.graduationYear) === externalGradYearFilter);
    }

    result.sort((a, b) => {
      const valA = a[sortField] ?? (sortDirection === 'asc' ? Infinity : -Infinity);
      const valB = b[sortField] ?? (sortDirection === 'asc' ? Infinity : -Infinity);

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [players, view, searchQuery, externalPositionFilter, externalLevelFilter, externalGradYearFilter, sortField, sortDirection]);

  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown size={14} className="opacity-20" />;
    return sortDirection === 'asc' ? <ChevronUp size={14} className="text-blue-600" /> : <ChevronDown size={14} className="text-blue-600" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score >= 50) return 'text-blue-600 bg-blue-50 border-blue-100';
    if (score >= 30) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-6 border-b border-gray-100 bg-white">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search by athlete name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all text-sm"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
      </div>

      <div className="overflow-x-auto max-h-[700px] scrollbar-thin scrollbar-thumb-gray-200">
        <table className="w-full text-left table-fixed min-w-full">
          <thead className="sticky top-0 bg-white z-20 shadow-sm border-b border-gray-100">
            <tr>
              <th className="w-12 px-6 py-4"></th>
              <th 
                className="w-[18%] px-2 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Name <SortIndicator field="name" />
                </div>
              </th>
              <th 
                className="w-[12%] px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('position')}
              >
                 <div className="flex items-center gap-1">
                  Position <SortIndicator field="position" />
                </div>
              </th>
              <th 
                className="w-[12%] px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('level')}
              >
                 <div className="flex items-center gap-1">
                  Level <SortIndicator field="level" />
                </div>
              </th>
              <th 
                className="w-[10%] px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('graduationYear')}
              >
                 <div className="flex items-center gap-1">
                  Grad <SortIndicator field="graduationYear" />
                </div>
              </th>
              <th 
                className="w-[12%] px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('clutchFactor')}
              >
                 <div className="flex items-center gap-1">
                  Clutch <SortIndicator field="clutchFactor" />
                </div>
              </th>
              <th className="w-[16%] px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th 
                className="w-[16%] px-6 py-4 text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('fitScore')}
              >
                <div className="flex items-center justify-center gap-1">
                  Fit Probability <SortIndicator field="fitScore" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {processedPlayers.length > 0 ? (
              processedPlayers.map((player) => {
                const isAnalyzing = analyzingIds.has(player.id);
                
                return (
                  <tr key={player.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={(e) => toggleInterest(player.id, e)}
                        className={`transition-all hover:scale-125 ${player.isInterested ? 'text-yellow-400' : 'text-gray-200 hover:text-gray-300'}`}
                      >
                        <Star size={18} fill={player.isInterested ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td 
                      className="px-2 py-4 whitespace-nowrap cursor-pointer hover:bg-white transition-colors"
                      onClick={() => setSelectedPlayerId(player.id)}
                    >
                      <div className="flex items-center">
                        <span className="text-blue-600 font-semibold text-sm hover:underline decoration-blue-400 decoration-2 underline-offset-4 transition-all">
                          {player.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {player.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="px-2 py-1 rounded bg-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                        {player.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                      {player.graduationYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                      {player.clutchFactor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {player.needsRetest ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-500">
                          <AlertTriangle size={12} /> Needs Retest
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                          <CheckCircle2 size={12} /> Up To Date
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center">
                        {player.fitScore !== undefined ? (
                          <div 
                            onClick={() => setSelectedPlayerId(player.id)}
                            className={`w-full max-w-[150px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border cursor-pointer hover:scale-105 transition-transform ${getScoreColor(player.fitScore)}`}
                          >
                            <Target size={14} />
                            {player.fitScore}% Fit
                          </div>
                        ) : (
                          <button 
                            disabled={isAnalyzing}
                            onClick={() => runAnalysis(player.id)}
                            className={`w-full max-w-[150px] flex items-center justify-center gap-2 bg-black text-white px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {isAnalyzing ? (
                              <>
                                <Loader2 size={12} className="animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <Cpu size={12} />
                                Fit Analysis
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Search size={32} className="opacity-20" />
                    <p className="italic text-sm">No athletes found in this view.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Total Results: <span className="text-gray-700">{processedPlayers.length}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
           System Active
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
      </div>

      {selectedPlayer && (
        <ScoutingModal player={selectedPlayer} onClose={() => setSelectedPlayerId(null)} />
      )}
    </div>
  );
};

export default ParticipantTable;
