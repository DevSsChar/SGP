import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { answers } = await request.json();

    // Sample career recommendations based on answers
    // Later, we'll use AI to generate personalized recommendations
    const sampleRecommendations = [
      {
        title: "Software Developer",
        description: "Design and build applications and systems that solve complex problems.",
        matchPercentage: 85,
        keySkills: ["Problem Solving", "Programming", "Analytical Thinking"],
        learningPath: ["Web Development", "Data Structures", "Software Architecture"]
      },
      {
        title: "Data Analyst",
        description: "Analyze complex data sets to help organizations make better decisions.",
        matchPercentage: 80,
        keySkills: ["Data Analysis", "Statistics", "SQL"],
        learningPath: ["Data Analysis", "Statistics", "Database Management"]
      },
      {
        title: "UX Designer",
        description: "Create user-friendly interfaces and improve user experience.",
        matchPercentage: 75,
        keySkills: ["Design Thinking", "User Research", "Prototyping"],
        learningPath: ["UI/UX Design", "User Research", "Design Systems"]
      }
    ];

    return NextResponse.json({
      recommendations: sampleRecommendations
    });
  } catch (error) {
    console.error('Error generating results:', error);
    return NextResponse.json(
      { error: 'Failed to generate results' },
      { status: 500 }
    );
  }
} 