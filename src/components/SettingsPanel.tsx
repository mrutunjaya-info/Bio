import React, { useState } from 'react';
import { ChevronRight, Settings } from 'lucide-react';
import SemesterToggle from './SemesterToggle';

interface SettingsPanelProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  selectedSemester: number;
  onSemesterChange: (semester: number) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isDarkMode,
  onToggleDarkMode,
  selectedSemester,
  onSemesterChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Settings Panel */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          {/* Settings Content */}
          <div
            className={`absolute bottom-0 left-12 transition-all duration-300 ease-out ${
              isExpanded 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-4 pointer-events-none'
            } ${
              isDarkMode 
                ? 'bg-black border-2 border-white text-white' 
                : 'bg-white border-2 border-gray-300 text-gray-700'
            } rounded-lg shadow-xl p-4 min-w-[300px]`}
          >
            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Theme
                </span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>Light</span>
                  <button
                    onClick={onToggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isDarkMode ? 'bg-white' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                        isDarkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>Dark</span>
                </div>
              </div>

              {/* Semester Selection */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Semester
                </span>
                <SemesterToggle
                  selectedSemester={selectedSemester}
                  onSemesterChange={onSemesterChange}
                  isDarkMode={isDarkMode}
                />
              </div>

              {/* Additional Settings Placeholder */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  Auto-save Notes
                </span>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-green-500`}
                >
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Arrow Button */}
          <button
            onClick={toggleExpanded}
            className={`${
              isDarkMode 
                ? 'bg-black border-2 border-white text-white hover:bg-gray-900' 
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
            } w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ease-out transform ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;