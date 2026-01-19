# PetMatch 🐾

## Comunidade que conecta pets perdidos aos seus donos

PetMatch é um protótipo de aplicativo mobile desenvolvido para ajudar a reunir animais domésticos perdidos com seus tutores através de uma comunidade colaborativa.

---

## 🎨 Design System

### Paleta de Cores
- **Azul Primário** (`#2563EB`): Confiança e tecnologia
- **Verde Sucesso** (`#22C55E`): Segurança e encontros bem-sucedidos
- **Laranja Urgência** (`#F97316`): Casos urgentes que precisam de atenção
- **Fundo Claro** (`#F8FAFC`): Interface limpa e acessível
- **Texto Primário** (`#111827`): Alta legibilidade

### Tipografia
- **Títulos**: Sora / Poppins
- **Corpo de texto**: Inter

---

## 📱 Telas Implementadas

### 1. **Splash / Boas-vindas**
- Logo PetMatch com slogan
- Opções: Entrar, Criar conta, Continuar como visitante

### 2. **Cadastro de Usuário**
- Campos obrigatórios: Nome, Endereço, CPF, Profissão, Telefone, E-mail, Senha
- Validação de CPF
- Checkbox de termos e privacidade
- Estados de erro por campo

### 3. **Login**
- E-mail/telefone + senha
- Link "Esqueci minha senha"

### 4. **Home (Feed)**
- Busca inteligente
- Filtros por status: Perdido, Encontrado, Sob cuidado, Resolvido, Urgente
- Filtro por raio: 1km, 5km, 10km, 20km
- Cards de posts com foto, status, localização, distância e data
- FAB (Floating Action Button) para registrar novo animal

### 5. **Mapa**
- Visualização geográfica das ocorrências
- Pins coloridos por status
- Filtros por tipo de ocorrência
- Clique no pin para ver detalhes

### 6. **Registrar Ocorrência (Wizard 4 etapas)**

**Step 1: Foto**
- Upload de foto (câmera ou galeria)
- Dicas de como tirar foto ideal

**Step 2: Localização**
- Mapa interativo com pin ajustável
- Geolocalização automática
- Campo opcional para complemento do local

**Step 3: Informações**
- Tipo: Encontrei / Perdi
- Espécie: Cão, Gato, Outro
- Porte: Pequeno, Médio, Grande
- Cor predominante
- Características específicas
- Com coleira? Sim/Não
- Ferido? Sim/Não (com campo condicional)
- Contato: endereço e telefone

**Step 4: Revisão**
- Resumo completo
- Botões: Publicar / Salvar rascunho

### 7. **Detalhes do Post**
- Galeria de fotos
- Status em destaque
- Mini-mapa com localização aproximada
- Informações completas do animal
- Botões de ação:
  - Entrar em contato
  - "Eu sou o dono"
  - "Quero ajudar como cuidador"
  - Compartilhar
- **Timeline de Atualizações** (novo!)
- Dicas de segurança

### 8. **Fluxo "Eu sou o dono"**
- Formulário de verificação:
  - Nome do animal
  - Características únicas
  - Quando/onde viu por último
  - Upload de foto antiga (opcional)
  - Informações adicionais
- Tela de sucesso com próximos passos

### 9. **Compartilhamento**
- Preview do post
- Texto pré-formatado para compartilhar
- Botão "Copiar texto"
- Compartilhar em:
  - WhatsApp
  - Instagram (Story/Feed)
  - Facebook

### 10. **Notificações**
- Contador de notificações não lidas
- Tipos de notificações:
  - Possível match encontrado
  - Nova solicitação "Eu sou o dono"
  - Alguém quer ajudar como cuidador
  - Animal reunido com o dono
  - Atualizações de casos
- Botão "Marcar todas como lidas"

### 11. **Perfil**
- Informações do usuário:
  - Nome, Endereço, CPF, Profissão, Telefone, E-mail
- Estatísticas: Posts, Ajudou, Reunidos
- Meus Posts
- Animais Sob Meus Cuidados
- Botões: Editar Perfil, Sair

---

## 🧩 Componentes Reutilizáveis

