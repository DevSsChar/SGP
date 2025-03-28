import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const resume = formData.get('resume');

    if (!resume) {
      return NextResponse.json(
        { error: 'No resume file provided' },
        { status: 400 }
      );
    }

    // Read the file content
    const fileContent = await resume.text();

    // Send to Ollama for analysis
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama2",
        prompt: `You are an expert resume reviewer and career counselor. Analyze this resume focusing only on the professional content and provide actionable feedback in the following areas:

1. Professional Summary & Impact
   - Evaluate the effectiveness of the professional summary/objective
   - Check if achievements and impact are clearly quantified
   - Assess the use of strong action verbs

2. Work Experience
   - Analyze the clarity and relevance of job descriptions
   - Look for specific achievements and metrics
   - Check for career progression
   - Evaluate the use of industry-specific keywords

3. Skills & Qualifications
   - Assess the relevance of listed skills
   - Check for alignment with current job market demands
   - Identify any critical missing skills

4. Education & Certifications
   - Review the presentation of educational background
   - Evaluate the relevance of certifications
   - Suggest potential additional certifications if needed

5. Overall Presentation
   - Check for clear section organization
   - Evaluate consistency in formatting
   - Assess professional language usage

6. Specific Recommendations
   - Provide 3-5 concrete, actionable improvements
   - Suggest ways to better align with target roles
   - Recommend skills or experiences to acquire

Resume content:
${fileContent}

Provide a clear, structured analysis focusing on these aspects. For each section, include specific examples from the resume and concrete suggestions for improvement. Keep the feedback professional and constructive.`,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze resume');
    }

    const data = await response.json();

    return NextResponse.json({
      analysis: data.response
    });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 