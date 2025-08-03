import React, { useState, useEffect } from 'react';
import { ChevronRight, List, X } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  isDarkMode: boolean;
  isVisible: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  content,
  isDarkMode,
  isVisible,
  onClose,
  onNavigate,
}) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      items.push({
        id,
        title,
        level,
      });
    }

    setTocItems(items);
  }, [content]);

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 ${
          isDarkMode ? 'bg-black border-r border-white' : 'bg-white border-r border-gray-200'
        } shadow-xl transform transition-transform duration-300 ease-out z-50 ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <List className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Table of Contents
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {tocItems.length === 0 ? (
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No headings found in this note.
            </p>
          ) : (
            <div className="space-y-1">
              {tocItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={{ paddingLeft: `${12 + (item.level - 1) * 16}px` }}
                >
                  <div className="flex items-center space-x-2">
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-sm truncate">{item.title}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TableOfContents;