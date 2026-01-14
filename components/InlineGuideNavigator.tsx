
import React from 'react';
import { ArrowRight, Lightbulb, CheckCircle2, BookOpen, ArrowUpCircle } from 'lucide-react';
import { GuideStep } from '../types';

interface Props {
  currentAnalysis?: {
      focus: string;
      chiddush: string;
      reasoning: string;
  };
  nextStep?: GuideStep;
  onNext: () => void;
}

export const InlineGuideNavigator: React.FC<Props> = ({ currentAnalysis, nextStep, onNext }) => {
  if (!nextStep) return null;

  const handleNext = () => {
      // Scroll main container to top using ID for precision
      const mainContainer = document.getElementById('main-scroll-container'); 
      if (mainContainer) {
          mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
      onNext();
  };

  return (
    <div className="mt-16 mb-12 w-full max-w-4xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-700">
        
        {/* Connection Line */}
        <div className="flex justify-center mb-[-2px] relative z-10">
            <div className="bg-stone-300 w-px h-12"></div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"></div>
            
            <div className="p-8 md:p-10 flex flex-col gap-8">
                
                {/* Header */}
                <div className="flex items-center gap-3 text-indigo-700 border-b border-stone-100 pb-4">
                    <CheckCircle2 size={24} className="fill-indigo-50" />
                    <span className="font-bold uppercase tracking-widest text-sm">Section Complete</span>
                </div>

                {/* Summary Content */}
                {currentAnalysis ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Subject (נושא)</span>
                            <h3 className="font-hebrew text-2xl font-bold text-stone-900 leading-tight mb-4">
                                {currentAnalysis.focus}
                            </h3>
                            <div className="flex gap-2 items-start">
                                <Lightbulb size={18} className="text-amber-500 shrink-0 mt-1" />
                                <div>
                                    <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Innovation (חידוש)</span>
                                    <p className="font-serif font-medium text-stone-800 text-lg leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                                        "{currentAnalysis.chiddush}"
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Reasoning (סברה)</span>
                             <div className="flex-1 bg-stone-50 p-4 rounded-lg border border-stone-100 text-stone-700 font-serif leading-relaxed italic text-sm">
                                 {currentAnalysis.reasoning}
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-stone-500 italic py-4">
                        Proceed to the next step of the sugya.
                    </div>
                )}

                {/* Navigation Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-stone-100 mt-2">
                    <div className="text-left">
                        <div className="text-[10px] font-bold uppercase text-stone-400 mb-1">Up Next</div>
                        <div className="flex items-center gap-2">
                            <div className={`
                                w-2 h-2 rounded-full 
                                ${nextStep.stage.includes('RISHON') ? 'bg-indigo-500' : 
                                  nextStep.stage.includes('ACHRON') ? 'bg-purple-500' : 
                                  nextStep.stage.includes('GEMARA') ? 'bg-blue-500' : 'bg-slate-500'}
                            `}></div>
                            <span className="font-bold text-xl text-stone-900">{nextStep.title}</span>
                        </div>
                        <div className="text-xs text-stone-500 mt-1 max-w-md">{nextStep.description}</div>
                    </div>

                    <button 
                        onClick={handleNext}
                        className="
                            group relative flex items-center gap-4 px-8 py-4 
                            bg-slate-900 text-white rounded-xl
                            hover:bg-indigo-600 transition-all duration-300
                            shadow-lg hover:shadow-indigo-200 hover:-translate-y-1
                            w-full md:w-auto justify-center
                        "
                    >
                        <span className="font-bold text-lg tracking-wide">Continue</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>
        </div>
    </div>
  );
};
