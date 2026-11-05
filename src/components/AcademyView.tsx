import React, { useState } from 'react';
import { BookOpen, Clock, BarChart, Check, Copy, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { ACADEMY_LESSONS, DESIGN_PROMPTS_CATALOG } from '../data/motionsitesCatalog';
import { DesignPromptItem } from '../types/catalog';

interface AcademyViewProps {
  onInspectPrompt: (item: DesignPromptItem) => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({ onInspectPrompt }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(ACADEMY_LESSONS[0].id);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const activeLesson =
    ACADEMY_LESSONS.find((l) => l.id === selectedLessonId) || ACADEMY_LESSONS[0];

  const associatedPrompt =
    DESIGN_PROMPTS_CATALOG.find((d) => d.id === activeLesson.associatedPromptId) ||
    DESIGN_PROMPTS_CATALOG[0];

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="liquid-glass px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300 inline-flex items-center gap-2 mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          MotionSites Academy
        </span>
        <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white">
          Master Modern <span className="shimmer-superpowers">Motion Engineering</span>
        </h2>
        <p className="text-white/60 text-base font-light mt-4">
          Interactive tutorials and production blueprints to help you master scroll choreography, cursor kinematics, and shader-grade liquid glass surfaces.
        </p>
      </div>

      {/* Lesson Selector Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {ACADEMY_LESSONS.map((lesson) => {
          const isSelected = lesson.id === activeLesson.id;
          return (
            <button
              key={lesson.id}
              onClick={() => setSelectedLessonId(lesson.id)}
              className={`text-left p-5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'liquid-glass-strong border border-purple-400/50 shadow-xl'
                  : 'liquid-glass hover:bg-white/5 border border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      lesson.level === 'Beginner'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : lesson.level === 'Intermediate'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {lesson.level}
                  </span>
                  <span className="text-white/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lesson.duration}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-medium text-white line-clamp-2">
                  {lesson.title}
                </h3>
              </div>
              <div className="text-[11px] text-white/50 line-clamp-2">{lesson.summary}</div>
            </button>
          );
        })}
      </div>

      {/* Active Lesson Blueprint Detail */}
      <div className="liquid-glass-strong rounded-3xl p-6 sm:p-10 border border-white/15">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30">
                {activeLesson.level} Blueprint
              </span>
              <span className="text-xs text-white/50 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {activeLesson.duration} watch time
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              {activeLesson.title}
            </h3>
            <p className="text-white/60 text-sm font-light mt-2 max-w-2xl">
              {activeLesson.summary}
            </p>
          </div>

          <button
            onClick={() => onInspectPrompt(associatedPrompt)}
            className="self-start lg:self-center bg-white text-black hover:bg-purple-100 px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Load Design in Remix Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Key Takeaways */}
        <div className="py-6 border-b border-white/10">
          <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-3">
            Core Architectural Takeaways
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeLesson.keyTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="liquid-glass p-4 rounded-xl border border-white/10 text-xs text-white/80 font-light leading-relaxed flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span>{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Walkthrough */}
        <div className="pt-8">
          <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-6">
            Execution Steps
          </h4>
          <div className="space-y-6">
            {activeLesson.steps.map((step, idx) => (
              <div key={step.stepNumber} className="liquid-glass rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-base font-medium text-white">{step.heading}</h5>
                  <span className="text-xs font-mono text-white/40">Step 0{step.stepNumber}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-3">
                  {step.body}
                </p>

                {step.codeSnippet && (
                  <div className="relative mt-3">
                    <pre className="bg-[#05030D] p-3 rounded-xl text-[11px] font-mono text-purple-200 overflow-x-auto border border-white/10 whitespace-pre-wrap">
                      {step.codeSnippet}
                    </pre>
                    <button
                      onClick={() => handleCopyCode(step.codeSnippet!, idx)}
                      className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white/80 px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCodeIndex === idx ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

