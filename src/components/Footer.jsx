const Footer = () => {
    return (
        <footer className="w-full py-6 text-center text-zinc-300 text-sm border-t border-white/5 mt-auto">
            <p>Cine-Stream &copy; {new Date().getFullYear()}. Using TMDB API.</p>
        </footer>
    );
};

export default Footer;
