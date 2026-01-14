
export enum LogicType {
  STATEMENT = 'STATEMENT',
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER',
  PROOF = 'PROOF',
  REBUTTAL = 'REBUTTAL',
  PRINCIPLE = 'PRINCIPLE',
  CASE = 'CASE',
  LAW = 'LAW',
  SOURCE = 'SOURCE',
  FACTOR = 'FACTOR'
}

export enum Era {
  TANNA = 'TANNA',
  AMORA = 'AMORA',
  RISHON = 'RISHON',
  ACHRON = 'ACHRON',
  HALACHA = 'HALACHA'
}

export enum StudyStage {
  SELECTOR = 'SELECTOR',
  INTRO = 'INTRO',
  SOURCE_TEXT = 'SOURCE_TEXT',
  ANALYSIS = 'ANALYSIS',
  LOGIC_SYSTEM = 'LOGIC_SYSTEM',
  DEPTH_RISHONIM = 'DEPTH_RISHONIM',
  DEPTH_ACHRONIM = 'DEPTH_ACHRONIM',
  PSAK = 'PSAK'
}

export interface Concept {
  id: string;
  nameHebrew: string;
  nameEnglish: string;
  description: string;
  category: 'Kinyan' | 'Mamon' | 'Issur' | 'Kodshim' | 'Logic';
  subComponents?: string[];
  relatedLaws?: string[];
  attributes?: { label: string; value: string }[];
  opinions?: { authority: string; text: string }[];
}

export interface LogicNode {
  id: string;
  type: LogicType;
  speaker?: string;
  era: Era;
  hebrewText: string;
  englishText: string;
  concepts: string[];
  children: LogicNode[];
  isExpanded?: boolean;
  notes?: string;
  parentId?: string;
  linkedSourceId?: string;
}

export interface Perspective {
  id: string;
  scholarName: string;
  scholarNameHebrew?: string;
  description: string;
  rootNode: LogicNode;
  analysis?: {
      focus: string;
      chiddush: string;
      reasoning: string;
      dispute?: string;
  }
}

export interface AnalysisComponent {
  id: string;
  category: 'CASE' | 'LAW' | 'FACTOR' | 'SOURCE';
  title: string;
  description: string;
  refId: string;
}

export interface PsakEntry {
  id: string;
  authority: string;
  text: string;
  ruling: string;
  citation: string;
  basedOn: string[];
}

export interface LogicStatement {
  text: string;
  type: string;
  color: string;
  analysis: {
    subject: string;
    predicate: string;
    statementType: string;
    reason?: string;
  }
}

export interface Syllogism {
  premise1: string;
  premise2: string;
  conclusion: string;
}

export interface LogicSystemData {
  statements: LogicStatement[];
  syllogism: Syllogism;
}

export interface ModernApplication {
    id: string;
    title: string;
    scenario: string;
    parallels: string;
    ruling: string;
    deepAnalysis?: {
        yesod: string;
        perspectives: {
            authority: string;
            logic: string;
            outcome: string;
        }[];
    };
}

export interface VisualFlowStep {
    id: string;
    label: string;
    type: 'ACTION' | 'QUESTION' | 'DECISION' | 'RESULT';
    description?: string;
    status: 'VALID' | 'INVALID' | 'DISPUTED' | 'NEUTRAL';
    branches?: VisualFlowStep[];
}

export interface ShulchanAruchData {
    siman: string;
    seif: string;
    mainText: { type: 'MECHABER' | 'REMA', text: string, translation?: string }[];
    mishnaBrura: { id: string, noteChar: string, text: string, translation: string }[];
    shulchanAruchHarav: { id: string, text: string, translation: string }[];
}

export interface ChumashData {
    sourceRef: string;
    text: string;
    translation: string;
    rashi: { id: string, text: string, translation?: string }[];
    targum: string;
    targumTranslation?: string;
}

export interface MishnaContextText {
    ref: string;
    hebrew: string;
    english: string;
}

export interface Commentary {
    id: string;
    scholar: string;
    hebrewText: string;
    englishText: string;
    linkedSourceId?: string;
}

export interface DafSegment {
    id: string;
    gemaraText: { hebrew: string; english: string; };
    rashi: Commentary[];
    tosfos: Commentary[];
}

export interface GuideStep {
    id: string;
    title: string;
    description: string;
    stage: StudyStage;
    targetId?: string;
    // Expanded Pedagogical Fields
    deepDive?: string; // The "Teacher's Explanation"
    keyTerms?: string[]; // e.g. "Yad", "Dvarim Shebalev"
    nuance?: string; // Subtle point to notice
}

export interface SugyaSection {
  id: string;
  title: string;
  sourceRef: string;
  
  guide?: GuideStep[];

  chumashText?: ChumashData;
  mishnaContext?: {
      previous?: MishnaContextText;
      current?: MishnaContextText; // Added Current
      next?: MishnaContextText;
      bartenura?: Commentary[];
  };
  baseText: LogicNode;
  gemaraText?: LogicNode;
  dafStructure?: DafSegment[];
  
  secondaryGemaraText?: LogicNode;
  relatedSources?: LogicNode[];

  perspectives: Perspective[];
  achronimPerspectives: Perspective[];
  analysis: AnalysisComponent[];
  psakChain: PsakEntry[];
  shulchanAruch: ShulchanAruchData;
  logicSystem: LogicSystemData;
  modernAnalysis: ModernApplication[];
  visualFlow: VisualFlowStep[];
  
  resources?: {
      videoUrl?: string;
      pdfUrl?: string;
  };
}

export interface AppState {
  currentSugya: SugyaSection;
  activePerspectiveId: string | null;
  learnedConcepts: Concept[];
  whiteboardNodes: LogicNode[];
  currentStage: StudyStage;
  mode: 'LEARN' | 'WHITEBOARD' | 'SUMMARY';
}
