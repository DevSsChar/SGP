'use client';
import { getContextualPrompts } from '@/utils/chatContext';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ResumeUpload from './ResumeUpload';

export default function ChatWindow({ onClose }) {
  const pathname = usePathname();
  const { suggestions } = getContextualPrompts(pathname);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hi! I\'m your PathFinder Assistant. How can I help you with your career journey today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    setShowSuggestions(false);
  };

  const handleResumeAnalysis = (analysis) => {
    setMessages(prev => [...prev, {
      type: 'bot',
      content: analysis
    }]);
    setShowResumeUpload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setShowSuggestions(false);
    
    // Check for resume-related keywords
    if (userMessage.toLowerCase().includes('resume') && 
        (userMessage.toLowerCase().includes('review') || 
         userMessage.toLowerCase().includes('analyze') || 
         userMessage.toLowerCase().includes('check'))) {
      setMessages(prev => [...prev, 
        { type: 'user', content: userMessage },
        { type: 'bot', content: 'I\'d be happy to analyze your resume. Please upload your resume file, and I\'ll provide detailed feedback.' }
      ]);
      setShowResumeUpload(true);
      return;
    }
    
    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    
    // Show loading state
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          pathname: pathname
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add bot response to chat
      setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-blue-600 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">PathFinder Assistant</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {showResumeUpload && (
          <ResumeUpload onAnalysisComplete={handleResumeAnalysis} />
        )}
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full"></div>
            <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full" style={{ animationDelay: '0.2s' }}></div>
            <div className="animate-bounce h-2 w-2 bg-blue-600 rounded-full" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {showSuggestions && suggestions && suggestions.length > 0 && (
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 