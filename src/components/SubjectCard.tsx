import React from 'react';
import { Subject } from '../types/syllabus';
import { BookOpen, FileText, StickyNote, ChevronRight } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  semesterId: number;
  isDarkMode: boolean;
  onReadSubject: (subject: Subject, semesterId: number) => void;
  onViewNotes: (subjectCode: string, semesterId: number) => void;
  onViewPDFs: (subjectCode: string, semesterId: number) => void;
  notesCount: number;
  pdfsCount: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  semesterId,
  isDarkMode,
  onReadSubject,
  onViewNotes,
  onViewPDFs,
  notesCount,
  pdfsCount,
}) => {
  return (
    <div className={`${isDarkMode ? 'bg-black hover:bg-black' : 'bg-white hover:bg-gray-50'} p-2 transition-colors`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {subject.credits}
            </span>
            <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} truncate`}>
              {subject.code}
            </h3>
          </div>
          <h4 className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-600'} mt-1 line-clamp-1`}>{subject.name}</h4>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onViewNotes(subject.code, semesterId)}
            className="flex items-center px-2 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
          >
            <StickyNote className="w-3 h-3 mr-1" />
            {notesCount}
          </button>
          <button
            onClick={() => onViewPDFs(subject.code, semesterId)}
            className="flex items-center px-2 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
          >
            <FileText className="w-3 h-3 mr-1" />
            {pdfsCount}
          </button>
          <button
            onClick={() => onReadSubject(subject, semesterId)}
            className={`flex items-center px-3 py-1 text-xs rounded transition-colors ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Read
            <ChevronRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;