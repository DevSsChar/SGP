'use client';

export default function ChatMessage({ message }) {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isBot
            ? 'bg-gray-100 text-gray-800'
            : 'bg-blue-600 text-white'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
} 