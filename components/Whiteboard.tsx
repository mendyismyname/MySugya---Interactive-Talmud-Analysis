
import React, { useState, useRef, useEffect } from 'react';
import { SugyaSection, VisualFlowStep } from '../types';
import { 
    LayoutTemplate, GripHorizontal, StickyNote, Type,
    X, User, Network, Workflow, BookOpen, Layers,
    LogOut, Eye, EyeOff, Square, Circle, Diamond, Edit3, Trash2,
    ZoomIn, ZoomOut, Save, Share2, MousePointer2, Plus, ArrowRight,
    Triangle, MoreHorizontal, FileText, AlignLeft, MessageSquare, Menu
} from 'lucide-react';

interface Props {
  sugya: SugyaSection;
  onClose: () => void;
}

type NodeShape = 'RECT' | 'CIRCLE' | 'DIAMOND' | 'TRIANGLE';
type HandlePosition = 'top' | 'right' | 'bottom' | 'left';

interface CanvasNode {
    id: string;
    x: number;
    y: number;
    type: 'SUGYA_NODE' | 'NOTE' | 'FLOW_STEP' | 'PERSPECTIVE' | 'LOGIC_STMT' | 'GENERIC_SHAPE';
    label: string;   // The Title/Header
    content: string; // The Body Text
    note?: string;   // Hidden/Attached Note
    data?: any;
    color: string;
    shape: NodeShape;
    width: number;
    height: number;
}

interface Connection {
    id: string;
    from: string;
    to: string;
    fromHandle: HandlePosition;
    toHandle: HandlePosition;
}

interface DragState {
    nodeId: string;
    offsetX: number;
    offsetY: number;
}

interface ConnectingState {
    sourceId: string;
    handle: HandlePosition;
    currentX: number;
    currentY: number;
}

