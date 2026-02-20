// This script is meant to be run LOCALLY on your dev machine to seed the database.
// Usage: ts-node scripts/ingest-data.ts

import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

// Load environment variables (You might need 'dotenv' package for local scripts)
require("dotenv").config();

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Example Church Data (Replace with your actual text files or structured data)
const CHURCH_DOCS = [
  {
    title: "Service Times",
    content: "We have services every Sunday at 9:00 AM and 11:00 AM. Join us for coffee beforehand in the main lobby!",
  },
  {
    title: "Beliefs",
    content: "We believe in the Trinity: Father, Son, and Holy Spirit. We believe the Bible is the inspired word of God.",
  },
  {
    title: "Location",
    content: "Our church is located at 123 Faith Street, Downtown City. Parking is available on the north side.",
  },
  // Add more structured data here...
];

async function ingestData() {
  console.log("Starting ingestion...");

  const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

  for (const doc of CHURCH_DOCS) {
    console.log(`Processing: ${doc.title}`);

    try {
      // 1. Generate Embedding
      const result = await embeddingModel.embedContent(doc.content);
      const embedding = result.embedding.values;

      // 2. Insert into Supabase
      const { error } = await supabase.from("documents").insert({
        content: doc.content,
        embedding: embedding, // This assumes you created a 'vector' column in Supabase
        metadata: { title: doc.title },
      });

      if (error) {
        console.error("Error inserting:", error);
      } else {
        console.log(`Saved: ${doc.title}`);
      }
    } catch (err) {
      console.error("Failed to process doc:", err);
    }
  }

  console.log("Ingestion complete!");
}

ingestData();
