export interface Unit {
  title: string;
  content: string[];
}

export interface Subject {
  code: string;
  name: string;
  credits: string;
  objective?: string;
  units: Unit[];
  practicals?: string[];
  topics?: string[];
  activities?: string[];
  deliverables?: string[];
}

export interface Semester {
  id: number;
  name: string;
  subjects: Subject[];
  totalCredits: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subjectCode: string;
  semesterId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PDFResource {
  id: string;
  title: string;
  url: string;
  subjectCode: string;
  semesterId: number;
  createdAt: Date;
  updatedAt: Date;
}