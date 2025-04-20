import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { inputPrompt } = await request.json();
    const requestBody = {
      model: "llama-4-maverick",
      messages: [
        {
          role: "system",
          content:
            "You are a professional color expert, and you have a deep knowledge of colors in a website, app, and overall design sense of that. I will give you information about my website, it can be short or long, you have to generate a color pallet for that webiste according to the prodived description that user gave you, always make sure to answer in a fixed and precise manner, so you have to always generate colors for these topics with the format im giving you, \n Primary:{color}, Secondary:{color}, Neutral Light:{color}, Neutral Dark:{color}, Accent:{color}, Semantic/Error:{color}, Warning/Info:{color}",
        },
        {
          role: "system",
          content:
            "Always give the colors only, you dont have to give any other reasoning for the colors you generated.",
        },
        {
          role: "user",
          content: inputPrompt,
        },
      ],
      stream: false,
      max_tokens: 3000,
      temperature: 0.9,
      top_p: 0.95,
      top_k: 40,
    };
    const aiRequest = await fetch(
      "https://api.zanity.xyz/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AI_KEY || ""}`,
        },
        body: JSON.stringify(requestBody),
      }
    );
    const aiRequestResponse = await aiRequest.json();
    return NextResponse.json({
      error: null,
      colors: aiRequestResponse.choices[0].message.content,
    });
  } catch {
    return NextResponse.json({ error: "Error creating colors" });
  }
}
