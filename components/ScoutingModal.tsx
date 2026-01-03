
import React, { useState, useMemo } from 'react';
import { X, Trophy, Target, Zap, Brain, Activity, TrendingUp, Sparkles, MoreHorizontal, Lock, ArrowRight, Mail, Copy, AlertTriangle, Calendar } from 'lucide-react';
import { Player } from '../types';

interface ScoutingModalProps {
  player: Player | null;
  onClose: () => void;
}

type Tab = 'Rankings' | 'NSights' | 'Exercises' | 'NTerpret' | 'Coaches Fit';

const ScoutingModal: React.FC<ScoutingModalProps> = ({ player, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Rankings');
  const [emailCopied, setEmailCopied] = useState(false);

  const details = useMemo(() => {
    if (!player) return null;

    // Derived Metrics
    const scoringRange = player.clutchFactor > 800 ? 'Elite' : player.clutchFactor > 600 ? 'High' : 'Developmental';
    // const roundRank = Math.floor(Math.random() * 20) + 1; // Removed in favor of Grad Class
    const roundPosRank = Math.floor(Math.random() * 5) + 1;

    // Generate Random Email
    const email = (() => {
        const parts = player.name.split(',');
        const lastName = parts[0].trim().toLowerCase();
        const firstName = parts[1] ? parts[1].trim().toLowerCase() : 'player';
        const domains = ['gmail.com', 'icloud.com', 'outlook.com'];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `${firstName}.${lastName}${Math.floor(Math.random() * 99)}@${domain}`;
    })();

    // Generate Rankings Data
    const generateRankingList = (count: number, currentName: string, baseScore: number) => {
      const list = [];
      const names = ['Jones, Liam', 'Lee, John', 'Taylor, Steven', 'Miller, Aiden', 'Miller, Mason', 'Thomas, Liam', 'Thompson, Ethan', 'Lopez, Mason', 'Clark, William', 'Robinson, James'];
      
      const playerPos = Math.floor(Math.random() * 3); 
      
      for(let i = 0; i < count; i++) {
        if (i === playerPos) {
           list.push({ rank: i + 1, name: currentName, score: baseScore, isCurrent: true });
        } else {
           const name = names[i % names.length];
           const score = baseScore - ((i - playerPos) * (Math.floor(Math.random() * 10) + 5));
           list.push({ rank: i + 1, name: name, score: score, isCurrent: false });
        }
      }
      return list.sort((a,b) => b.score - a.score).map((item, idx) => ({...item, rank: idx + 1}));
    };

    const rankings = {
      overall: generateRankingList(10, player.name, player.clutchFactor),
      position: generateRankingList(5, player.name, player.clutchFactor),
      grad: generateRankingList(3, player.name, player.clutchFactor),
    };

    // Generate NSights Data
    const nsights = {
      summary: `${player.name} is a high-performing ${player.level} ${player.position} who demonstrates exceptional emotional regulation and focus in high-leverage situations, as evidenced by his ${player.clutchFactor} Clutch Factor. He thrives when the game is on the line, exhibiting a rare ability to suppress external noise and execute complex defensive plays or high-stakes at-bats with clinical precision.`,
      practice: `Incorporate 'Game 7' pressure simulations into daily training. For ${player.position.toLowerCase()} work, use a points-based system where errors in the final round of drills result in high-intensity conditioning for the group, forcing ${player.name.split(',')[0]} to lead and execute under the weight of social and physical consequences.`,
      approach: `Adopt a high-autonomy, professional tone. ${player.name.split(',')[0]} responds best when treated as a high-level tactician; involve him in the 'why' behind defensive shifts and situational hitting strategies. He does not need cheerleading; he needs objective challenges that test his limits.`,
      coaching: `Focus on 'Chaos ${player.position} Drills' involving multiple live runners and randomized batted ball velocities. This keeps his elite cognitive processing engaged and prevents complacency, ensuring his physical reactions remain as sharp as his mental composure.`
    };

    // Generate Exercises Data
    const exercises = [
      {
        title: "Pressure Pocket Transfer",
        desc: "Rapid-fire fungo drill from the shortstop hole with a 1.2-second timer to clear the ball to first base. Failure to meet the time or accuracy threshold resets the set, simulating the urgency of an elite scoring range scenario."
      },
      {
        title: `The ${player.clutchFactor} Situational Box`,
        desc: `Live at-bats starting with a 1-2 count and runners on 2nd and 3rd with two outs. ${player.name.split(',')[0]} must demonstrate his elite scoring range by prioritizing gap-to-gap contact over home run swings to drive in both runs.`
      }
    ];

    // Generate NTerpret Data
    const nterpret = {
        summary: `${player.name.split(',')[0]} is a quintessential 'Big Game' player. His psychological profile suggests he is the anchor of the team's mental resilience, capable of maintaining elite production levels when his peers might succumb to the pressure of the ${player.level} scouting environment.`,
        considerations: [
          `Grant him leadership of the ${player.position.toLowerCase()} during high-pressure defensive shifts.`,
          "Avoid micromanaging his pre-pitch routine; he is highly self-regulated.",
          "Challenge him with more complex decision-making drills to avoid boredom.",
          "Monitor his fatigue levels, as his high clutch factor can lead to 'playing through' significant strain."
        ],
        mentallyTough: `Exceptional. ${player.name.split(',')[0]} possesses a 'flow state' accessibility that most ${player.level} athletes lack. His ${player.clutchFactor} Clutch Factor indicates that his performance floor rises as the external pressure increases.`,
        commStyle: {
          title: "Direct and Tactical",
          desc: `${player.name.split(',')[0]} prefers concise, data-driven feedback and tactical adjustments. He values directness over emotional encouragement and wants to know exactly how a tweak improves his win probability.`
        },
        learningStyle: {
          title: "Kinaesthetic/Experiential",
          desc: "He is a highly kinaesthetic and situational learner. He internalizes concepts best by 'feeling' the tempo of a live play rather than watching film or reading a playbook."
        },
        motivation: {
          title: "High-Stakes Competition",
          desc: "He is primarily driven by the opportunity to be the deciding factor in a contest. He finds little motivation in low-consequence drills but becomes hyper-focused when a clear winner and loser are defined."
        }
      };

    // Generate Coaches Fit Data (New Feature)
    // Only generate if fitScore is present, otherwise return null structure to indicate pending
    const fitScore = player.fitScore;
    const generateFitData = () => {
        if (fitScore === undefined) return null;

        const domains = [
            "Role Definition", "Adaptability Support", "Communication Style", 
            "Feedback Cadence", "Pressure Motivation", "Accountability Style", 
            "Trust Formation", "Teaching Approach", "Decision-Making", "Team Culture"
        ];
        
        const insightPool = [
            "Both value role clarity with some flexibility, creating a stable foundation.",
            "Coach prefers discussion, while athlete favors directness; bridging this gap will optimize feedback.",
            "A shared preference for rare, necessary feedback prevents overwhelm.",
            "Mutual agreement on reassurance and support effectively motivates under pressure.",
            "Coach's mixed approach needs to align with the athlete's preference for gentle support for optimal impact.",
            "Coach's quick trust contrasts with athlete's gradual approach; consistent effort builds a strong bond.",
            "Both expect and demonstrate high personal adaptability, fostering self-reliance.",
            "Coach's hands-on method could benefit from more initial explanation for the athlete's preferred balance.",
            "Both effectively utilize light cues for decision-making, ensuring smooth on-field adjustments.",
            "Coach's freedom-focus and athlete's need for balanced structure requires thoughtful integration."
        ];

        const breakdown = domains.map((domain, i) => {
           // Weighted random alignment: 50% High, 30% Moderate, 20% Low
           const r = Math.random();
           let alignment: 'HIGH' | 'MODERATE' | 'LOW' = 'HIGH';
           if (r > 0.8) alignment = 'LOW';
           else if (r > 0.5) alignment = 'MODERATE';
           
           // Ensure at least some highs if score is high
           if (fitScore > 80 && alignment === 'LOW') alignment = 'MODERATE';

           return {
             id: (i + 1).toString().padStart(2, '0'),
             domain,
             alignment,
             insight: insightPool[Math.floor(Math.random() * insightPool.length)]
           };
        });

        let fitLabel = "GOOD FIT";
        let summaryQuote = "\"This partnership shows promise with aligned goals, though some adaptation will be required.\"";
        
        if (fitScore >= 80) {
            fitLabel = "EXCEPTIONAL FIT";
            summaryQuote = "\"This partnership exhibits exceptional synergy, fueled by a shared philosophy across many key domains. High potential for sustained elite performance and mutual growth due to strong natural alignment and understanding.\"";
        } else if (fitScore >= 60) {
            fitLabel = "MODERATE FIT";
            summaryQuote = "\"There is a solid foundation here, though specific communication protocols will need to be established early to bridge gaps in feedback cadence and accountability styles.\"";
        } else {
            fitLabel = "DEVELOPMENTAL FIT";
            summaryQuote = "\"Significant differences in approach suggest a need for a dedicated integration plan to ensure mutual understanding, particularly regarding role definition and trust formation.\"";
        }

        return { fitLabel, summaryQuote, breakdown };
    };

    const coachesFit = generateFitData();

    return { scoringRange, roundPosRank, rankings, nsights, exercises, nterpret, coachesFit, email };
  }, [player]);

  const handleCopyEmail = () => {
    if (details?.email) {
        navigator.clipboard.writeText(details.email);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  if (!player || !details) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-start bg-white flex-shrink-0 z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-light text-gray-900 tracking-tight">{player.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${player.needsRetest ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                    {player.needsRetest ? 'Needs Retest' : 'Active'}
                </span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
               <span className="flex items-center gap-1.5"><Trophy size={14} className="text-blue-500"/> {player.position}</span>
               <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-blue-500"/> {player.level}</span>
               <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-500" /> Class of {player.graduationYear}</span>
               
               <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>

               <button 
                 onClick={handleCopyEmail}
                 className="flex items-center gap-1.5 hover:text-gray-900 transition-colors group"
                 title="Click to copy email"
               >
                  <Mail size={14} className="text-blue-500" />
                  <span className="underline decoration-dotted decoration-gray-300 underline-offset-4 group-hover:decoration-gray-900">{details.email}</span>
                  {emailCopied ? (
                     <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold ml-1 animate-in zoom-in">Copied</span>
                  ) : (
                     <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
                  )}
               </button>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 -mr-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Layout: Fixed Metrics Top + Scrollable Body */}
        <div className="flex flex-col h-full overflow-hidden bg-white">
            
            {/* Disclaimer for Needs Retest */}
            {player.needsRetest && (
                <div className="bg-red-50 px-8 py-3 border-b border-red-100 flex items-start gap-3 flex-shrink-0">
                    <AlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
                    <p className="text-xs text-red-700 leading-relaxed">
                        <span className="font-bold">Retest Required:</span> A player who needs a retest means their Clutch Factor score may not currently represent their current capabilities in high leverage moments. This does not effect NSights, Suggested Exercises, NTerpret data or Fit Analysis data, as those are standardized towards athletes personality & motivations - not outward performance metrics.
                    </p>
                </div>
            )}

            {/* Key Metrics Dashboard - Visually Distinct */}
            <div className="bg-slate-50/80 px-8 py-6 border-b border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0 backdrop-blur-sm">
                <MetricCard 
                    label="Clutch Factor" 
                    value={player.clutchFactor.toString()} 
                    icon={<Zap size={16} className="text-amber-500" />}
                />
                <MetricCard 
                    label="Scoring Range" 
                    value={details.scoringRange} 
                    icon={<Target size={16} className="text-blue-500" />} 
                />
                <MetricCard 
                    label="Grad Class" 
                    value={player.graduationYear?.toString() || 'N/A'} 
                    icon={<Calendar size={16} className="text-purple-500" />} 
                />
                <MetricCard 
                    label="Class Rank" 
                    value={`#${details.roundPosRank} in ${player.graduationYear}`} 
                    icon={<Trophy size={16} className="text-emerald-500" />} 
                    isLongText={true}
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-grow overflow-hidden">
                {/* Navigation Tabs */}
                <div className="px-8 border-b border-gray-100 bg-white flex-shrink-0">
                    <div className="flex gap-8">
                    {(['Rankings', 'NSights', 'Exercises', 'NTerpret', 'Coaches Fit'] as Tab[]).map((tab) => (
                        <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
                            activeTab === tab
                            ? 'text-black border-black'
                            : 'text-gray-400 border-transparent hover:text-gray-600'
                        }`}
                        >
                        {tab === 'Coaches Fit' ? (
                            <span className="flex items-center gap-2">
                                Coaches Fit
                                <span className={`px-1.5 py-0.5 rounded text-[9px] ${details.coachesFit ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>AI</span>
                            </span>
                        ) : tab}
                        </button>
                    ))}
                    </div>
                </div>

                {/* Scrollable Panel */}
                <div className="flex-grow overflow-y-auto bg-slate-50 scrollbar-thin scrollbar-thumb-gray-200">
                    <div className="p-8">
                    {activeTab === 'Rankings' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <RankingColumn title="Overall Rankings" data={details.rankings.overall} />
                        <RankingColumn title="Position Rankings" data={details.rankings.position} />
                        <RankingColumn title={`Class of ${player.graduationYear}`} data={details.rankings.grad} />
                    </div>
                    )}

                    {activeTab === 'NSights' && (
                    <div className="max-w-3xl space-y-8 animate-in slide-in-from-bottom-2 duration-300">
                        <Section title="Scouting Summary" content={details.nsights.summary} />
                        <Section title="Practice Suggestion" content={details.nsights.practice} />
                        <Section title="Coaching Approach" content={details.nsights.approach} />
                        <Section title="Chaos Drill Suggestion" content={details.nsights.coaching} />
                    </div>
                    )}

                    {activeTab === 'Exercises' && (
                    <div className="max-w-3xl space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        {details.exercises.map((ex, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">{idx + 1}</span>
                                {ex.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed pl-8">{ex.desc}</p>
                        </div>
                        ))}
                    </div>
                    )}

                    {activeTab === 'NTerpret' && (
                    <div className="max-w-3xl space-y-8 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <Brain className="text-blue-600" size={18} />
                                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide">Psychological Profile</h3>
                            </div>
                            <p className="text-blue-800 text-sm leading-relaxed">{details.nterpret.summary}</p>
                        </div>
                    
                        <Section title="Coaching Considerations" list={details.nterpret.considerations} />
                        <Section title="Mental Toughness" content={details.nterpret.mentallyTough} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Communication</h4>
                                <p className="font-bold text-gray-900 text-sm mb-1">{details.nterpret.commStyle.title}</p>
                                <p className="text-gray-500 text-xs leading-relaxed">{details.nterpret.commStyle.desc}</p>
                            </div>
                            <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Motivation</h4>
                                <p className="font-bold text-gray-900 text-sm mb-1">{details.nterpret.motivation.title}</p>
                                <p className="text-gray-500 text-xs leading-relaxed">{details.nterpret.motivation.desc}</p>
                            </div>
                        </div>
                    </div>
                    )}

                    {activeTab === 'Coaches Fit' && (
                    <div className="w-full animate-in slide-in-from-bottom-2 duration-300">
                        {details.coachesFit ? (
                            <>
                                {/* Top Section: Metrics & Summary */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                                    
                                    {/* Left Card: Score */}
                                    <div className="lg:col-span-4 bg-white rounded-xl p-8 border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[240px]">
                                        <div>
                                            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Validated Metrics</h4>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-7xl font-bold text-gray-900 tracking-tighter">{player.fitScore}%</span>
                                            </div>
                                        </div>
                                        
                                        <div className="absolute top-8 right-8 text-gray-100 opacity-50">
                                            <Activity size={120} />
                                        </div>

                                        <div>
                                            <h3 className={`text-lg font-bold uppercase tracking-wide mb-1 ${player.fitScore! >= 80 ? 'text-emerald-600' : player.fitScore! >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                                                {details.coachesFit.fitLabel}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-medium">Based on 10 psychometric dimensions</p>
                                        </div>
                                    </div>

                                    {/* Right Card: Summary */}
                                    <div className="lg:col-span-8 bg-white rounded-xl p-8 border border-gray-200 shadow-sm flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Sparkles size={16} className="text-blue-600" />
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Executive Summary</h4>
                                        </div>
                                        <p className="text-xl text-gray-700 font-light leading-relaxed mb-8 italic">
                                            {details.coachesFit.summaryQuote}
                                        </p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-500 leading-relaxed">
                                            <div className="flex gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                                                <span>Refine communication to blend collaborative discussion with the athlete's preference for clear, direct guidance.</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                                                <span>Acknowledge the athlete's gradual approach to trust-building, ensuring consistent effort fosters deeper connection.</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                                                <span>Integrate more initial explanations into the 'learning by doing' teaching style to fully support the athlete's preferred balance.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Section: Table */}
                                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Dimensional Breakdown</h3>
                                        <MoreHorizontal size={16} className="text-gray-400" />
                                    </div>
                                    
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-gray-100">
                                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-16">ID</th>
                                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-48">Domain</th>
                                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-32 text-right">Alignment</th>
                                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Analysis Insight</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {details.coachesFit.breakdown.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 text-xs font-mono text-gray-400">{item.id}</td>
                                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.domain}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                                                item.alignment === 'HIGH' ? 'text-emerald-600' : 
                                                                item.alignment === 'MODERATE' ? 'text-amber-500' : 'text-rose-500'
                                                            }`}>
                                                                {item.alignment}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-xs text-gray-600 leading-relaxed">
                                                            {item.insight}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[400px] text-center p-8 bg-white rounded-xl border border-gray-200 shadow-sm border-dashed">
                                <div className="bg-gray-50 p-6 rounded-full mb-6">
                                    <Lock size={48} className="text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Fit Analysis Required</h3>
                                <p className="text-gray-500 max-w-md mb-8">
                                    To see a detailed breakdown of how {player.name} aligns with your coaching style, please run a Fit Analysis from the dashboard.
                                </p>
                                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-lg">
                                    Dashboard <ArrowRight size={14} /> Run Analysis
                                </div>
                            </div>
                        )}
                    </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const MetricCard = ({ label, value, icon, isLongText = false }: { label: string, value: string, icon: React.ReactNode, isLongText?: boolean }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-24 hover:border-blue-300 transition-colors group">
        <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
            <div className="opacity-50 group-hover:opacity-100 transition-opacity scale-90">{icon}</div>
        </div>
        <span className={`${isLongText ? 'text-lg leading-tight' : 'text-2xl'} font-light text-gray-900 tracking-tight`}>{value}</span>
    </div>
);

const Section = ({ title, content, list }: { title: string, content?: string, list?: string[] }) => (
    <section>
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">{title}</h3>
        {content && <p className="text-gray-600 text-sm leading-relaxed">{content}</p>}
        {list && (
            <ul className="space-y-3">
                {list.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600">
                        <span className="text-blue-400 mt-1.5">•</span>
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        )}
    </section>
);

const RankingColumn = ({ title, data }: { title: string, data: any[] }) => (
    <div className="bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h3>
        </div>
        <div className="p-2 space-y-1">
            {data.map((item) => (
                <div key={item.rank} className={`flex justify-between items-center p-2 rounded-lg ${item.isCurrent ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold w-4 ${item.isCurrent ? 'text-blue-600' : 'text-gray-400'}`}>{item.rank}</span>
                        <span className={`text-sm ${item.isCurrent ? 'font-bold text-gray-900' : 'text-gray-600'}`}>{item.name}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">{item.score}</span>
                </div>
            ))}
        </div>
    </div>
);

export default ScoutingModal;
