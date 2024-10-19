import { useEffect } from 'react';
import Styles from './Search.module.css';
import { Axios } from 'axios';

export function Search() {

    
    return (
        <div className={Styles.Search}>
            <input type="text"  placeholder="Pesquisar..." />
        </div>
    );
}