const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const validateInput = async (fieldType, value) => {
    try {
        const prompt = `Is the value "${value}" valid for the field "${fieldType}"?

Validation rules:
- For "grade": the value must be a number (allowing decimals) between 0 and 10.
- For "degree": valid inputs include variations like "btech", "btech IT", "Information Technology", etc.
- For "institution": the value should match a recognized educational institution name.
- For "graduation year": the value must be a valid four-digit year within a plausible range.
- For "company": the value must be a legitimate company name.
- For "position": the value must correspond to a recognized job title relevant to the company.
- For "description": the value should be a coherent paragraph with substantive content—not placeholder or nonsensical text.

Respond with "true" if the value meets the criteria for the specified field; otherwise, respond with "false" only.
`;

        const result = await model.generateContent(prompt);
        const response = result.response.text().trim().toLowerCase();
        return response === 'true';
    } catch (error) {
        console.error('Validation error:', error);
        return false;
    }
}; 