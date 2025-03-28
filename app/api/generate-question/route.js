import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('Starting question generation...');
    
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers });
    }
    
    console.log('Sending request to Ollama...');
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama2",
        prompt: `Generate 10 career assessment questions in JSON format. Each question should have 4 options.

Format the response as valid JSON like this example:
{
  "questions": [
    {
      "question": "What type of work environment do you prefer?",
      "options": [
        "A quiet, individual office space",
        "A collaborative open workspace",
        "A mix of remote and office work",
        "A fully remote setup"
      ]
    }
  ]
}

Important rules:
1. Response must be ONLY valid JSON
2. Generate exactly 10 questions
3. Each question must have exactly 4 options
4. No additional text or explanations outside JSON
5. No markdown or special formatting

Focus on:
- Work preferences
- Skills assessment
- Learning style
- Problem-solving
- Career interests

Return the JSON now:`,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ollama response not OK:', errorText);
      throw new Error(`Failed to generate questions from Llama: ${errorText}`);
    }

    const data = await response.json();
    console.log('Received response from Ollama:', data);
    
    try {
      // Extract the response from Ollama's output
      const jsonStartIndex = data.response.indexOf('{');
      const jsonEndIndex = data.response.lastIndexOf('}') + 1;
      const jsonStr = data.response.slice(jsonStartIndex, jsonEndIndex);
      
      console.log('Extracted JSON string:', jsonStr);
      const parsedResponse = JSON.parse(jsonStr);
      
      // Validate the response structure
      if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
        console.error('Invalid response structure:', parsedResponse);
        throw new Error('Invalid response structure');
      }

      // Additional validation
      if (parsedResponse.questions.length !== 10) {
        console.error('Wrong number of questions:', parsedResponse.questions.length);
        throw new Error('Invalid number of questions');
      }

      for (const question of parsedResponse.questions) {
        if (!question.question || !Array.isArray(question.options) || question.options.length !== 4) {
          console.error('Invalid question format:', question);
          throw new Error('Invalid question format');
        }
      }

      console.log('Successfully generated and validated questions');
      return NextResponse.json(parsedResponse, { headers });
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw AI response:', data.response);
      return NextResponse.json(
        { error: 'Failed to parse AI-generated questions' },
        { status: 500, headers }
      );
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate questions' },
      { status: 500, headers }
    );
  }
}