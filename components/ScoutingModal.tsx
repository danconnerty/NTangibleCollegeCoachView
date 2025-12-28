
import React, { useState, useEffect } from 'react';
import { X, Loader2, Cpu, AlertCircle, CheckCircle2, TrendingUp, Target } from 'lucide-react';
import { Player } from '../types';
import { generateFitAnalysis } from '../services/geminiService';

interface ScoutingModalProps {
  player: Player | null;
  onClose: () => void;
}

const ScoutingModal: React.FC<ScoutingModalProps> = ({ player, onClose }) => {
  const [report, setReport] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (player) {
      const fetchReport = async () => {
        setLoading(true);
        const result = await generateFitAnalysis(player);
        setReport(result);
        setLoading(false);
      };
      fetchReport();
    }
  }, [player]);

  if (!player) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
        <div className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Cpu size={20} className="text-blue-400" />
            <h3 className="font-semibold tracking-wide uppercase text-xs">AI Fit Analysis</h3>
          </div>
          <button onClick={onClose} className="hover:text-gray-300 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 tracking-tight">{player.name}</h4>
              <div className="flex gap-4 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                <span className="bg-gray-100 px-2 py-0.5 rounded">Pos: {player.position}</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded">Clutch: {player.clutchFactor}</span>
                {player.graduationYear && <span className="bg-gray-100 px-2 py-0.5 rounded">Grad: {player.graduationYear}</span>}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${player.needsRetest ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                {player.needsRetest ? (
                  <><AlertCircle size={12} /> Retest Needed</>
                ) : (
                  <><CheckCircle2 size={12} /> Up To Date</>
                )}
              </div>
              {player.fitScore !== undefined && (
                 <div className="flex items-center gap-1.5 text-blue-600 font-black text-xl tracking-tighter">
                   <Target size={20} />
                   {player.fitScore}%
                 </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 min-h-[180px] flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp size={64} />
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Calculating Fit Probability...</p>
              </div>
            ) : (
              <div>
                <div className="text-gray-700 leading-relaxed text-sm font-medium">
                  {report}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200/50">
                   <div className="flex items-center gap-2 text-[10px] text-blue-600 font-bold uppercase tracking-widest">
                     <TrendingUp size={12} /> High Recruitment Fit Potential
                   </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Gemini 3 Pro <span className="text-gray-300 mx-1">|</span> FitEngine v2.4
            </p>
            <button
              onClick={onClose}
              className="px-8 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-bold uppercase tracking-widest"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoutingModal;
