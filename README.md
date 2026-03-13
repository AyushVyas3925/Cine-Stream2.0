# Cine-Stream - AI-Powered Movie Explorer (Next.js 15 Edition)

A sleek, optimized, and dynamic movie discovery application built entirely on **Next.js 15** and the **App Router**. It features an infinite-scrolling catalog of popular movies, persistent favorites functionality, Server-Side Rendering (SSR) for maximum SEO, and a Google Gemini AI Mood Matcher for personalized recommendations.

---

## 📑 Table of Contents
- [Demo](#-demo)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Usage](#-usage)
- [How It Works](#-how-it-works)
- [Responsive Design](#-responsive-design)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

---

## 🚀 Demo
*(You can add your Vercel Live Demo Link here once deployed)*

---

## ✨ Features

- ⚡ **Next.js 15 Server Components**: Popular movies and dynamic route details are fetched securely on the server-side before reaching the browser. This eliminates client-side loading spinners and maximizes SEO indexing.
- 🎯 **Advanced SEO & Metadata**: Dynamic OpenGraph tags, Titles, and Meta Descriptions are automatically generated on a per-movie basis using Next.js's native `generateMetadata` API.
- 🤖 **AI Mood Matcher**: Can't decide what to watch? Type a mood like *"I want a funny movie"* or *"Sci-fi love story"* and Google Gemini AI will intelligently recommend an exact movie title and search the TMDB database natively.
- 🖼️ **Native Image Optimization**: All movie posters use the Next.js `<Image>` component, which automatically compresses `.webp` assets, prevents layout shifts (CLS), and caches media at the Edge.
- 🎥 **Infinite Scroll Optimization**: Seamlessly load thousands of movies dynamically as you scroll without crashing the browser using modern `IntersectionObserver` Client hooks.
- ❤️ **Persistent Favorites**: Save your favorite movies locally. Your list automatically persists across page reloads using strict `useEffect` hydration strategies securely married to browser `localStorage`.
- 🎨 **Premium UI**: Modern dark-themed, glassmorphism-inspired components with hover animations built cleanly natively with Tailwind CSS v4.

---

## 🛠 Technologies Used

-   **Next.js 15 (App Router)**: Core SSR framework and routing architecture.
-   **React 19**: Server and Client component orchestration.
-   **Tailwind CSS (v4)**: For rapid utility-first styling, gradients, and glassmorphic effects.
-   **Native Fetch API**: For strongly-typed, cached server requests (replacing legacy Axios).
-   **Lucide React**: For sleek, scalable SVG icons (Search, Film, Hearts).
-   **TMDB API**: Serving as the primary movie and poster database.
-   **Google Generative AI (Gemini)**: Powering the intelligent Mood Matcher functionality.

---

## 🚀 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/YourUsername/cine-stream-next.git
    cd week9(antigravity)
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add your API Keys:
    ```env
    NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
    NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
    NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/w500
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    *   The app will launch at `http://localhost:3000`.

5.  **Build for Production**:
    ```bash
    npm run build
    npm run start
    ```

---

## 📖 Usage

1.  **Browse the Catalog**: Scroll down the main page to trigger the Infinite Scroll and uncover hundreds of popular movies.
2.  **Search Specifics**: Use the main search bar to find an exact movie. Enjoy the debounced delay that prevents aggressive reloading!
3.  **Find a Mood**: Click the gold interactive input field on the top right. Type a mood or emotion, wait 1 second, and let the AI find the perfect movie for you.
4.  **Save for Later**: Click the heart icon on any movie poster to add it to your Favorites. Click the 'Favorites' navigation link to view your saved list anytime.

---

## 🧠 How It Works

1.  **Server vs Client Architecture**: We strictly isolate interactivity to `"use client"` boundaries (Search algorithms, local state, browser observers) while keeping heavy UI lifting on the Server (Routing, API Fetching, HTML Construction).
2.  **Lighthouse Perfect SEO**: By migrating to Next.js App Router, configuring `robots.txt`, and resolving deep accessibility `aria-label` issues, the project scores 100/100 on standard SEO and Access audits.
3.  **Hydration-safe Context**: A single `FavoritesContext.jsx` file safely reads `localStorage` items via custom `isMounted` state delays to avoid React Server hydration mismatches, broadcasting arrays dynamically across boundaries.
4.  **AI Proxy Integration**: User input is sent directly to `getMovieByMoodUsingGemini` via Native Fetch. The response is cleaned and piped straight into the TMDB search query parameters.

---

## 📱 Responsive Design

-   **Mobile Layout**: The interface collapses into a 2-column infinite grid, prioritizing touch-friendly sizes for poster cards and favorites buttons.
-   **Desktop Layout**: Expands beautifully into a fluid 5-column grid taking advantage of large widescreen monitors.
-   **Adaptive Navbar**: Flexbox constraints keep the brand logo, search, AI prompter, and navigation elements cleanly aligned regardless of screen width.

---

## 👏 Acknowledgments

-   **The Movie Database (TMDB)**: For providing an exceptional, free movie data API.
-   **Google AI Studio**: For empowering developers with the Gemini Flash models.
-   **Lucide React**: For beautiful open-source iconography.
-   **Vercel / Next.js**: For enabling robust Server-Side computational paradigms.
-   **Prodesk IT Team**: For establishing the advanced SEO Next.js migration requirements for this challenge.

---

## 📬 Contact

**Ayush Vyas**

-   📧 Email: s.ayushvyas3925@gmail.com
-   🔗 LinkedIn: [Ayush Vyas](https://www.linkedin.com/in/ayush-vyas-287980286/)

---
*Developed for the Week 9 Next.js 15 Optimization Project.*
