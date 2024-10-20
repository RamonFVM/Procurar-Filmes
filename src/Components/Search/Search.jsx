import { useEffect, useState } from 'react';
import Styles from './Search.module.css';
import axios from 'axios';

export function Search() {
    const Api_key = import.meta.env.VITE_OMDB_API_KEY;
    const [movie, setMovie] = useState('');


    useEffect(() => {

        
        if (movie) {
            axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=${Api_key}`)
                .then(response => {

                    console.log(response);
                   
                })
        }
    }, [movie, Api_key]);
    return (
        <div className={Styles.Search}>
            <input
                type="text"
                value={movie}
                placeholder="Pesquisar..."
                onChange={(e) => setMovie(e.target.value)}

            />


        </div>


    );
}