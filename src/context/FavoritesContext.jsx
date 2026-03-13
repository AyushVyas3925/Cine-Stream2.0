"use client";
import { useState, createContext, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error("Failed to parse favorites", error);
            }
        }
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites, isMounted]);

    const toggleFavorite = (movie) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some((fav) => fav.id === movie.id);
            if (isFavorite) {
                return prevFavorites.filter((fav) => fav.id !== movie.id);
            } else {
                return [...prevFavorites, movie];
            }
        });
    };

    const isFavorite = (movieId) => {
        return favorites.some((fav) => fav.id === movieId);
    };

    if (!isMounted) {
        // Prevent hydration mismatch by returning a provider with empty data 
        // until the component is mounted on the client
        return (
            <FavoritesContext.Provider value={{ favorites: [], toggleFavorite: () => {}, isFavorite: () => false }}>
                {children}
            </FavoritesContext.Provider>
        );
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
