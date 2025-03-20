"use client";
import { fetchuser } from '@/actions/useractions';
import { generateCareerRecommendations } from '@/utils/careerRecommendations';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Recommendations() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCareers, setSelectedCareers] = useState([]);

  useEffect(() => {
    const generateRecommendations = async () => {
      try {
        // Check authentication
        if (status === "unauthenticated") {
          router.push("/login");
          return;
        }

        // Get quiz results from localStorage
        const quizResults = localStorage.getItem('quizResults');
        if (!quizResults) {
          setError("Please complete the career assessment quiz first.");
          setLoading(false);
          return;
        }

        // Parse quiz results
        const parsedQuizResults = JSON.parse(quizResults);
        console.log("Quiz Results:", parsedQuizResults);

        // Fetch user data
        const userData = await fetchuser(session.user.email);
        console.log("User Data:", userData);

        if (!userData) {
          setError("Failed to fetch user profile data.");
          setLoading(false);
          return;
        }

        // Generate career recommendations
        const recommendationsData = await generateCareerRecommendations(parsedQuizResults, userData);
        console.log("Generated Recommendations:", recommendationsData);

        if (recommendationsData && recommendationsData.recommendations) {
          setRecommendations(recommendationsData.recommendations);
        } else {
          setError("Failed to generate career recommendations.");
        }
      } catch (error) {
        console.error('Error in generateRecommendations:', error);
        setError("An error occurred while generating recommendations.");
      } finally {
        setLoading(false);
      }
    };

    generateRecommendations();
  }, [status, router, session?.user?.email]);

  const handleCareerSelect = async (career) => {
    try {
      if (!selectedCareers.includes(career.title)) {
        const newSelectedCareers = [...selectedCareers, career.title];
        setSelectedCareers(newSelectedCareers);
        localStorage.setItem('selectedCareers', JSON.stringify(newSelectedCareers));
        router.push('/learning-path');
      }
    } catch (error) {
      console.error('Error selecting career:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !recommendations || recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No Recommendations Available</h1>
            <p className="text-gray-600 mb-6">{error || "Please complete the career assessment quiz first."}</p>
            <button
              onClick={() => router.push('/assessment')}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Career Recommendations</h1>
          <p className="text-gray-600 mb-8">
            Based on your quiz responses and profile data, here are the career paths that best match your interests and skills.
            Click "I like this career" for any career you're interested in to see relevant learning resources.
          </p>
          
          <div className="space-y-6">
            {recommendations.map((career, index) => (
              <div 
                key={index}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{career.title}</h2>
                    <p className="text-gray-600 mb-4">{career.description}</p>
                    
                    {/* Match Percentage */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-700">Match Score:</div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full max-w-[200px]">
                          <div 
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${career.matchPercentage}%` }}
                          ></div>
                        </div>
                        <div className="text-sm font-medium text-gray-700">{career.matchPercentage}%</div>
                      </div>
                    </div>

                    {/* Key Skills */}
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Key Skills:</h3>
                      <div className="flex flex-wrap gap-2">
                        {career.keySkills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Learning Path Preview */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Learning Path:</h3>
                      <div className="flex flex-wrap gap-2">
                        {career.learningPath.map((path, pathIndex) => (
                          <span 
                            key={pathIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                          >
                            {path}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleCareerSelect(career)}
                  className={`mt-4 w-full py-2 px-4 rounded-md transition-colors ${
                    selectedCareers.includes(career.title)
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {selectedCareers.includes(career.title) 
                    ? 'Career Selected ✓' 
                    : 'I like this career'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 