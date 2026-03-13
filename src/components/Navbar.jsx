"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Clapperboard, Heart, Search, Sparkles } from 'lucide-react';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [moodQuery, setMoodQuery] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);
        if (val.trim() !== '') {
            router.push(`/?search=${encodeURIComponent(val)}`);
        } else {
             router.push('/');
        }
    };

    const handleMoodSubmit = (e) => {
        if (e.key === 'Enter' && moodQuery.trim() !== '') {
            router.push(`/?mood=${encodeURIComponent(moodQuery)}`);
        }
    };

    const handleLogoClick = () => {
        setSearchQuery('');
        setMoodQuery('');
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">

                    {/* Logo */}
                    <Link href="/" onClick={handleLogoClick} className="flex-shrink-0 flex items-center gap-2 text-rose-500 hover:text-rose-400 transition-colors">
                        <Clapperboard className="w-8 h-8" />
                        <span className="text-xl font-bold tracking-wider hidden sm:block">CINE-STREAM</span>
                    </Link>

                    {/* Search Bars */}
                    <div className="flex-1 max-w-3xl flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search movies..."
                                className="block w-full pl-10 pr-3 py-2 border border-zinc-700 rounded-lg leading-5 bg-zinc-900/80 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-zinc-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>

                        {/* AI Mood Matcher (Level 3 feature setup) */}
                        <div className="relative flex-1 group hidden md:block">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Sparkles className="h-4 w-4 text-amber-500 group-hover:animate-pulse" />
                            </div>
                            <input
                                type="text"
                                value={moodQuery}
                                onChange={(e) => setMoodQuery(e.target.value)}
                                onKeyDown={handleMoodSubmit}
                                placeholder="Mood Matcher: e.g., 'funny sci-fi' (Press Enter)"
                                className="block w-full pl-10 pr-3 py-2 border border-amber-900/50 rounded-lg leading-5 bg-zinc-900/80 text-amber-100 placeholder-amber-700/50 focus:outline-none focus:bg-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition duration-150 ease-in-out sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Right Nav */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/favorites" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-zinc-800 transition">
                            <Heart className="w-5 h-5 text-rose-500" />
                            <span className="hidden sm:block">Favorites</span>
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
