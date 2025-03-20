import Groq from "groq-sdk";
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export async function POST(request) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a career guidance AI that generates personalized career assessment questions. 
          Each question should help understand the user's interests, skills, and preferences for career recommendations.
          Generate the response in the following JSON format:
          {
            "questions": [
              {
                "question": "question text here",
                "options": ["option1", "option2", "option3", "option4"]
              }
            ]
          }
          Generate 10 unique questions with 4 options each. Make sure the questions cover different aspects like:
          - Work environment preferences
          - Skills and strengths
          - Learning style
          - Problem-solving approach
          - Career interests`
        }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    const response = completion.choices[0]?.message?.content;
    
    try {
      const parsedResponse = JSON.parse(response);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse AI-generated questions' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
}
