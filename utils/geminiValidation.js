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
  * The value must be in the format "City, Country", where both city and country are valid names.

- Degree (String):
  * The value must match recognized degree variations such as "btech", "btech IT", or "Information Technology" (case insensitive).

- Institution (String):
  * The value must match a recognized educational institution name (for example, "Indian Institute of Technology Bombay").

- GraduationYear (Number):
  * The value must be a valid four-digit year within a plausible range (e.g., between 1900 and 2099).

- Grade (Number):
  * The value must be a number (decimals allowed) between 0 and 10.

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
  * The value must list valid languages (for example, "English, Hindi").

- Interests (String):
  * The value must list clear and meaningful interests (for example, "Artificial Intelligence, Open Source Contribution").
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