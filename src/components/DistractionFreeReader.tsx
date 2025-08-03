import React from 'react';
import { useState } from 'react';
import { X, Plus, Edit, Trash2, List } from 'lucide-react';
import { Subject } from '../types/syllabus';
import UnitEditor from './UnitEditor';
import TableOfContents from './TableOfContents';

interface DistractionFreeReaderProps {
  subject: Subject;
  semesterId: number;
  isDarkMode: boolean;
  onClose: () => void;
  onCreateNote: (title: string, content: string) => void;
  onUpdateSubject: (updates: Partial<Subject>) => void;
  onAddUnit: (unit: Unit) => void;
  onUpdateUnit: (unitIndex: number, unit: Unit) => void;
  onDeleteUnit: (unitIndex: number) => void;
}

const DistractionFreeReader: React.FC<DistractionFreeReaderProps> = ({
  subject,
  semesterId,
  isDarkMode,
  onClose,
  onCreateNote,
  onUpdateSubject,
  onAddUnit,
  onUpdateUnit,
  onDeleteUnit,
}) => {
  const [showUnitEditor, setShowUnitEditor] = useState(false);
  const [editingUnit, setEditingUnit] = useState<{ unit: any; index: number } | null>(null);
  const [showTOC, setShowTOC] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  const handleCreateNote = (unitTitle: string, content: string) => {
    const noteTitle = `${subject.code} - ${unitTitle}`;
    const noteContent = `# ${unitTitle}\n\n${content.split('\n').map(line => `- ${line.replace('• ', '')}`).join('\n')}`;
    onCreateNote(noteTitle, noteContent);
  };

  const handleAddUnit = () => {
    setEditingUnit(null);
    setShowUnitEditor(true);
  };

  const handleEditUnit = (unit: any, index: number) => {
    setEditingUnit({ unit, index });
    setShowUnitEditor(true);
  };

  const handleDeleteUnit = (index: number) => {
    if (confirm('Are you sure you want to delete this unit?')) {
      onDeleteUnit(index);
    }
  };

  const handleSaveUnit = (unit: any) => {
    if (editingUnit) {
      // Edit existing unit
      onUpdateUnit(editingUnit.index, unit);
    } else {
      // Add new unit
      onAddUnit(unit);
    }
    setShowUnitEditor(false);
    setEditingUnit(null);
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
  return (
    <>
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
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              {subject.code}: {subject.name}
            </h1>
            <div className={`flex items-center space-x-4 text-sm ${isDarkMode ? 'text-white' : 'text-gray-600'} mb-4`}>
              <span className={`${isDarkMode ? 'bg-white text-black' : 'bg-blue-100 text-blue-800'} px-3 py-1 rounded-full`}>
                Credits: {subject.credits}
              </span>
            </div>
          </div>

          {subject.objective && (
            <div className={`mb-4 p-4 ${isDarkMode ? 'bg-black border-white' : 'bg-blue-50 border-blue-400'} rounded-lg border-l-4`}>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Objective</h2>
              <p className={`${isDarkMode ? 'text-white' : 'text-gray-700'} leading-relaxed`}>{subject.objective}</p>
            </div>
          )}

          {subject.units && subject.units.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Course Content</h2>
                <button
                  onClick={handleAddUnit}
                  className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Unit
                </button>
              </div>
              <div className="space-y-4">
                {subject.units.map((unit, index) => (
                  <div key={index} className={`${isDarkMode ? 'bg-black border border-white' : 'bg-gray-50'} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {unit.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCreateNote(unit.title, unit.content.join('\n'))}
                          className={`flex items-center px-2 py-1 text-xs ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'} rounded transition-colors`}
                          title="Create note from this unit"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Note
                        </button>
                        <button
                          onClick={() => handleEditUnit(unit, index)}
                          className={`p-1 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-500 hover:text-blue-600'} transition-colors`}
                          title="Edit unit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUnit(index)}
                          className={`p-1 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-500 hover:text-red-600'} transition-colors`}
                          title="Delete unit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {unit.content && unit.content.map((item, itemIndex) => (
                        <li key={itemIndex} className={`${isDarkMode ? 'text-white' : 'text-gray-700'} leading-relaxed`}>
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show Add Unit button even if no units exist */}
          {(!subject.units || subject.units.length === 0) && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Course Content</h2>
                <button
                  onClick={handleAddUnit}
                  className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Unit
                </button>
              </div>
              <div className={`text-center py-8 ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>
                <p>No units added yet. Click "Add Unit" to get started.</p>
              </div>
            </div>
          )}

          {subject.practicals && subject.practicals.length > 0 && (
            <div className="mb-4">
              <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Practicals</h2>
              <div className={`${isDarkMode ? 'bg-black border border-white' : 'bg-green-50'} rounded-lg p-4`}>
                <ul className="space-y-2">
                  {subject.practicals.map((practical, index) => (
                    <li key={index} className={`${isDarkMode ? 'text-white' : 'text-gray-700'} leading-relaxed`}>
                      • {practical}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {subject.topics && subject.topics.length > 0 && (
            <div className="mb-4">
              <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Topics</h2>
              <div className={`${isDarkMode ? 'bg-black border border-white' : 'bg-purple-50'} rounded-lg p-4`}>
                <ul className="space-y-2">
                  {subject.topics.map((topic, index) => (
                    <li key={index} className={`${isDarkMode ? 'text-white' : 'text-gray-700'} leading-relaxed`}>
                      • {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {subject.activities && subject.activities.length > 0 && (
            <div className="mb-4">
              <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Activities</h2>
              <div className={`${isDarkMode ? 'bg-black border border-white' : 'bg-yellow-50'} rounded-lg p-4`}>
                <ul className="space-y-2">
                  {subject.activities.map((activity, index) => (
                    <li key={index} className={`${isDarkMode ? 'text-white' : 'text-gray-700'} leading-relaxed`}>
                      • {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {subject.deliverables && subject.deliverables.length > 0 && (
            <div className="mb-4">
              <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Deliverables</h2>
              <div className={`${isDarkMode ? 'bg-black border border-white' : 'bg-orange-50'} rounded-lg p-4`}>
                <ul className="space-y-2">
                  {subject.deliverables.map((deliverable, index) => (
                    <li key={index} className={`${isDarkMode ? 'text-white' : 'text-gray-700'} leading-relaxed`}>
                      • {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>

      <TableOfContents
        content={subject.units.map(unit => `# ${unit.title}\n${unit.content.join('\n')}`).join('\n\n')}
        isDarkMode={isDarkMode}
        isVisible={showTOC}
        onClose={() => setShowTOC(false)}
        onNavigate={handleNavigateToHeading}
      />

      {showUnitEditor && (
        <UnitEditor
          unit={editingUnit?.unit}
          unitIndex={editingUnit?.index}
          isDarkMode={isDarkMode}
          onSave={handleSaveUnit}
          onClose={() => {
            setShowUnitEditor(false);
            setEditingUnit(null);
          }}
        />
      )}
    </>
  );
};

export default DistractionFreeReader;