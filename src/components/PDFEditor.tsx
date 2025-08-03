import React, { useState, useEffect } from 'react';
import { Save, X, ExternalLink } from 'lucide-react';
import { PDFResource } from '../types/syllabus';

interface PDFEditorProps {
  pdf?: PDFResource;
  isDarkMode: boolean;
  subjectCode: string;
  semesterId: number;
  onSave: (pdf: Omit<PDFResource, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, updates: Partial<PDFResource>) => void;
  onClose: () => void;
}

const PDFEditor: React.FC<PDFEditorProps> = ({
  pdf,
  isDarkMode,
  subjectCode,
  semesterId,
  onSave,
  onUpdate,
  onClose,
}) => {
  const [title, setTitle] = useState(pdf?.title || '');
  const [url, setUrl] = useState(pdf?.url || '');

  useEffect(() => {
    if (pdf) {
      setTitle(pdf.title);
      setUrl(pdf.url);
    }
  }, [pdf]);

  const handleSave = () => {
    if (!title.trim() || !url.trim()) return;

    if (pdf) {
      onUpdate(pdf.id, { title: title.trim(), url: url.trim() });
    } else {
      onSave({
        title: title.trim(),
        url: url.trim(),
        subjectCode,
        semesterId,
      });
    }
    onClose();
  };

  const handleTestURL = () => {
    if (url.trim()) {
      const driveViewerUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(url.trim())}`;
      window.open(driveViewerUrl, '_blank');
    }
  };

  const isValidURL = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className={`fixed inset-0 ${isDarkMode ? 'bg-black' : 'bg-black'} bg-opacity-50 z-50 flex items-center justify-center p-1`}>
      <div className={`${isDarkMode ? 'bg-black border border-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {pdf ? 'Edit PDF Resource' : 'Add PDF Resource'} - {subjectCode}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={!title.trim() || !url.trim() || !isValidURL(url.trim())}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

        <div className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
              PDF Title
            </label>
            <input
              type="text"
              placeholder="Enter PDF title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border ${isDarkMode ? 'border-white bg-black text-white focus:ring-white' : 'border-gray-300 bg-white text-gray-900 focus:ring-red-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-2`}>
              PDF URL
            </label>
            <div className="flex space-x-2">
              <input
                type="url"
                placeholder="https://example.com/document.pdf"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`flex-1 px-3 py-2 border ${isDarkMode ? 'border-white bg-black text-white focus:ring-white' : 'border-gray-300 bg-white text-gray-900 focus:ring-red-500'} rounded-lg focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              <button
                onClick={handleTestURL}
                disabled={!url.trim() || !isValidURL(url.trim())}
                className={`px-3 py-2 ${isDarkMode ? 'bg-black text-white hover:bg-black border border-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                title="Test URL"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-white' : 'text-gray-500'} mt-1`}>
              Enter a direct link to a PDF file. It will open in Google Drive viewer.
            </p>
          </div>

          {url.trim() && !isValidURL(url.trim()) && (
            <div className={`p-3 ${isDarkMode ? 'bg-black border-white' : 'bg-red-50 border-red-200'} rounded-lg border`}>
              <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-red-600'}`}>Please enter a valid URL</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFEditor;