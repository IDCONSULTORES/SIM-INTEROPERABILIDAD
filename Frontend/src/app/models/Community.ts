export interface CommunityData {
  id: string;
  name: string;
  surname: string;
  second_surname: string;
  ruc: string;
  property_title: string;
  total_area: string;
  forest_area: string;
  zonal: string;
  sector: string;
  population: number;
  number_of_families: number;
  number_of_inhabitants: number;
  organizations: string;
  created: Date;
  modified: Date;
  is_active: boolean;
  department: number;
  province: number;
  district: number;
  logs: string[];
}