export const Whiteboard: React.FC<Props> = ({ sugya, onClose }) => {
  // --- STATE ---
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [scale, setScale] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [connectingState, setConnectingState] = useState<ConnectingState | null>(null);
  
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile, logic below handles desktop
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  const [showCursors, setShowCursors] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('STRUCTURE');

  const canvasRef = useRef<HTMLDivElement>(null);

  // Set sidebar open on desktop mount
  useEffect(() => {
      if (window.innerWidth >= 768) {
          setIsSidebarOpen(true);
      }
  }, []);

  // --- MOCK COLLABORATORS ---
  const [collaborators, setCollaborators] = useState([
      { id: '1', name: 'Rabbi Cohen', color: '#ef4444', x: 200, y: 300 },
      { id: '2', name: 'Chabura Lead', color: '#3b82f6', x: 500, y: 150 },
  ]);

  useEffect(() => {
      if (!showCursors) return;
      const interval = setInterval(() => {
          setCollaborators(prev => prev.map(c => ({
              ...c,
              x: Math.max(0, Math.min(1000, c.x + (Math.random() - 0.5) * 50)),
              y: Math.max(0, Math.min(800, c.y + (Math.random() - 0.5) * 50))
          })));
      }, 2000);
      return () => clearInterval(interval);
  }, [showCursors]);

  // --- AUTO-POPULATION ---
  useEffect(() => {
    // Only populate if empty
    if (nodes.length === 0 && sugya.visualFlow) {
        const newNodes: CanvasNode[] = [];
        const newConns: Connection[] = [];
        
        // Adjust start position for mobile
        const startX = window.innerWidth < 768 ? 50 : 600;
        const startY = 100;

        const mapFlow = (steps: VisualFlowStep[], curX: number, curY: number, parentId?: string) => {
            let currentY = curY;
            steps.forEach((step) => {
                const nodeId = `flow-${step.id}`;
                let colorClass = 'bg-white border-slate-200';
                if (step.type === 'QUESTION') colorClass = 'bg-red-50 border-red-200';
                if (step.type === 'DECISION') colorClass = 'bg-amber-50 border-amber-200';
                if (step.type === 'RESULT') colorClass = 'bg-emerald-50 border-emerald-200';

                const shape: NodeShape = (step.type === 'DECISION' || step.type === 'QUESTION') ? 'DIAMOND' : 'RECT';
                
                newNodes.push({
                    id: nodeId,
                    x: curX,
                    y: currentY,
                    type: 'FLOW_STEP',
                    label: step.label,
                    content: step.description || '',
                    note: `Status: ${step.status}`,
                    data: step,
                    color: colorClass,
                    shape,
                    width: shape === 'DIAMOND' ? 180 : 240,
                    height: shape === 'DIAMOND' ? 180 : 120
                });

                if (parentId) {
                    newConns.push({ 
                        id: `${parentId}-${nodeId}`, 
                        from: parentId, 
                        to: nodeId,
                        fromHandle: 'bottom',
                        toHandle: 'top'
                    });
                }

                if (step.branches && step.branches.length > 0) {
                    const branchWidth = 320;
                    const totalWidth = (step.branches.length - 1) * branchWidth;
                    let currentBranchX = curX - (totalWidth / 2);
                    
                    step.branches.forEach(branch => {
                         const branchId = `flow-${branch.id}`;
                         let bColor = 'bg-white border-slate-200';
                         if (branch.status === 'VALID') bColor = 'bg-emerald-50 border-emerald-200';
                         if (branch.status === 'DISPUTED') bColor = 'bg-amber-50 border-amber-200';

                         newNodes.push({
                            id: branchId,
                            x: currentBranchX,
                            y: currentY + 240,
                            type: 'FLOW_STEP',
                            label: branch.label,
                            content: branch.description || '',
                            data: branch,
                            color: bColor,
                            shape: 'RECT',
                            width: 220,
                            height: 120
                        });
                        newConns.push({ 
                            id: `${nodeId}-${branchId}`, 
                            from: nodeId, 
                            to: branchId,
                            fromHandle: 'bottom',
                            toHandle: 'top'
                        });
                        currentBranchX += branchWidth;
                    });
                }
                currentY += 220;
                parentId = nodeId;
            });
        };

        mapFlow(sugya.visualFlow, startX, startY);
        setNodes(newNodes);
        setConnections(newConns);
    }
  }, [sugya]);

  // --- HELPERS ---

  const getClientCoords = (e: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      
      let clientX, clientY;
      if ('touches' in e && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
          clientX = (e as React.MouseEvent).clientX;
          clientY = (e as React.MouseEvent).clientY;
      } else {
          return { x: 0, y: 0 };
      }

      return {
          x: (clientX - rect.left) / scale,
          y: (clientY - rect.top) / scale
      };
  };

  const getNodeHandleCoords = (node: CanvasNode, handle: HandlePosition) => {
      const { x, y, width, height } = node;
      switch (handle) {
          case 'top': return { x: x + width / 2, y: y };
          case 'right': return { x: x + width, y: y + height / 2 };
          case 'bottom': return { x: x + width / 2, y: y + height };
          case 'left': return { x: x, y: y + height / 2 };
      }
  };

  // --- HANDLERS ---

  const handleCanvasInput = (e: React.MouseEvent | React.TouchEvent) => {
      // Background click logic handled via stopPropagation on elements
      if (dragState || connectingState) return;
      
      setSelectedNodeId(null);
      setEditingNodeId(null);
      setExpandedNoteId(null);
  };

  const handleNodeStart = (e: React.MouseEvent | React.TouchEvent, id: string) => {
      e.stopPropagation();
      const coords = getClientCoords(e);
      const node = nodes.find(n => n.id === id);
      if (node) {
          setDragState({
              nodeId: id,
              offsetX: coords.x - node.x,
              offsetY: coords.y - node.y
          });
          setSelectedNodeId(id);
      }
  };

  const handleHandleStart = (e: React.MouseEvent | React.TouchEvent, nodeId: string, handle: HandlePosition) => {
      e.stopPropagation();
      const coords = getClientCoords(e);
      setConnectingState({
          sourceId: nodeId,
          handle,
          currentX: coords.x,
          currentY: coords.y
      });
  };

  const handleHandleEnd = (e: React.MouseEvent | React.TouchEvent, targetNodeId: string, targetHandle: HandlePosition) => {
      e.stopPropagation();
      if (connectingState && connectingState.sourceId !== targetNodeId) {
          setConnections(prev => [...prev, {
              id: `${connectingState.sourceId}-${targetNodeId}-${Date.now()}`,
              from: connectingState.sourceId,
              to: targetNodeId,
              fromHandle: connectingState.handle,
              toHandle: targetHandle
          }]);
      }
      setConnectingState(null);
  };

  const handleInputMove = (e: React.MouseEvent | React.TouchEvent) => {
      const coords = getClientCoords(e);

      if (dragState) {
          setNodes(prev => prev.map(n => 
              n.id === dragState.nodeId 
                  ? { ...n, x: coords.x - dragState.offsetX, y: coords.y - dragState.offsetY } 
                  : n
          ));
      }

      if (connectingState) {
          setConnectingState(prev => prev ? { ...prev, currentX: coords.x, currentY: coords.y } : null);
      }
  };

  const handleInputEnd = () => {
      setDragState(null);
      setConnectingState(null);
  };

  const handleDoubleClick = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      setEditingNodeId(id);
      setExpandedNoteId(null);
  };

  // --- ACTIONS ---

  const addGenericShape = (shape: NodeShape, x: number, y: number) => {
    const isDiamond = shape === 'DIAMOND';
    setNodes(prev => [...prev, {
        id: `shape-${Date.now()}`,
        x, y,
        type: 'GENERIC_SHAPE',
        label: 'Title',
        content: 'Description',
        color: 'bg-white border-slate-300',
        shape,
        width: isDiamond ? 150 : 200,
        height: isDiamond ? 150 : 120
    }]);
  };

  const deleteSelected = () => {
      if (selectedNodeId) {
          setNodes(prev => prev.filter(n => n.id !== selectedNodeId));
          setConnections(prev => prev.filter(c => c.from !== selectedNodeId && c.to !== selectedNodeId));
          setSelectedNodeId(null);
      }
  };

  const updateNode = (id: string, updates: Partial<CanvasNode>) => {
      setNodes(prev => prev.map(n => {
          if (n.id !== id) return n;
          // Handle shape specific dimension adjustments
          if (updates.shape && updates.shape !== n.shape) {
              const isSquareIsh = updates.shape === 'DIAMOND' || updates.shape === 'CIRCLE';
              return { 
                  ...n, 
                  ...updates,
                  width: isSquareIsh ? 160 : 220,
                  height: isSquareIsh ? 160 : 120
              };
          }
          return { ...n, ...updates };
      }));
  };

  // --- RENDERERS ---

  const renderSidebarItem = (item: any, type: string, label: string) => (
    <div 
      key={`${type}-${item.id}`} 
      className="p-3 bg-white border border-slate-200 rounded-lg text-xs hover:border-indigo-400 cursor-pointer md:cursor-grab active:cursor-grabbing shadow-sm flex items-center justify-between group transition-all"
      draggable
      onDragEnd={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
              const x = (e.clientX - rect.left) / scale;
              const y = (e.clientY - rect.top) / scale;
              
              setNodes(prev => [...prev, {
                  id: `${type}-${item.id}-${Date.now()}`,
                  x: x > 0 ? x : 100, // Fallback if dropped outside
                  y: y > 0 ? y : 100,
                  type: type as any,
                  label: label,
                  content: item.description || item.englishText || item.text || '',
                  data: item,
                  color: 'bg-white border-slate-200',
                  shape: 'RECT',
                  width: 220,
                  height: 120
              }]);
          }
      }}
      onClick={() => {
          // Click to add support for Mobile
          setNodes(prev => [...prev, {
              id: `${type}-${item.id}-${Date.now()}`,
              x: 50, // Default position
              y: 50 + (nodes.length * 20),
              type: type as any,
              label: label,
              content: item.description || item.englishText || item.text || '',
              data: item,
              color: 'bg-white border-slate-200',
              shape: 'RECT',
              width: 220,
              height: 120
          }]);
          if(window.innerWidth < 768) setIsSidebarOpen(false);
      }}
    >
        <span className="font-bold text-slate-800 truncate">{label}</span>
        <Plus size={14} className="text-slate-300 group-hover:text-indigo-500 md:hidden" />
        <GripHorizontal size={14} className="text-slate-300 group-hover:text-slate-500 hidden md:block" />
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden relative">
      
      {/* Header */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center px-4 justify-between z-30 shadow-sm shrink-0">
          <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-2 rounded-lg transition-colors ${isSidebarOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                  <Menu size={20} />
              </button>
              
              <div className="flex items-center gap-2">
                  <div className="bg-indigo-600 text-white p-1.5 rounded mr-1 hidden md:block"><LayoutTemplate size={18} /></div>
                  <h2 className="font-bold text-slate-800 text-sm">Whiteboard</h2>
              </div>
              
              {/* Toolbar - Compact on Mobile */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg ml-2 overflow-x-auto no-scrollbar">
                  <button onClick={() => addGenericShape('RECT', 150, 150)} className="p-1.5 hover:bg-white rounded text-slate-600" title="Rectangle"><Square size={16}/></button>
                  <button onClick={() => addGenericShape('CIRCLE', 200, 150)} className="p-1.5 hover:bg-white rounded text-slate-600" title="Circle"><Circle size={16}/></button>
                  <button onClick={() => addGenericShape('DIAMOND', 250, 150)} className="p-1.5 hover:bg-white rounded text-slate-600" title="Diamond"><Diamond size={16}/></button>
                  <div className="w-px h-4 bg-slate-300 mx-1"></div>
                  <button onClick={deleteSelected} className="p-1.5 hover:bg-red-50 text-slate-600 hover:text-red-500 rounded disabled:opacity-50" disabled={!selectedNodeId}><Trash2 size={16}/></button>
              </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:flex -space-x-2">
                  {collaborators.map(c => (
                      <div key={c.id} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ backgroundColor: c.color }}>{c.name[0]}</div>
                  ))}
              </div>
              <button onClick={onClose} className="p-2 md:px-3 md:py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded hover:bg-slate-50 flex items-center gap-2">
                  <LogOut size={16} /> <span className="hidden md:inline">Close</span>
              </button>
          </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
          
          {/* Sidebar Overlay for Mobile */}
          {isSidebarOpen && window.innerWidth < 768 && (
              <div 
                className="absolute inset-0 bg-black/50 z-20"
                onClick={() => setIsSidebarOpen(false)}
              ></div>
          )}

          {/* Sidebar */}
          <div 
            className={`
                absolute md:relative top-0 bottom-0 left-0 bg-white border-r border-slate-200 flex flex-col z-20 shadow-2xl md:shadow-none transition-all duration-300
                ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 md:w-0 -translate-x-full md:translate-x-0 overflow-hidden opacity-0 md:opacity-100'}
            `}
            style={{ width: isSidebarOpen ? '16rem' : '0' }}
          >
              <div className="flex border-b border-slate-200 min-w-[16rem]">
                  {['STRUCTURE', 'LOGIC', 'OPINIONS'].map(cat => (
                      <button key={cat} onClick={() => setActiveCategory(cat)} className={`flex-1 py-3 text-[10px] font-bold uppercase ${activeCategory === cat ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}>
                          {cat}
                      </button>
                  ))}
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50/50 min-w-[16rem]">
                  {activeCategory === 'STRUCTURE' && sugya.visualFlow?.map(s => renderSidebarItem(s, 'FLOW_STEP', s.label))}
                  {activeCategory === 'LOGIC' && sugya.logicSystem?.statements.map(s => renderSidebarItem(s, 'LOGIC_STMT', s.text))}
                  {activeCategory === 'OPINIONS' && sugya.perspectives.map(p => renderSidebarItem(p, 'PERSPECTIVE', p.scholarName))}
              </div>
          </div>

          {/* Canvas */}
          <div 
            ref={canvasRef}
            id="canvas-bg"
            className="flex-1 relative bg-[#fdfbf7] overflow-hidden cursor-crosshair touch-none" // touch-none is crucial for preventing scrolling
            style={{ 
                backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
                backgroundSize: '24px 24px' 
            }}
            onMouseDown={handleCanvasInput}
            onMouseMove={handleInputMove}
            onMouseUp={handleInputEnd}
            onTouchStart={handleCanvasInput}
            onTouchMove={handleInputMove}
            onTouchEnd={handleInputEnd}
          >
              <div style={{ transform: `scale(${scale})`, transformOrigin: '0 0', width: '100%', height: '100%' }}>
                  
                  {/* SVG Layer */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                        </marker>
                      </defs>
                      
                      {/* Existing Connections */}
                      {connections.map(conn => {
                          const from = nodes.find(n => n.id === conn.from);
                          const to = nodes.find(n => n.id === conn.to);
                          if (!from || !to) return null;
                          const start = getNodeHandleCoords(from, conn.fromHandle);
                          const end = getNodeHandleCoords(to, conn.toHandle);
                          
                          // Simple Bezier
                          const path = `M ${start.x} ${start.y} C ${start.x} ${start.y + 50}, ${end.x} ${end.y - 50}, ${end.x} ${end.y}`;

                          return (
                              <path 
                                key={conn.id} 
                                d={path} 
                                stroke="#94a3b8" 
                                strokeWidth="2" 
                                fill="none"
                                markerEnd="url(#arrowhead)"
                              />
                          );
                      })}

                      {/* Creating Connection Line */}
                      {connectingState && (
                          <line 
                            x1={getNodeHandleCoords(nodes.find(n => n.id === connectingState.sourceId)!, connectingState.handle).x}
                            y1={getNodeHandleCoords(nodes.find(n => n.id === connectingState.sourceId)!, connectingState.handle).y}
                            x2={connectingState.currentX}
                            y2={connectingState.currentY}
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                      )}
                  </svg>

                  {/* Nodes */}
                  {nodes.map(node => {
                      const isSelected = selectedNodeId === node.id;
                      const isEditing = editingNodeId === node.id;
                      const isNoteOpen = expandedNoteId === node.id;
                      
                      // Shape specific styles
                      const shapeStyles = {
                          RECT: 'rounded-lg',
                          CIRCLE: 'rounded-full text-center flex items-center justify-center',
                          DIAMOND: 'rotate-45',
                          TRIANGLE: 'clip-path-triangle'
                      };

                      return (
                          <div
                            key={node.id}
                            className={`
                                absolute flex flex-col p-0 shadow-sm border transition-shadow group
                                ${node.color}
                                ${isSelected ? 'ring-2 ring-indigo-500 shadow-xl z-20' : 'hover:shadow-md z-10'}
                                ${shapeStyles[node.shape]}
                            `}
                            style={{ 
                                left: node.x, top: node.y, 
                                width: node.width, height: node.height 
                            }}
                            onMouseDown={(e) => handleNodeStart(e, node.id)}
                            onTouchStart={(e) => handleNodeStart(e, node.id)}
                            onDoubleClick={(e) => handleDoubleClick(e, node.id)}
                          >
                              {/* Content Container (Counter-rotated for Diamond) */}
                              <div className={`w-full h-full flex flex-col overflow-hidden relative ${node.shape === 'DIAMOND' ? '-rotate-45 items-center justify-center text-center p-8' : 'p-3'}`}>
                                  
                                  {isEditing ? (
                                      <div className="flex flex-col h-full gap-2 w-full" onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
                                          <input 
                                              className="text-xs font-bold border-b border-slate-300 bg-transparent outline-none pb-1"
                                              value={node.label}
                                              onChange={(e) => updateNode(node.id, { label: e.target.value })}
                                              placeholder="Label"
                                              autoFocus
                                          />
                                          <textarea 
                                              className="flex-1 text-[10px] bg-transparent resize-none outline-none font-sans leading-tight"
                                              value={node.content}
                                              onChange={(e) => updateNode(node.id, { content: e.target.value })}
                                              placeholder="Content..."
                                          />
                                          <div className="border-t border-slate-200 pt-1 mt-1">
                                              <input 
                                                  className="w-full text-[9px] bg-yellow-50 p-1 rounded border border-yellow-200 text-stone-600 placeholder:text-stone-300"
                                                  value={node.note || ''}
                                                  onChange={(e) => updateNode(node.id, { note: e.target.value })}
                                                  placeholder="Add a hidden note..."
                                              />
                                          </div>
                                          <button 
                                            onClick={() => setEditingNodeId(null)}
                                            className="bg-indigo-600 text-white text-[9px] font-bold py-1 rounded"
                                          >
                                              Done
                                          </button>
                                      </div>
                                  ) : (
                                      <>
                                          {/* Note Indicator */}
                                          {node.note && (
                                              <div 
                                                className="absolute top-1 right-1 z-20 cursor-help"
                                                onClick={(e) => { e.stopPropagation(); setExpandedNoteId(isNoteOpen ? null : node.id); }}
                                                onTouchEnd={(e) => { e.stopPropagation(); setExpandedNoteId(isNoteOpen ? null : node.id); }}
                                              >
                                                  <StickyNote size={14} className="text-yellow-500 fill-yellow-100" />
                                              </div>
                                          )}

                                          {/* View Mode */}
                                          <div className={`flex flex-col h-full ${node.shape === 'CIRCLE' ? 'justify-center items-center' : ''}`}>
                                              <div className={`font-bold text-slate-800 text-xs mb-1 ${node.shape === 'CIRCLE' ? 'text-center' : ''} leading-tight`}>
                                                  {node.label}
                                              </div>
                                              
                                              <div className={`text-[10px] text-slate-600 leading-snug font-medium opacity-80 ${node.shape === 'CIRCLE' ? 'text-center line-clamp-3' : 'line-clamp-4'}`}>
                                                  {node.content}
                                              </div>
                                          </div>
                                      </>
                                  )}
                              </div>

                              {/* Popover Note */}
                              {isNoteOpen && !isEditing && (
                                  <div 
                                    className={`absolute -right-36 top-0 w-32 bg-yellow-100 border border-yellow-300 p-2 rounded shadow-lg z-50 text-[10px] text-stone-700 animate-in fade-in zoom-in-50 ${node.shape === 'DIAMOND' ? '-rotate-45 origin-center' : ''}`}
                                    style={node.shape === 'DIAMOND' ? { right: '-9rem', top: '-2rem' } : {}}
                                    onMouseDown={e => e.stopPropagation()}
                                    onTouchStart={e => e.stopPropagation()}
                                  >
                                      <div className="font-bold mb-1 border-b border-yellow-200 pb-1 text-yellow-800 flex justify-between items-center">
                                          <span>Note</span>
                                          <button onClick={(e) => { e.stopPropagation(); setExpandedNoteId(null); }} className="hover:bg-yellow-200 rounded p-0.5"><X size={10}/></button>
                                      </div>
                                      <div className="whitespace-pre-wrap">{node.note}</div>
                                  </div>
                              )}

                              {/* Connection Handles - Hidden on touch devices to prevent accidental connections? Or kept small? */}
                              {!isEditing && ['top', 'right', 'bottom', 'left'].map((handle) => {
                                  const posStyles = {
                                      top: { top: -6, left: '50%', transform: 'translateX(-50%)' },
                                      right: { right: -6, top: '50%', transform: 'translateY(-50%)' },
                                      bottom: { bottom: -6, left: '50%', transform: 'translateX(-50%)' },
                                      left: { left: -6, top: '50%', transform: 'translateY(-50%)' }
                                  };
                                  return (
                                      <div
                                          key={handle}
                                          className={`
                                              absolute w-3 h-3 bg-white border border-slate-400 rounded-full cursor-crosshair transition-opacity z-30
                                              ${isSelected || connectingState ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                                              active:bg-blue-500 active:scale-125
                                          `}
                                          style={posStyles[handle as HandlePosition]}
                                          onMouseDown={(e) => handleHandleStart(e, node.id, handle as HandlePosition)}
                                          onMouseUp={(e) => handleHandleEnd(e, node.id, handle as HandlePosition)}
                                          onTouchStart={(e) => handleHandleStart(e, node.id, handle as HandlePosition)}
                                          onTouchEnd={(e) => {
                                              // Simplified touch connection for now: just stop dragging
                                              setConnectingState(null);
                                          }}
                                      />
                                  );
                              })}

                              {/* Context Menu (Shape/Color Switcher) */}
                              {isSelected && !editingNodeId && !dragState && (
                                  <div 
                                    className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white p-1 rounded-lg shadow-xl border border-slate-200 flex flex-col gap-1 animate-in fade-in slide-in-from-bottom-2 z-40 min-w-[140px]"
                                    onMouseDown={e => e.stopPropagation()}
                                    onTouchStart={e => e.stopPropagation()}
                                  >
                                      {/* Top Row: Actions */}
                                      <div className="flex justify-between items-center gap-2 border-b border-slate-100 pb-1 mb-0.5 px-1">
                                           <div className="flex gap-1">
                                                <button onClick={() => setEditingNodeId(node.id)} className="p-1 hover:bg-slate-100 rounded text-slate-600" title="Edit Text"><Edit3 size={14}/></button>
                                                <button onClick={() => updateNode(node.id, { note: node.note ? '' : 'New Note' })} className="p-1 hover:bg-slate-100 rounded text-slate-600" title="Add/Remove Note"><StickyNote size={14}/></button>
                                           </div>
                                           <button onClick={deleteSelected} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={14}/></button>
                                      </div>

                                      {/* Middle Row: Shapes */}
                                      <div className="flex gap-1 justify-center bg-slate-50 p-1 rounded">
                                          <button onClick={() => updateNode(node.id, { shape: 'RECT' })} className={`p-1 rounded hover:bg-white ${node.shape === 'RECT' ? 'text-indigo-600 bg-white shadow-sm' : 'text-slate-400'}`}><Square size={14}/></button>
                                          <button onClick={() => updateNode(node.id, { shape: 'CIRCLE' })} className={`p-1 rounded hover:bg-white ${node.shape === 'CIRCLE' ? 'text-indigo-600 bg-white shadow-sm' : 'text-slate-400'}`}><Circle size={14}/></button>
                                          <button onClick={() => updateNode(node.id, { shape: 'DIAMOND' })} className={`p-1 rounded hover:bg-white ${node.shape === 'DIAMOND' ? 'text-indigo-600 bg-white shadow-sm' : 'text-slate-400'}`}><Diamond size={14}/></button>
                                      </div>

                                      {/* Bottom Row: Colors */}
                                      <div className="flex gap-1 justify-center pt-1">
                                          {['bg-white border-slate-200', 'bg-red-50 border-red-200', 'bg-blue-50 border-blue-200', 'bg-green-50 border-green-200', 'bg-yellow-50 border-yellow-200'].map(c => (
                                              <button key={c} onClick={() => updateNode(node.id, { color: c })} className={`w-4 h-4 rounded-full border shadow-sm ${c.split(' ')[0]}`}/>
                                          ))}
                                      </div>
                                  </div>
                              )}
                          </div>
                      );
                  })}
                  
                  {/* Cursors */}
                  {showCursors && collaborators.map(c => (
                      <div key={c.id} className="absolute pointer-events-none transition-all duration-700 ease-in-out z-50 hidden md:block" style={{ left: c.x, top: c.y }}>
                          <MousePointer2 size={24} fill={c.color} className="text-white drop-shadow" />
                          <span className="ml-4 -mt-4 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded shadow absolute whitespace-nowrap">{c.name}</span>
                      </div>
                  ))}

              </div>
          </div>
          
          {/* Zoom Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-white rounded-lg shadow-md border border-slate-200 p-1 z-10">
              <button onClick={() => setScale(s => Math.min(s + 0.1, 2))} className="p-2 hover:bg-slate-100 rounded text-slate-600"><ZoomIn size={18} /></button>
              <button onClick={() => setScale(s => Math.max(s - 0.1, 0.5))} className="p-2 hover:bg-slate-100 rounded text-slate-600"><ZoomOut size={18} /></button>
          </div>
      </div>
    </div>
  );
};
