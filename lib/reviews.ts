export type Review = {
  name: string;
  location?: string;
  trip?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  source?: string;
  sample?: boolean;
};

export const reviews: Review[] = [
  {
    name: "Aarav M.",
    location: "New York, NY",
    trip: "New York to Delhi",
    rating: 5,
    text: "The whole booking process was really smooth. I got a good fare and the team was quick to respond when I had a question about my baggage allowance.",
    date: "August 2026",
    source: "Demo",
    sample: true,
  },
  {
    name: "Neha R.",
    location: "Chicago, IL",
    trip: "Chicago to Mumbai",
    rating: 5,
    text: "I was looking for a reasonable fare to Mumbai and found a great option through FlyFareDeal. The process was simple and straightforward.",
    date: "July 2026",
    source: "Demo",
    sample: true,
  },
  {
    name: "Daniel K.",
    location: "Dallas, TX",
    trip: "Dallas to Delhi",
    rating: 4,
    text: "Good experience overall. I appreciated having someone available to answer questions instead of having to figure everything out myself.",
    date: "July 2026",
    source: "Demo",
    sample: true,
  },
  {
    name: "Priya S.",
    location: "Los Angeles, CA",
    trip: "Los Angeles to Chennai",
    rating: 5,
    text: "Found a convenient flight option for my trip to Chennai. The communication was clear and the booking was handled without any hassle.",
    date: "June 2026",
    source: "Demo",
    sample: true,
  },
];