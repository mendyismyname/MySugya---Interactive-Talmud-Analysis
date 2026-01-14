
import React, { useState } from 'react';
import { Perspective, LogicNode, GuideStep } from '../types';
import { Languages, BookOpen, ChevronLeft, ChevronRight, MessageSquare, Columns, Maximize2, Link2 } from 'lucide-react';
import { TextRenderer } from './TextRenderer';
import { InlineGuideNavigator } from './InlineGuideNavigator';

interface Props {
  perspective: Perspective;
  sourceText: LogicNode;
  category: 'RISHONIM' | 'ACHRONIM';
  relatedSources?: LogicNode[]; // List of all related sugyas
  onNavigate: (direction: 'next' | 'prev') => void;
  // For Inline Navigation
  guide?: GuideStep[];
  activeGuideStepId?: string | null;
  onGuideNext?: (step: GuideStep) => void;
}

export const ScholarDepthView: React.FC<Props> = ({ 
    perspective, 
    category, 
    relatedSources, 
    onNavigate,
    guide,
    activeGuideStepId,
    onGuideNext
}) => {
  const [showEnglish, setShowEnglish] = useState(false);

  // 1. Find Connected Source
  const linkedSource = perspective.rootNode.linkedSourceId && relatedSources 
      ? relatedSources.find(s => s.id === perspective.rootNode.linkedSourceId)
      : null;

  // 2. Find Next Step in Guide
  let nextStep: GuideStep | undefined;
  if (guide && activeGuideStepId) {
      const currentIndex = guide.findIndex(s => s.id === activeGuideStepId);
      if (currentIndex !== -1 && currentIndex < guide.length - 1) {
          nextStep = guide[currentIndex + 1];
      }
  }

  if (!perspective) {
      return (
          <div className="min-h-[500px] flex flex-col items-center justify-center bg-[#fdfbf7] text-stone-500">
              <div className="animate-pulse">Select a scholar from the sidebar</div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center bg-[#fdfbf7] w-full p-4 md:p-8 min-h-full">
      
      {/* Container Card */}
      <div className={`
          bg-white shadow-2xl border border-stone-200 relative mb-12 transition-all duration-500 ease-in-out h-fit
          ${showEnglish ? 'w-full max-w-[1600px]' : 'w-full max-w-[900px]'}
      `}
      >
        
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none h-full w-full"></div>

        {/* Header */}
        <div className="pt-10 pb-6 px-6 md:px-12 border-b-2 border-stone-800 border-double mx-4 md:mx-12 flex flex-col items-center relative z-10">
            
            <div className="flex items-center gap-3 text-stone-400 mb-2">
                <button onClick={() => onNavigate('prev')} className="hover:text-stone-800 transition-colors p-1"><ChevronLeft size={18} /></button>
                <div className="font-hebrew-serif text-lg font-bold text-stone-500 uppercase tracking-widest">
                    {category === 'RISHONIM' ? 'חידושי ראשונים' : 'אוצר אחרונים'}
                </div>
                <button onClick={() => onNavigate('next')} className="hover:text-stone-800 transition-colors p-1"><ChevronRight size={18} /></button>
            </div>

            <div className="font-hebrew-serif text-4xl md:text-6xl font-black text-stone-900 leading-[1.1] tracking-tight text-center mb-6 drop-shadow-sm">
                {perspective.scholarNameHebrew || perspective.scholarName}
            </div>

            {/* Description/Source Ref */}
            <div className="text-stone-600 font-serif italic mb-6 text-sm bg-stone-50 px-4 py-1 rounded-full border border-stone-200">
                {perspective.description}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
                 <button 
                    onClick={() => setShowEnglish(!showEnglish)}
                    className={`
                        flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider border rounded-full transition-all shadow-sm
                        ${showEnglish 
                            ? 'bg-stone-900 text-white border-stone-900 hover:bg-stone-700' 
                            : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50 hover:border-stone-400'}
                    `}
                 >
                    {showEnglish ? <Maximize2 size={14} /> : <Columns size={14} />}
                    {showEnglish ? 'Focus View' : 'Split View'}
                 </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-12 relative z-10">
            
            {/* LINKED SOURCE DISPLAY (If available) */}
            {linkedSource && (
                <div className="mb-10 bg-amber-50/50 border border-amber-200 rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-4">
                    <div className="bg-amber-100/50 px-4 py-2 border-b border-amber-200 flex items-center gap-2">
                        <Link2 size={16} className="text-amber-700" />
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">Related Source: {linkedSource.speaker}</span>
                    </div>
                    <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="font-hebrew text-lg leading-relaxed text-stone-800 text-right" dir="rtl">
                            {linkedSource.hebrewText}
                        </div>
                        <div className="font-serif text-sm leading-relaxed text-stone-600 italic border-t md:border-t-0 md:border-l border-amber-200 pt-4 md:pt-0 md:pl-6">
                            {linkedSource.englishText}
                        </div>
                    </div>
                </div>
            )}

            <div className={`grid gap-12 ${showEnglish ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                
                {/* Right Column: Hebrew (Always visible, always Right in grid) */}
                <div className={`${showEnglish ? 'lg:order-2 border-l-0 lg:border-l border-stone-200 lg:pl-12' : ''}`}>
                    <div className="mb-4 flex items-center justify-end gap-2 opacity-50">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Original Text</span>
                        <BookOpen size={14} />
                    </div>
                    <TextRenderer 
                        text={perspective.rootNode.hebrewText} 
                        isHebrew={true}
                    />
                </div>

                {/* Left Column: English (Visible only if toggled) */}
                {showEnglish && (
                    <div className="lg:order-1 lg:pr-6 animate-in slide-in-from-left-4 fade-in duration-500">
                        <div className="mb-4 flex items-center gap-2 opacity-50">
                            <Languages size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Translation</span>
                        </div>
                        <div className="bg-[#fcfaf5] p-6 md:p-8 rounded-lg border border-stone-200 shadow-inner h-full">
                            <TextRenderer 
                                text={perspective.rootNode.englishText} 
                                isHebrew={false}
                            />
                        </div>
                    </div>
                )}

            </div>

            {/* Analysis Box (Full Width at bottom) */}
            {perspective.analysis && (
                <div className="mt-16 pt-10 border-t border-stone-200">
                    <div className="bg-stone-50 border border-stone-200 p-8 rounded-xl shadow-sm relative overflow-hidden" dir="rtl">
                        <div className="absolute top-0 right-0 w-2 h-full bg-stone-800"></div>
                        <div className="font-hebrew-serif font-bold text-2xl text-stone-900 mb-6 flex items-center gap-3">
                            <MessageSquare size={24} className="text-stone-400" />
                            ביאור העניין
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block font-sans">נושא (Topic)</span>
                                <p className="font-hebrew-serif text-stone-800 text-lg leading-relaxed font-bold">{perspective.analysis.focus}</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block font-sans">חידוש (Novel Idea)</span>
                                <p className="font-hebrew-serif text-stone-800 text-lg leading-relaxed bg-white p-3 rounded border border-stone-200 shadow-sm">
                                    {perspective.analysis.chiddush}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block font-sans">סברה (Reasoning)</span>
                                <p className="font-hebrew-serif text-stone-700 text-lg leading-relaxed italic">
                                    "{perspective.analysis.reasoning}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="pb-8 text-center border-t border-stone-100 pt-4">
             <div className="text-[10px] text-stone-300 font-sans tracking-[0.2em] uppercase">MySugya • Vilna Edition</div>
        </div>

      </div>

      {/* INLINE NAVIGATOR (Outside the card to be distinct) */}
      {nextStep && onGuideNext && (
          <InlineGuideNavigator 
              currentAnalysis={perspective.analysis}
              nextStep={nextStep}
              onNext={() => onGuideNext(nextStep!)}
          />
      )}

    </div>
  );
};
