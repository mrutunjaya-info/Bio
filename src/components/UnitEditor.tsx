import React, { useState } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { Unit } from '../types/syllabus';

interface Unit {
  title: string;
  content: string[];
}

interface UnitEditorProps {
  unit?: Unit;
  unitIndex?: number;
  isDarkMode: boolean;
  onSave: (unit: Unit) => void;
  onClose: () => void;
}

const UnitEditor: React.FC<UnitEditorProps> = ({
  unit,
  unitIndex,
  isDarkMode,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(unit?.title || '');
  const [content, setContent] = useState<string[]>(unit?.content || ['']);

  const handleSave = () => {
    if (!title.trim() || content.every(item => !item.trim())) return;

    const filteredContent = content.filter(item => item.trim());
    onSave({
      title: title.trim(),
      content: filteredContent,
    });
    onClose();
  };

  const addContentItem = () => {
    setContent([...content, '']);
  };

  const updateContentItem = (index: number, value: string) => {
    const newContent = [...content];
    newContent[index] = value;
    setContent(newContent);
  };

  const removeContentItem = (index: number) => {
    if (content.length > 1) {
      setContent(content.filter((_, i) => i !== index));
    }
  };

  return (
    <div className={`fixed inset-0 ${isDarkMode ? 'bg-black' : 'bg-black'} bg-opacity-50 z-50 flex items-center justify-center p-4`}>
      <div className={`${isDarkMode ? 'bg-black border border-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {unit ? `Edit ${unit.title}` : 'Add New Unit'}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={!title.trim() || content.every(item => !item.trim())}
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

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
              Unit Title
            </label>
            <input
              type="text"
              placeholder="e.g., Unit I, Unit II, Block 1..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border ${isDarkMode ? 'border-white bg-black text-white focus:ring-white' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Unit Content
              </label>
              <button
                onClick={addContentItem}
                className="flex items-center px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Item
              </button>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {content.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Enter content item..."
                    value={item}
                    onChange={(e) => updateContentItem(index, e.target.value)}
                    className={`flex-1 px-3 py-2 border ${isDarkMode ? 'border-white bg-black text-white focus:ring-white' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
                  />
                  {content.length > 1 && (
                    <button
                      onClick={() => removeContentItem(index)}
                      className="p-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitEditor;