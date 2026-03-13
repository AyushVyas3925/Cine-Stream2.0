"use client";
import { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies } from '@/services/api';
import MovieCard from '@/components/MovieCard';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Film } from 'lucide-react';

const MovieList = ({ initialMovies = [], initialSearch = '', initialMood = '', aiSuggested = '', initialError = null }) => {
    const [movies, setMovies] = useState(initialMovies);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(initialError);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialMovies.length > 0);

    useEffect(() => {
        setMovies(initialMovies);
        setPage(1);
        setHasMore(initialMovies.length > 0);
        setError(initialError);
    }, [initialSearch, initialMood, initialMovies, initialError]);

    useEffect(() => {
        if (page === 1) return;

        const fetchMoreMovies = async () => {
            try {
                setLoading(true);
                let data;

                if (initialMood && !initialSearch) {
                    data = await searchMovies(aiSuggested || initialMood, page);
                } else if (initialSearch) {
                    data = await searchMovies(initialSearch, page);
                } else {
                    data = await getPopularMovies(page);
                }

                setMovies(prevMovies => {
                    if (!data || !data.results) return prevMovies;
                    const newMovies = data.results.filter(
                        (newMovie) => !prevMovies.some((prev) => prev.id === newMovie.id)
                    );
                    return [...prevMovies, ...newMovies];
                });

                setHasMore(data.page < data.total_pages);
            } catch (err) {
                 setError('Failed to fetch more movies.');
            } finally {
                setLoading(false);
            }
        };

        fetchMoreMovies();
    }, [page, initialSearch, initialMood, aiSuggested]);

    const loadMoreMovies = () => {
        if (!loading && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const lastMovieElementRef = useInfiniteScroll(loadMoreMovies, loading, hasMore);

    return (
        <div className="w-full">
            <div className="mb-8 flex items-center gap-3">
                <Film className="w-8 h-8 text-rose-500" />
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                    {initialSearch ? `Search Results for "${initialSearch}"` : (aiSuggested ? `AI Match for "${initialMood}": ${aiSuggested}` : 'Popular Movies')}
                </h1>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-rose-500 p-4 rounded-xl mb-6">
                    {error}
                </div>
            )}

            {movies.length === 0 && !loading && !error ? (
                <div className="text-zinc-500 text-center py-20 text-lg">
                    No movies found. Try another search term.
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie, index) => {
                        if (movies.length === index + 1) {
                            return (
                                <div ref={lastMovieElementRef} key={`${movie.id}-${index}`}>
                                    <MovieCard movie={movie} />
                                </div>
                            );
                        } else {
                            return <MovieCard key={`${movie.id}-${index}`} movie={movie} />;
                        }
                    })}
                </div>
            )}

            {loading && (
                <div className="flex justify-center my-12">
                    <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default MovieList;
