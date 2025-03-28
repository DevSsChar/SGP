// Define context-specific prompts and suggestions
export const contextPrompts = {
  assessment: {
    systemPrompt: `You are PathFinder Assistant helping with career assessment. Focus on:
- Explaining assessment questions
- Helping users understand their strengths and preferences
- Guiding them through the quiz thoughtfully
- Explaining how their answers influence career matches`,
    suggestions: [
      "What do the assessment questions mean?",
      "How are my answers used to find career matches?",
      "What if I'm unsure about an answer?",
      "Can I retake the assessment?"
    ]
  },
  recommendations: {
    systemPrompt: `You are PathFinder Assistant helping with career recommendations. Focus on:
- Explaining why certain careers were recommended
- Providing details about each career path
- Discussing required skills and qualifications
- Helping users compare different career options`,
    suggestions: [
      "Why was this career recommended for me?",
      "What skills do I need for this career?",
      "How can I prepare for this career?",
      "What's the job outlook for this role?"
    ]
  },
  learningPath: {
    systemPrompt: `You are PathFinder Assistant helping with learning paths. Focus on:
- Explaining educational requirements
- Suggesting learning resources
- Discussing certification options
- Creating study plans and timelines`,
    suggestions: [
      "What courses should I take first?",
      "How long will it take to learn these skills?",
      "Which certifications are most valuable?",
      "Can you help me create a study plan?"
    ]
  },
  resume: {
    systemPrompt: `You are PathFinder Assistant helping with resumes. Focus on:
- Providing resume writing tips
- Suggesting improvements to content
- Optimizing for ATS systems
- Highlighting relevant skills and experiences`,
    suggestions: [
      "How can I improve my resume?",
      "What skills should I highlight?",
      "How do I explain career gaps?",
      "What format is best for my experience?"
    ]
  },
  default: {
    systemPrompt: `You are PathFinder Assistant, an AI career advisor. Help users with:
- Career guidance and planning
- Skill development advice
- Industry insights and trends
- Professional development tips`,
    suggestions: [
      "How can you help with my career?",
      "What services does PathFinder offer?",
      "I need help choosing a career path",
      "How can I develop my skills?"
    ]
  }
};

// Get context based on current path
export function getContextFromPath(path) {
  if (path.includes('/assessment')) return 'assessment';
  if (path.includes('/recommendations')) return 'recommendations';
  if (path.includes('/learning-path')) return 'learningPath';
  if (path.includes('/resume')) return 'resume';
  return 'default';
}

// Get prompt and suggestions for current context
export function getContextualPrompts(path) {
  const context = getContextFromPath(path);
  return contextPrompts[context] || contextPrompts.default;
} 