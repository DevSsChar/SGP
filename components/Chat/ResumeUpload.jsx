'use client';
import { useState } from 'react';

export default function ResumeUpload({ onAnalysisComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFileInput = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file) => {
    if (!file || !file.type.match('application/pdf|text/*')) {
      alert('Please upload a PDF or text file');
      return;
    }

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      onAnalysisComplete(data.analysis);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      onAnalysisComplete('Sorry, I encountered an error analyzing your resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full p-4 space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        {isAnalyzing ? (
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-gray-600">Analyzing your resume...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">Drag and drop your resume here, or</p>
            <label className="inline-block">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                Browse Files
              </span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX, TXT</p>
          </>
        )}
      </div>
    </div>
  );
} 