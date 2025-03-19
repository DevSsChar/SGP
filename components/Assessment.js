"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Assessment() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Protect the route
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  // Function to start the quiz
  const startQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'initial' }),
      });
      
      if (!response.ok) throw new Error('Failed to fetch questions');
      
      const data = await response.json();
      setQuestions(data.questions);
      setQuizStarted(true);
    } catch (error) {
      console.error('Error starting quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle answer selection
  const handleAnswer = async (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, send answers for analysis
      try {
        const response = await fetch('/api/generate-results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers: newAnswers }),
        });
        
        if (!response.ok) throw new Error('Failed to generate results');
        
        const results = await response.json();
        // Store results and redirect to recommendations
        localStorage.setItem('quizResults', JSON.stringify(results));
        router.push('/recommendations');
      } catch (error) {
        console.error('Error generating results:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Assessment Quiz</h1>
            <p className="text-gray-600 mb-6">
              This AI-powered quiz will help identify your strengths, interests, and potential career paths. 
              The quiz consists of multiple questions designed to understand your preferences and skills.
            </p>
            <div className="space-y-4 text-gray-600">
              <p>✓ Takes about 5-10 minutes to complete</p>
              <p>✓ Provides personalized career recommendations</p>
              <p>✓ Helps match your skills with potential careers</p>
            </div>
            <button
              onClick={startQuiz}
              className="mt-8 w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors"
            >
              Start Quiz
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
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Question */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {questions[currentQuestion]?.question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-md border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>

          {/* Question counter */}
          <div className="mt-6 text-right text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
} 