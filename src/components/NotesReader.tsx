import React from 'react';
import { X, List } from 'lucide-react';
import { Note } from '../types/syllabus';
import TableOfContents from './TableOfContents';

interface NotesReaderProps {
  note: Note;
  isDarkMode: boolean;
  onClose: () => void;
}

const NotesReader: React.FC<NotesReaderProps> = ({ note, isDarkMode, onClose }) => {
  const [showTOC, setShowTOC] = React.useState(false);
  const [touchStartX, setTouchStartX] = React.useState(0);

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, `<code class="${isDarkMode ? 'bg-white text-black' : 'bg-gray-100'} px-1 rounded text-sm">$1</code>`)
      .replace(/^> (.+)$/gm, `<blockquote class="border-l-4 ${isDarkMode ? 'border-white text-white' : 'border-blue-300 text-gray-700'} pl-4 italic my-4">$1</blockquote>`)
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$2</li>')
      .replace(/(<li.*?>.*?<\/li>)/gs, '<ul class="list-disc space-y-1 my-3">$1</ul>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  };

  const formatDate = (date: Date) => {
    // Ensure date is a Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    
    // Swipe right to left (show TOC)
    if (diff > 100 && touchStartX < 50) {
      setShowTOC(true);
    }
  };

  const handleNavigateToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addIdsToHeadings = (html: string) => {
    return html.replace(/<h([1-6])([^>]*)>([^<]+)<\/h[1-6]>/g, (match, level, attrs, content) => {
      const id = content.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
    });
  };

  return (
    <div 
      className={`fixed inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'} z-50 overflow-y-auto`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full px-2 py-4">
        <div className="fixed top-2 right-2 flex space-x-2 z-10">
          <button
            onClick={() => setShowTOC(true)}
            className={`p-2 ${isDarkMode ? 'bg-black hover:bg-black text-white border border-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} rounded-full transition-colors`}
            aria-label="Table of Contents"
          >
            <List className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={onClose}
            className={`p-2 ${isDarkMode ? 'bg-black hover:bg-black text-white border border-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} rounded-full transition-colors`}
            aria-label="Close reader"
          >
            <X className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="mb-4">
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              {note.title}
            </h1>
            <div className={`flex items-center space-x-4 text-sm ${isDarkMode ? 'text-white' : 'text-gray-500'} mb-4`}>
              <span>Created: {formatDate(note.createdAt)}</span>
              {new Date(note.updatedAt).getTime() !== new Date(note.createdAt).getTime() && (
                <span>Updated: {formatDate(note.updatedAt)}</span>
              )}
            </div>
          </div>

          <div 
            className={`${isDarkMode ? 'text-white' : 'text-gray-700'} leading-relaxed`}
            dangerouslySetInnerHTML={{ 
              __html: `<p class="mb-4">${addIdsToHeadings(formatContent(note.content))}</p>` 
            }}
          />
        </div>
      </div>

      <TableOfContents
        content={note.content}
        isDarkMode={isDarkMode}
        isVisible={showTOC}
        onClose={() => setShowTOC(false)}
        onNavigate={handleNavigateToHeading}
      />
    </div>
  );
};

export default NotesReader;