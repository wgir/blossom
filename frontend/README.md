# Blossom - Character Management App

Blossom is a modern web application built with React and GraphQL that allows users to discover, manage, and interact with characters from the Rick and Morty universe. 

## ✨ Features

- **Character Explorer**: Browse a rich grid of characters with real-time alphabetical sorting.
- **Advanced Filtering**: Filter characters by Name, Status (Alive, Dead, Unknown), and Species (Human, Alien).
- **Detailed Profiles**: View comprehensive information about each character, including origin and current location.
- **Favorites System**: Save your favorite characters to a dedicated list (persists in local storage).
- **Comments**: Add and view comments for specific characters.
- **Soft Delete**: Hide characters you no longer wish to see without affecting the backend data.
- **Premium Design**: Dark mode interface with glassmorphism effects and smooth micro-animations.

## 🚀 How to Run

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd blossom/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure the backend server is running (usually at `http://localhost:3000/graphql`).

### Running Locally
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 🧪 Running Tests

The project uses **Vitest** and **React Testing Library** for unit and component testing.

### Run All Tests
To execute the full test suite once:
```bash
npm test
```

### Run Tests in Watch Mode
To run tests and re-run them on file changes:
```bash
npx vitest
```

### Test Coverage
The suite covers:
- **Component Rendering**: Ensuring UI elements display correctly.
- **State Logic**: Verifying favorites, filtering, and sorting functionality.
- **Apollo Mocks**: Testing data loading and error states without external API calls.

---

Built with React 18, Vite, Apollo Client, Tailwind CSS, and Lucide Icons.
