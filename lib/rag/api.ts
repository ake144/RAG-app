import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "../supabase";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 1. Generate Embedding for User Query
export async function getEmbedding(text: string) {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  const embedding = result.embedding;
  return embedding.values;
}

// 2. Search Database for Relevant Context
export async function searchContext(queryEmbedding: number[]) {
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_threshold: 0.5, // Adjust threshold for stricter/looser matching
    match_count: 5,       // Top 5 chunks
  });

  if (error) {
    console.error("Supabase vector search error:", error);
    return [];
  }

  return data.map((chunk: any) => chunk.content).join("\n\n");
}

// 3. Generate Answer using Context
export async function generateRAGResponse(query: string) {
  try {
    // Step A: Embed the user's question
    const queryEmbedding = await getEmbedding(query);

    // Step B: Retrieve relevant knowledge
    const context = await searchContext(queryEmbedding);

    // Step C: Prompt the LLM
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are a helpful assistant for a church. Use the following context to answer the user's question.
If the answer is not in the context, say "I'm sorry, I don't have that information yet." DO NOT make up facts.

Context:
${context}

User Question: ${query}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("RAG logic failed:", error);
    return "I encountered an error while trying to answer your question. Please try again later.";
  }
}
