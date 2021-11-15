import React from 'react';
import Logo from "./logo.png";
import styles from "./Header.module.css";
import Search from '../../Search/Search'
import {signOut} from "firebase/auth";
import { Button } from '@mui/material';
import { useAuth } from '../../providers/useAuth';

const Header: React.FC = () => {
    const {user, ga} = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles["image-wrapper"]}>
                <a href="/"><h3 className={styles.logo}>JOB HUNTER</h3></a>
            </div>
            <div className={styles.wrapper}>
               <Search />
            </div>
            <div>
            <Button variant="contained" size="medium" onClick={() => signOut(ga)}>Выйти</Button>
            </div>
        </header>
    )
}

export default Header
