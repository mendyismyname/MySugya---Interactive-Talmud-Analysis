
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
import { SugyaNavigator } from './components/SugyaNavigator'; // NEW
import { LogicNode, Concept, StudyStage, GuideStep } from './types';
import { 
    BookOpen, Settings, BrainCircuit, X, ChevronRight, Layers, Book, 
    SidebarClose, SidebarOpen, ZoomIn, Map, Home, Lightbulb, ListTree, GripHorizontal,
    ChevronDown, Search, Gavel, FileText, Network, Sparkles, Workflow, ExternalLink, Video, GitFork, Menu, PanelRightClose, PanelRightOpen
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
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null); // NEW: Track specific Gemara segment
  const [analysisSection, setAnalysisSection] = useState<'STRUCTURE' | 'LOGIC' | 'MELITZA'>('STRUCTURE');
  
  // Guide State - explicitly track which step we are on to allow stepping through same-view content (e.g. Gemara flow)
  const [activeGuideStepId, setActiveGuideStepId] = useState<string | null>(null);

  // Data State
  const [concepts, setConcepts] = useState<Concept[]>(INITIAL_CONCEPTS);
  const [whiteboardNodes, setWhiteboardNodes] = useState<LogicNode[]>([]);
  
  // UI State
  const [expandedConceptId, setExpandedConceptId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<LogicNode | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(true);
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
          setActiveSegmentId(null);
          // Reset guide to start
          setActiveGuideStepId(selected.data.guide?.[0]?.id || null);
          setIsSidebarOpen(true); // Automatically open menu on selection
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
      
      // Sync Guide
      const step = currentSugya.guide?.find(s => s.targetId === id && s.stage === stage);
      if (step) setActiveGuideStepId(step.id);

      if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };
  
  const handleSourceSelect = (source: 'CHUMASH' | 'MISHNA' | 'GEMARA') => {
      setCurrentStage(StudyStage.SOURCE_TEXT);
      setActiveSource(source);
      setActiveSegmentId(null); // Reset segment on broad source change

      // Sync Guide (Find first step for this source to avoid jumping into middle)
      const step = currentSugya.guide?.find(s => s.stage === StudyStage.SOURCE_TEXT && s.targetId === source);
      if (step) setActiveGuideStepId(step.id);

      if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }

  const handleAnalysisSelect = (section: 'STRUCTURE' | 'LOGIC' | 'MELITZA') => {
      setCurrentStage(StudyStage.ANALYSIS);
      setAnalysisSection(section);
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }

  const handleIntroSelect = () => {
      setCurrentStage(StudyStage.INTRO);
      const step = currentSugya.guide?.find(s => s.stage === StudyStage.INTRO);
      if (step) setActiveGuideStepId(step.id);
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }

  const handleScholarNavigation = (direction: 'next' | 'prev') => {
      const list = currentStage === StudyStage.DEPTH_RISHONIM 
          ? currentSugya.perspectives 
          : currentSugya.achronimPerspectives;
      
      const currentIndex = list.findIndex(p => p.id === activePerspectiveId);
      if (currentIndex === -1 && list.length > 0) {
          setActivePerspectiveId(list[0].id);
          // Try to sync guide
          const step = currentSugya.guide?.find(s => s.targetId === list[0].id && s.stage === currentStage);
          if (step) setActiveGuideStepId(step.id);
          return;
      }

      const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      
      if (newIndex >= 0 && newIndex < list.length) {
          const newId = list[newIndex].id;
          setActivePerspectiveId(newId);
          // Sync Guide
          const step = currentSugya.guide?.find(s => s.targetId === newId && s.stage === currentStage);
          if (step) setActiveGuideStepId(step.id);
      }
  };

  const handleGuideNavigation = (step: GuideStep) => {
      // 1. Set explicit step ID
      setActiveGuideStepId(step.id);

      // 2. Set Stage
      setCurrentStage(step.stage);
      
      // 3. Handle Source Selection (Special targets for Source Stage)
      if (step.stage === StudyStage.SOURCE_TEXT) {
          if (step.targetId === 'CHUMASH') {
              setActiveSource('CHUMASH');
              setActiveSegmentId(null);
          }
          else if (step.targetId === 'MISHNA') {
              setActiveSource('MISHNA');
              setActiveSegmentId(null);
          }
          else if (step.targetId === 'GEMARA') {
              setActiveSource('GEMARA');
              setActiveSegmentId(null);
          }
          else if (step.targetId && step.targetId.includes('seg')) {
              // It's a specific segment ID! (e.g. kid-5b-seg1)
              setActiveSource('GEMARA');
              setActiveSegmentId(step.targetId);
          }
          else {
              // Default for Gemara if not specified
              setActiveSource('GEMARA');
              setActiveSegmentId(null);
          }
      }

      // 4. Handle Perspective Selection (Rishonim/Achronim)
      if (step.targetId && (step.stage === StudyStage.DEPTH_RISHONIM || step.stage === StudyStage.DEPTH_ACHRONIM)) {
          // Check if it exists in lists
          const rishon = currentSugya.perspectives.find(p => p.id === step.targetId);
          const achron = currentSugya.achronimPerspectives.find(p => p.id === step.targetId);
          
          if (rishon || achron) {
              setActivePerspectiveId(step.targetId);
          }
      }
      
      // Removed auto-close on mobile so user can read the guide step content
  }
  
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

  const handleSourceNavigation = (direction: 'next') => {
      if (activeSource === 'CHUMASH') {
          handleSourceSelect('MISHNA');
      } else if (activeSource === 'MISHNA') {
          handleSourceSelect('GEMARA');
      }
  };

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
                  onClick={handleIntroSelect}
              >
                  <FileText size={16} />
                  <span>Sugya Intro</span>
              </div>

              {/* 2. Sources (Nested) */}
              <div>
                  <div 
                      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all mb-1 ${currentStage === StudyStage.SOURCE_TEXT ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                      onClick={() => {
                          if (currentStage !== StudyStage.SOURCE_TEXT) {
                              // If entering section, default to Chumash
                              handleSourceSelect('CHUMASH');
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
                  onClick={() => { setCurrentStage(StudyStage.PSAK); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
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
      
      {/* SIDEBAR OVERLAY FOR MOBILE */}
      {isSidebarOpen && window.innerWidth < 1024 && (
          <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* UNIFIED LEFT SIDEBAR (Menu) */}
      <aside 
        className={`
            bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-30 fixed lg:relative h-full
            transition-all duration-300 ease-in-out shadow-xl lg:shadow-none
            ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full lg:w-0 lg:-translate-x-full lg:opacity-0 lg:overflow-hidden'}
        `}
      >
        {/* Header Area */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-start mb-5">
                <div 
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" 
                    onClick={() => setCurrentStage(StudyStage.SELECTOR)}
                >
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-amber-500 font-bold font-hebrew text-xl shadow-sm">
                        מ
                    </div>
                    <h1 className="font-bold tracking-tight text-slate-900 text-lg">MySugya</h1>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400">
                    <X size={20} />
                </button>
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
                            onClick={() => { setViewMode(viewMode === 'LEARN' ? 'WHITEBOARD' : 'LEARN'); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
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
                     {/* Concept Dictionary ... */}
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
                                        {/* Attributes Section */}
                                        {c.attributes && c.attributes.length > 0 && (
                                            <div className="mb-3 space-y-1">
                                                {c.attributes.map((attr, idx) => (
                                                    <div key={idx} className="flex items-start text-[10px] border-l-2 border-amber-200 pl-2">
                                                        <span className="font-bold text-slate-700 mr-1">{attr.label}:</span>
                                                        <span className="text-slate-500">{attr.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/30">
            <button 
                onClick={handleReturnToLibrary}
                className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-wider py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
                <Home size={14} /> Library
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative transition-all duration-300 min-w-0 bg-[#fdfbf7]">
        
        {/* Toggle Nav Button (Floating) */}
        {viewMode === 'LEARN' && currentSugya.guide && !isNavigatorOpen && (
            <button 
                onClick={() => setIsNavigatorOpen(true)}
                className="absolute top-4 right-4 z-40 bg-white border border-slate-200 shadow-md p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                title="Open Roadmap"
            >
                <PanelRightOpen size={20} />
            </button>
        )}

        {/* Content Viewport */}
        {viewMode === 'WHITEBOARD' ? (
             <Whiteboard sugya={currentSugya} onClose={() => setViewMode('LEARN')} />
        ) : (
             <div className="flex-1 overflow-hidden flex flex-row bg-[#fdfbf7] relative pb-24 lg:pb-0">
                
                {/* Scrollable Center Content */}
                <div 
                    id="main-scroll-container"
                    className={`flex-1 overflow-y-auto p-0 w-full scroll-smooth`}
                    style={{ paddingBottom: selectedNode ? `${panelHeight}px` : '0px' }}
                >
                    {/* Expand Sidebar Toggle (If closed) */}
                    {!isSidebarOpen && (
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="absolute top-4 left-4 z-40 bg-white/80 backdrop-blur border border-slate-200 shadow-sm p-2 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                    )}

                    {currentStage === StudyStage.INTRO && (
                        <ShearBlat 
                            onStart={() => {
                                handleSourceSelect('CHUMASH');
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
                            activeSegmentId={activeSegmentId} // Pass tracking info
                            onAnalyze={handleTzurasHadafAnalyze} 
                            onSwitchSugya={handleSwitchSugya}
                            availableSugyas={AVAILABLE_SUGYAS.map(s => ({
                                id: s.id,
                                title: s.title,
                                masechta: s.masechta,
                                masechtaHebrew: (s as any).masechtaHebrew,
                                daf: s.daf
                            }))}
                            onNavigateSource={handleSourceNavigation}
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
                       <ScholarDepthView 
                            perspective={activeScholar} 
                            sourceText={currentSugya.baseText}
                            category={currentStage === StudyStage.DEPTH_RISHONIM ? 'RISHONIM' : 'ACHRONIM'}
                            onNavigate={handleScholarNavigation}
                            relatedSources={currentSugya.relatedSources}
                            guide={currentSugya.guide}
                            activeGuideStepId={activeGuideStepId}
                            onGuideNext={handleGuideNavigation}
                        />
                    )}
                </div>

                {/* RIGHT SIDEBAR NAVIGATOR */}
                {currentSugya.guide && isNavigatorOpen && (
                    <div className={`
                        fixed inset-0 z-[60] lg:relative lg:z-0 lg:h-full lg:flex lg:flex-row
                        ${window.innerWidth < 1024 ? 'bg-black/50' : ''} 
                    `}
                    onClick={(e) => {
                        // Close on overlay click
                        if (e.target === e.currentTarget && window.innerWidth < 1024) {
                            setIsNavigatorOpen(false);
                        }
                    }}
                    >
                        {/* Wrapper for responsive drawer */}
                        <div className="h-full flex flex-row absolute right-0 lg:relative lg:right-auto bg-white lg:bg-transparent shadow-2xl lg:shadow-none w-[85%] max-w-sm lg:w-auto transform transition-transform animate-in slide-in-from-right duration-300">
                            {/* Close Handle (Desktop Only usually, but re-used here) */}
                            <div className="hidden lg:flex h-full border-l border-slate-200 bg-slate-50 flex-col items-center py-2 w-4 hover:bg-slate-100 cursor-pointer transition-colors" onClick={() => setIsNavigatorOpen(false)}>
                                <PanelRightClose size={12} className="text-slate-400" />
                            </div>
                            
                            <SugyaNavigator 
                                guide={currentSugya.guide}
                                currentStage={currentStage}
                                activeId={activeGuideStepId}
                                onNavigate={handleGuideNavigation}
                                onClose={() => setIsNavigatorOpen(false)}
                            />
                        </div>
                    </div>
                )}

                {/* Bottom Horizontal Details Panel */}
                {selectedNode && (
                    <div 
                        className="fixed bottom-16 lg:bottom-0 left-0 right-0 bg-white border-t-2 border-slate-900 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 flex flex-col"
                        style={{ 
                            height: `${panelHeight}px`, 
                            left: isSidebarOpen ? '18rem' : '0',
                            right: (isNavigatorOpen && currentSugya.guide && window.innerWidth >= 1024) ? '25rem' : '0', 
                            transition: isDraggingPanel.current ? 'none' : 'all 0.3s ease' 
                        }}
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
                                <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">Analysis</span>
                                <div className="h-4 w-px bg-slate-300 mx-2"></div>
                                <span className="text-xs font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{selectedNode.type}</span>
                             </div>
                             <button onClick={() => setSelectedNode(null)} className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                                 <X size={20} />
                             </button>
                        </div>

                        {/* Panel Content Grid */}
                        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                            {/* ... Content same as before ... */}
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

      {/* MOBILE FOOTER NAVIGATION (unchanged from previous) */}
      {viewMode !== 'WHITEBOARD' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col bg-white">
            <div className="bg-slate-50 text-[10px] text-center py-1.5 text-slate-400 border-t border-slate-200 font-medium">
                For best experience, use desktop
            </div>
            <div className="h-16 flex justify-around items-center border-t border-slate-200">
                <button 
                    onClick={() => { handleSourceSelect('CHUMASH'); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
                    className={`flex flex-col items-center justify-center w-full h-full text-[10px] font-bold gap-1 ${currentStage === StudyStage.SOURCE_TEXT ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}
                >
                    <BookOpen size={20} />
                    <span>Source</span>
                </button>
                <button 
                    onClick={() => { setCurrentStage(StudyStage.DEPTH_RISHONIM); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
                    className={`flex flex-col items-center justify-center w-full h-full text-[10px] font-bold gap-1 ${currentStage === StudyStage.DEPTH_RISHONIM ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}
                >
                    <Book size={20} />
                    <span>Rishonim</span>
                </button>
                <button 
                    onClick={() => { setCurrentStage(StudyStage.DEPTH_ACHRONIM); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
                    className={`flex flex-col items-center justify-center w-full h-full text-[10px] font-bold gap-1 ${currentStage === StudyStage.DEPTH_ACHRONIM ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}
                >
                    <Layers size={20} />
                    <span>Achronim</span>
                </button>
                <button 
                    onClick={() => { setCurrentStage(StudyStage.PSAK); if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
                    className={`flex flex-col items-center justify-center w-full h-full text-[10px] font-bold gap-1 ${currentStage === StudyStage.PSAK ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}
                >
                    <Gavel size={20} />
                    <span>Psak</span>
                </button>
                <button 
                    onClick={() => setIsNavigatorOpen(true)}
                    className={`flex flex-col items-center justify-center w-full h-full text-[10px] font-bold gap-1 ${isNavigatorOpen ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}
                >
                    <Map size={20} />
                    <span>Roadmap</span>
                </button>
            </div>
        </div>
      )}

      {/* AI Slide-over Panel (unchanged) */}
      {aiPanelOpen && (
        <div className="fixed right-0 top-0 h-full w-full lg:w-96 bg-white shadow-2xl z-50 border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
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
