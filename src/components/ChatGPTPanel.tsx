import React, { useState } from 'react';
import { MessageCircle, Send, X, Loader } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatGPTPanelProps {
  isDarkMode: boolean;
  isVisible: boolean;
  onClose: () => void;
  onInsertText: (text: string) => void;
}

const ChatGPTPanel: React.FC<ChatGPTPanelProps> = ({
  isDarkMode,
  isVisible,
  onClose,
  onInsertText,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate ChatGPT API call (replace with actual API integration)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about: "${userMessage.content}". Here's some helpful information that you can use in your notes:\n\n• This is a simulated response for demonstration\n• In a real implementation, this would connect to OpenAI's API\n• You can insert this text directly into your note\n• The response would be contextually relevant to your query`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInsertText = (text: string) => {
    onInsertText(text);
    // Optionally close the panel after inserting
    // onClose();
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

      {/* Chat Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 ${
          isDarkMode ? 'bg-black border-l border-white' : 'bg-white border-l border-gray-200'
        } shadow-xl transform transition-transform duration-300 ease-out z-50 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <MessageCircle className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Research Assistant
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Ask me anything to help with your research!</p>
              <p className="text-xs mt-2">I can help you find information, explain concepts, or generate content for your notes.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? isDarkMode
                        ? 'bg-white text-black'
                        : 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-800 text-white border border-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => handleInsertText(message.content)}
                      className={`mt-2 text-xs px-2 py-1 rounded ${
                        isDarkMode
                          ? 'bg-white text-black hover:bg-gray-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      } transition-colors`}
                    >
                      Insert into Note
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-800 border border-white' : 'bg-gray-100'
              }`}>
                <div className="flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              rows={2}
              className={`flex-1 px-3 py-2 border ${
                isDarkMode 
                  ? 'border-white bg-black text-white focus:ring-white' 
                  : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
              } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none`}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatGPTPanel;