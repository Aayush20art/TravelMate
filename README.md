---

## 🛩️ TravelMate

---
This everything you need to run your app locally.

TravelMate is an AI-powered travel itinerary planner that designs a **personalized, time-optimized day plan** based on your destination, available time, interests, and live location context.  
It blends a futuristic UI with smart itinerary generation to help travelers make the most of their day.

---

## 🌍 Live Demo
> https://travel-mate-steel.vercel.app/_

---

## ✨ Features

- 🧠 **AI-Generated Itinerary** using google Gemini
- 📍 **Location-aware planning** (optional geolocation support)
- ⏰ **Time-bound scheduling** (start & end time)
- 🎯 **Interest-based customization**
- 🧭 Optimized timeline with cost estimation
- 📚 Grounding sources & references for places
- 🎨 Premium animated UI with glassmorphism
- 📱 Fully responsive & smooth scrolling UX

---

## 🛠 Tech Stack

### Frontend
- **React (Vite)**
- **TypeScript**
- **Tailwind CSS**
- **Framer-style animations**
- **Custom animated background**

### AI & Services
- **Google Gemini API**
- Prompt-based itinerary generation
- Grounded responses with references

### Project Structure
src/
│── components/
│   ├── AnimatedBackground.tsx
│   ├── TimelineItem.tsx
│
│── services/
│   └── geminiService.ts
│
│── types/
│   └── index.ts
│
│── App.tsx
│── main.tsx

