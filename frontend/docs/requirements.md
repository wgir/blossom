# Frontend Requirements

## 1. Technology Stack
- **React 18** for building the UI
- **TypeScript** for project development
- **GraphQL** for data fetching
- **React Router DOM** for client-side routing
- **TailwindCSS** for styling
- **CSS Flexbox** and **CSS Grid** for layout and responsiveness

---

## 2. Application Features

### 2.1 Character Listing
- Side bar with the following options:
  - Characters
  - Favorites
  - Comments
  - Search & Filtering
    - Text box with placeholder "Search or filter results" and button "Search"
    - At click of button "Search" show a dialog window under the text box with the following options:
      - Subsection "Character" with buttons:
        - Button with text "All"
        - Button with text "Starred"
        - Button with text "Others"
      - Subsection "Specie" with buttons:
        - Button with text "All"
        - Button with text "Human"
        - Button with text "Alien"
  - Soft Delete
- Fetch characters from the GraphQL API.
- Display characters in a **card-based layout**.
- Each card must show:
  - Character image
  - Character name
  - Specie
  - button of earth to add to favorites

---

### 2.2 Sorting
- Implement sorting of characters by **name**:
  - A–Z
  - Z–A
- Sorting must be applied on the client side.

---

### 2.3 Character Details
- When clicking on a character card, navigate to a **character detail page**.
- The detail view must display:
  - Character image
  - Name
  - Specie
  - Status
- Provide an option to:
  - Mark / unmark the character as **favorite**

---

### 2.4 Favorites
- Users must be able to mark characters as favorites.
- Favorite state may be stored:
  - Via the backend
- Favorite characters should be visually distinguishable.

---

### 2.5 Comments
- Allow users to add **comments** to a character.
- Comments must be associated with a specific character.
- Comment persistence may be handled locally or via API integration.

---

### 2.6 Search & Filtering
- Implement character search and filtering by:
  - Status
  - Specie
  - 
- Filters must be combinable.
- Filtering should update the character list dynamically.

---

### 2.7 Soft Delete
- Implement **soft-delete** for characters.
- Soft-deleted characters must:
  - Not appear in the default character list
  - Be recoverable (if re-enabled)
- Soft-delete can be implemented using:
  - A local flag, or
  - Backend support (preferred if available)

---

## 3. Layout & Responsiveness
- The application must be fully **responsive**.
- Use:
  - **CSS Flexbox** for component-level layouts
  - **CSS Grid** for page-level layouts
- Ensure proper behavior on:
  - Mobile
  - Tablet
  - Desktop
- Use a mobile-first approach.
- Use a responsive design approach.
- Must exists a toggle button to switch between side bar and main content, when only show side bar and select a character, show the     character detail page. When screen show main content show button to show side bar.

---

## 4. Testing
- Implement **unit tests** for at least **3 components or layouts**, such as:
  - Character Card
  - Character List
  - Character Detail Page
  - Filters or Sorting components
- Use a testing library such as:
  - Jest
  - React Testing Library

---

## 5. Code Quality & Structure
- Use functional components and React Hooks.
- Follow best practices for:
  - State management
  - Component composition
  - Separation of concerns
- Ensure the codebase is readable, maintainable, and well-organized.

---

## 6. Optional Enhancements
- Pagination or infinite scroll
- Loading and error states
- Dark mode support
- Accessibility improvements (ARIA roles, keyboard navigation)
