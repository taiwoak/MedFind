export interface HealthCenterProperties {
    id: number;
    name: string;
    global_id: string;
    alternate_name: string | null;
    functional_status: string;
    type: string;
    ward_code: string;
    category: string;
    timestamp: string;
    accessibility: string | null;
    lga_name: string;
    lga_code: string;
    state_code: string;
    state_name: string;
  }
  
  export interface HealthCenterGeometry {
    type: string;
    coordinates: [number, number]; // Coordinates as a tuple of two numbers
  }
  
  export interface HealthCenterFeature {
    type: string;
    id: string;
    geometry: HealthCenterGeometry;
    geometry_name: string;
    properties: HealthCenterProperties;
  }
  
  export interface HealthCentersData {
    type: string;
    totalFeatures: number;
    features: HealthCenterFeature[];
  }
  