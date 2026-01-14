
import React from 'react';

interface Props {
  text: string;
  isHebrew?: boolean;
  className?: string;
}

export const TextRenderer: React.FC<Props> = ({ text, isHebrew = true, className = "" }) => {
  
  if (!text) return null;

  // Pre-process: Split by double newline (definite paragraph breaks)
  const rawBlocks = text.split(/\n\n+/);
  const paragraphs: string[] = [];

  rawBlocks.forEach(block => {
      // Within each block, split by single newline
      const lines = block.split('\n');
      let currentPara = '';

      lines.forEach((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return;

          // Heuristics to force a new line within a block:
          // 1. Starts with specialized markers ([, >, number)
          // 2. Previous line ended with a period or colon (strong stop)
          // 3. Current line is short (title/header like)
          
          const isSpecialStart = /^[\(\[>\-\*]/.test(trimmed) || /^\d+\./.test(trimmed);
          const prevEndedStrong = currentPara.trim().endsWith('.') || currentPara.trim().endsWith(':');
          
          if (currentPara === '') {
              currentPara = trimmed;
          } else if (isSpecialStart || prevEndedStrong) {
              paragraphs.push(currentPara);
              currentPara = trimmed;
          } else {
              // Merge line
              currentPara += ' ' + trimmed;
          }
      });
      if (currentPara) paragraphs.push(currentPara);
  });

  return (
    <div className={`w-full space-y-4 ${className}`}>
        {paragraphs.map((para, idx) => {
            const isQuote = para.startsWith('>');
            const isComment = para.startsWith('[');
            const cleanText = para.replace(/^[>\[]\s*/, '').replace(/\]$/, ''); // Remove markers

            // Bold Logic (Dibbur Hamatchil)
            // We want to bold the first phrase until a punctuation mark (., :, -) or max 4 words
            let boldContent = '';
            let restContent = cleanText;
            
            if (isHebrew && !isQuote && !isComment) {
                const words = cleanText.split(' ');
                let stopIndex = -1;

                // Look for punctuation in first 10 words
                for (let i = 0; i < Math.min(words.length, 10); i++) {
                    if (words[i].includes('.') || words[i].includes(':') || words[i].includes('-') || words[i].includes('–')) {
                        stopIndex = i;
                        break;
                    }
                }

                // If no punctuation found, bold first 3 words as fallback
                if (stopIndex === -1 && words.length > 0) {
                    stopIndex = Math.min(words.length - 1, 2);
                }

                if (stopIndex !== -1) {
                    boldContent = words.slice(0, stopIndex + 1).join(' ');
                    restContent = words.slice(stopIndex + 1).join(' ');
                }
            }

            return (
                <div key={idx} className={`relative group ${isQuote ? 'pr-6' : ''}`}>
                    {isQuote && (
                        <div className="absolute top-0 right-0 bottom-0 w-1 bg-stone-300 rounded-full"></div>
                    )}
                    
                    <p 
                        className={`
                            text-justify leading-relaxed break-words whitespace-normal text-stone-900
                            ${isHebrew ? 'font-hebrew-serif text-xl' : 'font-serif text-lg'}
                            ${isQuote ? 'bg-stone-50 p-3 rounded italic text-stone-700' : ''}
                            ${isComment ? 'text-sm bg-stone-50 border border-stone-200 p-2 rounded text-stone-600 font-sans' : ''}
                        `}
                        dir={isHebrew ? "rtl" : "ltr"}
                    >
                        {boldContent && (
                            <span className="font-black text-stone-900 ml-1.5">
                                {boldContent}
                            </span>
                        )}
                        <span>{restContent}</span>
                    </p>
                </div>
            );
        })}
        
        {/* End Mark */}
        <div className="flex justify-center mt-8 mb-4 opacity-20 gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
        </div>
    </div>
  );
};
