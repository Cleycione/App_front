export const mockPartnersData = [
  {
    id: '1',
    name: 'Pet Shop Feliz',
    category: 'Pet Shop',
    logo: 'https://images.unsplash.com/photo-1626204451832-91eb35617cc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    rating: 4.7,
    reviewCount: 156,
    location: 'Perdizes',
    distance: '1.1 km',
    description: 'Pet shop completo com rações premium, acessórios, brinquedos e produtos de higiene. Entrega grátis acima de R$ 100.',
    phone: '(11) 98888-1234',
    showPhone: true,
    hours: 'Seg-Sex 9h-19h, Sáb 9h-17h',
    delivery: true,
    products: [
      {
        id: '1',
        name: 'Ração Premium Golden Fórmula Adulto 15kg',
        category: 'Ração',
        price: 'R$ 189,90',
        availability: 'Em estoque',
        image: 'https://images.unsplash.com/photo-1684882726821-2999db517441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
      },
      {
        id: '2',
        name: 'Cama Pet Macia Tamanho G',
        category: 'Acessórios',
        price: 'R$ 129,90',
        availability: 'Em estoque',
        image: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
      },
      {
        id: '3',
        name: 'Kit Shampoo + Condicionador',
        category: 'Higiene',
        price: 'R$ 45,90',
        availability: 'Em estoque',
        image: 'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
      }
    ],
    reviews: [
      {
        id: '1',
        userName: 'Camila T.',
        date: '2026-01-09',
        rating: 5,
        comment: 'Melhor pet shop da região! Produtos de qualidade e entrega rápida.'
      },
      {
        id: '2',
        userName: 'Pedro H.',
        date: '2026-01-02',
        rating: 5,
        comment: 'Atendimento excelente e preços justos. Super recomendo!'
      },
      {
        id: '3',
        userName: 'Ana Julia',
        date: '2025-12-20',
        rating: 4,
        comment: 'Bom atendimento, mas faltava alguns produtos que procurava.'
      }
    ]
  },
  {
    id: '2',
    name: 'Agropecuária São Jorge',
    category: 'Agropecuária',
    logo: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    rating: 4.8,
    reviewCount: 89,
    location: 'Vila Leopoldina',
    distance: '4.5 km',
    description: 'Agropecuária completa com rações, medicamentos veterinários e produtos para animais de grande porte.',
    phone: '(11) 3567-8901',
    showPhone: true,
    hours: 'Seg-Sáb 7h-18h',
    delivery: true,
    products: [
      {
        id: '1',
        name: 'Ração para Cães Adultos 25kg',
        category: 'Ração',
        price: 'R$ 149,90',
        availability: 'Em estoque',
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
      },
      {
        id: '2',
        name: 'Vermífugo para Cães e Gatos',
        category: 'Medicamentos',
        price: 'R$ 35,00',
        availability: 'Em estoque',
        image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
      }
    ],
    reviews: [
      {
        id: '1',
        userName: 'João Carlos',
        date: '2026-01-11',
        rating: 5,
        comment: 'Preços excelentes e atendimento muito bom. Compro sempre aqui!'
      },
      {
        id: '2',
        userName: 'Mariana V.',
        date: '2025-12-29',
        rating: 5,
        comment: 'Variedade incrível de produtos. Melhor custo-benefício!'
      }
    ]
  },
  {
    id: '3',
    name: 'Distribuidora PetMax',
    category: 'Distribuidor de Ração',
    logo: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    rating: 4.9,
    reviewCount: 312,
    location: 'Lapa',
    distance: '5.8 km',
    description: 'Distribuidora oficial de rações premium. Preços especiais para compras em quantidade. Entrega rápida.',
    phone: '(11) 3111-2222',
    showPhone: true,
    hours: 'Seg-Sex 8h-18h',
    delivery: true,
    products: [
      {
        id: '1',
        name: 'Royal Canin Maxi Adult 15kg',
        category: 'Ração Premium',
        price: 'R$ 279,90',
        availability: 'Em estoque',
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
      },
      {
        id: '2',
        name: 'Premier Nattu Cães Adultos 12kg',
        category: 'Ração Premium',
        price: 'R$ 189,90',
        availability: 'Em estoque',
        image: 'https://images.unsplash.com/photo-1684882726821-2999db517441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
      },
      {
        id: '3',
        name: 'N&D Grain Free Frango 10kg',
        category: 'Ração Super Premium',
        price: 'R$ 329,90',
        availability: 'Por encomenda',
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
      }
    ],
    reviews: [
      {
        id: '1',
        userName: 'Roberto F.',
        date: '2026-01-10',
        rating: 5,
        comment: 'Melhor preço que encontrei para ração premium. Entrega super rápida!'
      },
      {
        id: '2',
        userName: 'Sandra M.',
        date: '2026-01-04',
        rating: 5,
        comment: 'Sempre compro aqui. Produtos originais e atendimento impecável.'
      }
    ]
  },
  {
    id: '4',
    name: 'Banho & Tosa VIP',
    category: 'Outros',
    logo: 'https://images.unsplash.com/photo-1515474783153-5b7940b59056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
    rating: 4.6,
    reviewCount: 97,
    location: 'Butantã',
    distance: '3.4 km',
    description: 'Serviços especializados de banho e tosa para todas as raças. Produtos hipoalergênicos.',
    phone: '(11) 99999-8888',
    showPhone: true,
    hours: 'Ter-Sáb 9h-18h',
    delivery: false,
    products: [
      {
        id: '1',
        name: 'Pacote Banho Completo',
        category: 'Serviços',
        price: 'R$ 60,00',
        availability: 'Em estoque',
        image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
      },
      {
        id: '2',
        name: 'Tosa Higiênica',
        category: 'Serviços',
        price: 'R$ 40,00',
        availability: 'Em estoque',
        image: 'https://images.unsplash.com/photo-1628176544818-86660562d077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
      }
    ],
    reviews: [
      {
        id: '1',
        userName: 'Leticia S.',
        date: '2026-01-08',
        rating: 5,
        comment: 'Meu cachorro ficou lindo! Muito cuidado e carinho no atendimento.'
      },
      {
        id: '2',
        userName: 'Carlos E.',
        date: '2025-12-27',
        rating: 4,
        comment: 'Bom serviço, mas precisa agendar com antecedência.'
      }
    ]
  }
];
