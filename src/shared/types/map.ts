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
  image?: string;
  images?: string[];
  proofLink?: string;
};

export type ProvinceData = {
  id: string;
  name: string;
  region: 'north' | 'central' | 'south';
  coordinates: { x: number; y: number };
  activities: MapActivity[];
};
