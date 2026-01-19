export const mockVetsData = [
  {
    id: '1',
    name: 'Dra. Fernanda Oliveira',
    type: 'Veterinário',
    photo: 'https://images.unsplash.com/photo-1733783489145-f3d3ee7a9ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    rating: 4.8,
    reviewCount: 87,
    location: 'Vila Mariana',
    distance: '800m',
    specialties: ['Clínica geral', 'Dermatologia', 'Vacinas'],
    emergency24h: false,
    acceptsEmergency: true,
    description: 'Veterinária com 8 anos de experiência. Especialista em dermatologia veterinária e atendimento domiciliar.',
    phone: '(11) 98765-4321',
    showPhone: true,
    hours: 'Seg-Sex 8h-18h, Sáb 9h-14h',
    reviews: [
      {
        id: '1',
        userName: 'Paula R.',
        date: '2026-01-08',
        rating: 5,
        comment: 'Excelente profissional! Diagnosticou e tratou a alergia do meu cachorro com muito cuidado.'
      },
      {
        id: '2',
        userName: 'Ricardo S.',
        date: '2025-12-20',
        rating: 5,
        comment: 'Muito atenciosa e explica tudo detalhadamente. Super recomendo!'
      },
      {
        id: '3',
        userName: 'Juliana M.',
        date: '2025-12-10',
        rating: 4,
        comment: 'Ótima veterinária, preço justo e atendimento rápido.'
      }
    ]
  },
  {
    id: '2',
    name: 'Clínica VetLife',
    type: 'Clínica',
    photo: 'https://images.unsplash.com/photo-1758653500348-5944e186ab1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    rating: 4.9,
    reviewCount: 234,
    location: 'Pinheiros',
    distance: '1.5 km',
    specialties: ['Emergências', 'Cirurgia', 'Internação', 'Exames'],
    emergency24h: true,
    acceptsEmergency: true,
    description: 'Clínica veterinária completa com atendimento 24h. Equipamentos modernos e equipe especializada.',
    phone: '(11) 3456-7890',
    showPhone: true,
    hours: 'Aberto 24 horas',
    photos: [
      'https://images.unsplash.com/photo-1758653500348-5944e186ab1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      'https://images.unsplash.com/photo-1628176544818-86660562d077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      'https://images.unsplash.com/photo-1530041539828-114de669390e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    ],
    reviews: [
      {
        id: '1',
        userName: 'Marina L.',
        date: '2026-01-10',
        rating: 5,
        comment: 'Salvaram a vida do meu gato! Atendimento de emergência impecável e muito humanizado.'
      },
      {
        id: '2',
        userName: 'Carlos A.',
        date: '2026-01-05',
        rating: 5,
        comment: 'Melhor clínica da região. Estrutura completa e profissionais muito competentes.'
      },
      {
        id: '3',
        userName: 'Beatriz F.',
        date: '2025-12-28',
        rating: 4,
        comment: 'Ótimo atendimento, preços um pouco altos mas vale a pena pela qualidade.'
      }
    ]
  },
  {
    id: '3',
    name: 'Dr. Marcelo Santos',
    type: 'Veterinário',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    rating: 4.7,
    reviewCount: 52,
    location: 'Moema',
    distance: '2.1 km',
    specialties: ['Ortopedia', 'Fisioterapia', 'Reabilitação'],
    emergency24h: false,
    acceptsEmergency: false,
    description: 'Especialista em ortopedia e reabilitação animal. Atendimento com hora marcada.',
    phone: '(11) 97654-3210',
    showPhone: true,
    hours: 'Seg-Sex 9h-19h',
    reviews: [
      {
        id: '1',
        userName: 'Andreia B.',
        date: '2026-01-07',
        rating: 5,
        comment: 'Excelente profissional! Meu cachorro se recuperou totalmente de uma cirurgia complexa.'
      },
      {
        id: '2',
        userName: 'Felipe M.',
        date: '2025-12-22',
        rating: 4,
        comment: 'Muito competente, mas agenda sempre cheia. Vale a pena esperar!'
      }
    ]
  },
  {
    id: '4',
    name: 'Clínica Animais & Cia',
    type: 'Clínica',
    photo: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    rating: 4.6,
    reviewCount: 128,
    location: 'Itaim Bibi',
    distance: '3.2 km',
    specialties: ['Clínica geral', 'Vacinas', 'Banho e tosa'],
    emergency24h: false,
    acceptsEmergency: false,
    description: 'Clínica veterinária familiar com serviços de banho e tosa. Preços acessíveis.',
    phone: '(11) 3234-5678',
    showPhone: true,
    hours: 'Seg-Sáb 8h-20h',
    reviews: [
      {
        id: '1',
        userName: 'Luciana P.',
        date: '2026-01-06',
        rating: 5,
        comment: 'Ótimo custo-benefício! Equipe muito carinhosa com os animais.'
      },
      {
        id: '2',
        userName: 'Roberto C.',
        date: '2025-12-30',
        rating: 4,
        comment: 'Bom atendimento, mas às vezes a espera é longa.'
      }
    ]
  }
];
