'use client';

import { signIn, useSession } from "next-auth/react";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    if (session) {
      const savedPath = localStorage.getItem('selectedCareerPath');
      if (savedPath) {
        setSelectedPath(JSON.parse(savedPath));
      }
    }
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to PathFinder</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to access your dashboard and take the career quiz.
            </p>
            <button
              onClick={() => signIn()}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Career Quiz Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Path Discovery</h2>
            {!selectedPath ? (
              <div>
                <p className="text-gray-600 mb-6">
                  Not sure which career path to choose? Take our quick quiz to discover the perfect career path based on your interests and skills!
                </p>
                <Link 
                  href="/dashboard/quiz"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Career Quiz
                </Link>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Selected Career Path</h3>
                <div className="bg-blue-50 rounded-lg p-6 mb-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedPath.name}</h4>
                  <p className="text-gray-600 mb-4">{selectedPath.description}</p>
                  <button
                    onClick={() => {
                      localStorage.removeItem('selectedCareerPath');
                      setSelectedPath(null);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Learning Resources Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Resources</h2>
            {selectedPath ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Based on your selected career path in {selectedPath.name}, here are some recommended learning resources:
                </p>
                <Link
                  href="/learning-path"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
                >
                  View Learning Path
                </Link>
              </div>
            ) : (
              <p className="text-gray-600">
                Take the career quiz to get personalized learning recommendations for your chosen path.
              </p>
            )}
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Progress Overview</h2>
            {selectedPath ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Track your progress and achievements in your {selectedPath.name} journey.
                </p>
                {/* Add progress tracking components here */}
              </div>
            ) : (
              <p className="text-gray-600">
                Start your learning journey by taking the career quiz and selecting a path.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 