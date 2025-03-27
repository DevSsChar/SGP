import Groq from "groq-sdk";

const groq = new Groq({
<<<<<<< HEAD
    apiKey: "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",
    dangerouslyAllowBrowser: true 
=======
  apiKey: "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",
  dangerouslyAllowBrowser: true
>>>>>>> 1d5b071addda7bfdd741137083ad45245f291f2f
});

export async function generateCareerRecommendations(quizData, userData) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a career guidance AI that generates career recommendations.
          IMPORTANT: You must ONLY respond with a valid JSON object. Do not include any text before or after the JSON.
          
<<<<<<< HEAD
          Required JSON format (respond with exactly this structure):
          {
            "recommendations": [
              {
                "title": "Career Title",
                "description": "Detailed description of the career and why it matches the user",
                "matchPercentage": 85,
                "keySkills": ["skill1", "skill2", "skill3"],
                "learningPath": ["step1", "step2", "step3"]
=======
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
>>>>>>> 1d5b071addda7bfdd741137083ad45245f291f2f
              }
            ]
          }

<<<<<<< HEAD
          Rules:
          1. Generate EXACTLY 5 career recommendations
          2. Each recommendation must follow the exact JSON structure above
          3. matchPercentage must be a number between 0-100
          4. keySkills and learningPath must be arrays of strings
          5. DO NOT include any explanatory text outside the JSON structure
          6. Ensure all JSON syntax is valid (quotes, commas, brackets)
=======
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
>>>>>>> 1d5b071addda7bfdd741137083ad45245f291f2f

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 1d5b071addda7bfdd741137083ad45245f291f2f

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