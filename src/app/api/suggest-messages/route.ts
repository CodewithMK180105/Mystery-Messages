import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  try {
    const prompt = `
      Generate 3 anonymous messages that are direct, real, and thought-provoking. 
      They should feel personal but keep the sender unknown. 
      Avoid clichés—make them something that would make the receiver stop and think. 
      Separate each message using "||".
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }], // Correct structure
        }),
      }
    );
    
    
      

    console.log(process.env.GEMINI_API_KEY);
    console.log(response);

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
