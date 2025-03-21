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
          IMPORTANT: You must ONLY respond with a valid JSON object in the exact format specified below.
          Do not include any additional text, explanations, or formatting outside the JSON structure.

          Required JSON format:
          {
            "questions": [
              {
                "question": "question text here",
                "options": ["option1", "option2", "option3", "option4"]
              }
            ]
          }

          Rules for generating content:
          1. Generate exactly 10 unique questions with exactly 4 options each
          2. Questions must cover these aspects:
             - Work environment preferences
             - Skills and strengths
             - Learning style
             - Problem-solving approach
             - Career interests
          3. Each option must be a complete, meaningful response
          4. Ensure all JSON syntax is valid (quotes, brackets, commas)
          5. Do not include any text outside the JSON structure
          
          Remember: Your response must be a parseable JSON object only.`
        }
      ],
      model: "llama-3.3-70b-versatile",
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
