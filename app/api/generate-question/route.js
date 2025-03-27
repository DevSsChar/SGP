import Groq from "groq-sdk";
import { NextResponse } from 'next/server';

const groq = new Groq({
<<<<<<< HEAD
  apiKey: "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",
    dangerouslyAllowBrowser: true
=======
  apiKey: "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",
  dangerouslyAllowBrowser: true
>>>>>>> 1d5b071addda7bfdd741137083ad45245f291f2f
});

export async function POST(request) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a career guidance AI that generates personalized career assessment questions. 
<<<<<<< HEAD
          IMPORTANT: You must ONLY respond with a valid JSON object in the exact format specified below.
          Do not include any additional text, explanations, or formatting outside the JSON structure.

          Required JSON format:
=======
          
          IMPORTANT: You must respond with ONLY valid JSON, no additional text or explanations.
          The response must strictly follow this exact format, with no deviations:
>>>>>>> 1d5b071addda7bfdd741137083ad45245f291f2f
          {
            "questions": [
              {
                "question": "string containing the question",
                "options": ["string option 1", "string option 2", "string option 3", "string option 4"]
              }
            ]
          }

<<<<<<< HEAD
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
=======
          Rules for generation:
          1. Generate exactly 10 questions
          2. Each question must have exactly 4 options
          3. All text must be properly escaped for JSON
          4. No nested objects or arrays beyond the specified structure
          5. No additional fields or properties
          6. Ensure the response is pure JSON with no markdown or additional formatting
          
          Questions should cover:
          - Work environment preferences
          - Skills and strengths
          - Learning style
          - Problem-solving approach
          - Career interests`
>>>>>>> 1d5b071addda7bfdd741137083ad45245f291f2f
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });

    if (!completion.choices || !completion.choices[0]?.message?.content) {
      console.error('No response from Groq API');
      return NextResponse.json(
        { error: 'Failed to generate questions - No response from AI' },
        { status: 500 }
      );
    }

    const response = completion.choices[0].message.content;
    
    try {
      const parsedResponse = JSON.parse(response);
      
      // Validate the response structure
      if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
        throw new Error('Invalid response structure');
      }

      // Additional validation
      if (parsedResponse.questions.length !== 10) {
        throw new Error('Invalid number of questions');
      }

      for (const question of parsedResponse.questions) {
        if (!question.question || !Array.isArray(question.options) || question.options.length !== 4) {
          throw new Error('Invalid question format');
        }
      }

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
      { error: error.message || 'Failed to generate questions' },
      { status: 500 }
    );
  }
}
