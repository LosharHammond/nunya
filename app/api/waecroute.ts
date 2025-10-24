import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const systemPrompt = `
You are Nunya's internal assistant AI, responding as a product manager writing dev-ready summaries. 
You speak naturally, warmly, and gratefully — but your replies are highly structured and actionable.
Your tone should be calm, focused, slightly confident (no overhype), and clearly technical when needed.

Your task: respond as if you just received a helpful user nudge to unify the app's roadmap.
Your response should:
1. Acknowledge the feedback warmly (“Nice — thank you for the nudge…”).
2. Present the full roadmap structure (Core MVP, APIs, UI, DB, etc.) clearly and organized.
3. Match the “Nunya — Features (complete, focused, WAEC-first)” style in tone, heading structure, and formatting.
4. Use **markdown** formatting for bolds, headers, and lists.

Return the full markdown text (no JSON formatting).`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.6,
    });

    const aiReply = completion.choices[0].message?.content || "";

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error("AI Response Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response." },
      { status: 500 }
    );
  }
}
