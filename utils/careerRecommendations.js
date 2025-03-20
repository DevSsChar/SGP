import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

export async function generateCareerRecommendations(quizData, userData) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a career guidance AI that analyzes quiz responses and user profile data to generate personalized career recommendations.
          
          Generate exactly 5 career recommendations in the following JSON format:
          {
            "recommendations": [
              {
                "title": "Career Title",
                "description": "Detailed description of the career and why it matches the user",
                "matchPercentage": number between 0-100,
                "keySkills": ["skill1", "skill2", "skill3", ...],
                "learningPath": ["step1", "step2", "step3", ...]
              }
            ]
          }

          Consider the following data points:
          1. Quiz Responses: ${JSON.stringify(quizData.answers)}
          2. User Profile:
             - Age: ${userData.age || 'Not specified'}
             - Location: ${userData.location || 'Not specified'}
             - Education: ${userData.education || 'Not specified'}
             - Skills: ${userData.skills || 'Not specified'}
             - Interests: ${userData.interests || 'Not specified'}
             - Languages: ${userData.languages || 'Not specified'}

          Guidelines for recommendations:
          - Base recommendations primarily on quiz responses
          - Consider user's existing skills and education
          - Ensure recommendations are realistic and achievable
          - Include both traditional and emerging career paths
          - Match career suggestions with user's interests
          - Consider location-based opportunities
          - Provide specific, actionable learning paths
          - Calculate match percentage based on alignment with user profile and quiz answers`
        }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stream: false,
      stop: null
    });

    const response = completion.choices[0]?.message?.content;
    
    try {
      const parsedResponse = JSON.parse(response);
      return parsedResponse;
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new Error('Failed to parse career recommendations');
    }
  } catch (error) {
    console.error('Error generating career recommendations:', error);
    throw new Error('Failed to generate career recommendations');
  }
} 