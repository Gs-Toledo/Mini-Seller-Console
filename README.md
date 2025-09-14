# Mini Seller Console

A lightweight, front-end CRM console built with React, TypeScript, and Tailwind CSS. This application allows users to manage a list of leads, convert them into opportunities, and perform inline editing.

## Features

This project implements a full range of modern front-end features, demonstrating a robust and responsive user interface.

#### Core Functionality (MVP)

- **Leads Management**:
  - Load leads from a local JSON file, simulating an API call.
  - Search leads by name or company.
  - Filter leads by their status (`New`, `Contacted`, `Qualified`, etc.).
  - Sort any column in ascending or descending order.
  - Paginate the leads list with a configurable items-per-page limit.
- **Opportunities Management**:
  - Convert leads into opportunities.
  - View opportunities in a separate, paginated table.
  - **Inline Editing**: Edit the `stage` and `amount` of any opportunity directly in the table.
  - Remove opportunities with a confirmation dialog.
- **Detailed View Panel**:
  - Click on a lead to open a sleek slide-over panel with detailed information.
  - Inline editing for a lead's email and status with format validation.

#### Advanced Features & Best Practices

- **State Persistence**: The application remembers your session!
  - Active filters, sort preferences, pagination settings, and the current tab are all saved to `localStorage`.
  - The list of created opportunities is also persisted.
- **Optimistic UI Updates**: When editing a lead, the UI updates instantly for a fluid user experience. If the simulated API call fails, the change is reverted, and an error is shown.
- **Responsive Design**: The layout adapts smoothly from desktop to mobile devices. Data tables transform into a card-based list on smaller screens for better readability.
- **Robust UX States**: Clear loading, empty, and error states are handled gracefully.

## Tech Stack

- **React**: For building the user interface.
- **Vite**: As the fast and modern build tool.
- **TypeScript**: For static typing and improved code quality.
- **Tailwind CSS**: For a utility-first styling approach and rapid development.
- **React Context API + `useReducer`**: For predictable and centralized state management.

## Project Architecture

The project is structured with a strong emphasis on modularity and separation of concerns.

#### Key Architectural Concepts

- **Centralized State Management**: The `AppContext` and `appReducer` provide a single source of truth for the application's data, making state transitions predictable and easy to debug.
- **Custom Hooks for Logic Abstraction**:
  - `usePersistedReducer`: A powerful custom hook that combines the `useReducer` pattern with `localStorage` persistence. This keeps components clean and declaratively syncs state with storage.
  - `useProcessedData`: A hook that encapsulates all complex data manipulations (filtering, sorting, paginating), removing this heavy logic from the main `App` component.
- **Component Modularity**: The UI is broken down into small, reusable components (`common/`), feature-specific components (`leads/`, `opportunities/`), and high-level "view" components (`views/`). The main `App.tsx` acts as an orchestrator, keeping it clean and readable.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/mini-seller-console.git](https://github.com/your-username/mini-seller-console.git)
    cd mini-seller-console
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).
