export type Airport = {
  code: string; // IATA code
  city: string;
  name: string;
  country: string;
};

// A starter list. Swap for a full dataset later (e.g. OurAirports).
export const airports: Airport[] = [
  // India
  { code: "DEL", city: "New Delhi", name: "Indira Gandhi International", country: "India" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International", country: "India" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International", country: "India" },
  { code: "MAA", city: "Chennai", name: "Chennai International", country: "India" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International", country: "India" },
  { code: "CCU", city: "Kolkata", name: "Netaji Subhas Chandra Bose International", country: "India" },
  { code: "ATQ", city: "Amritsar", name: "Sri Guru Ram Dass Jee International", country: "India" },
  { code: "IXC", city: "Chandigarh", name: "Chandigarh International", country: "India" },
  { code: "AMD", city: "Ahmedabad", name: "Sardar Vallabhbhai Patel International", country: "India" },
  { code: "COK", city: "Kochi", name: "Cochin International", country: "India" },
  { code: "GOI", city: "Goa", name: "Dabolim", country: "India" },
  { code: "PNQ", city: "Pune", name: "Pune International", country: "India" },
  { code: "JAI", city: "Jaipur", name: "Jaipur International", country: "India" },
  { code: "TRV", city: "Thiruvananthapuram", name: "Trivandrum International", country: "India" },
  // United States
  { code: "JFK", city: "New York", name: "John F. Kennedy International", country: "United States" },
  { code: "EWR", city: "Newark", name: "Newark Liberty International", country: "United States" },
  { code: "ORD", city: "Chicago", name: "O'Hare International", country: "United States" },
  { code: "SFO", city: "San Francisco", name: "San Francisco International", country: "United States" },
  { code: "LAX", city: "Los Angeles", name: "Los Angeles International", country: "United States" },
  { code: "IAD", city: "Washington, D.C.", name: "Washington Dulles International", country: "United States" },
  { code: "DFW", city: "Dallas", name: "Dallas/Fort Worth International", country: "United States" },
  { code: "IAH", city: "Houston", name: "George Bush Intercontinental", country: "United States" },
  { code: "ATL", city: "Atlanta", name: "Hartsfield–Jackson Atlanta International", country: "United States" },
  { code: "SEA", city: "Seattle", name: "Seattle–Tacoma International", country: "United States" },
  { code: "BOS", city: "Boston", name: "Logan International", country: "United States" },
  { code: "MIA", city: "Miami", name: "Miami International", country: "United States" },
  // Canada
  { code: "YYZ", city: "Toronto", name: "Toronto Pearson International", country: "Canada" },
  { code: "YVR", city: "Vancouver", name: "Vancouver International", country: "Canada" },
  { code: "YUL", city: "Montreal", name: "Montréal–Trudeau International", country: "Canada" },
  { code: "YYC", city: "Calgary", name: "Calgary International", country: "Canada" },
  // Europe
  { code: "LHR", city: "London", name: "Heathrow", country: "United Kingdom" },
  { code: "LGW", city: "London", name: "Gatwick", country: "United Kingdom" },
  { code: "MAN", city: "Manchester", name: "Manchester Airport", country: "United Kingdom" },
  { code: "BHX", city: "Birmingham", name: "Birmingham Airport", country: "United Kingdom" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", country: "France" },
  { code: "FRA", city: "Frankfurt", name: "Frankfurt Airport", country: "Germany" },
  { code: "AMS", city: "Amsterdam", name: "Schiphol", country: "Netherlands" },
  { code: "FCO", city: "Rome", name: "Leonardo da Vinci–Fiumicino", country: "Italy" },
  { code: "IST", city: "Istanbul", name: "Istanbul Airport", country: "Türkiye" },
  // Middle East, Asia, Oceania
  { code: "DXB", city: "Dubai", name: "Dubai International", country: "United Arab Emirates" },
  { code: "AUH", city: "Abu Dhabi", name: "Zayed International", country: "United Arab Emirates" },
  { code: "DOH", city: "Doha", name: "Hamad International", country: "Qatar" },
  { code: "SIN", city: "Singapore", name: "Changi", country: "Singapore" },
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi", country: "Thailand" },
  { code: "KUL", city: "Kuala Lumpur", name: "Kuala Lumpur International", country: "Malaysia" },
  { code: "HKG", city: "Hong Kong", name: "Hong Kong International", country: "Hong Kong" },
  { code: "NRT", city: "Tokyo", name: "Narita International", country: "Japan" },
  { code: "SYD", city: "Sydney", name: "Sydney Kingsford Smith", country: "Australia" },
  { code: "MEL", city: "Melbourne", name: "Melbourne Airport", country: "Australia" },
  { code: "AKL", city: "Auckland", name: "Auckland Airport", country: "New Zealand" },
];

// Used by the combobox: does this airport match what the user typed?
// Matches the IATA code, or the start of any word in the city, airport or country name.
export function matchesAirport(airport: Airport, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (airport.code.toLowerCase().startsWith(q)) return true;
  const words = `${airport.city} ${airport.name} ${airport.country}`.toLowerCase().split(/[\s,()–-]+/);
  return words.some((w) => w.startsWith(q)) || airport.city.toLowerCase().startsWith(q);
}

export function findAirport(code: string | null | undefined) {
  if (!code) return undefined;
  return airports.find((a) => a.code === code.toUpperCase());
}