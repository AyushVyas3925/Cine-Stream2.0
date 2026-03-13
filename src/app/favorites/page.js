"use client";

import { useContext } from 'react';
import { FavoritesContext } from '@/context/FavoritesContext';
import MovieCard from '@/components/MovieCard';
import { HeartCrack } from 'lucide-react';

export default function Favorites() {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="w-full animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-rose-600">
                    My Favorites
                </h1>
                <p className="text-zinc-400 mt-2">
                    {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved.
                </p>
            </div>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                    <HeartCrack className="w-16 h-16 mb-4 opacity-50" />
                    <h2 className="text-xl font-semibold">No favorites yet</h2>
                    <p className="mt-2">Click the heart icon on any movie to save it here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
