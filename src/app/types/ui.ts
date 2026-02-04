export interface DonationUi {
  id: string;
  petName: string;
  species: string;
  size: string;
  ageRange: string;
  photos: string[];
  health: {
    dewormed: boolean;
    neutered: boolean;
    vaccinated: boolean;
    hasPreexistingCondition: boolean;
    conditionDetails?: string;
  };
  observations: string;
  location: {
    neighborhood: string;
    city: string;
    state: string;
    distance: string;
    coordinates?: { lat: number; lng: number };
  };
  donor: {
    id: string;
    name: string;
    phone?: string;
    email?: string;
    showPhone: boolean;
    memberSince: string;
  };
  status: string;
  publishedDate: string;
  temperament?: string;
  goodWithKids?: boolean;
  goodWithPets?: boolean;
  raw?: unknown;
}
