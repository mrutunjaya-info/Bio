import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SemesterToggleProps {
  selectedSemester: number;
  onSemesterChange: (semester: number) => void;
  isDarkMode: boolean;
}

const SemesterToggle: React.FC<SemesterToggleProps> = ({
  selectedSemester,
  onSemesterChange,
  isDarkMode,
}) => {
  const semesters = [
    { id: 1, name: 'Semester I' },
    { id: 2, name: 'Semester II' },
    { id: 3, name: 'Semester III' },
    { id: 4, name: 'Semester IV' },
  ];

  return (
    <div className="relative">
      <select
        value={selectedSemester}
        onChange={(e) => onSemesterChange(Number(e.target.value))}
        className={`appearance-none ${
          isDarkMode 
            ? 'bg-black border-white text-white focus:ring-white' 
            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
        } rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:border-transparent shadow-sm`}
      >
        {semesters.map((semester) => (
          <option key={semester.id} value={semester.id}>
            {semester.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
};

export default SemesterToggle;