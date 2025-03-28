import axios from "axios";

export const validateInput = async (fieldType, value) => {
    try {
        // Formatting the validation query
        const prompt = `You are a data validation assistant. Your task is to validate field values based on predefined rules.

Answer strictly with "True" or "False" only—no explanations.

Validation Rules:
- FullName: Must contain at least a first and last name. Example: "John Doe".
- Email: Must be a valid email (e.g., "user@example.com").
- Age: Must be a number between 15 and 90.
- Location: Must be a valid city name.
- Degree: Must be a recognized academic degree (e.g., "B.Tech", "MCA").
- Institution: Must be an educational institution (e.g., "IIT", "Harvard").
- GraduationYear: Must be a four-digit year, past 100 years or next 10 years.
- Grade: Must be a number (CGPA 0-10 or percentage 0-100).
- Company: Must be a legitimate company (e.g., "Google", "Microsoft").
- Position: Must be a valid job title.
- Duration: Must be a valid ISO date.
- Description: Must be a meaningful paragraph.
- Skills: Must list relevant skills.
- SoftSkills: Must list soft skills.
- Languages: Must list languages.
- Interests: Must state clear interests.

Now, validate the following input:

"Is the value '${value}' valid for the field '${fieldType}'?"

Respond with only "True" or "False".`;

        // Sending request to Ollama
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "llama2",
            prompt: prompt,
            stream: false
        });

        // Extracting and processing the response
        const output = response.data.response.trim().toLowerCase();
        return output === "true";
    } catch (error) {
        console.error("Validation error:", error.response ? error.response.data : error.message);
        return false;
    }
};
