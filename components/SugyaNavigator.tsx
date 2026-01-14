
import React, { useEffect, useRef } from 'react';
import { GuideStep } from '../types';
import { ArrowRight, ArrowLeft, Map, Circle, CheckCircle2, CircleDot, ChevronDown, BookOpen, Lightbulb, GraduationCap, X } from 'lucide-react';

interface Props {
  guide: GuideStep[];
  currentStage: string;
  activeId: string | null;
  onNavigate: (step: GuideStep) => void;
  onClose?: () => void; // New prop for mobile interaction
}

export const SugyaNavigator: React.FC<Props> = ({ guide, currentStage, activeId, onNavigate, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Find active index based on explicit ID if available
  const displayIndex = React.useMemo(() => {
      if (activeId) {
          const idx = guide.findIndex(step => step.id === activeId);
          if (idx !== -1) return idx;
      }
      // Fallback: match first step of current stage if no ID match
      const fallbackIdx = guide.findIndex(step => step.stage === currentStage);
      return fallbackIdx !== -1 ? fallbackIdx : 0;
  }, [guide, activeId, currentStage]);

  // Auto-scroll to active item
  useEffect(() => {
      const activeEl = document.getElementById(`nav-step-${displayIndex}`);
      if (activeEl && scrollRef.current) {
          // Check if element is already in view to avoid unnecessary scrolls
          const rect = activeEl.getBoundingClientRect();
          const parentRect = scrollRef.current.getBoundingClientRect();
          const isInView = (rect.top >= parentRect.top && rect.bottom <= parentRect.bottom);
          
          if (!isInView) {
              scrollRef.current.scrollTo({
                  top: activeEl.offsetTop - 100,
                  behavior: 'smooth'
              });
          }
      }
  }, [displayIndex]);

  return (
    <div className="flex flex-col w-full md:w-96 bg-white border-l border-slate-200 h-full shadow-xl z-20 flex-shrink-0">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase text-xs tracking-widest">
                    <Map size={14} />
                    <span>Study Path</span>
                </div>
                {onClose && (
                    <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600 p-1">
                        <X size={18} />
                    </button>
                )}
            </div>
            <h3 className="font-hebrew text-xl font-bold text-slate-900">מסע הסוגיא</h3>
            <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5">
                <div 
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${((displayIndex + 1) / guide.length) * 100}%` }}
                ></div>
            </div>
            <div className="text-right text-[10px] text-slate-400 mt-1 font-mono">
                Step {displayIndex + 1} of {guide.length}
            </div>
        </div>

        {/* List */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-slate-50/30">
            {guide.map((step, idx) => {
                const isActive = idx === displayIndex;
                const isPast = idx < displayIndex;

                return (
                    <div 
                        key={step.id} 
                        id={`nav-step-${idx}`}
                        onClick={() => onNavigate(step)}
                        className={`
                            relative pl-8 pr-5 py-4 cursor-pointer border-b border-slate-100 transition-all duration-300 group
                            ${isActive ? 'bg-white shadow-md z-10 border-l-4 border-l-indigo-600' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}
                        `}
                    >
                        {/* Timeline Connector */}
                        <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-200 group-hover:bg-slate-300"></div>

                        {/* Dot/Icon */}
                        <div className={`
                            absolute left-[9px] top-5 w-2 h-2 rounded-full z-10 transition-colors
                            ${isActive ? 'bg-indigo-600 ring-4 ring-indigo-50' : 
                              isPast ? 'bg-emerald-400' : 'bg-slate-300'}
                        `}></div>

                        {/* Content */}
                        <div className={`transition-opacity ${isPast || isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'}`}>
                            <div className="flex items-center justify-between mb-1">
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                                    {step.id.includes('rish') ? 'Rishonim' : 
                                     step.id.includes('ach') ? 'Achronim' : 
                                     step.id.includes('gemara') ? 'Gemara' : 
                                     step.id.includes('psak') ? 'Halacha' : 'Source'}
                                </span>
                            </div>
                            <h4 className={`text-sm font-bold leading-tight mb-1 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                                {step.title}
                            </h4>
                            <p className="text-xs text-slate-500 font-serif mb-2">
                                {step.description}
                            </p>
                            
                            {/* Expanded "Teacher's View" for Active Item */}
                            {isActive && (
                                <div className="mt-4 animate-in slide-in-from-left-2 fade-in space-y-3">
                                    {/* The Deep Dive Explanation */}
                                    <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                                        <div className="flex items-center gap-2 mb-2 text-indigo-700 font-bold text-[10px] uppercase tracking-wider">
                                            <GraduationCap size={12} />
                                            <span>Explanation</span>
                                        </div>
                                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                                            {step.deepDive}
                                        </p>
                                    </div>

                                    {/* Key Terms */}
                                    {step.keyTerms && step.keyTerms.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {step.keyTerms.map(term => (
                                                <span key={term} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded border border-slate-200 font-bold">
                                                    {term}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Nuance Alert */}
                                    {step.nuance && (
                                        <div className="flex gap-2 items-start text-[10px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-100">
                                            <Lightbulb size={12} className="shrink-0 mt-0.5" />
                                            <span className="italic">{step.nuance}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Footer Controls */}
        <div className="p-4 pb-8 md:pb-4 border-t border-slate-200 bg-white flex items-center justify-between gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button 
                onClick={() => displayIndex > 0 && onNavigate(guide[displayIndex - 1])}
                disabled={displayIndex === 0}
                className="flex-1 py-3 md:py-2 px-3 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs font-bold uppercase"
            >
                <ArrowLeft size={14} /> Prev
            </button>
            <button 
                onClick={() => displayIndex < guide.length - 1 && onNavigate(guide[displayIndex + 1])}
                disabled={displayIndex === guide.length - 1}
                className="flex-[2] py-3 md:py-2 px-3 rounded bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs font-bold uppercase shadow-md transition-transform active:scale-95"
            >
                Next Step <ArrowRight size={14} />
            </button>
        </div>
    </div>
  );
};
