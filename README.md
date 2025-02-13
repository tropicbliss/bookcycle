# BookCycle

BookCycle is a web application that facilitates peer-to-peer book exchanges,
allowing users to trade books from their personal libraries with other members
of the community.

## Features

- **User Authentication**: Secure password-based authentication system
- **Book Inventory Management**: Add and manage your personal book collection
- **Book Exchange System**: Direct book-for-book trading mechanism
- **Browse Available Books**: View all books available for trade in the
  community

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tropicbliss/bookcycle.git
cd bookcycle
```

2. Install dependencies:

```bash
npm install
```

3. Generate necessary files:

```bash
npm run generate
```

4. Apply database migrations:

```bash
npx wrangler d1 migrations apply book-exchange --remote
```

5. Start the development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:3000`

## Technical Architecture

- **Frontend**: React-based user interface
- **Backend**: Node.js server
- **Database**: D1 (Cloudflare's SQL database)
- **Authentication**: Custom password-based authentication system

## Design Decisions

1. **Direct Trading System**: Initially implemented as an immediate trade system
   for simplicity. Future versions will include a confirmation dialog to prevent
   unintended trades.

2. **Simple Authentication**: Chosen password-based authentication for initial
   implementation to reduce complexity. Could be enhanced with OAuth or other
   modern auth methods in future iterations.

3. **Database Choice**: Selected D1 for its SQL capabilities and seamless
   integration with Cloudflare's infrastructure.

## Roadmap

### Phase 1 - Core Features Enhancement (Current)

- [ ] Add trade confirmation dialog
- [ ] Implement basic search functionality
- [ ] Add book sorting options
- [ ] Implement pagination for book lists

### Phase 2 - User Experience Improvements

- [ ] Advanced search with filters
- [ ] User ratings and reviews system
- [ ] Book condition tracking
- [ ] Trade history

### Phase 3 - Social Features

- [ ] User profiles
- [ ] Community discussions
- [ ] Book clubs
- [ ] Reading lists
- [ ] Direct messaging between users

### Phase 4 - Platform Growth

- [ ] Mobile application
- [ ] API for third-party integrations
- [ ] Book recommendations engine
- [ ] Integration with book databases (e.g., Google Books API)

## Known Limitations

- Limited testing coverage
- No confirmation required for trades
- Basic authentication system
- No pagination for large book lists
- Limited search capabilities
