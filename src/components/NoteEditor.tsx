import React, { useState, useEffect } from 'react';
import { Save, X, Bold, Italic, List, ListOrdered, Quote, Code, MessageCircle } from 'lucide-react';
import { Note } from '../types/syllabus';
import ChatGPTPanel from './ChatGPTPanel';

interface NoteEditorProps {
  note?: Note;
  isDarkMode: boolean;
  subjectCode: string;
  semesterId: number;
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onClose: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  isDarkMode,
  subjectCode,
  semesterId,
  onSave,
  onUpdate,
  onClose,
}) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isPreview, setIsPreview] = useState(false);
  const [showChatGPT, setShowChatGPT] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    if (note) {
      onUpdate(note.id, { title: title.trim(), content: content.trim() });
    } else {
      onSave({
        title: title.trim(),
        content: content.trim(),
        subjectCode,
        semesterId,
      });
    }
    onClose();
  };

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.getElementById('note-content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newContent = content.substring(0, start) + before + selectedText + after + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleInsertFromChat = (text: string) => {
    const textarea = document.getElementById('note-content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.substring(0, start) + '\n\n' + text + '\n\n' + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length + 4, start + text.length + 4);
    }, 0);
  };

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6">$1</ul>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className={`fixed inset-0 ${isDarkMode ? 'bg-black' : 'bg-black'} bg-opacity-50 z-50 flex items-center justify-center p-1`}>
      <div className={`${isDarkMode ? 'bg-black border border-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {note ? 'Edit Note' : 'New Note'} - {subjectCode}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`px-3 py-1 text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded transition-colors`}
            >
              {isPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={() => setShowChatGPT(!showChatGPT)}
              className={`flex items-center px-3 py-1 text-sm ${showChatGPT ? 'bg-blue-600 text-white' : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded transition-colors`}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Research
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim() || !content.trim()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
              className={`w-full text-lg font-medium border-none outline-none ${isDarkMode ? 'bg-black text-white placeholder-white' : 'bg-white text-gray-900 placeholder-gray-400'}`}
          />
        </div>

        {!isPreview && (
          <div className={`flex items-center space-x-2 p-2 border-b ${isDarkMode ? 'bg-black border-white' : 'bg-gray-50'}`}>
            <button
              onClick={() => insertFormatting('**', '**')}
              className={`p-2 ${isDarkMode ? 'text-white hover:bg-black' : 'text-gray-600 hover:bg-gray-200'} rounded transition-colors`}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('*', '*')}
              className={`p-2 ${isDarkMode ? 'text-white hover:bg-black' : 'text-gray-600 hover:bg-gray-200'} rounded transition-colors`}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('`', '`')}
              className={`p-2 ${isDarkMode ? 'text-white hover:bg-black' : 'text-gray-600 hover:bg-gray-200'} rounded transition-colors`}
              title="Code"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('- ')}
              className={`p-2 ${isDarkMode ? 'text-white hover:bg-black' : 'text-gray-600 hover:bg-gray-200'} rounded transition-colors`}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('1. ')}
              className={`p-2 ${isDarkMode ? 'text-white hover:bg-black' : 'text-gray-600 hover:bg-gray-200'} rounded transition-colors`}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('> ')}
              className={`p-2 ${isDarkMode ? 'text-white hover:bg-black' : 'text-gray-600 hover:bg-gray-200'} rounded transition-colors`}
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex-1 p-4">
          {isPreview ? (
            <div
              className={`prose max-w-none h-full overflow-y-auto ${isDarkMode ? 'prose-invert' : ''}`}
              dangerouslySetInnerHTML={{ __html: formatContent(content) }}
            />
          ) : (
            <textarea
              id="note-content"
              placeholder={`Write your notes here... You can use markdown formatting:
- **bold text**
- *italic text*
- \`code\`
- > quotes
- - bullet points
- 1. numbered lists`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full h-full resize-none border-none outline-none ${isDarkMode ? 'bg-black text-white placeholder-white' : 'bg-white text-gray-700 placeholder-gray-400'} leading-relaxed`}
            />
          )}
        </div>
      </div>

      <ChatGPTPanel
        isDarkMode={isDarkMode}
        isVisible={showChatGPT}
        onClose={() => setShowChatGPT(false)}
        onInsertText={handleInsertFromChat}
      />
    </div>
  );
};

export default NoteEditor;