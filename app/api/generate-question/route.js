import { NextResponse } from 'next/server';

// Sample questions (we'll replace these with AI-generated questions later)
const sampleQuestions = [
  {
    question: "What type of work environment do you prefer?",
    options: [
      "A collaborative office setting with team interactions",
      "A quiet, independent workspace",
      "A mix of remote and office work",
      "A dynamic, fast-paced environment"
    ]
  },
  {
    question: "Which activities energize you the most?",
    options: [
      "Solving complex technical problems",
      "Creating and designing new things",
      "Helping and teaching others",
      "Analyzing data and finding patterns"
    ]
  },
  {
    question: "What's your preferred way of learning new skills?",
    options: [
      "Hands-on practice and experimentation",
      "Reading and researching independently",
      "Learning from mentors or experts",
      "Group workshops and discussions"
    ]
  },
  {
    question: "Which type of projects interest you the most?",
    options: [
      "Building and creating new products",
      "Improving existing systems",
      "Working directly with people",
      "Research and analysis"
    ]
  },
  {
    question: "What's your approach to problem-solving?",
    options: [
      "Breaking down complex problems into smaller parts",
      "Finding creative and innovative solutions",
      "Collaborating with others to find answers",
      "Using data and logic to make decisions"
    ]
  },
  {
    question: "Which skill would you most like to develop?",
    options: [
      "Technical programming skills",
      "Creative design skills",
      "Leadership and management skills",
      "Data analysis and research skills"
    ]
  },
  {
    question: "What kind of impact do you want to make in your career?",
    options: [
      "Building innovative solutions that solve problems",
      "Creating beautiful and user-friendly experiences",
      "Helping others grow and succeed",
      "Discovering insights that drive decisions"
    ]
  },
  {
    question: "How do you prefer to communicate with others?",
    options: [
      "Through detailed technical documentation",
      "Using visual aids and demonstrations",
      "Direct face-to-face conversations",
      "Written reports and analysis"
    ]
  },
  {
    question: "What interests you most about technology?",
    options: [
      "Building and coding new applications",
      "Creating user interfaces and experiences",
      "Using tech to help people connect",
      "Using tech to analyze and predict trends"
    ]
  },
  {
    question: "How do you like to organize your work?",
    options: [
      "Following structured methodologies",
      "Using flexible and adaptive approaches",
      "Creating collaborative workflows",
      "Setting up systematic processes"
    ]
  },
  {
    question: "What motivates you the most in a project?",
    options: [
      "Technical challenges and problem-solving",
      "Creative freedom and innovation",
      "Making a positive impact on users",
      "Finding patterns and optimizing solutions"
    ]
  },
  {
    question: "Which best describes your ideal role in a team?",
    options: [
      "Technical expert who implements solutions",
      "Creative force who brings new ideas",
      "Team leader who guides and supports",
      "Analyst who provides insights"
    ]
  },
  {
    question: "What type of challenges excite you?",
    options: [
      "Complex technical problems",
      "Design and user experience challenges",
      "People and communication challenges",
      "Data and analytical challenges"
    ]
  },
  {
    question: "How do you prefer to measure success?",
    options: [
      "Through working, efficient solutions",
      "Through user satisfaction and feedback",
      "Through team achievements and growth",
      "Through data-driven metrics"
    ]
  },
  {
    question: "What's your preferred pace of work?",
    options: [
      "Steady and methodical",
      "Creative bursts with reflection time",
      "Dynamic and people-oriented",
      "Systematic and research-based"
    ]
  }
];

export async function POST(request) {
  try {
    // For now, return sample questions
    // Later, we'll integrate with OpenAI to generate personalized questions
    return NextResponse.json({
      questions: sampleQuestions
    });
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
} 