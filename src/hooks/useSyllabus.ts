import { useState, useEffect } from 'react';
import { Semester, Subject, Unit } from '../types/syllabus';
import { syllabusData } from '../data/syllabusData';

export const useSyllabus = () => {
  const [semesters, setSemesters] = useState<Semester[]>(syllabusData);

  useEffect(() => {
    const savedSyllabus = localStorage.getItem('syllabus-data');
    if (savedSyllabus) {
      try {
        const parsedSyllabus = JSON.parse(savedSyllabus);
        setSemesters(parsedSyllabus);
      } catch (error) {
        console.error('Error parsing saved syllabus:', error);
        setSemesters(syllabusData);
      }
    }
  }, []);

  const saveSyllabus = (updatedSemesters: Semester[]) => {
    setSemesters(updatedSemesters);
    try {
      localStorage.setItem('syllabus-data', JSON.stringify(updatedSemesters));
    } catch (error) {
      console.error('Error saving syllabus:', error);
    }
  };

  const updateSubject = (semesterId: number, subjectCode: string, updates: Partial<Subject>) => {
    const updatedSemesters = semesters.map(semester => {
      if (semester.id === semesterId) {
        return {
          ...semester,
          subjects: semester.subjects.map(subject =>
            subject.code === subjectCode ? { ...subject, ...updates } : subject
          )
        };
      }
      return semester;
    });
    saveSyllabus(updatedSemesters);
  };

  const addUnit = (semesterId: number, subjectCode: string, unit: Unit) => {
    const updatedSemesters = semesters.map(semester => {
      if (semester.id === semesterId) {
        return {
          ...semester,
          subjects: semester.subjects.map(subject =>
            subject.code === subjectCode 
              ? { ...subject, units: [...(subject.units || []), unit] }
              : subject
          )
        };
      }
      return semester;
    });
    saveSyllabus(updatedSemesters);
  };

  const updateUnit = (semesterId: number, subjectCode: string, unitIndex: number, unit: Unit) => {
    const updatedSemesters = semesters.map(semester => {
      if (semester.id === semesterId) {
        return {
          ...semester,
          subjects: semester.subjects.map(subject =>
            subject.code === subjectCode 
              ? { 
                  ...subject, 
                  units: (subject.units || []).map((u, index) => 
                    index === unitIndex ? unit : u
                  )
                }
              : subject
          )
        };
      }
      return semester;
    });
    saveSyllabus(updatedSemesters);
  };

  const deleteUnit = (semesterId: number, subjectCode: string, unitIndex: number) => {
    const updatedSemesters = semesters.map(semester => {
      if (semester.id === semesterId) {
        return {
          ...semester,
          subjects: semester.subjects.map(subject =>
            subject.code === subjectCode 
              ? { 
                  ...subject, 
                  units: (subject.units || []).filter((_, index) => index !== unitIndex)
                }
              : subject
          )
        };
      }
      return semester;
    });
    saveSyllabus(updatedSemesters);
  };

  return {
    semesters,
    updateSubject,
    addUnit,
    updateUnit,
    deleteUnit,
  };
};