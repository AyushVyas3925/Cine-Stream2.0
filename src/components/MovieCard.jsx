"use client";

import { useContext } from 'react';
import { Heart, Star } from 'lucide-react';
import { FavoritesContext } from '@/context/FavoritesContext';
import Link from 'next/link';
import Image from 'next/image';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
    const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
    const isFav = isFavorite(movie.id);

    const posterSrc = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://placehold.co/500x750/18181b/a1a1aa?text=No+Poster';

    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

    return (
        <Link href={`/movie/${movie.id}`}>
            <div className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-900/20 hover:border-gray-700/50">
                <div className="aspect-[2/3] w-full relative">
                    <Image
                        src={posterSrc}
                        alt={movie.title || 'Movie Poster'}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        className="object-cover"
                    />

                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-sm font-semibold text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(movie);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm shadow-md transition hover:bg-black/80 z-10 group/btn"
                        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Heart
                            className={`w-5 h-5 transition-transform group-hover/btn:scale-110 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-white'}`}
                        />
                        <span className="sr-only">{isFav ? "Remove from favorites" : "Add to favorites"}</span>
                    </button>
                </div>
                <div className="p-4">
                    <h3 className="text-base font-bold text-white truncate" title={movie.title}>
                        {movie.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mt-1">{releaseYear}</p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
