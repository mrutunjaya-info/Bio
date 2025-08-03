import { useState, useEffect } from 'react';
import { PDFResource } from '../types/syllabus';

export const usePDFs = () => {
  const [pdfs, setPDFs] = useState<PDFResource[]>([]);

  useEffect(() => {
    const savedPDFs = localStorage.getItem('syllabus-pdfs');
    if (savedPDFs) {
      try {
        const parsedPDFs = JSON.parse(savedPDFs);
        // Convert date strings back to Date objects
        const pdfsWithDates = parsedPDFs.map((pdf: any) => ({
          ...pdf,
          createdAt: new Date(pdf.createdAt),
          updatedAt: new Date(pdf.updatedAt),
        }));
        setPDFs(pdfsWithDates);
      } catch (error) {
        console.error('Error parsing saved PDFs:', error);
        // Clear corrupted data
        localStorage.removeItem('syllabus-pdfs');
        setPDFs([]);
      }
    }
  }, []);

  const savePDFs = (updatedPDFs: PDFResource[]) => {
    setPDFs(updatedPDFs);
    try {
      localStorage.setItem('syllabus-pdfs', JSON.stringify(updatedPDFs));
    } catch (error) {
      console.error('Error saving PDFs:', error);
    }
  };

  const addPDF = (pdf: Omit<PDFResource, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPDF: PDFResource = {
      ...pdf,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    savePDFs([...pdfs, newPDF]);
  };

  const updatePDF = (id: string, updates: Partial<PDFResource>) => {
    const updatedPDFs = pdfs.map(pdf =>
      pdf.id === id ? { ...pdf, ...updates, updatedAt: new Date() } : pdf
    );
    savePDFs(updatedPDFs);
  };

  const deletePDF = (id: string) => {
    const updatedPDFs = pdfs.filter(pdf => pdf.id !== id);
    savePDFs(updatedPDFs);
  };

  const getPDFsForSubject = (subjectCode: string, semesterId: number) => {
    return pdfs.filter(pdf => 
      pdf.subjectCode === subjectCode && pdf.semesterId === semesterId
    );
  };

  return {
    pdfs,
    addPDF,
    updatePDF,
    deletePDF,
    getPDFsForSubject,
  };
};