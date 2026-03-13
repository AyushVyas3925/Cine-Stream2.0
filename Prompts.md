# Next.js 15 Architecture & Development Prompts

This document outlines the architectural objectives and core LLM Prompts used to design the **Cine-Stream Next.js Movie Explorer**. It focuses exclusively on Server-Side Rendering (SSR), Next.js App Router mechanics, and performance.

---

## 🏗️ Phase 1: Next.js Initialization & Server Components

**Goal**: Establish a strict Next.js 15 working environment, replacing outdated CSR frameworks, and mastering the new file-based routing architecture.

### 1. The App Router Migration
> "I am building a completely new Next.js 15 project focusing on SEO and Server Components. How do I setup the new `app` directory structure to handle a Home page (`/`), a dedicated Favorites route (`/favorites`), and a dynamic details route mapping to specific movies (`/movie/[id]`) using the `next/navigation` hooks properly?"

### 2. SSR Data Fetching over Axios
> "A core requirement of this project is to drop third-party fetching libraries like Axios. How do I use the browser's native `fetch()` API directly inside a Next.js Server Component like `page.js` to securely process my `NEXT_PUBLIC_TMDB_API_KEY` from my `.env.local` file before any JavaScript reaches the browser?"

### 3. Tailwind v4 & Next/Image Optimization
> "I need perfectly scaled, lazy-loaded posters that prevent Cumulative Layout Shifts (CLS). How do I configure my `next.config.mjs` to globally whitelist the `image.tmdb.org` hostname, and implement the native Next `<Image />` component with dynamic `fill` attributes and `sizes` rules inside my MovieCards?"

---

## 🛡️ Phase 2: Interactivity & Client boundaries

**Goal**: Identify exactly which components require browser-APIs and isolate them efficiently to preserve the overarching SEO benefits of the server.

### 4. Search & Client State Hooks
> "The user needs to be able to type in a Navbar search field and infinitely scroll through movie lists. Since these interactions require `useState`, `onChange` handlers, and `IntersectionObserver` Web APIs, how do I strategically use the `"use client"` directive at the top of my `MovieList.jsx` and `Navbar.jsx` components without breaking the SSR flow of their parent layouts?"

### 5. Hydration-Safe Context & LocalStorage
> "I am building a global `FavoritesContext` that reads saved movies from the browser's `localStorage` on initial load. Since `localStorage` does not exist on the Next.js Node server during pre-rendering, doing this naively throws a 'Hydration Mismatch' error. How do I construct a custom `isMounted` state wrapper with `useEffect` to safely defer access to local storage until the Context has securely reached the client?"

---

## 🚀 Phase 3: Advanced SEO & AI Features

**Goal**: Cement the project as an enterprise-grade web application by exploiting native Next.js Metadata pipelines and integrating Google Gemini logic.

### 6. Dynamic Page Metadata
> "To reach a perfect 100 SEO score on my Lighthouse audit, search engines need to read the specific title and plot of a movie instantly. Inside my `app/movie/[id]/page.js` route, how do I export an async `generateMetadata({ params })` function that pauses the server, queries TMDB for the exact movie ID, and dynamically constructs the HTML `<title>` and `<meta name="description">` blocks based on the JSON response?"

### 7. Gemini AI 'Mood Matcher' Architecture
> "I want users to search TMDB organically using their emotions (`I want a romantic space movie`). How do I integrate the `@google/generative-ai` SDK so that a user's raw string is parsed by the `gemini-1.5-flash` model, mathematically constrained to return *only* one movie title without quotes or dialogue, which I can instantly feed back into my Client Component's debounced search pipeline?"

### 8. Lighthouse Accessibility Audits & Aria Setup
> "My production Next.js build is warning me about low HTML contrast ratios and missing accessible labels on icon-buttons. How do I cleanly integrate `<span className="sr-only">` screen-reader text natively in React, format dark mode text to `text-zinc-300` for strict WCAG AA contrast compliance, and provide a static `public/robots.txt` file the crawler network expects?"
