
export interface LocationPoint {
  title: string;
  description: string;
  timeSlot: string;
  duration: string;
  transportMode: string;
  estimatedFare: string;
  mapUrl?: string;
  category?: string;
}

export interface ItineraryPlan {
  destination: string;
  summary: string;
  totalEstimatedCost: string;
  itinerary: LocationPoint[];
  groundingSources: Array<{
    title: string;
    uri: string;
  }>;
}

export interface UserPreferences {
  location: string;
  startTime: string;
  endTime: string;
  interests: string[];
}
