
import { GoogleGenAI } from "@google/genai";
import { ItineraryPlan, UserPreferences } from "../types";

const MODEL_NAME = 'gemini-2.5-flash';

export async function generateItinerary(
  prefs: UserPreferences,
  coords?: { latitude: number; longitude: number }
): Promise<ItineraryPlan> {
  const API_KEY = import.meta.env.VITE_API_KEY as string | undefined;
  if (!API_KEY) {
    throw new Error('VITE_API_KEY is missing. Set it in .env.local as VITE_API_KEY=your_key');
  }
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    Create a highly detailed travel itinerary for a visitor in "${prefs.location}".
    The visitor is free from ${prefs.startTime} to ${prefs.endTime}.
    Interests: ${prefs.interests.join(", ")}.
    
    Please suggest a realistic timeline including:
    1. Multiple specific places to visit (landmarks, cafes, parks).
    2. Estimated travel time between locations.
    3. Best mode of transport (Auto-rickshaw, Metro, Walking, Cab).
    4. Estimated fare for each leg in local currency (INR if in India, or local).
    5. A short "why visit" for each place.

    CRITICAL: Provide the response as a structured text that I can easily parse.
    FORMAT REQUIREMENT:
    DESTINATION: [City Name]
    SUMMARY: [One sentence overall vibe]
    TOTAL_COST: [Estimated total budget]
    
    ---ITINERARY_START---
    TIME: [Slot, e.g. 10:00 AM - 11:30 AM]
    PLACE: [Name]
    DESC: [Short description]
    DUR: [Duration at site]
    TRANS: [Transport mode to next place]
    FARE: [Estimated cost]
    ---ITEM_END---
    [Repeat for each item]
    ---ITINERARY_END---
  `;

  const config: any = {
    tools: [{ googleMaps: {} }, { googleSearch: {} }],
  };

  if (coords) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      }
    };
  }

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: config,
  });

  const text = response.text || "";
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

  return parseItineraryResponse(text, groundingChunks);
}

function parseItineraryResponse(text: string, groundingChunks: any[]): ItineraryPlan {
  const destination = text.match(/DESTINATION:\s*(.*)/)?.[1] || "Unknown";
  const summary = text.match(/SUMMARY:\s*(.*)/)?.[1] || "No summary available.";
  const totalCost = text.match(/TOTAL_COST:\s*(.*)/)?.[1] || "N/A";

  const itineraryItems: any[] = [];
  const itemBlocks = text.split("---ITEM_END---");

  itemBlocks.forEach(block => {
    const timeSlot = block.match(/TIME:\s*(.*)/)?.[1];
    const title = block.match(/PLACE:\s*(.*)/)?.[1];
    const description = block.match(/DESC:\s*(.*)/)?.[1];
    const duration = block.match(/DUR:\s*(.*)/)?.[1];
    const transportMode = block.match(/TRANS:\s*(.*)/)?.[1];
    const estimatedFare = block.match(/FARE:\s*(.*)/)?.[1];

    if (title && timeSlot) {
      // Try to find a matching grounding URL
      const grounding = groundingChunks.find(c => 
        c.maps?.title?.toLowerCase().includes(title.toLowerCase()) ||
        title.toLowerCase().includes(c.maps?.title?.toLowerCase())
      );

      itineraryItems.push({
        title,
        timeSlot,
        description: description || "",
        duration: duration || "N/A",
        transportMode: transportMode || "N/A",
        estimatedFare: estimatedFare || "N/A",
        mapUrl: grounding?.maps?.uri || null
      });
    }
  });

  const sources = groundingChunks
    .filter(c => c.maps || c.web)
    .map(c => ({
      title: c.maps?.title || c.web?.title || "Reference",
      uri: c.maps?.uri || c.web?.uri || "#"
    }));

  return {
    destination,
    summary,
    totalEstimatedCost: totalCost,
    itinerary: itineraryItems,
    groundingSources: sources
  };
}
