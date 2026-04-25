/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function fetchStudyTips() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 5 practical study tips for students. Include a title, content, and a category (motivation, technique, or subject-guide) for each.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              category: { type: Type.STRING, enum: ['motivation', 'technique', 'subject-guide'] },
            },
            required: ['title', 'content', 'category'],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text).map((tip: any, index: number) => ({
      ...tip,
      id: `tip-${index}-${Date.now()}`
    }));
  } catch (error) {
    console.error("Error fetching study tips", error);
    return [];
  }
}

export async function generateMotivationQuote() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a short, powerful motivational quote for a student who is struggling to stay focused.",
    });
    return response.text || "Keep pushing, your hard work will pay off!";
  } catch (error) {
    return "The secret of getting ahead is getting started.";
  }
}
