import { getContextualPrompts } from '@/utils/chatContext';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, pathname } = await request.json();
    const { systemPrompt } = getContextualPrompts(pathname);

    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers });
    }

    console.log('Sending request to Ollama...');
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama2",
        prompt: `${systemPrompt}

User message: ${message}

Respond in a helpful and professional manner, focusing on career-related guidance based on the current context.`,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ollama response not OK:', errorText);
      throw new Error(`Failed to get response from Ollama: ${errorText}`);
    }

    const data = await response.json();
    console.log('Received response from Ollama:', data);

    return NextResponse.json({ response: data.response }, { headers });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
} 