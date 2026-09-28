import {
    Building2,
    Landmark,
    Mountain,
    Palmtree,
    Sun,
    Waves,
    type LucideIcon,
} from "lucide-react";

// International trip ideas for the "Trips" carousel.
// Each one fills in the form's "To" airport when clicked.

export type Trip = {
    title: string;
    places: string;
    duration: string;
    blurb: string;
    airport: string; // IATA code, must exist in lib/airports.ts
    icon: LucideIcon;
    tags: string[];
    highlights: string[]; // back of the card
    bestTime: string;
    images: string[];
};
const photos = (folder: string, count: number, ext = "jpg") =>
    Array.from({ length: count }, (_, i) => `/trips/${folder}/${i + 1}.${ext}`);
export const trips: Trip[] = [
    {
        title: "Dubai & Abu Dhabi",
        places: "Dubai and Abu Dhabi",
        duration: "4–6 days",
        blurb:
            "Skylines, desert adventures, luxury shopping and world-class attractions across the UAE.",
        airport: "DXB",
        icon: Building2,
        tags: ["Luxury", "City break"],
        highlights: [
            "Burj Khalifa at sunset",
            "Desert safari with a dinner camp",
            "Sheikh Zayed Grand Mosque in Abu Dhabi",
            "Dhow cruise and the old souks on Dubai Creek",
        ],
        bestTime: "November to March",
        images: photos("dubai", 5),
    },

    {
        title: "Thailand escape",
        places: "Bangkok, Phuket and Krabi",
        duration: "7–10 days",
        blurb:
            "Golden temples, island beaches, vibrant night markets and unforgettable Thai cuisine.",
        airport: "BKK",
        icon: Palmtree,
        tags: ["Beach", "Adventure"],
        highlights: [
            "Grand Palace and Wat Pho in Bangkok",
            "Island hopping in the Andaman Sea",
            "Thai cooking class and street food tour",
            "Elephant sanctuary visit and jungle trek",
        ],
        bestTime: "November to February",
        images: photos("thailand", 5),
    },

    {
        title: "Singapore getaway",
        places: "Singapore",
        duration: "3–5 days",
        blurb:
            "Explore futuristic gardens, iconic architecture, incredible food and a city built for discovery.",
        airport: "SIN",
        icon: Building2,
        tags: ["City", "Family"],
        highlights: [
            "Gardens by the Bay",
            "Marina Bay Sands",
            "Chinatown and Little India",
            "Sentosa Island",
        ],
        bestTime: "November to March",
        images: photos("singapore", 5),
    },

    {
        title: "Bali island escape",
        places: "Bali, Indonesia",
        duration: "6–8 days",
        blurb:
            "Rice terraces, tropical beaches, waterfalls and peaceful temples across the Island of the Gods.",
        airport: "DPS",
        icon: Waves,
        tags: ["Beach", "Relaxing"],
        highlights: [
            "Ubud's rice terraces and monkey forest",
            "Sunset at Tanah Lot Temple",
            "Snorkeling or diving in Nusa Penida",
            "Balinese spa and wellness experience",
        ],
        bestTime: "April to October",
        images: photos("bali", 5),
    },

    {
        title: "Paris & the French Riviera",
        places: "Paris, Nice and the Côte d'Azur",
        duration: "8–10 days",
        blurb:
            "Iconic landmarks, French cafés, Mediterranean coastlines and some of Europe's most beautiful cities.",
        airport: "CDG",
        icon: Landmark,
        tags: ["Romantic", "Europe"],
        highlights: [
            "Eiffel Tower and Louvre Museum in Paris",
            "Mediterranean beaches in Nice",
            "Scenic train ride along the French Riviera",
        ],
        bestTime: "April to October",
        images: photos("paris", 5),
    },

    {
        title: "Switzerland adventure",
        places: "Zurich, Lucerne and Interlaken",
        duration: "7–10 days",
        blurb:
            "Snow-capped Alps, crystal-clear lakes, scenic trains and postcard-perfect mountain villages.",
        airport: "ZRH",
        icon: Mountain,
        tags: ["Mountains", "Scenic"],
        highlights: [
            "Swiss Alps mountain hiking",
            "Lake Geneva boat tour",
            "Jungfrau region scenic train ride",
            "Traditional Swiss village visit",
        ],
        bestTime: "June to September",
        images: photos("switzerland", 5),
    },
];