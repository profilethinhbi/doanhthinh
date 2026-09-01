export type ActivityCategory = 'teacher-training' | 'khkt-coaching' | 'research-deployment';

export type MapActivity = {
  id: string;
  title: string;
  category: ActivityCategory;
  location: string;
  year: string;
  role: string;
  description: string;
  achievements?: string[];
  organization?: string;
  tags?: string[];
};

export type ProvinceData = {
  id: string;
  name: string;
  region: 'north' | 'central' | 'south';
  coordinates: { x: number; y: number }; // percentage on 0-100 scale of map container
  activities: MapActivity[];
};
