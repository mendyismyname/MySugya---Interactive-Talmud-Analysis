
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_SUGYA, INITIAL_CONCEPTS, AVAILABLE_SUGYAS } from './constants';
import { LogicNodeCard } from './components/LogicNodeCard';
import { ConceptBadge } from './components/ConceptBadge';
import { Whiteboard } from './components/Whiteboard';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { PsakView } from './components/PsakView';
import { ShearBlat } from './components/ShearBlat';
import { TzurasHadaf } from './components/TzurasHadaf';
import { ScholarDepthView } from './components/ScholarDepthView';
import { SugyaSelector } from './components/SugyaSelector';
import { LogicNode, Concept, StudyStage } from './types';
import { 
    BookOpen, Settings, BrainCircuit, X, ChevronRight, Layers, Book, 
    SidebarClose, SidebarOpen, ZoomIn, Map, Home, Lightbulb, ListTree, GripHorizontal,
    ChevronDown, Search, Gavel, FileText, Network, Sparkles, Workflow, ExternalLink, Video
} from 'lucide-react';
import { explainConcept, generateComparison, generateSugyaDeepData } from './services/geminiService';

const App: React.FC = () => {
  // --- STATE ---
  const [currentSugya, setCurrentSugya] = useState(MOCK_SUGYA);
  const [currentStage, setCurrentStage] = useState<StudyStage>(StudyStage.SELECTOR);
  const [viewMode, setViewMode] = useState<'LEARN' | 'WHITEBOARD'>('LEARN');
  
  // Navigation State
  const [activePerspectiveId, setActivePerspectiveId] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<'CHUMASH' | 'MISHNA' | 'GEMARA'>('CHUMASH');
  const [analysisSection, setAnalysisSection] = useState<'STRUCTURE' | 'LOGIC' | 'MELITZA'>('STRUCTURE');

  // Data State
  const [concepts, setConcepts] = useState<Concept[]>(INITIAL_CONCEPTS);
  const [whiteboardNodes, setWhiteboardNodes] = useState<LogicNode[]>([]);
  
  // UI State
  const [expandedConceptId, setExpandedConceptId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<LogicNode | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<'OUTLINE' | 'CONCEPTS'>('OUTLINE');
  
  // Resize State
  const [panelHeight, setPanelHeight] = useState(400); // Initial height in px
  const isDraggingPanel = useRef(false);

  // AI State
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiContent, setAiContent] = useState<string>("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isGeneratingDeepData, setIsGeneratingDeepData] = useState(false);

  // --- HANDLERS ---
  const handleSwitchSugya = (id: string) => {
      const selected = AVAILABLE_SUGYAS.find(s => s.id === id);
      if (selected && selected.data) {
          setCurrentSugya(selected.data);
          setCurrentStage(StudyStage.INTRO);
          setSelectedNode(null);
          setActivePerspectiveId(null);
          setActiveSource('CHUMASH'); // Start with Chumash by default
          // Auto-open sidebar on new sugya for context
          setIsSidebarOpen(true);
      }
  };

  const handleReturnToLibrary = () => {
      setCurrentStage(StudyStage.SELECTOR);
      setIsSidebarOpen(false);
  }

  const handleAddToWhiteboard = (node: LogicNode) => {
    if (!whiteboardNodes.find(n => n.id === node.id)) {
        setWhiteboardNodes([...whiteboardNodes, node]);
    }
  };

  const handleConceptClick = async (concept: Concept) => {
      setExpandedConceptId(expandedConceptId === concept.id ? null : concept.id);
  };

  const handleConceptAi = async (concept: Concept) => {
      setAiPanelOpen(true);
      setAiContent("");
      setIsLoadingAi(true);
      const explanation = await explainConcept(concept.nameHebrew);
      setAiContent(explanation);
      setIsLoadingAi(false);
  }

  const handleNodeSelect = (node: LogicNode) => {
      setSelectedNode(node);
      handleAddToWhiteboard(node);
  };

  const handleTzurasHadafAnalyze = (node: LogicNode) => {
      setSelectedNode(node);
  };

  const handleScholarSelect = (stage: StudyStage, id: string) => {
      setCurrentStage(stage);
      setActivePerspectiveId(id);
  };
  
  const handleSourceSelect = (source: 'CHUMASH' | 'MISHNA' | 'GEMARA') => {
      setCurrentStage(StudyStage.SOURCE_TEXT);
      setActiveSource(source);
  }

  const handleAnalysisSelect = (section: 'STRUCTURE' | 'LOGIC' | 'MELITZA') => {
      setCurrentStage(StudyStage.ANALYSIS);
      setAnalysisSection(section);
  }

  const handleScholarNavigation = (direction: 'next' | 'prev') => {
      const list = currentStage === StudyStage.DEPTH_RISHONIM 
          ? currentSugya.perspectives 
          : currentSugya.achronimPerspectives;
      
      const currentIndex = list.findIndex(p => p.id === activePerspectiveId);
      if (currentIndex === -1 && list.length > 0) {
          setActivePerspectiveId(list[0].id);
          return;
      }

      const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      
      if (newIndex >= 0 && newIndex < list.length) {
          setActivePerspectiveId(list[newIndex].id);
      }
  };
  
  const handleGenerateDeepData = async () => {
      setIsGeneratingDeepData(true);
      const generated = await generateSugyaDeepData(currentSugya.title, currentSugya.baseText.englishText);
      if (generated) {
          setCurrentSugya(prev => ({
              ...prev,
              visualFlow: generated.visualFlow || prev.visualFlow,
              modernAnalysis: generated.modernAnalysis || prev.modernAnalysis,
              logicSystem: generated.logicSystem || prev.logicSystem,
              analysis: generated.analysisComponents || prev.analysis
          }));
      }
      setIsGeneratingDeepData(false);
  }

  // --- RESIZE HANDLERS ---
  const startResize = (e: React.MouseEvent) => {
      e.preventDefault();
      isDraggingPanel.current = true;
      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
  };

  const doResize = (e: MouseEvent) => {
      if (!isDraggingPanel.current) return;
      const newHeight = window.innerHeight - e.clientY;
      // Limits: Min 200px, Max 80% of screen
      if (newHeight > 200 && newHeight < window.innerHeight * 0.8) {
          setPanelHeight(newHeight);
      }
  };

  const stopResize = () => {
      isDraggingPanel.current = false;
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
  };

  // Effect to manage sidebar visibility based on stage logic
  useEffect(() => {
      if (currentStage === StudyStage.SELECTOR) {
          setIsSidebarOpen(false);
      }
  }, [currentStage]);

  // Determine active scholar object
  const activeScholar = 
      currentStage === StudyStage.DEPTH_RISHONIM 
        ? currentSugya.perspectives.find(p => p.id === activePerspectiveId) || currentSugya.perspectives[0]
        : currentStage === StudyStage.DEPTH_ACHRONIM 
            ? currentSugya.achronimPerspectives.find(p => p.id === activePerspectiveId) || currentSugya.achronimPerspectives[0]
            : null;

  // --- MENU RENDERER ---
  const renderSidebarMenu = () => {
      return (
          <div className="space-y-6">
              
              {/* 1. Intro */}
              <div 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${currentStage === StudyStage.INTRO ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={() => setCurrentStage(StudyStage.INTRO)}
              >
                  <FileText size={16} />
                  <span>Sugya Intro</span>
              </div>

              {/* 2. Sources (Nested) */}
              <div>
                  <div 
                      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all mb-1 ${currentStage === StudyStage.SOURCE_TEXT ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      onClick={() => {
                          setCurrentStage(StudyStage.SOURCE_TEXT);
                          // Ensure we open to Chumash if just clicking the header
                          if (activeSource !== 'CHUMASH' && activeSource !== 'MISHNA' && activeSource !== 'GEMARA') {
                              setActiveSource('CHUMASH');
                          }
                      }}
                  >
                      <div className="flex items-center gap-3">
                          <BookOpen size={16} />
                          <span>Sources</span>
                      </div>
                      <ChevronDown size={14} className={`transition-transform ${currentStage === StudyStage.SOURCE_TEXT ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {/* Source Sub-items */}
                  {currentStage === StudyStage.SOURCE_TEXT && (
                      <div className="pl-9 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          <div 
                              onClick={(e) => { e.stopPropagation(); handleSourceSelect('CHUMASH'); }}
                              className={`text-sm py-1.5 px-2 rounded cursor-pointer transition-colors ${activeSource === 'CHUMASH' ? 'font-bold text-indigo-700 bg-indigo-100/50' : 'text-slate-500 hover:text-indigo-600'}`}
                          >
                              Chumash
                          </div>
                          <div 
                              onClick={(e) => { e.stopPropagation(); handleSourceSelect('MISHNA'); }}
                              className={`text-sm py-1.5 px-2 rounded cursor-pointer transition-colors ${activeSource === 'MISHNA' ? 'font-bold text-indigo-700 bg-indigo-100/50' : 'text-slate-500 hover:text-indigo-600'}`}
                          >
                              Mishna
                          </div>
                          <div 
                              onClick={(e) => { e.stopPropagation(); handleSourceSelect('GEMARA'); }}
                              className={`text-sm py-1.5 px-2 rounded cursor-pointer transition-colors ${activeSource === 'GEMARA' ? 'font-bold text-indigo-700 bg-indigo-100/50' : 'text-slate-500 hover:text-indigo-600'}`}
                          >
                              Gemara
                          </div>
                      </div>
                  )}
              </div>

              {/* 3. Analysis (Nested) */}
              <div>
                  <div 
                      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all mb-1 ${currentStage === StudyStage.ANALYSIS ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      onClick={() => setCurrentStage(StudyStage.ANALYSIS)}
                  >
                      <div className="flex items-center gap-3">
                          <Search size={16} />
                          <span>Analysis</span>
                      </div>
                      <ChevronDown size={14} className={`transition-transform ${currentStage === StudyStage.ANALYSIS ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Analysis Sub-items */}
                  {currentStage === StudyStage.ANALYSIS && (
                      <div className="pl-9 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          <div 
                              onClick={(e) => { e.stopPropagation(); handleAnalysisSelect('STRUCTURE'); }}
                              className={`text-sm py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-2 ${analysisSection === 'STRUCTURE' ? 'font-bold text-indigo-700 bg-indigo-100/50' : 'text-slate-500 hover:text-indigo-600'}`}
                          >
                              <Workflow size={12} />
                              Structure (Massa U'Matan)
                          </div>
                          <div 
                              onClick={(e) => { e.stopPropagation(); handleAnalysisSelect('LOGIC'); }}
                              className={`text-sm py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-2 ${analysisSection === 'LOGIC' ? 'font-bold text-indigo-700 bg-indigo-100/50' : 'text-slate-500 hover:text-indigo-600'}`}
                          >
                              <Network size={12} />
                              Logic (Higayon)
                          </div>
                          <div 
                              onClick={(e) => { e.stopPropagation(); handleAnalysisSelect('MELITZA'); }}
                              className={`text-sm py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center gap-2 ${analysisSection === 'MELITZA' ? 'font-bold text-indigo-700 bg-indigo-100/50' : 'text-slate-500 hover:text-indigo-600'}`}
                          >
                              <Sparkles size={12} />
                              Examples (Melitza)
                          </div>
                      </div>
                  )}
              </div>

              {/* 4. Rishonim (Accordion) */}
              <div>
                  <div 
                      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all mb-1 ${currentStage === StudyStage.DEPTH_RISHONIM ? 'bg-indigo-50 text-indigo-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      onClick={() => setCurrentStage(StudyStage.DEPTH_RISHONIM)}
                  >
                      <div className="flex items-center gap-3">
                          <Book size={16} />
                          <span>Rishonim</span>
                      </div>
                      <ChevronDown size={14} className={`transition-transform ${currentStage === StudyStage.DEPTH_RISHONIM ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {/* Nested List */}
                  {currentStage === StudyStage.DEPTH_RISHONIM && (
                      <div className="pl-9 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          {currentSugya.perspectives.map(p => (
                              <div 
                                key={p.id}
                                onClick={(e) => { e.stopPropagation(); handleScholarSelect(StudyStage.DEPTH_RISHONIM, p.id); }}
                                className={`text-sm py-1.5 px-2 rounded cursor-pointer transition-colors ${activePerspectiveId === p.id ? 'font-bold text-indigo-700 bg-indigo-100/50' : 'text-slate-500 hover:text-indigo-600'}`}
                              >
                                  {p.scholarName}
                              </div>
                          ))}
                      </div>
                  )}
              </div>

              {/* 5. Achronim (Accordion) */}
              <div>
                  <div 
                      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all mb-1 ${currentStage === StudyStage.DEPTH_ACHRONIM ? 'bg-purple-50 text-purple-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      onClick={() => setCurrentStage(StudyStage.DEPTH_ACHRONIM)}
                  >
                      <div className="flex items-center gap-3">
                          <Layers size={16} />
                          <span>Achronim</span>
                      </div>
                      <ChevronDown size={14} className={`transition-transform ${currentStage === StudyStage.DEPTH_ACHRONIM ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {/* Nested List */}
                  {currentStage === StudyStage.DEPTH_ACHRONIM && (
                      <div className="pl-9 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          {currentSugya.achronimPerspectives.map(p => (
                              <div 
                                key={p.id}
                                onClick={(e) => { e.stopPropagation(); handleScholarSelect(StudyStage.DEPTH_ACHRONIM, p.id); }}
                                className={`text-sm py-1.5 px-2 rounded cursor-pointer transition-colors ${activePerspectiveId === p.id ? 'font-bold text-purple-700 bg-purple-100/50' : 'text-slate-500 hover:text-purple-600'}`}
                              >
                                  {p.scholarName}
                              </div>
                          ))}
                      </div>
                  )}
              </div>

              {/* 6. Psak */}
              <div 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${currentStage === StudyStage.PSAK ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                  onClick={() => setCurrentStage(StudyStage.PSAK)}
              >
                  <Gavel size={16} />
                  <span>Psak Halacha</span>
              </div>
          </div>
      );
  }

  // --- MAIN RENDER ---

  if (currentStage === StudyStage.SELECTOR) {
      return (
          <SugyaSelector onSelect={handleSwitchSugya} />
      );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden text-slate-800 font-sans bg-[#fdfbf7]">
      
      {/* UNIFIED SIDEBAR */}
      <aside 
        className={`
            bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-30 
            transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] shadow-xl lg:shadow-none
            ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full opacity-0 overflow-hidden'}
        `}
      >
        {/* Header Area */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <div 
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mb-5" 
                onClick={() => setCurrentStage(StudyStage.SELECTOR)}
            >
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-amber-500 font-bold font-hebrew text-xl shadow-sm">
                    מ
                </div>
                <h1 className="font-bold tracking-tight text-slate-900 text-lg">MySugya</h1>
            </div>

            {/* Sidebar Tabs */}
            <div className="flex bg-slate-200/50 p-1 rounded-lg">
                <button 
                    onClick={() => setSidebarTab('OUTLINE')}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-bold rounded-md transition-all ${sidebarTab === 'OUTLINE' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <ListTree size={14} /> Outline
                </button>
                <button 
                    onClick={() => setSidebarTab('CONCEPTS')}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-bold rounded-md transition-all ${sidebarTab === 'CONCEPTS' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Lightbulb size={14} /> Concepts
                </button>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 pb-5">
            
            {sidebarTab === 'OUTLINE' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                    
                    {/* View Modes */}
                    <div className="grid grid-cols-1 mb-6">
                        <button 
                            onClick={() => setViewMode(viewMode === 'LEARN' ? 'WHITEBOARD' : 'LEARN')}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${viewMode === 'WHITEBOARD' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                        >
                            <Map size={20} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                {viewMode === 'WHITEBOARD' ? 'Close Whiteboard' : 'Open Whiteboard'}
                            </span>
                        </button>
                    </div>

                    {/* NEW STRUCTURED MENU */}
                    {renderSidebarMenu()}
                </div>
            )}

            {sidebarTab === 'CONCEPTS' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Dictionary</span>
                        <Settings size={14} className="text-slate-300" />
                    </div>
                    {concepts.map(c => {
                        const isExpanded = expandedConceptId === c.id;
                        return (
                            <div key={c.id} className="transition-all duration-300">
                                <ConceptBadge concept={c} onClick={handleConceptClick} />
                                
                                {isExpanded && (
                                    <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 animate-in slide-in-from-top-2 duration-200 shadow-inner">
                                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                            {c.description}
                                        </p>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleConceptAi(c); }}
                                            className="w-full py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <BrainCircuit size={12} /> Explain Concept
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

        {/* External Resources */}
        {currentSugya.resources && (currentSugya.resources.pdfUrl || currentSugya.resources.videoUrl) && (
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">External Resources</div>
                <div className="flex gap-2">
                    {currentSugya.resources.pdfUrl && (
                        <a href={currentSugya.resources.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center p-2 bg-white border border-slate-200 rounded hover:border-indigo-400 hover:text-indigo-600 transition-all text-slate-500">
                            <FileText size={16} className="mb-1" />
                            <span className="text-[9px] font-bold uppercase">PDF</span>
                        </a>
                    )}
                    {currentSugya.resources.videoUrl && (
                        <a href={currentSugya.resources.videoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center p-2 bg-white border border-slate-200 rounded hover:border-indigo-400 hover:text-indigo-600 transition-all text-slate-500">
                            <Video size={16} className="mb-1" />
                            <span className="text-[9px] font-bold uppercase">Video</span>
                        </a>
                    )}
                </div>
            </div>
        )}
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/30">
            <button 
                onClick={handleReturnToLibrary}
                className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-wider py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
                <Home size={14} /> Library
            </button>
            
            <div className="mt-4 text-center">
                <a 
                    href="https://x.com/mendysel" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold uppercase tracking-widest transition-colors"
                >
                    Created by Mendy S
                </a>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative transition-all duration-300 min-w-0 bg-[#fdfbf7]">
        
        {/* HEADER (Minimal / Toggle only) */}
        <div className="absolute top-4 left-4 z-50 print:hidden">
             <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-2 rounded-lg bg-white/80 backdrop-blur border border-slate-200 shadow-sm hover:bg-white text-slate-600 transition-colors ${!isSidebarOpen ? 'text-indigo-600' : ''}`}
                title="Toggle Sidebar"
            >
                {isSidebarOpen ? <SidebarClose size={20} /> : <SidebarOpen size={20} />}
            </button>
        </div>

        {/* Content Viewport */}
        {viewMode === 'WHITEBOARD' ? (
             <Whiteboard sugya={currentSugya} onClose={() => setViewMode('LEARN')} />
        ) : (
             <div className="flex-1 overflow-hidden flex flex-col bg-[#fdfbf7] relative">
                <div 
                    className={`flex-1 overflow-y-auto p-0 w-full scroll-smooth`}
                    style={{ paddingBottom: selectedNode ? `${panelHeight}px` : '0px' }}
                >
                    
                    {currentStage === StudyStage.INTRO && (
                        <ShearBlat 
                            onStart={() => {
                                setCurrentStage(StudyStage.SOURCE_TEXT);
                                setActiveSource('CHUMASH'); // Start with Chumash on button click
                            }}
                            title={currentSugya.title}
                            subtitle="Elucidated & Analyzed"
                            resources={currentSugya.resources}
                        />
                    )}

                    {currentStage === StudyStage.SOURCE_TEXT && (
                        <TzurasHadaf 
                            sugya={currentSugya} 
                            activeSource={activeSource}
                            onAnalyze={handleTzurasHadafAnalyze} 
                            onSwitchSugya={handleSwitchSugya}
                            availableSugyas={AVAILABLE_SUGYAS.map(s => ({
                                id: s.id,
                                title: s.title,
                                masechta: s.masechta,
                                masechtaHebrew: (s as any).masechtaHebrew,
                                daf: s.daf
                            }))}
                        />
                    )}

                    {currentStage === StudyStage.ANALYSIS && (
                        <AnalysisDashboard 
                            sugya={currentSugya} 
                            section={analysisSection}
                            onSelectNode={(id) => console.log('Focus', id)} 
                            onGenerateAi={handleGenerateDeepData}
                            isGenerating={isGeneratingDeepData}
                        />
                    )}

                    {currentStage === StudyStage.PSAK && (
                        <PsakView chain={currentSugya.psakChain} data={currentSugya.shulchanAruch} />
                    )}

                    {(currentStage === StudyStage.DEPTH_RISHONIM || currentStage === StudyStage.DEPTH_ACHRONIM) && activeScholar && (
                       <div className="h-full">
                            <ScholarDepthView 
                                perspective={activeScholar} 
                                sourceText={currentSugya.baseText}
                                category={currentStage === StudyStage.DEPTH_RISHONIM ? 'RISHONIM' : 'ACHRONIM'}
                                onNavigate={handleScholarNavigation}
                            />
                       </div>
                    )}
                </div>

                {/* Bottom Horizontal Details Panel */}
                {selectedNode && (
                    <div 
                        className="fixed bottom-0 left-0 right-0 lg:left-80 bg-white border-t-2 border-slate-900 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 flex flex-col"
                        style={{ height: `${panelHeight}px`, transition: isDraggingPanel.current ? 'none' : 'height 0.3s ease' }}
                    >
                        
                        {/* Drag Handle */}
                        <div 
                            className="h-3 w-full bg-slate-100 border-b border-slate-200 cursor-ns-resize flex items-center justify-center hover:bg-slate-200 transition-colors"
                            onMouseDown={startResize}
                        >
                            <GripHorizontal size={16} className="text-slate-400" />
                        </div>

                        {/* Panel Header */}
                        <div className="h-12 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50 flex-shrink-0">
                             <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-slate-200 rounded text-slate-700">
                                    <ZoomIn size={16} />
                                </div>
                                <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">Analysis & Detail</span>
                                <div className="h-4 w-px bg-slate-300 mx-2"></div>
                                <span className="text-xs font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{selectedNode.type}</span>
                             </div>
                             <button onClick={() => setSelectedNode(null)} className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                                 <X size={20} />
                             </button>
                        </div>

                        {/* Panel Content Grid */}
                        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                            
                            {/* Column 1: Text */}
                            <div className="p-6 overflow-y-auto bg-slate-50/30">
                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-3">Source Text</div>
                                <h3 className="font-hebrew text-2xl mb-4 text-right leading-relaxed font-bold text-slate-900 border-r-4 border-slate-900 pr-4 py-1" dir="rtl">
                                    {selectedNode.hebrewText}
                                </h3>
                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 mt-6">Translation</div>
                                <p className="text-slate-700 leading-relaxed text-sm bg-white p-4 rounded-lg border border-slate-200 shadow-sm font-serif">
                                    {selectedNode.englishText}
                                </p>
                            </div>

                            {/* Column 2: Metadata & Concepts */}
                            <div className="p-6 overflow-y-auto bg-white">
                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-4">Context & Concepts</div>
                                
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                                        <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Speaker</div>
                                        <div className="text-sm font-semibold text-slate-800">{selectedNode.speaker || selectedNode.era}</div>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                                        <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Era</div>
                                        <div className="text-sm font-semibold text-slate-800">{selectedNode.era}</div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Key Concepts</div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedNode.concepts && selectedNode.concepts.length > 0 ? (
                                            selectedNode.concepts.map(cId => {
                                                const concept = concepts.find(c => c.id === cId);
                                                return concept ? (
                                                    <span key={cId} className="px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-md text-xs font-bold flex items-center gap-2 cursor-pointer hover:bg-amber-100">
                                                        <Lightbulb size={12} className="text-amber-500" />
                                                        {concept.nameHebrew}
                                                    </span>
                                                ) : null;
                                            })
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">No specific concepts tagged.</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Column 3: Structure & Actions */}
                            <div className="p-6 overflow-y-auto bg-slate-50/30 flex flex-col">
                                <div className="flex-1">
                                    {selectedNode.children && selectedNode.children.length > 0 && (
                                        <>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-3">Logical Flow</div>
                                            <div className="pl-4 border-l-2 border-slate-200 space-y-2">
                                                {selectedNode.children.map(child => (
                                                    <div key={child.id} className="text-xs group cursor-pointer hover:bg-white p-2 rounded border border-transparent hover:border-slate-200 transition-all">
                                                        <span className="font-bold text-slate-700 block mb-1 flex items-center gap-2">
                                                            <span className={`w-2 h-2 rounded-full ${child.type === 'QUESTION' ? 'bg-red-400' : 'bg-green-400'}`}></span>
                                                            {child.type}
                                                        </span>
                                                        <span className="text-slate-500 line-clamp-2">{child.englishText}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                                
                                <div className="pt-6 mt-auto border-t border-slate-200">
                                     <button 
                                        onClick={() => handleAddToWhiteboard(selectedNode)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-lg hover:-translate-y-0.5"
                                    >
                                        <Map size={16} /> Add to Logic Map
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
             </div>
        )}
      </main>

      {/* AI Slide-over Panel */}
      {aiPanelOpen && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-indigo-50/50 to-white">
                 <h3 className="font-bold text-indigo-900 flex items-center gap-2 text-sm">
                     <BrainCircuit className="text-indigo-600" size={18} />
                     Chavrusa AI
                 </h3>
                 <button onClick={() => setAiPanelOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                     <X size={18} />
                 </button>
             </div>
             <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                 {isLoadingAi ? (
                     <div className="space-y-4">
                         <div className="h-2 bg-slate-100 rounded animate-pulse w-3/4"></div>
                         <div className="h-2 bg-slate-100 rounded animate-pulse"></div>
                         <div className="h-2 bg-slate-100 rounded animate-pulse w-5/6"></div>
                         <div className="h-2 bg-slate-100 rounded animate-pulse w-1/2"></div>
                     </div>
                 ) : (
                     <div className="prose prose-sm prose-slate leading-relaxed">
                         <div dangerouslySetInnerHTML={{ __html: aiContent.replace(/\n/g, '<br/>') }} />
                     </div>
                 )}
             </div>
        </div>
      )}

    </div>
  );
};

export default App;
