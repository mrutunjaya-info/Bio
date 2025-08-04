import React, { useState } from 'react';
import { BookOpen, Moon, Sun } from 'lucide-react';
import { Subject, Note, PDFResource } from './types/syllabus';
import { useNotes } from './hooks/useNotes';
import { usePDFs } from './hooks/usePDFs';
import { useSyllabus } from './hooks/useSyllabus';
import SemesterToggle from './components/SemesterToggle';
import SubjectCard from './components/SubjectCard';
import DistractionFreeReader from './components/DistractionFreeReader';
import NotesManager from './components/NotesManager';
import NotesReader from './components/NotesReader';
import PDFManager from './components/PDFManager';
import FloatingActionButton from './components/FloatingActionButton';
import SettingsPanel from './components/SettingsPanel';

function App() {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [readingSubject, setReadingSubject] = useState<{ subject: Subject; semesterId: number } | null>(null);
  const [notesManager, setNotesManager] = useState<{ subjectCode: string; subjectName: string; semesterId: number } | null>(null);
  const [pdfManager, setPdfManager] = useState<{ subjectCode: string; subjectName: string; semesterId: number } | null>(null);
  const [readingNote, setReadingNote] = useState<Note | null>(null);
  
  const { notes, addNote, updateNote, deleteNote, getNotesForSubject } = useNotes();
  const { pdfs, addPDF, updatePDF, deletePDF, getPDFsForSubject } = usePDFs();
  const { semesters, updateSubject, addUnit, updateUnit, deleteUnit } = useSyllabus();

  const currentSemester = semesters.find(sem => sem.id === selectedSemester);

  const handleReadSubject = (subject: Subject, semesterId: number) => {
    setReadingSubject({ subject, semesterId });
  };

  const handleViewNotes = (subjectCode: string, semesterId: number) => {
    const subject = currentSemester?.subjects.find(s => s.code === subjectCode);
    if (subject) {
      setNotesManager({ 
        subjectCode, 
        subjectName: subject.name, 
        semesterId 
      });
    }
  };

  const handleViewPDFs = (subjectCode: string, semesterId: number) => {
    const subject = currentSemester?.subjects.find(s => s.code === subjectCode);
    if (subject) {
      setPdfManager({ 
        subjectCode, 
        subjectName: subject.name, 
        semesterId 
      });
    }
  };

  const handleReadNote = (note: Note) => {
    setReadingNote(note);
  };

  const handleOpenSyllabus = () => {
    if (currentSemester && currentSemester.subjects && currentSemester.subjects.length > 0) {
      handleReadSubject(currentSemester.subjects[0], selectedSemester);
    } else {
      // If no subjects, still allow opening syllabus view
      console.log('No subjects available in current semester');
    }
  };

  const handleOpenNotes = () => {
    if (currentSemester && currentSemester.subjects && currentSemester.subjects.length > 0) {
      handleViewNotes(currentSemester.subjects[0].code, selectedSemester);
    }
  };

  const handleOpenPDFs = () => {
    if (currentSemester && currentSemester.subjects && currentSemester.subjects.length > 0) {
      handleViewPDFs(currentSemester.subjects[0].code, selectedSemester);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'text-gray-900'} relative`} style={{ backgroundColor: isDarkMode ? '#000000' : '#F9F9F9' }}>

      <main>
      {/* Main Content */}
        {/* Header Area */}
        <div className="mb-3 px-2">
          <div className="flex items-center">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`text-xl font-bold ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700'} transition-colors`}
            >
              Bioinformatics
            </button>
            <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-600'} ml-4`}>M.Sc. Bioinformatics Program</p>
          </div>
        </div>

        {currentSemester && (
          <>
            {/* Chrome-like Tab for Semester */}
            <div className="mb-2 px-2">
              <div className={`inline-flex items-center px-3 py-1 rounded-t-md border-t border-l border-r ${
                isDarkMode ? 'bg-black border-white text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}>
                <h2 className="text-sm font-medium mr-3">{currentSemester.name}</h2>
                <span className="text-xs opacity-75">{currentSemester.totalCredits}</span>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-black border-white' : 'bg-white border-gray-200'} border border-t-0 divide-y ${isDarkMode ? 'divide-white' : 'divide-gray-200'}`}>
              {(currentSemester.subjects || []).map((subject) => (
                <SubjectCard
                  key={subject.code}
                  subject={subject}
                  semesterId={selectedSemester}
                  isDarkMode={isDarkMode}
                  onReadSubject={handleReadSubject}
                  onViewNotes={handleViewNotes}
                  onViewPDFs={handleViewPDFs}
                  notesCount={getNotesForSubject(subject.code, selectedSemester).length}
                  pdfsCount={getPDFsForSubject(subject.code, selectedSemester).length}
                />
              ))}
            </div>

            {(!currentSemester.subjects || currentSemester.subjects.length === 0) && (
              <div className={`text-center py-8 ${isDarkMode ? 'bg-black border-white' : 'bg-white border-gray-200'} border-t border-b mx-2`}>
                <BookOpen className={`w-16 h-16 ${isDarkMode ? 'text-white' : 'text-gray-400'} mx-auto mb-4`} />
                <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No subjects available</h3>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-600'}`}>This semester doesn't have any subjects listed yet.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Distraction-Free Reader */}
      {readingSubject && (
        <DistractionFreeReader
          subject={readingSubject.subject}
          semesterId={readingSubject.semesterId}
          isDarkMode={isDarkMode}
          onClose={() => setReadingSubject(null)}
          onCreateNote={(title, content) => {
            addNote({
              title,
              content,
              subjectCode: readingSubject.subject.code,
              semesterId: readingSubject.semesterId,
            });
          }}
          onUpdateSubject={(updates) => {
            updateSubject(readingSubject.semesterId, readingSubject.subject.code, updates);
          }}
          onAddUnit={(unit) => {
            addUnit(readingSubject.semesterId, readingSubject.subject.code, unit);
          }}
          onUpdateUnit={(unitIndex, unit) => {
            updateUnit(readingSubject.semesterId, readingSubject.subject.code, unitIndex, unit);
          }}
          onDeleteUnit={(unitIndex) => {
            deleteUnit(readingSubject.semesterId, readingSubject.subject.code, unitIndex);
          }}
        />
      )}

      {/* Notes Manager */}
      {notesManager && (
        <NotesManager
          subjectCode={notesManager.subjectCode}
          subjectName={notesManager.subjectName}
          semesterId={notesManager.semesterId}
          isDarkMode={isDarkMode}
          notes={getNotesForSubject(notesManager.subjectCode, notesManager.semesterId)}
          onClose={() => setNotesManager(null)}
          onAddNote={addNote}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
          onReadNote={handleReadNote}
        />
      )}

      {/* PDF Manager */}
      {pdfManager && (
        <PDFManager
          subjectCode={pdfManager.subjectCode}
          subjectName={pdfManager.subjectName}
          semesterId={pdfManager.semesterId}
        isDarkMode={isDarkMode}
          pdfs={getPDFsForSubject(pdfManager.subjectCode, pdfManager.semesterId)}
          onClose={() => setPdfManager(null)}
          onAddPDF={addPDF}
          onUpdatePDF={updatePDF}
          onDeletePDF={deletePDF}
        />
      )}

      {/* Notes Reader */}
      {readingNote && (
        <NotesReader
          note={readingNote}
        isDarkMode={isDarkMode}
          onClose={() => setReadingNote(null)}
        />
      )}

      {/* Floating Action Button */}
      <FloatingActionButton
        isDarkMode={isDarkMode}
        onOpenSyllabus={handleOpenSyllabus}
        onOpenNotes={handleOpenNotes}
        onOpenPDFs={handleOpenPDFs}
      />

      {/* Settings Panel */}
      <SettingsPanel
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        selectedSemester={selectedSemester}
        onSemesterChange={setSelectedSemester}
      />
    </div>
  );
}

export default App;