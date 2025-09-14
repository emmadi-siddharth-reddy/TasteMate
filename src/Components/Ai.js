import { InferenceClient } from '@huggingface/inference';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

// ✅ Load and validate token
const token = import.meta.env.VITE_HF_ACCESS_TOKEN;
console.log("Access Token:", token);

if (!token || typeof token !== 'string' || !token.startsWith('hf_')) {
  throw new Error("Hugging Face token is missing or invalid");
}

// ✅ Pass token directly (NOT as { accessToken: ... })
const hf = new InferenceClient(token);

// ✅ Use a model that actually works with chatCompletion
const MODEL = "meta-llama/Meta-Llama-3-8B-Instruct";

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 512,
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("AI API Error:", err.message);
    return "Error fetching recipe from AI.";
  }
}
