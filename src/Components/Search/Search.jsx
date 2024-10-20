import { useEffect, useState } from 'react';
import Styles from './Search.module.css';
import axios from 'axios';

export function Search() {
    const Api_key = import.meta.env.VITE_OMDB_API_KEY;
    const [movie, setMovie] = useState('');
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            if (movie) {
                try {
                    const response = await axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=${Api_key}`);
                    setMovieData(response.data);
                } catch (error) {
                    console.error('Erro ao buscar dados do filme:', error);
                }
            }
        };

        fetchMovieData();
    }, [movie, Api_key]);

    return (
        <div>
            <div className={Styles.Search}>
                <input
                    type="text"
                    value={movie}
                    placeholder="Pesquisar..."
                    onChange={(e) => setMovie(e.target.value)}
                />
            </div>

            {movieData && (
                <div className={Styles.MovieInfo}>
                    <h1>{movieData.Title}</h1>
                    <p>Ano: {movieData.Year}</p>
                    <p>Gênero: {movieData.Genre}</p>
                    <p>Sinopse: {movieData.Plot}</p>
                    <p>Diretor: {movieData.Director}</p>
                    <h2>Classificações:</h2>
                    {movieData.Ratings && movieData.Ratings.length > 0 ? (
                        <ul>
                            {movieData.Ratings.map((rating, index) => (
                                <li key={index}>
                                    {rating.Source}: {rating.Value}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhuma classificação disponível.</p>
                    )}
                </div>
            )}
        </div>
    );
}