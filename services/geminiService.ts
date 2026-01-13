
import { LogicNode } from '../types';

// Static mock service to remove dependency on Google GenAI for static deployment

export const explainConcept = async (conceptName: string): Promise<string> => {
  return `AI explanation for "${conceptName}" is disabled in this static demo. In the full version, this would provide a concise definition and context.`;
};

export const analyzeTextStructure = async (hebrewText: string): Promise<LogicNode | null> => {
    return null;
};

export const generateComparison = async (opinionA: string, opinionB: string, topic: string): Promise<string> => {
  return "Comparison generation unavailable in static mode.";
}

export const generateSugyaDeepData = async (title: string, mainText: string) => {
    return null;
}
