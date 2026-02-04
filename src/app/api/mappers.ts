import type {
  PostResponse,
  DonationResponse,
  CaregiverResponse,
  VetResponse,
  PartnerResponse,
  NotificationResponse,
  CommunityMessageResponse,
  WalletTransactionResponse,
} from "./types";

export function mapPostStatus(status?: string) {
  const normalized = (status ?? "").toLowerCase();
  switch (normalized) {
    case "lost":
      return "lost";
    case "found":
      return "found";
    case "care":
      return "care";
    case "resolved":
      return "resolved";
    case "urgent":
      return "urgent";
    default:
      return "lost";
  }
}

export function toUiPost(post: PostResponse) {
  const locationParts = [post.neighborhood, post.city, post.state].filter(Boolean);
  return {
    id: post.id,
    imageUrl: post.photos?.[0] ?? "",
    status: mapPostStatus(post.status),
    location: locationParts.join(", ") || "Local não informado",
    distance: post.distanceKm ? `${post.distanceKm.toFixed(1)} km` : "—",
    distanceKm: post.distanceKm,
    date: post.occurredAt ? new Date(post.occurredAt).toLocaleString("pt-BR") : "—",
    animal: {
      species: post.species ?? "Animal",
      size: post.size ?? "—",
      color: post.color ?? "—",
    },
    urgent: mapPostStatus(post.status) === "urgent",
    raw: post,
  };
}

export function toUiDonation(donation: DonationResponse) {
  return {
    id: donation.id,
    petName: donation.petName,
    species: donation.species,
    size: donation.size,
    ageRange: donation.ageRange,
    photos: donation.photos ?? [],
    health: {
      dewormed: donation.dewormed,
      neutered: donation.neutered,
      vaccinated: donation.vaccinated,
      hasPreexistingCondition: donation.hasPreexistingCondition,
      conditionDetails: donation.conditionDetails,
    },
    observations: donation.observations ?? "",
    location: {
      neighborhood: donation.neighborhood ?? "",
      city: donation.city ?? "",
      state: donation.state ?? "",
      distance: donation.distanceKm ? `${donation.distanceKm.toFixed(1)} km` : "",
      coordinates:
        donation.latitude && donation.longitude
          ? { lat: donation.latitude, lng: donation.longitude }
          : undefined,
    },
    donor: {
      id: "",
      name: donation.donorName,
      phone: donation.donorPhone,
      email: donation.donorEmail,
      showPhone: donation.showPhone,
      memberSince: donation.memberSince ?? "",
    },
    status: donation.status?.toLowerCase(),
    publishedDate: donation.publishedDate,
    temperament: donation.temperament,
    goodWithKids: donation.goodWithKids,
    goodWithPets: donation.goodWithPets,
    raw: donation,
  };
}

export function toUiCaregiver(caregiver: CaregiverResponse) {
  return {
    id: caregiver.id,
    name: caregiver.name,
    photo: caregiver.photo,
    rating: caregiver.rating,
    reviewCount: caregiver.reviewCount,
    location: caregiver.location,
    distance: caregiver.distanceKm ? `${caregiver.distanceKm.toFixed(1)} km` : "—",
    verified: caregiver.verified,
    acceptsEmergency: caregiver.acceptsEmergency,
    available: caregiver.available,
    experience: caregiver.experience,
    petsAccepted: caregiver.petsAccepted,
    sizeAccepted: caregiver.sizeAccepted,
    availability: caregiver.availability,
    rules: caregiver.rules,
    photos: caregiver.photos,
    reviews: caregiver.reviews,
  };
}

export function toUiVet(vet: VetResponse) {
  return {
    ...vet,
    distance: vet.distanceKm ? `${vet.distanceKm.toFixed(1)} km` : "—",
  };
}

export function toUiPartner(partner: PartnerResponse) {
  return {
    ...partner,
    distance: partner.distanceKm ? `${partner.distanceKm.toFixed(1)} km` : "—",
  };
}

export function toUiNotification(notification: NotificationResponse) {
  return notification;
}

export function toUiMessage(message: CommunityMessageResponse) {
  return message;
}

export function toUiTransaction(transaction: WalletTransactionResponse) {
  return {
    ...transaction,
    type: transaction.type.toLowerCase() as "earn" | "redeem",
  };
}
