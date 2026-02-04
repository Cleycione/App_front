export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export type PostStatus = "LOST" | "FOUND" | "CARE" | "RESOLVED" | "URGENT";
export type OccurrenceType = "FOUND" | "LOST";

export interface PostResponse {
  id: string;
  status: PostStatus;
  photos: string[];
  neighborhood?: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
  occurredAt?: string;
  species?: string;
  size?: string;
  color?: string;
  characteristics?: string;
  observations?: string;
  hasCollar?: boolean;
  injured?: boolean;
  injuryDetails?: string;
  contactAddress?: string;
  contactPhone?: string;
  occurrenceType?: OccurrenceType;
  updates?: { id: string; message: string; createdAt: string }[];
}

export interface ClaimRequest {
  animalName: string;
  specificCharacteristics: string;
  lastSeenInfo: string;
  proofPhotoUrl?: string;
  additionalInfo?: string;
}

export interface DonationResponse {
  id: string;
  petName: string;
  species: string;
  size: string;
  ageRange: string;
  photos: string[];
  dewormed: boolean;
  neutered: boolean;
  vaccinated: boolean;
  hasPreexistingCondition: boolean;
  conditionDetails?: string;
  observations?: string;
  temperament?: string;
  goodWithKids?: boolean;
  goodWithPets?: boolean;
  neighborhood?: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
  donorName: string;
  donorPhone?: string;
  donorEmail?: string;
  showPhone: boolean;
  memberSince?: string;
  status: string;
  publishedDate: string;
}

export interface PetResponse {
  id: string;
  name: string;
  species: string;
  breed?: string;
  color?: string;
  size?: string;
  sex?: string;
  age?: string;
  photoUrl?: string;
  isLost?: boolean;
  lostDate?: string;
  lastSeenLocation?: string;
}

export interface HealthCardResponse {
  birthDate?: string;
  isEstimatedDate: boolean;
  isCastrated: boolean;
  hasMicrochip: boolean;
  microchipCode?: string;
  address: string;
  vaccines: Vaccine[];
  conditions: Condition[];
}

export interface Vaccine {
  name: string;
  appliedDate?: string;
  nextDose?: string;
  notes?: string;
  proofUploaded?: boolean;
}

export interface Condition {
  name: string;
  inTreatment: boolean;
  medication?: string;
  startDate?: string;
}

export interface CaregiverResponse {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  location: string;
  distanceKm?: number;
  verified?: boolean;
  acceptsEmergency?: boolean;
  available?: boolean;
  experience?: string;
  petsAccepted?: string[];
  sizeAccepted?: string[];
  availability?: string;
  rules?: string;
  photos?: string[];
  reviews?: Array<{
    id: string;
    userName: string;
    date: string;
    rating: number;
    comment: string;
  }>;
}

export interface VetResponse {
  id: string;
  name: string;
  type: string;
  photo: string;
  rating: number;
  reviewCount: number;
  location: string;
  distanceKm?: number;
  specialties?: string[];
  emergency24h?: boolean;
  acceptsEmergency?: boolean;
  description?: string;
  phone?: string;
  showPhone?: boolean;
  hours?: string;
  photos?: string[];
  reviews?: Array<{
    id: string;
    userName: string;
    date: string;
    rating: number;
    comment: string;
  }>;
}

export interface PartnerResponse {
  id: string;
  name: string;
  category: string;
  logo: string;
  rating: number;
  reviewCount: number;
  location: string;
  distanceKm?: number;
  description?: string;
  phone?: string;
  showPhone?: boolean;
  hours?: string;
  delivery?: boolean;
  products?: Array<{
    id: string;
    name: string;
    category: string;
    price: string;
    availability?: string;
    image?: string;
  }>;
  reviews?: Array<{
    id: string;
    userName: string;
    date: string;
    rating: number;
    comment: string;
  }>;
}

export interface NotificationResponse {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  imageUrl?: string;
  priority?: "high" | "normal";
}

export interface CommunityMessageResponse {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  mentions?: string[];
  imageUrl?: string;
  isPinned?: boolean;
}

export interface WalletResponse {
  balance: number;
  totalEarned: number;
  totalRedeemed: number;
}

export interface WalletTransactionResponse {
  id: string;
  type: "EARN" | "REDEEM";
  description: string;
  amount: number;
  date: string;
  caseId?: string;
  partnerName?: string;
}

export interface CouponResponse {
  id: string;
  code: string;
  partnerName: string;
  discount: string;
  validUntil: string;
  status: string;
}
