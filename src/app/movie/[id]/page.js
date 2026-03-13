import { getMovieDetails } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Calendar, Clock } from 'lucide-react';

export async function generateMetadata({ params }) {
    const { id } = await params;
    try {
        const movie = await getMovieDetails(id);
        return {
            title: `${movie.title} | Cine-Stream`,
            description: movie.overview || `View details about ${movie.title} on Cine-Stream.`,
        };
    } catch (error) {
        return {
            title: 'Movie Not Found | Cine-Stream',
            description: 'The requested movie could not be found.',
        };
    }
}

export default async function MovieDetailsPage({ params }) {
    const { id } = await params;
    let movie = null;
    let error = null;

    try {
        movie = await getMovieDetails(id);
    } catch (err) {
        error = "Failed to load movie details.";
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                <h1 className="text-2xl text-rose-500 mb-4">{error}</h1>
                <Link href="/" className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition">Go Back Home</Link>
            </div>
        );
    }

    if (!movie) return null;

    const posterSrc = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://placehold.co/500x750/18181b/a1a1aa?text=No+Poster';
        
    const backdropSrc = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : '';

    return (
        <div className="w-full animate-fade-in pb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition">
                <ArrowLeft className="w-5 h-5" /> Back to Movies
            </Link>

            <div className="relative w-full rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
                {/* Backdrop Map */}
                {backdropSrc && (
                    <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${backdropSrc})` }} />
                )}
                
                <div className="relative flex flex-col md:flex-row gap-8 pl-4 pr-6 py-6 sm:p-8 backdrop-blur-sm bg-zinc-950/60">
                    <div className="flex-shrink-0 w-full md:w-1/3 max-w-sm mx-auto md:mx-0">
                        <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-2xl">
                             <Image 
                                src={posterSrc} 
                                alt={movie.title} 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover" 
                                priority
                             />
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 pb-4">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{movie.title}</h1>
                        <p className="text-lg text-rose-400 italic mb-6">{movie.tagline}</p>
                        
                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="flex items-center gap-1 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-white/5">
                                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                <span className="font-semibold text-white">{movie.vote_average?.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-white/5">
                                <Calendar className="w-5 h-5 text-zinc-400" />
                                <span className="text-zinc-300">{movie.release_date}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-white/5">
                                <Clock className="w-5 h-5 text-zinc-400" />
                                <span className="text-zinc-300">{movie.runtime} min</span>
                            </div>
                        </div>

                        <div className="mb-8 relative z-10">
                            <h2 className="text-xl font-semibold mb-3 text-white">Overview</h2>
                            <p className="text-zinc-300 leading-relaxed max-w-3xl">{movie.overview}</p>
                        </div>

                        {movie.genres && (
                            <div className="mt-auto relative z-10">
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map(g => (
                                        <span key={g.id} className="px-3 py-1 text-sm bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
