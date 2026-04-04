export interface Pass {
  relation_id: number | null;
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  elevation: number;
  status: "not_ridden" | "gefahren" | string;
  year: number | null;
  heroClaim: string;
  mustRideDescription: string;
  bestApproachSide: string;
  bestApproachReason: string;
  rating_scenery: number;
  rating_flow: number;
  rating_technique: number;
  rating_road: number;
  rating_traffic: number;
  rating_popularity: number;
  highlight_1: string;
  highlight_2: string;
  highlight_3: string;
  caution_1: string;
  caution_2: string;
  caution_3: string;
  ride_score: string;
  region: string;
}

export interface PolylinePoint {
  lat: number;
  lon: number;
}

export interface PassPolyline {
  relation_id: number | null;
  points: PolylinePoint[];
}
