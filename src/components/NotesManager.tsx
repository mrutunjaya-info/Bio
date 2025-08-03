import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, Search, BookOpen } from 'lucide-react';
import { Note } from '../types/syllabus';
import NoteEditor from './NoteEditor';

interface NotesManagerProps {
  subjectCode: string;
  subjectName: string;
  semesterId: number;
  isDarkMode: boolean;
  notes: Note[];
  onClose: () => void;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
  onReadNote: (note: Note) => void;
}

const NotesManager: React.FC<NotesManagerProps> = ({
  subjectCode,
  subjectName,
  semesterId,
  isDarkMode,
  notes,
  onClose,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onReadNote,
}) => {
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleNewNote = () => {
    setEditingNote(undefined);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingNote(undefined);
  };

  const formatDate = (date: Date) => {
    // Ensure date is a Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <div className={`fixed inset-0 ${isDarkMode ? 'bg-black' : 'bg-black'} bg-opacity-50 z-40 flex items-center justify-center p-1`}>
        <div className={`${isDarkMode ? 'bg-black border border-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col`}>
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Notes</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{subjectCode}: {subjectName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleNewNote}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Note
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
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border ${isDarkMode ? 'border-white bg-black text-white focus:ring-white' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {filteredNotes.length === 0 ? (
              <div className={`text-center py-12`}>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-500'} mb-4`}>
                  {searchTerm ? 'No notes found matching your search.' : 'No notes yet for this subject.'}
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleNewNote}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Create your first note
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotes.map((note) => (
                  <div key={note.id} className={`${isDarkMode ? 'bg-black border-white' : 'bg-gray-50 border-gray-200'} rounded-lg p-4 border`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{note.title}</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onReadNote(note)}
                          className={`p-1 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-500 hover:text-green-600'} transition-colors`}
                          title="Read note"
                        >
                          <BookOpen className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditNote(note)}
                          className={`p-1 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-500 hover:text-blue-600'} transition-colors`}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteNote(note.id)}
                          className={`p-1 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-500 hover:text-red-600'} transition-colors`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-600'} text-sm mb-3 line-clamp-3`}>
                      {note.content.substring(0, 200)}...
                    </p>
                    <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>
                      <span>Created: {formatDate(note.createdAt)}</span>
                      {new Date(note.updatedAt).getTime() !== new Date(note.createdAt).getTime() && (
                        <span>Updated: {formatDate(note.updatedAt)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditor && (
        <NoteEditor
          note={editingNote}
          isDarkMode={isDarkMode}
          subjectCode={subjectCode}
          semesterId={semesterId}
          onSave={onAddNote}
          onUpdate={onUpdateNote}
          onClose={handleCloseEditor}
        />
      )}
    </>
  );
};

export default NotesManager;