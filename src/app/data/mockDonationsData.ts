export interface Donation {
  id: string;
  petName: string;
  species: 'Cachorro' | 'Gato' | 'Outro';
  size: 'Pequeno' | 'Médio' | 'Grande';
  ageRange: 'Filhote' | 'Adulto' | 'Idoso';
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
  status: 'active' | 'paused' | 'completed';
  publishedDate: string;
  temperament?: string;
  goodWithKids?: boolean;
  goodWithPets?: boolean;
}

export const mockDonations: Donation[] = [
  {
    id: '1',
    petName: 'Mel',
    species: 'Cachorro',
    size: 'Pequeno',
    ageRange: 'Filhote',
    photos: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600',
    ],
    health: {
      dewormed: true,
      neutered: false,
      vaccinated: true,
      hasPreexistingCondition: false,
    },
    observations: 'Cachorrinha muito dócil e brincalhona. Adora crianças e se dá bem com outros pets.',
    location: {
      neighborhood: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'SP',
      distance: '0.8 km',
    },
    donor: {
      id: '1',
      name: 'Ana Paula',
      phone: '(11) 98765-4321',
      showPhone: true,
      memberSince: '2024',
    },
    status: 'active',
    publishedDate: '2026-01-12',
    temperament: 'Dócil e brincalhona',
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: '2',
    petName: 'Thor',
    species: 'Cachorro',
    size: 'Grande',
    ageRange: 'Adulto',
    photos: [
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600',
      'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600',
    ],
    health: {
      dewormed: true,
      neutered: true,
      vaccinated: true,
      hasPreexistingCondition: false,
    },
    observations: 'Cachorro muito obediente e protetor. Precisa de espaço para correr.',
    location: {
      neighborhood: 'Pinheiros',
      city: 'São Paulo',
      state: 'SP',
      distance: '2.3 km',
    },
    donor: {
      id: '2',
      name: 'Carlos Silva',
      phone: '(11) 99999-8888',
      showPhone: false,
      memberSince: '2023',
    },
    status: 'active',
    publishedDate: '2026-01-11',
    temperament: 'Calmo e protetor',
    goodWithKids: true,
    goodWithPets: false,
  },
  {
    id: '3',
    petName: 'Luna',
    species: 'Gato',
    size: 'Pequeno',
    ageRange: 'Adulto',
    photos: [
      'https://images.unsplash.com/photo-1573865526739-10c1dd7aa5d0?w=600',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
    ],
    health: {
      dewormed: true,
      neutered: true,
      vaccinated: true,
      hasPreexistingCondition: false,
    },
    observations: 'Gatinha independente mas carinhosa. Ideal para apartamento.',
    location: {
      neighborhood: 'Vila Madalena',
      city: 'São Paulo',
      state: 'SP',
      distance: '3.5 km',
    },
    donor: {
      id: '3',
      name: 'Beatriz Costa',
      phone: '(11) 97777-6666',
      showPhone: true,
      memberSince: '2024',
    },
    status: 'active',
    publishedDate: '2026-01-10',
    temperament: 'Independente e carinhosa',
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: '4',
    petName: 'Bolt',
    species: 'Cachorro',
    size: 'Médio',
    ageRange: 'Filhote',
    photos: [
      'https://images.unsplash.com/photo-1600369671738-82dc8dc5f7c1?w=600',
    ],
    health: {
      dewormed: true,
      neutered: false,
      vaccinated: true,
      hasPreexistingCondition: false,
    },
    observations: 'Filhote muito energético. Precisa de tutor com tempo para treinar e brincar.',
    location: {
      neighborhood: 'Butantã',
      city: 'São Paulo',
      state: 'SP',
      distance: '4.7 km',
    },
    donor: {
      id: '4',
      name: 'Roberto Fernandes',
      showPhone: false,
      memberSince: '2025',
    },
    status: 'active',
    publishedDate: '2026-01-09',
    temperament: 'Energético e curioso',
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: '5',
    petName: 'Mia',
    species: 'Gato',
    size: 'Pequeno',
    ageRange: 'Idoso',
    photos: [
      'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=600',
    ],
    health: {
      dewormed: true,
      neutered: true,
      vaccinated: true,
      hasPreexistingCondition: true,
      conditionDetails: 'Tem insuficiência renal crônica, precisa de ração específica',
    },
    observations: 'Gatinha idosa muito tranquila. Precisa de cuidados especiais com alimentação.',
    location: {
      neighborhood: 'Perdizes',
      city: 'São Paulo',
      state: 'SP',
      distance: '1.2 km',
    },
    donor: {
      id: '5',
      name: 'Mariana Lima',
      phone: '(11) 96666-5555',
      showPhone: true,
      memberSince: '2024',
    },
    status: 'active',
    publishedDate: '2026-01-08',
    temperament: 'Tranquila e carinhosa',
    goodWithKids: true,
    goodWithPets: true,
  },
];
