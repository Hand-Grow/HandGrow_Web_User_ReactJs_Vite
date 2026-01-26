# HandGrow Web

This is the frontend project for HandGrow, built with React + Vite.

## Project Structure

This project follows a scalable folder structure designed for maintainability.

```
src/
├── components/       # Reusable UI components
│   ├── common/       # Atomic components (Buttons, Inputs, etc.)
│   └── layout/       # Layout components (Header, Footer, Sidebar)
├── pages/            # Page-level components corresponding to routes
├── hooks/            # Custom React hooks
├── context/          # Global state management (Context API)
├── services/         # API calls and external service integrations
├── utils/            # Helper functions and utilities
├── constants/        # Configuration constants and environment variables
├── assets/           # Static assets (images, fonts, global styles)
├── styles/           # Global styles and themes
└── routes/           # Application routing configuration
```

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Official Vite Documentation

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
