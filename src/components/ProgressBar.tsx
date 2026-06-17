"use client";

import React from "react";

interface ProgressBarProps {
  completedStepsCount: number;
  totalStepsCount: number;
  completedModulesCount: number;
  totalModulesCount: number;
  quizScore: number;
}

export default function ProgressBar({
  completedStepsCount,
  totalStepsCount,
  completedModulesCount,
  totalModulesCount,
  quizScore,
}: ProgressBarProps) {
  const percentage = Math.round((completedStepsCount / totalStepsCount) * 100);

  // Motivational quote based on completion percentage
  let statusMessage = "Welcome to your discovery journey! Open the first module to start learning.";
  if (percentage > 0 && percentage < 30) {
    statusMessage = "Off to a strong start! Keep going to build solid discovery foundations.";
  } else if (percentage >= 30 && percentage < 65) {
    statusMessage = "Excellent progress! You're over a third of the way through the curriculum.";
  } else if (percentage >= 65 && percentage < 100) {
    statusMessage = "Almost there! Complete the remaining steps to earn your Discovery Badge.";
  } else if (percentage === 100) {
    statusMessage = "Mastery achieved! You've successfully finished all 30 steps of the Discovery curriculum! 🎓";
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full select-none font-sans">
      
      {/* Course Progress Card (2 cols on large screens) */}
      <div className="lg:col-span-2 bg-card-bg border border-card-border rounded-2xl p-5 md:p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base md:text-lg font-bold text-foreground flex items-center flex-wrap gap-2">
              Overall Course Completion
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary">
                {completedModulesCount} of {totalModulesCount} Modules Done
              </span>
            </h2>
            <p className="text-xs text-brand-text-sec mt-1 font-semibold">
              {statusMessage}
            </p>
          </div>
          <div className="flex items-baseline gap-1 text-right">
            <span className="text-2xl md:text-3xl font-extrabold text-brand-primary tracking-tight">
              {percentage}%
            </span>
            <span className="text-xs font-bold text-brand-text-sec">complete</span>
          </div>
        </div>

        {/* Progress Track: Chunky (12px / h-3), rounded, gradient fill */}
        <div className="relative w-full h-3 bg-card-border/80 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-500 ease-out shadow-lg shadow-brand-primary/45"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Quick guide text */}
        <div className="flex justify-between items-center mt-3.5 text-[9px] font-bold text-brand-text-sec uppercase tracking-wider">
          <span>1. Define & Research</span>
          <span>2. Map & Ideate</span>
          <span>3. Test & Scale</span>
        </div>
      </div>

      {/* Quiz Score Tracker Card */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-5 md:p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <span className="text-lg">⭐</span>
            Quiz Score Tracker
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-warning bg-brand-warning/10 px-2.5 py-0.5 rounded-full">
            Knowledge Check
          </span>
        </div>
        
        <div className="flex items-center gap-5 my-auto">
          {/* Big circular score indicator */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-brand-warning/5 border-2 border-brand-warning/30 shadow-md shadow-brand-warning/5">
            <span className="text-xl font-extrabold text-brand-warning">
              {quizScore}
            </span>
            <span className="text-[10px] text-brand-text-sec font-bold absolute -bottom-1 bg-card-bg px-1 border border-card-border rounded-md">
              / 10
            </span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-foreground">
              {quizScore === 10
                ? "Perfect Score! 🏆"
                : quizScore >= 7
                ? "Excellent job!"
                : quizScore >= 4
                ? "Good progress!"
                : "Complete quizzes to build score."}
            </h4>
            <p className="text-[11px] text-brand-text-sec mt-1 font-semibold leading-normal">
              Get all multiple choice questions correct to level up your credentials.
            </p>
          </div>
        </div>

        {/* Small dots for quiz completion */}
        <div className="flex justify-between items-center mt-3.5 pt-3 border-t border-card-border/60">
          <span className="text-[9px] font-bold text-brand-text-sec uppercase tracking-widest">Quizzes:</span>
          <div className="flex gap-1.5">
            {Array.from({ length: 10 }).map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx < quizScore ? "bg-brand-warning scale-110" : "bg-card-border"
                }`}
                title={`Quiz ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
