"use client";

import { useRef, useState, useEffect } from 'react';
import MoviePlayer from "./movieplayer";


export default function MovieList({ filenames }: { filenames: string[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFilenames, setFilteredFilenames] = useState<string[]>([]);
  const [movieData, setMovieData] = useState<{ [key: string]: { title: string; overview: string; poster: string; release: string; genre: string } }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [isPlayback, setIsPlayback] = useState(false);

  useEffect(() => {
    // Filter filenames based on search query in searchbar
    const results = filenames.filter(name =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFilenames(results);
  }, [searchQuery, filenames]);

  useEffect(() => {
    const fetchAndSaveMovieData = async (name: string) => {
      setLoading(true);
      setError(null);
    
      try {
        const fileID = name.split("+").slice(1); // Remove file extension from name
        const filePath = `/jsons/movie/${fileID}.json`; // Construct the file path
        //const filePath = `https://stream.haaremy.de:2053/Media/MovieInfo/${fileID}.json` //Server 2 Filepath

        // Check if file exists on server
        const fileExistsResponse = await fetch(filePath, { method: 'HEAD' });
        if (fileExistsResponse.ok) {
          // If file exists, fetch its content
          const response = await fetch(filePath);
          const existingMovieData = await response.json();
          setMovieData(prevData => ({
            ...prevData,
            [name]: existingMovieData,
          }));
        } else {
          // If file does not exist, fetch from API
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${encodeURIComponent(fileID[0])}?language=de-DE&api_key=2e42a5a77d2dc620a46cd7276da47403`
          );
          const data = await response.json();

          if (data) {
            // Handle genres with a default empty string if genres are not available
            const genres = data.genres ? data.genres.map((genre: { name: string }) => genre.name).join(' - ') : 'Unknown';

            const movieInfo = {
              title: data.title,
              overview: data.overview,
              poster: data.poster_path,
              release: data.release_date,
              genre: genres, // Concatenate genres into a string
            };
        
            setMovieData(prevData => ({
              ...prevData,
              [name]: movieInfo,
            }));
        
            // Call the API to save the data to a local file
            //await fetch('https://stream.haaremy.de:2053/Media/MovieInfo/saveMovieData.php', {
              await fetch('/api/saveMovieData.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: fileID, movieData: movieInfo }),
            });
          }
        }
      
      } catch (error) {
        setError('Fehler beim Speichern/Laden der Filmdetails');
        console.error(error); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    filteredFilenames.forEach(name => {
      fetchAndSaveMovieData(name); // Fetch and save data for each filtered filename
    });
  }, [filteredFilenames]);

  const handlePause = () => {
    setIsPlayback(false); // Update state
  };

  return (
    <main className="flex min-h-screen flex-col p-8 pt-20 bg-pink-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 shadow-md h-full ${
          isHovered ? 'w-64' : 'w-16'
        } transition-all duration-300 ease-in-out z-30`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {/* Icon visible when sidebar is collapsed */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isHovered ? 'text-transparent' : 'text-gray-500'} transition-colors duration-300`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          {/* Content visible when sidebar is hovered */}
          <div className={`flex-col items-center ${isHovered ? 'flex' : 'hidden'} transition-all duration-300`}>
            <ul className="space-y-4 mt-4 w-full px-2">
              <li>
                <a
                  href="#about"
                  className="block py-2 px-6 rounded-lg text-center bg-pink-600 text-white dark:bg-pink-400 transition-colors duration-300 hover:bg-pink-700 dark:hover:bg-pink-300"
                >
                  ContentObjects
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <div className={` ${isHovered ? 'pl-64' : 'pl-16'} flex-1 w-full transition-all duration-300`}>
        <div className="p-4">
          <input
            type="text"
            placeholder="Suche nach Filmtitel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded"
          />

          {filteredFilenames.length === 0 ? (
            <p className="text-gray-500">Keine Filme gefunden.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {loading && <p className="text-blue-500 text-center col-span-full">Loading...</p>}
              {error && <p className="text-red-500 text-center col-span-full">{error}</p>}
              {filteredFilenames.map(name => (
                movieData[name] && (
                  <div
                    key={name}
                    className="relative flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group cursor-pointer"
                    onClick={() => {
                      setSelectedMovie(`https://stream.haaremy.de:2053/Media/Movies/${name}/movie.m3u8`);
                      setIsPlayback(true);
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movieData[name].poster}`}
                      alt={movieData[name].title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                      <h2 className="text-xl font-semibold">{movieData[name].title}</h2>
                      <p className="text-sm">{movieData[name].release}</p>
                      <p className="text-sm">{movieData[name].genre}</p>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-60 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-sm">{movieData[name].overview}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
      
      {selectedMovie && (
        <MoviePlayer movie={selectedMovie} onClose={handlePause} /> // Übergibt Link an movieplayer
      )}
    </main>
  );
}
