import { useState } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generateQuestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userProfile: { skills: "coding", interests: "AI" } }), // Replace with actual user data
      });
      const data = await res.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>AI-Driven Career Quiz</h1>
      <button onClick={fetchQuestions} disabled={loading}>
        {loading ? "Generating..." : "Start Quiz"}
      </button>

      {questions.length > 0 && (
        <div>
          <p>{questions[currentQuestion]}</p>
          <button
            onClick={() => setCurrentQuestion(prev => (prev < questions.length - 1 ? prev + 1 : prev))}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}
