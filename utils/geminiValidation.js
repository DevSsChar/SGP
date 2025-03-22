import Groq from "groq-sdk";


const groq = new Groq({ apiKey: "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",dangerouslyAllowBrowser: true });

export const validateInput = async (fieldType, value) => {
    try {
        const prompt = `You are a data validation assistant. Your task is to validate field values according to the criteria outlined below. When presented with a query in the format:

"Is the value "${value}" valid for the field "${fieldType}"?"

respond with exactly "True" if the provided value meets the criteria for that field, or "False" if it does not. Do not include any additional text or commentary.

Validation Rules:

- FullName (String, required):
  * The value must be a valid full name.
  * Acceptable formats include: "Dev M Shah", "Shah Dev M", "Shah Dev Mineshkumar", or "Dev Mineshkumar Shah".
  * The name must include at least a first and last name; a middle name or initial is optional.

- Email (String, required, unique):
  * The value must be a valid email address, such as "username@example.com".

- Age (Number):
  * The value must be a number between 15 and 90 (inclusive).

- Location (String):
  * The value must be a valid city name.

- Degree (String):
  * The value must match recognized degree variations such as "btech", "btech IT", "B.tech", "B.E.", "BCA", "MCA", "Information Technology" or similar academic qualifications (case insensitive).
  * Common abbreviations and variations of degree names are accepted.

- Institution (String):
  * The value must be an educational institution name.
  * Can be full names or common abbreviations (e.g., "CSPIT-IT", "IIT", "NIT").
  * Special characters and abbreviations are allowed.

- GraduationYear (Number):
  * The value must be a four-digit year.
  * For future dates: must be within next 10 years.
  * For past dates: must be within last 100 years.

- Grade (Number):
  * The value must be a number between 0 and 10 for CGPA.
  * Or between 0 and 100 for percentage.
  * Decimals are allowed.

- Company (String):
  * The value must be a legitimate company name (for example, "Google" or "Microsoft").

- Position (String):
  * The value must correspond to a recognized job title relevant to the company (for example, "Software Engineer" or "Product Manager").

- Duration (Date):
  * The value must be a valid ISO date (e.g., "2023-06-01T00:00:00Z").

- Description (String):
  * The value must be a coherent paragraph with substantive content (not placeholder text or gibberish).

- Skills (String):
  * The value must list relevant skills clearly (for example, "Java, Python, Machine Learning").

- SoftSkills (String):
  * The value must list relevant soft skills (for example, "Communication, Leadership, Problem-Solving").

- Languages (String):
  * The value must list valid languages in any format (for example, "English, Hindi" or "hindi,english,gujarati").
  * Languages can be in any case (uppercase or lowercase).

- Interests (String):
  * The value must express clear interests or preferences (for example, "Programming", "Web Development", "I love programming", "Coding").
  * Can be written in natural language or as a list.
`;
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        const response = completion.choices[0]?.message?.content?.trim().toLowerCase() || 'false';
        return response === 'true';
    } catch (error) {
        console.error('Validation error:', error);
        return false;
    }
}; 