import { useState, useEffect } from 'react';
import { Note } from '../types/syllabus';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('syllabus-notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        // Convert date strings back to Date objects
        const notesWithDates = parsedNotes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
        setNotes(notesWithDates);
      } catch (error) {
        console.error('Error parsing saved notes:', error);
        // Clear corrupted data
        localStorage.removeItem('syllabus-notes');
        setNotes([]);
      }
    }
  }, []);

  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    try {
      localStorage.setItem('syllabus-notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    saveNotes([...notes, newNote]);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
    );
    saveNotes(updatedNotes);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
  };

  const getNotesForSubject = (subjectCode: string, semesterId: number) => {
    return notes.filter(note => 
      note.subjectCode === subjectCode && note.semesterId === semesterId
    );
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNotesForSubject,
  };
};