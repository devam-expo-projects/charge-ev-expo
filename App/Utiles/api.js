import axios from 'axios';
// import { EXPO_GOOGLE_API_KEY } from "@env";
const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const EXPO_GOOGLE_API_KEY = 'AIzaSyBKnfAl9mGbPIPlbSoqpTOJYAdWJtOqdas'

const headers = {
  'Content-Type': 'application/json',
  'X-Goog-Api-Key': EXPO_GOOGLE_API_KEY,
  'X-Goog-FieldMask': ['places.displayName', 'places.formattedAddress', 'places.location', 'places.photos', 'places.evChargeOptions', 'places.shortFormattedAddress', 'places.id']
};

const NewNearbyPlace = async (payload) => {
  try {
    const response = await axios.post(BASE_URL, payload, { headers });
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
};

export default { NewNearbyPlace };
