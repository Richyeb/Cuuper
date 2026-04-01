# Cuupers - Cooperative Regulatory Platform

This project is a React-based application built with Vite, Firebase, and the Google Gemini API.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js**: Version 18 or higher.
- **npm**: Usually comes with Node.js.

## Getting Started

Follow these steps to run the application locally:

### 1. Clone the Repository

```bash
# Clone the repository (if applicable)
# git clone <repository-url>
# cd cuupers
```

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 3. Environment Variables Setup

The application requires a Gemini API key to function correctly.

1.  Create a `.env` file in the root directory:
    ```bash
    touch .env
    ```
2.  Add your Gemini API key to the `.env` file:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```
    *Note: You can obtain a Gemini API key from the [Google AI Studio](https://aistudio.google.com/).*

### 4. Firebase Configuration

The application uses Firebase for its backend. The configuration is stored in `firebase-applet-config.json`. Ensure this file exists in the root directory. If you are setting up your own Firebase project, update this file with your project's credentials.

*Note: The application uses `HashRouter` for routing, which means URLs will have a `#` (e.g., `http://localhost:3000/#/login`).*

### 5. Super Admin Access

The application automatically assigns the `SUPER_ADMIN` role to the user with the email `richyebrizy@gmail.com` upon their first login. Other users are assigned the `AREA_OFFICER` role by default.

### 6. Run the Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist` directory. You can preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `src/`: Source code for the React application.
- `App.tsx`: Main application component.
- `firebase.ts`: Firebase initialization and configuration.
- `firestore.rules`: Security rules for Firestore.
- `vite.config.ts`: Vite configuration.

## Technologies Used

- **React**: UI library.
- **Vite**: Build tool and development server.
- **Firebase**: Authentication and Firestore database.
- **Google Gemini API**: Generative AI capabilities.
- **Tailwind CSS**: Styling.
- **Lucide React**: Icon library.
- **Recharts**: Data visualization.
