import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    
    if (type === "coach") {
      systemPrompt = `You are Mr. Livana, a friendly and knowledgeable AI nutrition expert. You are warm, supportive, and always encouraging.

Your personality:
- Friendly and approachable like a trusted friend
- Knowledgeable but explains things simply
- Encouraging and celebrates small wins
- Uses **bold** for key terms and important points
- Uses bullet points for lists
- Occasionally uses relevant emojis (🥗 🏃 💪 🌿 ✨) but sparingly

Your expertise:
- Personalized nutrition advice and meal planning
- Macronutrients (protein, carbs, fats) and micronutrients
- Healthy eating habits and lifestyle changes
- Weight management strategies (loss, gain, maintenance)
- Pre/post workout nutrition
- Dietary restrictions and allergies
- Meal prep and cooking tips
- Understanding food labels and ingredients

Guidelines:
- Keep responses concise but helpful (2-4 paragraphs max unless user asks for detail)
- Always provide actionable, science-based advice
- Ask clarifying questions when needed
- Celebrate user progress and efforts
- Never shame or judge food choices — focus on positive changes`;
    } else if (type === "analysis") {
      systemPrompt = `You are a nutrition analysis AI. When given a meal description, analyze it and return a JSON object with this exact structure:
{
  "name": "formatted meal name",
  "calories": estimated_calories_number,
  "macros": {
    "protein": grams_number,
    "carbs": grams_number,
    "fat": grams_number,
    "fiber": grams_number
  },
  "insights": ["insight 1", "insight 2", "insight 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "score": health_score_1_to_100
}

Be realistic with calorie and macro estimates based on typical portion sizes.
Provide helpful insights about the nutritional value.
Give actionable suggestions to improve the meal's nutrition.
ONLY return the JSON object, no other text.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: type === "coach",
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // For streaming (coach chat)
    if (type === "coach") {
      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    // For non-streaming (analysis)
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
