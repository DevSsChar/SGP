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
          content: `You are a career guidance AI that generates career recommendations.
          IMPORTANT: You must ONLY respond with a valid JSON object. Do not include any text before or after the JSON.
          
          IMPORTANT: You must respond with ONLY valid JSON, no additional text or explanations.
          The response must strictly follow this exact format, with no deviations:
          {
            "recommendations": [
              {
                "title": "string containing career title",
                "description": "string containing detailed description",
                "matchPercentage": number between 0 and 100,
                "keySkills": ["string skill 1", "string skill 2", "string skill 3"],
                "learningPath": ["string step 1", "string step 2", "string step 3"]
              }
            ]
          }

          Rules for generation:
          1. Generate exactly 5 career recommendations
          2. All text must be properly escaped for JSON
          3. matchPercentage must be a number between 0-100
          4. keySkills must be an array of 3-5 skills
          5. learningPath must be an array of 3-5 steps
          6. No nested objects or arrays beyond the specified structure
          7. No additional fields or properties
          8. Ensure the response is pure JSON with no markdown or additional formatting

          Input data to consider:
          1. Quiz Responses: ${JSON.stringify(quizData.answers)}
          2. User Profile:
             - Age: ${userData.age || 'Not specified'}
             - Location: ${userData.location || 'Not specified'}
             - Education: ${userData.education || 'Not specified'}
             - Skills: ${userData.skills || 'Not specified'}
             - Interests: ${userData.interests || 'Not specified'}
             - Languages: ${userData.languages || 'Not specified'}

          Base your recommendations on:
          Quiz Responses: ${JSON.stringify(quizData.answers)}
          User Profile:
          - Age: ${userData.age || 'Not specified'}
          - Location: ${userData.location || 'Not specified'}
          - Education: ${userData.education || 'Not specified'}
          - Skills: ${userData.skills || 'Not specified'}
          - Interests: ${userData.interests || 'Not specified'}
          - Languages: ${userData.languages || 'Not specified'}

          Remember: Your response must be a parseable JSON object only. No other text allowed.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stream: false,
      stop: null
    });

    if (!completion.choices || !completion.choices[0]?.message?.content) {
      throw new Error('No response from Groq API');
    }

    const response = completion.choices[0].message.content;
    
    // Try to clean the response if it contains any text before or after the JSON
    let cleanedResponse = response;
    try {
      const parsedResponse = JSON.parse(response);
      
      // Validate the response structure
      if (!parsedResponse.recommendations || !Array.isArray(parsedResponse.recommendations)) {
        throw new Error('Invalid response structure');
      }

      // Additional validation
      if (parsedResponse.recommendations.length !== 5) {
        throw new Error('Invalid number of recommendations');
      }

      for (const rec of parsedResponse.recommendations) {
        if (!rec.title || !rec.description || 
            typeof rec.matchPercentage !== 'number' || 
            !Array.isArray(rec.keySkills) || rec.keySkills.length < 3 ||
            !Array.isArray(rec.learningPath) || rec.learningPath.length < 3) {
          throw new Error('Invalid recommendation format');
        }
      }

      return parsedResponse;
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw response:', response);
      console.error('Cleaned response:', cleanedResponse);
      throw new Error(`Failed to parse career recommendations: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Error generating career recommendations:', error);
    throw new Error('Failed to generate career recommendations');
  }
} 