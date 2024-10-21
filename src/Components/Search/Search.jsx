import { useEffect, useState } from 'react';
import Styles from './Search.module.css';
import axios from 'axios';
import { motion } from 'framer-motion';

export function Search() {
    const Api_key = import.meta.env.VITE_OMDB_API_KEY;
    const [movie, setMovie] = useState('');
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchMovieData = async () => {
            if (movie) {
                try {
                    const response = await axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=${Api_key}`, {
                        signal: controller.signal,
                    });

                    if (response.data && response.data.Response === 'True') {
                        setMovieData(response.data);
                    } else {
                        console.error('Filme não encontrado:', response.data.Error);
                        setMovieData(null);
                    }
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.error('Erro ao buscar dados do filme:', error);
                    }
                }
            } else {
                setMovieData(null); 
            }
        };

        fetchMovieData();

        return () => {
            controller.abort(); 
        };
    }, [movie, Api_key]);

    const handleChange = (e) => {
        setMovie(e.target.value.toLowerCase());
    };

    return (
        <div>
            <div className={Styles.Search}>
                <motion.input
                    type="text"
                    value={movie}
                    placeholder="Pesquisar..."
                    onChange={handleChange}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0 }}
                />
            </div>

            {movieData && movieData.Title && (
                <motion.div
                    className={Styles.MovieInfo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 1.3 }}
                >
                    <h1>Título: {movieData.Title}</h1>
                    <p>Ano: {movieData.Year}</p>
                    <p>Gênero: {movieData.Genre}</p>
                    <p>Sinopse: {movieData.Plot}</p>
                    <p>Diretor: {movieData.Director}</p>
                    <p>País: {movieData.Country}</p>
                    <p>Idioma: {movieData.Language}</p>

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
                </motion.div>
            )}
        </div>
    );
}