### UI Components
- **Button**: 5 variantes (primary, secondary, danger, outline, ghost) e 3 tamanhos
- **StatusChip**: 5 status (perdido, encontrado, sob cuidado, resolvido, urgente)
- **Card**: Container base para conteúdo
- **Input**: Campo de entrada com ícone, label, erro e helper text
- **Textarea**: Campo de texto multi-linha

### Composite Components
- **PostCard**: Card completo de post (versões normal e compacta)
- **BottomNav**: Navegação inferior com 5 abas

---

## 🗂️ Estrutura de Navegação

```
├── Welcome Screen
│   ├── Login Screen → Home
│   ├── Signup Screen → Home
│   └── Home (visitante)
│
├── Home Screen
│   ├── Post Details
│   │   ├── Owner Claim → Success Screen
│   │   └── Share Screen
│   └── Register Animal → Home
│
├── Map Screen
│   └── Post Details (mesmo fluxo)
│
├── Notifications Screen
│
└── Profile Screen
```

### Bottom Navigation
- **Home**: Feed de posts
- **Mapa**: Visualização geográfica
- **Registrar**: Wizard de registro (FAB também disponível)
- **Notificações**: Central de notificações
- **Perfil**: Dados do usuário e posts

---

## 🎯 Funcionalidades Principais

### ✅ Implementadas
- Cadastro completo de usuário com validações
- Login com autenticação mock
- Feed com busca e filtros múltiplos
- Mapa interativo com pins coloridos
- Wizard completo de 4 etapas para registro de animal
- Visualização detalhada de posts
- Fluxo de verificação de proprietário
- Compartilhamento em redes sociais (WhatsApp, Instagram, Facebook)
- Sistema de notificações
- Perfil de usuário completo
- Timeline de atualizações em posts
- Design responsivo mobile-first

### 🔄 Mock Data
- Posts de exemplo com fotos reais (Unsplash)
- Notificações de exemplo
- Dados de perfil de exemplo

---

## 🚀 Tecnologias Utilizadas

- **React** 18.3.1 - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** 4.1.12 - Framework CSS
- **Lucide React** - Ícones modernos
- **Vite** - Build tool

---

## 📦 Como Executar

1. Instalar dependências:
```bash
npm install
```

2. Executar em modo desenvolvimento:
```bash
npm run dev
```

3. Build para produção:
```bash
npm run build
```

---

## 🎨 Design Principles

### Acessibilidade
- Contraste alto para legibilidade
- Botões grandes (mínimo 48px de altura)
- Validações claras com mensagens de erro
- Textos alternativos em imagens

### UX
- Navegação intuitiva
- Feedback visual imediato
- Confirmações em ações importantes
- Estados de loading e erro claros
- Wizard com progresso visível

### Mobile-First
- Design otimizado para telas pequenas
- Interações touch-friendly
- Container máximo de 448px (max-w-md)
- Scroll suave e natural

---

## 📝 Notas de Desenvolvimento

### Estado Atual
Este é um protótipo funcional com dados mock. Todas as telas principais estão implementadas e navegáveis. O design system está completo e consistente em todo o aplicativo.

### Próximos Passos (se fosse produção)
- [ ] Integração com backend real
- [ ] Autenticação JWT
- [ ] Upload real de imagens
- [ ] Integração com API de mapas (Google Maps/Mapbox)
- [ ] Push notifications
- [ ] Chat em tempo real
- [ ] Sistema de moderação
- [ ] Analytics e métricas

---

## 👥 Público-Alvo

- Tutores de animais domésticos
- Cuidadores voluntários
- Amantes de animais
- Protetores independentes
- ONGs de proteção animal

---

## 💡 Diferenciais

- **Comunidade colaborativa**: Conecta pessoas que querem ajudar
- **Geolocalização precisa**: Facilita encontrar animais próximos
- **Verificação de proprietário**: Sistema de validação para garantir segurança
- **Compartilhamento fácil**: Integração com redes sociais
- **Design emocional**: Interface que transmite cuidado e urgência

---

## 📄 Licença

Este é um projeto de demonstração/protótipo criado para fins educacionais.

---

**Desenvolvido com ❤️ para ajudar pets a voltarem para casa** 🐾
# App_front
