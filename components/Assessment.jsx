'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Assessment() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const startQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      setQuizStarted(true);
      setCurrentQuestion(0);
      setAnswers([]);
    } catch (err) {
      console.error('Error starting quiz:', err);
      setError('Failed to start quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answerIndex) => {
    // Create an answer object that includes both question and answer
    const currentQuestionObj = questions[currentQuestion];
    const newAnswer = {
      question: currentQuestionObj.question,
      selectedAnswer: currentQuestionObj.options[answerIndex],
      allOptions: currentQuestionObj.options,
      answerIndex: answerIndex
    };

    // Add the new answer to the answers array
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    console.log({answers: newAnswers});
    // Create the quiz results object
    const quizResults = {
      answers: newAnswers,
      totalQuestions: questions.length,
      completedQuestions: newAnswers.length,
      timestamp: new Date().toISOString()
    };

    // Store in localStorage
    localStorage.setItem('quizResults', JSON.stringify(quizResults));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz is complete, redirect to recommendations
      router.push('/recommendations');
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-4">Please sign in to take the career assessment.</p>
            <button
              onClick={() => signIn()}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quizStarted || questions.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Career Assessment Quiz</h2>
            <p className="text-gray-600 mb-6">
              This AI-powered quiz will help identify your strengths, interests, and potential career paths. The quiz consists of multiple questions designed to understand your preferences and skills.
            </p>
            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}
            <button
              onClick={startQuiz}
              disabled={loading}
              className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors text-lg disabled:bg-blue-300"
            >
              {loading ? 'Loading...' : 'Start Quiz'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Career Assessment Quiz</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-600 mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl mb-4">{questions[currentQuestion].question}</h3>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 