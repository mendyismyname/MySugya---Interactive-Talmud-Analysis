
import React, { useState, useEffect } from 'react';
import { LogicNode, SugyaSection, DafSegment } from '../types';
import { BookOpen, Scroll, Book, ArrowUp, ArrowDown, ChevronRight, Link2, ExternalLink, X, Library } from 'lucide-react';
import { TextRenderer } from './TextRenderer';

interface Props {
  sugya: SugyaSection;
  activeSource: 'CHUMASH' | 'MISHNA' | 'GEMARA';
  activeSegmentId?: string | null;
  onAnalyze: (node: LogicNode) => void;
  onSwitchSugya: (id: string) => void;
  availableSugyas: {id: string, title: string, masechta: string, masechtaHebrew?: string, daf: string}[];
  onNavigateSource?: (direction: 'next') => void;
}

export const TzurasHadaf: React.FC<Props> = ({ sugya, activeSource, activeSegmentId, onAnalyze, onSwitchSugya, availableSugyas, onNavigateSource }) => {
  const [showEnglish, setShowEnglish] = useState(false);
  const [sugyaDropdownOpen, setSugyaDropdownOpen] = useState(false);

  // Auto-scroll to active segment
  useEffect(() => {
      if (activeSegmentId) {
          const el = document.getElementById(`segment-${activeSegmentId}`);
          if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
      }
  }, [activeSegmentId]);

  // --- RENDERERS ---

  const renderHeader = () => {
      let titleDisplay = '';
      let subTitleDisplay = '';
      let headerLeftContent: React.ReactNode = null;

      if (activeSource === 'CHUMASH') {
          titleDisplay = 'מקראות גדולות';
          subTitleDisplay = 'חומש דברים';
          headerLeftContent = (
              <div className="flex flex-col items-end">
                  <div className="font-hebrew-serif font-bold text-stone-900 text-right">
                      <span className="text-xl">פרק כ"ד : פסוק א'</span>
                  </div>
                  <div className="font-hebrew-serif text-sm text-stone-600 mt-1 flex gap-3">
                      <span>כי תצא</span>
                      <span>|</span>
                      <span>דברים</span>
                  </div>
              </div>
          );
      } else if (activeSource === 'MISHNA') {
          titleDisplay = 'משניות'; 
          subTitleDisplay = 'סדר נשים';
          headerLeftContent = (
              <div className="font-hebrew-serif text-3xl font-bold text-stone-900 mb-2">
                  א : א
              </div>
          );
      } else {
          const found = availableSugyas.find(s => s.id === sugya.id);
          titleDisplay = (found as any)?.masechtaHebrew || sugya.sourceRef.split(' ')[0] || 'קידושין'; 
          subTitleDisplay = 'עין משפט נר מצוה';
          headerLeftContent = (
              <div className="font-hebrew-serif text-3xl font-bold text-stone-900 mb-2" dir="rtl">
                  ו: - ז.
              </div>
          );
      }

      return (
        <div className="pt-6 pb-2 px-6 md:px-12 border-b-2 border-stone-800 border-double mx-4 md:mx-8 flex flex-col md:flex-row items-center md:items-end justify-between relative z-10 gap-4">
            <div className="md:w-1/2 text-center order-1 md:order-2">
                 <div 
                    className="font-hebrew-serif text-4xl md:text-6xl font-black text-stone-900 leading-[0.9] tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={(e) => { e.stopPropagation(); setSugyaDropdownOpen(!sugyaDropdownOpen); }}
                 >
                    {titleDisplay}
                 </div>
                 
                 {sugyaDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white border border-stone-200 shadow-xl rounded-sm py-2 z-50 text-left">
                        {availableSugyas.map(s => (
                            <button
                                key={s.id}
                                onClick={() => { onSwitchSugya(s.id); setSugyaDropdownOpen(false); }}
                                className={`w-full text-left px-4 py-3 text-sm font-bold border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors ${s.id === sugya.id ? 'text-indigo-700 bg-indigo-50/50' : 'text-stone-700'}`}
                            >
                                <span className="block font-hebrew text-lg mb-0.5">{s.title}</span>
                                <span className="text-xs text-stone-400 uppercase tracking-wide">{s.masechta} {s.daf}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full md:w-1/4 text-center md:text-right order-2 md:order-1">
                 <div className="font-hebrew-serif text-xl font-bold text-stone-900">
                    {activeSource === 'CHUMASH' ? sugya.chumashText?.sourceRef : activeSource === 'MISHNA' ? 'מסכת קידושין' : 'פרק ראשון'}
                 </div>
                 <div className="font-hebrew-serif text-sm text-stone-600 mt-1">
                    {subTitleDisplay}
                 </div>
            </div>

            <div className="w-full md:w-1/4 text-center md:text-left flex flex-col items-center md:items-end order-3 md:order-3">
                 {headerLeftContent}
                 <button 
                    onClick={() => setShowEnglish(!showEnglish)}
                    className={`mt-2 flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider border rounded transition-all ${showEnglish ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-500 border-stone-300 hover:bg-stone-50'}`}
                 >
                    <BookOpen size={14} />
                    English
                 </button>
            </div>
        </div>
      );
  };

  const renderChumash = () => {
      const data = sugya.chumashText;
      if (!data) return <div className="p-10 text-center text-stone-400">Source text not available.</div>;

      return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-10">
              {/* Rashi / Commentaries */}
              <div className="md:col-span-1 border-l border-stone-200 pl-6 space-y-6" dir="rtl">
                  <div className="text-center mb-4"><span className="font-rashi font-bold text-lg border-b border-stone-300">רש"י</span></div>
                  {data.rashi.map((comment) => (
                      <div key={comment.id}>
                          <div className="font-rashi text-stone-900 leading-relaxed text-lg">
                              <span className="font-bold">{comment.text.split('-')[0]} - </span>
                              {comment.text.split('-')[1]}
                          </div>
                          {showEnglish && comment.translation && (
                              <div className="mt-1 text-sm font-serif text-stone-600 bg-stone-50 p-2 rounded">
                                  {comment.translation}
                              </div>
                          )}
                      </div>
                  ))}
              </div>

              {/* Main Text */}
              <div className="md:col-span-2 text-center">
                  <div className="font-hebrew-serif text-4xl leading-[1.6] text-stone-900 mb-8 px-4 py-6 bg-white shadow-sm border border-stone-100 rounded-lg">
                      {data.text}
                  </div>
                  {showEnglish && (
                      <div className="font-serif text-lg text-stone-700 italic mb-8 max-w-2xl mx-auto">
                          "{data.translation}"
                      </div>
                  )}
                  
                  {/* Targum */}
                  <div className="mt-12 pt-8 border-t border-stone-200">
                      <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">Targum Onkelos</div>
                      <div className="font-hebrew text-xl text-stone-600 leading-relaxed">
                          {data.targum}
                      </div>
                  </div>
              </div>
          </div>
      );
  };

  const renderMishna = () => {
      const data = sugya.mishnaContext;
      if (!data || !data.current) return <div className="p-10 text-center text-stone-400">Mishna text not available.</div>;

      return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-8 py-10 min-h-[600px]">
              {/* Bartenura (Left) */}
              <div className="md:col-span-3 border-r border-stone-200 pr-6 space-y-6 order-2 md:order-1" dir="rtl">
                  <div className="text-center mb-4"><span className="font-rashi font-bold text-lg border-b border-stone-300">רע"ב</span></div>
                  {data.bartenura?.map((comment) => (
                      <div key={comment.id} className="mb-4">
                          <div className="font-rashi text-stone-900 leading-relaxed text-lg">
                              <span className="font-bold">{comment.hebrewText.split('-')[0]} - </span>
                              {comment.hebrewText.split('-')[1]}
                          </div>
                      </div>
                  ))}
              </div>

              {/* Main Text (Center) */}
              <div className="md:col-span-6 text-center order-1 md:order-2">
                  <div className="font-hebrew-serif text-3xl leading-[1.8] text-stone-900 mb-8 px-6 py-8 bg-[#fdfbf7] border border-stone-200 shadow-inner rounded-sm">
                      <span className="font-bold text-4xl mr-2">מתני׳</span>
                      {data.current.hebrew}
                  </div>
                  {showEnglish && (
                      <div className="font-serif text-lg text-stone-800 leading-relaxed bg-white p-4 rounded shadow-sm border border-stone-100 text-left">
                          {data.current.english}
                      </div>
                  )}
              </div>

              {/* Navigation / Context (Right) */}
              <div className="md:col-span-3 border-l border-stone-200 pl-6 flex flex-col justify-between order-3">
                  {data.previous && (
                      <div className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                          <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Previous Mishna</div>
                          <div className="font-hebrew text-sm text-stone-600 line-clamp-3 text-right" dir="rtl">
                              {data.previous.hebrew}
                          </div>
                      </div>
                  )}
                  {data.next && (
                      <div className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer mt-8">
                          <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Next Mishna</div>
                          <div className="font-hebrew text-sm text-stone-600 line-clamp-3 text-right" dir="rtl">
                              {data.next.hebrew}
                          </div>
                      </div>
                  )}
              </div>
          </div>
      );
  };

  const renderCommentaryBlock = (comment: any, isRashi: boolean) => {
      return (
        <div key={comment.id} className="mb-4 p-1 hover:bg-stone-100 rounded transition-colors group">
            <div className="text-lg font-rashi leading-relaxed text-stone-900">
                <span className="font-bold">{comment.hebrewText.split('-')[0] || comment.hebrewText.split('.')[0]} - </span>
                {comment.hebrewText.substring(comment.hebrewText.indexOf('-') + 1 || comment.hebrewText.indexOf('.') + 1)}
            </div>
            
            {showEnglish && comment.englishText && (
                <div className="mt-2 text-sm font-serif text-stone-600 border-r-2 border-stone-400 pr-2 bg-stone-50 p-2 rounded">
                    {comment.englishText}
                </div>
            )}
        </div>
      );
  }

  const renderGemaraStructure = () => {
      // Logic for Gemara Page
      return (
        <div className="grid grid-cols-12 gap-0 relative min-h-[1200px] items-stretch">
            {/* RIGHT: RASHI */}
            <div className="col-span-12 md:col-span-3 border-l border-stone-300 py-6 px-4 bg-[#fdfbf7]/30 flex flex-col order-2 md:order-1">
                <div className="text-center mb-6"><span className="font-rashi font-bold text-xl text-stone-900 border-b border-stone-400 pb-1 inline-block">רש"י</span></div>
                <div className="flex-1 space-y-6" dir="rtl">
                    {sugya.dafStructure?.map((seg, idx) => (
                        <div key={`rashi-block-${idx}`} className="border-b border-stone-200/50 pb-4 mb-2 last:border-0">
                            {seg.rashi.map((comment) => renderCommentaryBlock(comment, true))}
                        </div>
                    ))}
                </div>
            </div>

            {/* CENTER: GEMARA */}
            <div className="col-span-12 md:col-span-6 md:col-start-4 md:col-end-10 py-10 px-8 relative order-1 md:order-2 border-x-0 md:border-x border-transparent">
                <div className="text-center mb-8"><span className="font-hebrew-serif text-3xl font-bold text-stone-900 border-b-2 border-stone-900 pb-1 px-8 inline-block tracking-[0.3em]">מתני׳</span></div>
                
                {/* Mishna (First Segment) */}
                {sugya.dafStructure?.[0] && (
                    <div className="text-justify font-hebrew-serif text-2xl md:text-3xl leading-[1.8] text-stone-900 mb-8 p-2 rounded transition-colors" dir="rtl">
                        <span className="font-black text-4xl mr-1">תנו רבנן: </span>
                        {sugya.dafStructure[0].gemaraText.hebrew.replace('תנו רבנן:', '')}
                    </div>
                )}
                {showEnglish && sugya.dafStructure?.[0] && (
                    <div className="mb-8 font-serif text-stone-800 text-lg leading-relaxed text-right border-r-4 border-stone-300 pr-4 bg-white/50 p-4 rounded shadow-sm">
                        {sugya.dafStructure[0].gemaraText.english}
                    </div>
                )}

                <div className="flex items-center justify-center gap-4 my-10"><div className="h-px bg-stone-900 w-16"></div><span className="font-hebrew-serif text-3xl font-bold text-stone-900">גמ׳</span><div className="h-px bg-stone-900 w-16"></div></div>

                {/* Rest of Segments (Gemara) */}
                {sugya.dafStructure?.slice(1).map((seg, idx) => {
                    const isActive = activeSegmentId === seg.id;
                    return (
                        <div 
                            key={seg.id} 
                            id={`segment-${seg.id}`}
                            className={`
                                mb-8 group rounded transition-all duration-500
                                ${isActive ? 'bg-[#fffacd] shadow-md ring-4 ring-[#fffacd] border-stone-300' : ''}
                            `}
                        >
                            <div className="text-justify font-hebrew-serif text-xl md:text-2xl leading-[1.8] text-stone-900 mb-4 p-2 rounded transition-colors" dir="rtl">
                                {seg.gemaraText.hebrew}
                            </div>
                            {showEnglish && (
                                <div className="mb-8 font-serif text-stone-800 text-lg leading-relaxed text-right border-r-4 border-stone-300 pr-4 bg-white/50 p-4 rounded shadow-sm">
                                    {seg.gemaraText.english}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* LEFT: TOSFOS */}
            <div className="col-span-12 md:col-span-3 md:col-start-10 md:col-end-13 border-r border-stone-300 py-6 px-4 bg-[#fdfbf7]/30 flex flex-col order-3 md:order-3">
                <div className="text-center mb-6"><span className="font-rashi font-bold text-xl text-stone-900 border-b border-stone-400 pb-1 inline-block">תוספות</span></div>
                <div className="flex-1 space-y-6" dir="rtl">
                    {sugya.dafStructure?.map((seg, idx) => (
                        <div key={`tos-block-${idx}`} className="border-b border-stone-200/50 pb-4 mb-2 last:border-0">
                            {seg.tosfos.map((comment) => renderCommentaryBlock(comment, false))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
  }

  // --- MAIN RENDER ---
  return (
    <div className="flex flex-col items-center bg-[#fdfbf7] w-full p-4 md:p-8 min-h-full" onClick={() => setSugyaDropdownOpen(false)}>
      <div className="w-full max-w-[1600px] bg-white shadow-2xl border border-stone-200 relative h-fit">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none h-full w-full"></div>
        {renderHeader()}
        {activeSource === 'CHUMASH' && renderChumash()}
        {activeSource === 'MISHNA' && renderMishna()}
        {activeSource === 'GEMARA' && renderGemaraStructure()}
        
        {/* NEW: Related Sugyas Section (Background Sources) */}
        {sugya.relatedSources && sugya.relatedSources.length > 0 && (
            <div className="border-t-4 border-stone-200 bg-stone-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6 justify-center text-stone-500">
                        <Library size={20} />
                        <h3 className="font-bold uppercase tracking-widest text-sm">Background Sugyas & Parallel Sources</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        {sugya.relatedSources.map(source => (
                            <div key={source.id} className="bg-white border border-stone-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2 border-b border-stone-100 pb-2">
                                    <span className="font-bold text-indigo-700 text-sm">{source.speaker}</span>
                                    <span className="text-[10px] font-bold bg-stone-100 text-stone-500 px-2 py-0.5 rounded">{source.era}</span>
                                </div>
                                <div className="font-hebrew text-lg text-stone-800 leading-relaxed text-right mb-3" dir="rtl">
                                    {source.hebrewText}
                                </div>
                                {showEnglish && (
                                    <div className="text-sm font-serif text-stone-600 bg-stone-50 p-3 rounded">
                                        {source.englishText}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* Footer */}
        <div className="border-t-2 border-stone-800 border-double mx-4 md:mx-8 py-4 mb-4 mt-8">
            <div className="flex flex-col md:flex-row justify-between text-[10px] font-hebrew-serif text-stone-600 px-4 gap-2 text-center md:text-right">
                <span>מסורת הש"ס: א. [דף ב.] ב. [רמב"ם פ"ג]</span>
                <span>עין משפט: א. מיי' פ"ט מהל' גזילה</span>
                <span>תורה אור: א. (שמות כב)</span>
            </div>
        </div>
      </div>
    </div>
  );
};
