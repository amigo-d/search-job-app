import React from 'react'
import Menu from './Menu'
import UserItems from './UserItems'
import User from "./User";
import styles from "./Styles.module.css";

const Sidebar: React.FC = () => {
    return (
        <div className={styles.sidebar}>
            <User />
            <UserItems />
            <Menu />
        </div>
    )
}

export default Sidebar
