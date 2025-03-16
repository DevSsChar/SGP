'use client';

import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const questions = [
  {
    id: 1,
    question: "Which type of work environment do you prefer?",
    options: [
      { id: 'a', text: "Creative and flexible workspace", paths: ["Design & Media", "Technology & Development"] },
      { id: 'b', text: "Structured and organized office", paths: ["Business & Management", "Finance & Banking"] },
      { id: 'c', text: "Mix of fieldwork and office work", paths: ["Engineering", "Environmental Science"] },
      { id: 'd', text: "Remote or independent work setup", paths: ["Digital Marketing", "Content Creation"] }
    ]
  },
  {
    id: 2,
    question: "What kind of problems do you enjoy solving?",
    options: [
      { id: 'a', text: "Technical and logical problems", paths: ["Software Development", "Data Science"] },
      { id: 'b', text: "People and social issues", paths: ["Human Resources", "Psychology"] },
      { id: 'c', text: "Creative and design challenges", paths: ["UX/UI Design", "Digital Arts"] },
      { id: 'd', text: "Business and strategic problems", paths: ["Business Strategy", "Project Management"] }
    ]
  },
  {
    id: 3,
    question: "What skills would you like to develop further?",
    options: [
      { id: 'a', text: "Technical and programming skills", paths: ["Web Development", "Mobile Development"] },
      { id: 'b', text: "Leadership and management skills", paths: ["Team Management", "Business Administration"] },
      { id: 'c', text: "Creative and artistic skills", paths: ["Graphic Design", "Digital Content Creation"] },
      { id: 'd', text: "Analytical and research skills", paths: ["Data Analysis", "Market Research"] }
    ]
  }
];

const QuizPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [careerPaths, setCareerPaths] = useState([]);

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  const handleAnswer = (optionId) => {
    const newAnswers = { ...answers, [currentQuestion]: optionId };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers) => {
    const pathCount = {};
    
    Object.entries(finalAnswers).forEach(([questionIndex, answerId]) => {
      const question = questions[parseInt(questionIndex)];
      const selectedOption = question.options.find(opt => opt.id === answerId);
      
      selectedOption.paths.forEach(path => {
        pathCount[path] = (pathCount[path] || 0) + 1;
      });
    });

    const sortedPaths = Object.entries(pathCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([path]) => ({
        name: path,
        description: getPathDescription(path)
      }));

    setCareerPaths(sortedPaths);
    setShowResults(true);
  };

  const getPathDescription = (path) => {
    const descriptions = {
      "Design & Media": "Create visual content and media for various platforms",
      "Technology & Development": "Build and maintain software and technology solutions",
      "Business & Management": "Lead teams and manage business operations",
      "Finance & Banking": "Work with financial systems and manage investments",
      "Engineering": "Design and develop technical solutions",
      "Environmental Science": "Work on environmental conservation and sustainability",
      "Digital Marketing": "Create and manage digital marketing campaigns",
      "Content Creation": "Produce engaging content for various platforms",
      "Software Development": "Design and build software applications",
      "Data Science": "Analyze data and create predictive models",
      "Human Resources": "Manage employee relations and development",
      "Psychology": "Help people with mental health and behavior",
      "UX/UI Design": "Design user interfaces and experiences",
      "Digital Arts": "Create digital artwork and animations",
      "Business Strategy": "Develop and implement business strategies",
      "Project Management": "Lead and manage project teams",
      "Web Development": "Build and maintain websites",
      "Mobile Development": "Create mobile applications",
      "Team Management": "Lead and develop teams",
      "Business Administration": "Manage business operations",
      "Graphic Design": "Create visual designs and branding",
      "Digital Content Creation": "Produce digital content",
      "Data Analysis": "Analyze data and create insights",
      "Market Research": "Research market trends and consumer behavior"
    };
    return descriptions[path] || "Explore opportunities in this field";
  };

  const selectPath = (path) => {
    // Here you would typically save this to your backend
    localStorage.setItem('selectedCareerPath', JSON.stringify(path));
    router.push('/dashboard'); // Redirect back to dashboard
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to take the career quiz.
            </p>
            <button
              onClick={() => signIn()}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Recommended Career Paths</h2>
            <div className="space-y-6">
              {careerPaths.map((path, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{path.name}</h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <button
                    onClick={() => selectPath(path)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Choose This Path
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Question {currentQuestion + 1}</h2>
              <span className="text-gray-500">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h3 className="text-xl text-gray-800 mb-6">{questions[currentQuestion].question}</h3>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <span className="text-lg text-gray-700">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 