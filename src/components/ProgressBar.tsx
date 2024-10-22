import React from 'react';

interface ProgressBarProps {
  progress: number;
  totalQuestions: number;
  answeredQuestions: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, totalQuestions, answeredQuestions }) => {
  return (
    <div className="mb-6">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{answeredQuestions} de {totalQuestions} preguntas respondidas</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;