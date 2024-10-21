import styles from './Header.module.css';
import { MagnifyingGlass } from 'phosphor-react';


export function Header(){

    return(        


        

        <div className={styles.Header}>
            <h1>Search Movies </h1>
            <MagnifyingGlass size={32} />
        </div>
    )
}