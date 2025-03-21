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
          
          Required JSON format (respond with exactly this structure):
          {
            "recommendations": [
              {
                "title": "Career Title",
                "description": "Detailed description of the career and why it matches the user",
                "matchPercentage": 85,
                "keySkills": ["skill1", "skill2", "skill3"],
                "learningPath": ["step1", "step2", "step3"]
              }
            ]
          }

          Rules:
          1. Generate EXACTLY 5 career recommendations
          2. Each recommendation must follow the exact JSON structure above
          3. matchPercentage must be a number between 0-100
          4. keySkills and learningPath must be arrays of strings
          5. DO NOT include any explanatory text outside the JSON structure
          6. Ensure all JSON syntax is valid (quotes, commas, brackets)

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

    const response = completion.choices[0]?.message?.content;
    
    // Try to clean the response if it contains any text before or after the JSON
    let cleanedResponse = response;
    try {
      // Find the first '{' and last '}'
      const startIndex = response.indexOf('{');
      const endIndex = response.lastIndexOf('}') + 1;
      if (startIndex !== -1 && endIndex !== -1) {
        cleanedResponse = response.slice(startIndex, endIndex);
      }

      const parsedResponse = JSON.parse(cleanedResponse);
      
      // Validate the response structure
      if (!parsedResponse.recommendations || !Array.isArray(parsedResponse.recommendations)) {
        throw new Error('Invalid response structure: missing recommendations array');
      }

      if (parsedResponse.recommendations.length !== 5) {
        throw new Error('Invalid number of recommendations: expected 5');
      }

      // Validate each recommendation
      parsedResponse.recommendations.forEach((rec, index) => {
        if (!rec.title || !rec.description || !rec.matchPercentage || !rec.keySkills || !rec.learningPath) {
          throw new Error(`Missing required fields in recommendation ${index + 1}`);
        }
        if (typeof rec.matchPercentage !== 'number' || rec.matchPercentage < 0 || rec.matchPercentage > 100) {
          throw new Error(`Invalid matchPercentage in recommendation ${index + 1}`);
        }
      });

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