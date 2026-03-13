import { getPopularMovies, searchMovies, getMovieByMoodUsingGemini } from '@/services/api';
import MovieList from '@/components/MovieList';

export default async function Home({ searchParams }) {
    const params = await searchParams;
    const search = params?.search || '';
    const mood = params?.mood || '';

    let movies = [];
    let error = null;
    let aiSuggestedMovie = null;

    try {
        if (mood && !search) {
             aiSuggestedMovie = await getMovieByMoodUsingGemini(mood);
             const searchRes = await searchMovies(aiSuggestedMovie, 1);
             if (searchRes && searchRes.results) {
                 movies = searchRes.results;
             }
        } else if (search) {
             const searchRes = await searchMovies(search, 1);
             if (searchRes && searchRes.results) {
                 movies = searchRes.results;
             }
        } else {
             const popRes = await getPopularMovies(1);
             if (popRes && popRes.results) {
                 movies = popRes.results;
             }
        }
    } catch (err) {
        error = err.message || "Failed to fetch initial movies from TMDB API.";
    }

    return (
        <MovieList 
            initialMovies={movies} 
            initialSearch={search} 
            initialMood={mood} 
            aiSuggested={aiSuggestedMovie} 
            initialError={error} 
        />
    );
}
