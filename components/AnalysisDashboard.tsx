
import React, { useState } from 'react';
import { AnalysisComponent, ModernApplication, VisualFlowStep, SugyaSection } from '../types';
import { 
    Briefcase, Gavel, Scale, BookOpen, ArrowRight, DollarSign, BrainCircuit, 
    ChevronDown, Sparkles, Network, AlertTriangle, Split, CheckCircle2, 
    HelpCircle, Play, XCircle, Search, Lightbulb, X, ArrowUpRight, ArrowDown, ChevronRight
} from 'lucide-react';

interface Props {
  sugya: SugyaSection;
  section: 'STRUCTURE' | 'LOGIC' | 'MELITZA';
  onSelectNode: (id: string) => void;
  onGenerateAi: () => void;
  isGenerating: boolean;
}

export const AnalysisDashboard: React.FC<Props> = ({ sugya, section, onSelectNode, onGenerateAi, isGenerating }) => {
  const [activeLogicIdx, setActiveLogicIdx] = useState<number>(0);
  const [selectedMelitza, setSelectedMelitza] = useState<ModernApplication | null>(null);
  const [mobileSyllogismOpen, setMobileSyllogismOpen] = useState(false);
  
  const hasData = (sugya.analysis && sugya.analysis.length > 0) || (sugya.logicSystem?.statements && sugya.logicSystem.statements.length > 0);

  if (isGenerating) {
       return (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center bg-[#fdfbf7]">
              <div className="w-16 h-16 border-4 border-stone-300 border-t-slate-900 rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-bold text-stone-800 mb-2 font-hebrew">מעבד נתונים...</h3>
              <p className="text-stone-500 font-serif">Deconstructing arguments, mapping logic flow, and finding modern parallels.</p>
          </div>
       );
  }

  if (!hasData && !isGenerating) {
      return (
          <div className="flex flex-col items-center justify-center h-full p-12 text-center bg-[#fdfbf7]">
              <div className="max-w-md p-8 bg-white border border-stone-300 shadow-xl rounded-sm">
                <BrainCircuit size={64} className="text-stone-300 mb-6 mx-auto" />
                <h3 className="text-2xl font-hebrew font-bold text-stone-900 mb-2">חסר תוכן הניתוח</h3>
                <p className="text-stone-500 mb-8 font-serif italic">
                    Deep analysis content is missing for this Sugya.
                </p>
              </div>
          </div>
      )
  }

  // --- SUB-COMPONENT RENDERERS ---

  const renderVisualFlowStep = (step: VisualFlowStep, isLastRoot: boolean = false) => {
      const hasBranches = step.branches && step.branches.length > 0;

      // Icon Selection
      let Icon = Play;
      let colorClass = "border-stone-300 bg-white text-stone-700";
      let iconBg = "bg-stone-100 text-stone-500";

      if (step.type === 'QUESTION') {
          Icon = HelpCircle;
          colorClass = "border-red-200 bg-red-50/30 text-red-900";
          iconBg = "bg-red-100 text-red-500";
      } else if (step.type === 'DECISION') {
          Icon = Split;
          colorClass = "border-amber-200 bg-amber-50/30 text-amber-900";
          iconBg = "bg-amber-100 text-amber-600";
      } else if (step.type === 'RESULT') {
          if (step.status === 'VALID' || step.status === 'NEUTRAL') {
              Icon = CheckCircle2;
              colorClass = "border-emerald-200 bg-emerald-50/30 text-emerald-900";
              iconBg = "bg-emerald-100 text-emerald-600";
          } else {
              Icon = XCircle;
              colorClass = "border-rose-200 bg-rose-50/30 text-rose-900";
              iconBg = "bg-rose-100 text-rose-600";
          }
      }

      return (
          <div key={step.id} className="flex flex-col items-center mx-4">
              {/* Node Card */}
              <div className={`
                  relative z-10 w-64 md:w-80 p-4 rounded-xl border-2 shadow-sm mb-8 transition-transform hover:scale-105 duration-300 shrink-0
                  ${colorClass}
              `}>
                  <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg shrink-0 ${iconBg}`}>
                          <Icon size={20} />
                      </div>
                      <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">
                              {step.type}
                          </div>
                          <div className="font-bold text-sm leading-tight mb-1">{step.label}</div>
                          {step.description && (
                              <div className="text-xs opacity-80 font-serif leading-snug">{step.description}</div>
                          )}
                      </div>
                  </div>
                  
                  {/* Connector Dot (Bottom) - Show if has branches OR if it connects to next root */}
                  {(hasBranches || !isLastRoot) && (
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-300 rounded-full border-2 border-white"></div>
                  )}
              </div>

              {/* Branches */}
              {hasBranches && (
                  <div className="flex justify-center relative pt-8">
                      {/* Vertical Line from Parent to Bar */}
                      <div className="absolute top-[-32px] left-1/2 -translate-x-1/2 h-8 w-0.5 bg-stone-300"></div>

                      {/* Horizontal Bar */}
                      {step.branches!.length > 1 && (
                          <div className="absolute top-0 left-[20%] right-[20%] h-0.5 bg-stone-300 rounded"></div>
                      )}
                      
                      <div className="flex gap-4 md:gap-8">
                          {step.branches!.map((branch, idx) => (
                              <div key={branch.id} className="flex flex-col items-center relative">
                                  {/* Vertical Line from Bar to Child */}
                                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-0.5 bg-stone-300"></div>
                                  
                                  {renderVisualFlowStep(branch, true)} {/* Branches are always leaves relative to this context unless they have their own branches */}
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      );
  };

  const renderStructurePage = () => (
      <div className="w-full max-w-[1600px] grid grid-cols-1 xl:grid-cols-12 gap-8 relative flex-1 min-h-[800px]">
        {/* RIGHT (Tvunos - Deep Components) */}
        <div className="xl:col-span-3 order-1 xl:order-1" dir="rtl">
            <div className="bg-stone-50 border-y-4 border-stone-200 p-6 rounded-sm h-full">
                 <div className="text-center mb-6">
                     <h3 className="font-hebrew font-bold text-xl text-stone-900 border-b border-stone-300 pb-2 inline-block">
                         יסודות הסוגיא
                     </h3>
                     <span className="text-[10px] text-stone-400 uppercase tracking-widest block mt-2">Analytical Components</span>
                 </div>
                 
                 {/* Grid changes from horizontal (2/4 cols) to vertical (1 col) based on screen */}
                 <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-1 gap-4 xl:space-y-4 xl:block">
                    {['CASE', 'LAW', 'FACTOR', 'SOURCE'].map((category) => {
                        const item = sugya.analysis?.find(d => d.category === category);
                        if (!item) return null;
                        return (
                            <div key={category} className="relative pl-4 pr-2 py-2 group cursor-default bg-white xl:bg-transparent rounded xl:rounded-none border xl:border-none border-stone-100 shadow-sm xl:shadow-none h-full xl:h-auto">
                                {/* Vertical Accent Line */}
                                <div className={`absolute right-0 top-0 bottom-0 w-1 rounded-r xl:rounded-full transition-all group-hover:h-full
                                    ${category === 'CASE' ? 'bg-amber-400 h-full' : 
                                      category === 'LAW' ? 'bg-indigo-400 h-4' : 
                                      category === 'FACTOR' ? 'bg-rose-400 h-4' : 'bg-emerald-400 h-4'}
                                `}></div>
                                
                                <div className="flex items-center gap-2 mb-1 justify-end">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{category}</span>
                                    {category === 'CASE' && <Briefcase size={12} className="text-amber-500" />}
                                    {category === 'LAW' && <Gavel size={12} className="text-indigo-500" />}
                                    {category === 'FACTOR' && <Scale size={12} className="text-rose-500" />}
                                    {category === 'SOURCE' && <BookOpen size={12} className="text-emerald-500" />}
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-stone-800 text-sm line-clamp-1 xl:line-clamp-none">{item.title}</div>
                                    <div className="text-xs text-stone-500 font-serif mt-1 leading-relaxed line-clamp-2 xl:line-clamp-none">
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                 </div>
            </div>
        </div>

        {/* CENTER (Massa U'Matan - Flow) */}
        <div className="xl:col-span-9 bg-white shadow-xl border border-stone-200 rounded-xl p-8 md:p-12 relative flex flex-col min-h-[600px] xl:min-h-[1000px] order-2 xl:order-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 rounded-t-xl"></div>
            
            <div className="text-center mb-8 md:mb-16">
                <span className="bg-stone-100 text-stone-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 inline-block">
                    Structural Flow
                </span>
                <h2 className="font-hebrew text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
                    משא ומתן של הלכה
                </h2>
                <p className="text-stone-400 font-serif text-xs md:text-sm mt-2">Follow the step-by-step development of the Gemara's conclusion</p>
            </div>
            
            {/* Scrollable Container with centering */}
            <div className="flex-1 overflow-x-auto custom-scrollbar w-full">
                <div className="min-w-max flex flex-col items-center py-8 px-4">
                    {sugya.visualFlow && sugya.visualFlow.length > 0 ? (
                        sugya.visualFlow.map((step, idx) => (
                            <React.Fragment key={step.id}>
                                {/* Render the step */}
                                {renderVisualFlowStep(step, idx === sugya.visualFlow.length - 1)}
                                
                                {/* Vertical Connector between roots */}
                                {idx < sugya.visualFlow.length - 1 && (
                                    <div className="h-8 w-0.5 bg-stone-300 -mt-8 mb-0 relative z-0"></div>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <div className="text-center text-stone-400 italic py-20 flex flex-col items-center w-full">
                            <Network size={48} className="mb-4 opacity-20" />
                            <span>No visual flow data available.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
  );

  const renderLogicPage = () => {
      const activeStmt = sugya.logicSystem?.statements?.[activeLogicIdx];
      
      // Inline analysis component for mobile
      const LogicAnalysisMobile = ({ stmt }: { stmt: any }) => (
          <div className="mt-3 p-4 bg-indigo-50/50 border-t border-indigo-100 rounded-b-lg animate-in slide-in-from-top-2 fade-in" dir="rtl">
                <div className="mb-3">
                    <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1 text-left">Subject (נושא)</div>
                    <div className="font-hebrew font-bold text-sm text-stone-900 bg-white p-2 rounded border border-indigo-100">{stmt.analysis.subject}</div>
                </div>
                <div className="mb-3">
                    <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1 text-left">Predicate (נשוא)</div>
                    <div className="font-hebrew font-bold text-sm text-stone-900 bg-white p-2 rounded border border-indigo-100">{stmt.analysis.predicate}</div>
                </div>
                {stmt.analysis.reason && (
                    <div className="flex gap-2 items-start bg-amber-50 p-2 rounded border border-amber-100">
                        <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-stone-800">{stmt.analysis.reason}</span>
                    </div>
                )}
          </div>
      );

      return (
        <div className="w-full max-w-[1600px] flex flex-col lg:grid lg:grid-cols-12 gap-0 border border-stone-300 shadow-2xl bg-[#fdfbf7] rounded-xl overflow-hidden min-h-[600px]">
            
            {/* RIGHT COLUMN: SYLLOGISM (Premises) - Top on Mobile */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-l border-stone-300 bg-[#f9f8f4] flex flex-col" dir="rtl">
                <div 
                    className="p-4 lg:p-6 border-b border-stone-200 bg-stone-100/50 cursor-pointer lg:cursor-default flex justify-between items-center"
                    onClick={() => setMobileSyllogismOpen(!mobileSyllogismOpen)}
                >
                    <div className="flex items-center gap-2 text-stone-500">
                        <BrainCircuit size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">The Syllogism</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className="font-hebrew font-bold text-lg lg:text-xl text-stone-900">היקש הראשי</h3>
                        <ChevronDown size={16} className={`lg:hidden transition-transform ${mobileSyllogismOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>
                
                <div className={`flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto ${mobileSyllogismOpen ? 'block' : 'hidden lg:block'}`}>
                    {sugya.logicSystem?.syllogism ? (
                        <>
                            <div className="relative group">
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-400 rounded-full"></div>
                                <div className="pr-4">
                                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block mb-1">Premise A (הקדמה א)</span>
                                    <p className="font-hebrew text-base lg:text-lg leading-relaxed text-stone-800 font-medium">
                                        {sugya.logicSystem.syllogism.premise1}
                                    </p>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-indigo-400 rounded-full"></div>
                                <div className="pr-4">
                                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">Premise B (הקדמה ב)</span>
                                    <p className="font-hebrew text-base lg:text-lg leading-relaxed text-stone-800 font-medium">
                                        {sugya.logicSystem.syllogism.premise2}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-stone-200 relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f9f8f4] px-2 text-stone-400">
                                    <ArrowDown size={20} />
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-2 text-center">Conclusion (מסקנה)</span>
                                <p className="font-hebrew text-lg lg:text-xl leading-relaxed text-stone-900 font-bold text-center bg-emerald-50/50 p-4 rounded border border-emerald-100">
                                    {sugya.logicSystem.syllogism.conclusion}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-stone-400 italic mt-10">Logic data unavailable.</div>
                    )}
                </div>
            </div>

            {/* CENTER COLUMN: LOGIC CHAIN (Interactive Timeline) */}
            <div className="lg:col-span-6 bg-white relative flex flex-col h-full overflow-hidden">
                <div className="p-4 lg:p-6 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-20 shadow-sm lg:shadow-none">
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">Logic Chain</div>
                    <h2 className="font-hebrew text-xl lg:text-2xl font-bold text-stone-900">מהלך הסוגיא</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
                    {/* Vertical Line - Hidden on Mobile to save space, or keep nicely? */}
                    <div className="absolute right-8 lg:right-12 top-0 bottom-0 w-px bg-stone-200 hidden md:block"></div>

                    <div className="space-y-4 lg:space-y-8">
                        {sugya.logicSystem?.statements?.map((stmt, idx) => {
                            const isActive = activeLogicIdx === idx;
                            
                            // Style based on type
                            let badgeColor = "bg-stone-100 text-stone-600";
                            let borderStyle = "border-l-4 border-stone-300";
                            
                            if (stmt.color === 'blue') { badgeColor = "bg-blue-50 text-blue-700"; borderStyle = "border-l-4 border-blue-400"; }
                            if (stmt.color === 'amber') { badgeColor = "bg-amber-50 text-amber-700"; borderStyle = "border-l-4 border-amber-400"; }
                            if (stmt.color === 'green') { badgeColor = "bg-emerald-50 text-emerald-700"; borderStyle = "border-l-4 border-emerald-400"; }

                            return (
                                <div 
                                    key={idx} 
                                    onClick={() => setActiveLogicIdx(isActive ? -1 : idx)}
                                    className={`
                                        relative lg:pl-4 lg:pr-16 py-2 lg:py-4 transition-all duration-300 cursor-pointer rounded-lg group
                                        ${isActive ? 'bg-stone-50' : 'hover:bg-stone-50/50'}
                                    `}
                                >
                                    {/* Timeline Dot (Desktop) */}
                                    <div className={`
                                        absolute right-[43px] top-8 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 transition-all hidden lg:block
                                        ${isActive ? 'bg-stone-800 scale-125' : 'bg-stone-300 group-hover:bg-stone-400'}
                                    `}></div>

                                    <div className={`bg-white p-4 lg:p-5 rounded-lg shadow-sm border border-stone-100 ${borderStyle} relative transition-transform ${isActive ? 'translate-x-[-2px] shadow-md' : ''}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-mono text-stone-300">Step {idx + 1}</span>
                                            <div className="flex items-center gap-2">
                                                {isActive && <span className="lg:hidden text-[10px] font-bold text-stone-400 bg-stone-100 px-1 rounded">Selected</span>}
                                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider ${badgeColor}`}>
                                                    {stmt.type}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="font-hebrew-serif text-lg lg:text-xl leading-relaxed text-stone-900 text-right" dir="rtl">
                                            {stmt.text}
                                        </p>
                                        
                                        {/* Mobile Inline Analysis */}
                                        {isActive && (
                                            <div className="lg:hidden">
                                                <LogicAnalysisMobile stmt={stmt} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* LEFT COLUMN: DEEP ANALYSIS (Contextual) - Desktop Only (Mobile uses inline) */}
            <div className="hidden lg:flex col-span-3 border-l border-stone-300 bg-[#fcfaf5] flex-col" dir="rtl">
                <div className="p-6 border-b border-stone-200 bg-[#f9f8f4]">
                    <div className="flex items-center gap-2 text-stone-500 mb-1 justify-end">
                        <span className="text-xs font-bold uppercase tracking-widest">Micro-Analysis</span>
                        <Search size={16} />
                    </div>
                    <h3 className="font-hebrew font-bold text-xl text-stone-900 text-right">ביאור וניתוח</h3>
                </div>

                {activeStmt ? (
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto animate-in fade-in duration-300 key={activeLogicIdx}">
                        
                        <div className="bg-white p-4 rounded border border-stone-200 shadow-sm">
                            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 text-left">Subject (נושא)</div>
                            <div className="font-hebrew font-bold text-lg text-stone-900">
                                {activeStmt.analysis.subject}
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded border border-stone-200 shadow-sm">
                            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 text-left">Predicate (נשוא)</div>
                            <div className="font-hebrew font-bold text-lg text-stone-900">
                                {activeStmt.analysis.predicate}
                            </div>
                        </div>

                        {activeStmt.analysis.reason && (
                            <div className="bg-amber-50 p-4 rounded border border-amber-100 relative mt-4">
                                <Lightbulb size={16} className="absolute top-4 left-4 text-amber-400" />
                                <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-2 text-left pl-6">Logic / Reason</div>
                                <div className="text-sm font-serif text-stone-800 leading-relaxed">
                                    {activeStmt.analysis.reason}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-8 text-center opacity-50">
                            <div className="text-[10px] uppercase tracking-[0.2em]">Classification</div>
                            <div className="font-mono text-xs">{activeStmt.analysis.statementType}</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-stone-400 font-serif italic p-10 text-center">
                        Select a step to see its logical breakdown.
                    </div>
                )}
            </div>

        </div>
      );
  }

  const renderMelitzaDetail = () => {
      if (!selectedMelitza) return null;

      return (
          <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-[#fcfaf5] w-full md:max-w-5xl h-[90vh] md:h-[85vh] rounded-t-2xl md:rounded-2xl shadow-2xl border border-stone-300 flex flex-col relative overflow-hidden transition-all">
                  
                  {/* Decorative Header Background */}
                  <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-stone-900 z-0">
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  </div>

                  {/* Close Button */}
                  <button 
                    onClick={() => setSelectedMelitza(null)}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                  >
                      <X size={24} />
                  </button>

                  {/* Header Content */}
                  <div className="relative z-10 px-6 md:px-8 pt-6 md:pt-8 pb-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                      <div className="text-white w-full md:w-auto pr-8">
                          <div className="flex items-center gap-2 mb-1 md:mb-2 text-amber-400">
                              <Sparkles size={16} />
                              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Modern Application</span>
                          </div>
                          <h2 className="text-2xl md:text-4xl font-black font-hebrew tracking-wide leading-tight">
                              {selectedMelitza.title}
                          </h2>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/20 text-white text-right hidden md:block">
                          <div className="text-[10px] font-bold uppercase opacity-70">Ruling</div>
                          <div className="font-bold text-lg">{selectedMelitza.ruling}</div>
                      </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 md:p-8 relative bg-[#fcfaf5] rounded-t-3xl mt-2 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.2)]">
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                          
                          {/* Left: The Case */}
                          <div className="lg:col-span-1 space-y-6 md:space-y-8">
                              <div>
                                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                      <Briefcase size={14} /> The Scenario
                                  </h4>
                                  <p className="font-serif text-base md:text-lg text-stone-800 leading-relaxed italic bg-white p-4 md:p-6 rounded-lg border border-stone-200 shadow-sm">
                                      "{selectedMelitza.scenario}"
                                  </p>
                              </div>
                              <div>
                                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                      <Split size={14} /> The Parallel
                                  </h4>
                                  <div className="text-sm text-stone-600 leading-relaxed border-l-4 border-stone-300 pl-4">
                                      {selectedMelitza.parallels}
                                  </div>
                              </div>
                              
                              {/* Mobile Ruling Display */}
                              <div className="md:hidden bg-stone-200 p-3 rounded text-center">
                                  <div className="text-[10px] font-bold uppercase opacity-70 text-stone-500">Ruling</div>
                                  <div className="font-bold text-lg text-stone-900">{selectedMelitza.ruling}</div>
                              </div>
                          </div>

                          {/* Right: The Deep Analysis */}
                          <div className="lg:col-span-2">
                              {selectedMelitza.deepAnalysis && (
                                  <>
                                      <div className="mb-8 md:mb-10 p-5 md:p-6 bg-indigo-50 border border-indigo-100 rounded-xl relative overflow-hidden">
                                          <div className="absolute top-0 right-0 p-4 opacity-10">
                                              <BrainCircuit size={80} className="text-indigo-900" />
                                          </div>
                                          <div className="relative z-10">
                                              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-2">The Yesod (Fundamental Principle)</span>
                                              <p className="font-bold text-lg md:text-xl text-indigo-900 leading-relaxed">
                                                  {selectedMelitza.deepAnalysis.yesod}
                                              </p>
                                          </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                          {selectedMelitza.deepAnalysis.perspectives.map((pers, idx) => (
                                              <div key={idx} className="bg-white rounded-xl border border-stone-200 p-5 md:p-6 shadow-sm flex flex-col group">
                                                  <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
                                                      <span className="font-hebrew font-bold text-lg md:text-xl text-stone-900">{pers.authority}</span>
                                                      <ArrowUpRight size={18} className="text-stone-300" />
                                                  </div>
                                                  
                                                  <div className="flex-1 mb-6">
                                                      <p className="text-sm font-serif text-stone-600 leading-relaxed">
                                                          {pers.logic}
                                                      </p>
                                                  </div>

                                                  <div className={`mt-auto px-3 py-2 rounded text-center text-xs font-bold uppercase tracking-wider
                                                      ${pers.outcome.includes('Valid') ? 'bg-emerald-50 text-emerald-700' :
                                                        pers.outcome.includes('Invalid') ? 'bg-rose-50 text-rose-700' :
                                                        'bg-amber-50 text-amber-700'}
                                                  `}>
                                                      Outcome: {pers.outcome}
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                  </>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  const renderMelitzaPage = () => (
      <div className="w-full max-w-[1200px] flex-1 min-h-[800px] py-8">
          <div className="text-center mb-12">
              <h3 className="font-hebrew font-bold text-4xl text-stone-900 mb-2">מליצה ונפקא מינה</h3>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Modern Applications & Practical Differences</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sugya.modernAnalysis?.map((ma, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedMelitza(ma)}
                    className="bg-white p-0 rounded-2xl border border-stone-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden cursor-pointer flex flex-col h-full"
                  >
                      {/* Card Header */}
                      <div className="p-6 pb-4 bg-stone-50 border-b border-stone-100">
                          <div className="flex justify-between items-start mb-2">
                              <div className="bg-white p-2 rounded-lg shadow-sm text-amber-600 border border-stone-100">
                                  <DollarSign size={20} />
                              </div>
                              <ArrowRight size={20} className="text-stone-300 group-hover:text-amber-500 transition-colors -rotate-45 group-hover:rotate-0" />
                          </div>
                          <h3 className="font-bold text-stone-900 text-xl leading-tight font-hebrew">{ma.title}</h3>
                      </div>
                      
                      {/* Card Body */}
                      <div className="p-6 flex-1 flex flex-col space-y-4">
                          <div>
                              <span className="text-[10px] text-stone-400 uppercase font-bold block mb-1">The Case</span>
                              <p className="text-sm text-stone-600 font-serif leading-relaxed line-clamp-3">
                                  {ma.scenario}
                              </p>
                          </div>
                          
                          <div className="mt-auto pt-4 border-t border-dashed border-stone-200">
                              <span className="text-[10px] text-stone-400 uppercase font-bold block mb-1">Connection</span>
                              <p className="text-xs font-bold text-stone-700 truncate">
                                  {ma.parallels}
                              </p>
                          </div>
                      </div>
                      
                      {/* Hover Effect Bar */}
                      <div className="h-1.5 w-full bg-stone-100 group-hover:bg-amber-500 transition-colors"></div>
                  </div>
              ))}
          </div>
          {renderMelitzaDetail()}
      </div>
  );

  return (
    <div className="h-full flex flex-col items-center bg-[#fdfbf7] overflow-y-auto overflow-x-hidden p-4 md:p-8">
      
      {/* Page Header */}
      <div className="w-full max-w-[1600px] mb-8 flex flex-col md:flex-row items-center md:items-end justify-between border-b-2 border-stone-200 pb-6 text-center md:text-left">
          <div className="text-left hidden md:block">
               <div className="flex items-center gap-2 text-stone-500 mb-1">
                   <BrainCircuit size={18} className="text-amber-600" />
                   <div className="font-bold text-xs uppercase tracking-widest">
                       Deep Analysis
                   </div>
               </div>
               <div className="font-serif text-stone-800 text-sm opacity-80">
                   {section === 'STRUCTURE' ? 'Mapping the Shakla V\'Tarya' : 
                    section === 'LOGIC' ? 'Defining the Underlying Axioms' : 
                    'Applying Principles to Reality'}
               </div>
          </div>
          
          <div className="text-center flex-1 mb-4 md:mb-0">
               <h1 className="font-hebrew text-4xl md:text-6xl font-black text-stone-900 tracking-tight drop-shadow-sm">
                  {section === 'STRUCTURE' ? 'מבנה הסוגיא' : 
                   section === 'LOGIC' ? 'עומק ההגיון' : 
                   'הלכה למעשה'}
               </h1>
          </div>

          <div className="w-[200px] hidden md:block"></div>
      </div>

      {section === 'STRUCTURE' && renderStructurePage()}
      {section === 'LOGIC' && renderLogicPage()}
      {section === 'MELITZA' && renderMelitzaPage()}

    </div>
  );
};
