import { Grid } from '@mui/material'
import React from 'react'
import { useAuth } from '../providers/useAuth'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

const Layout: React.FC = ({children}) => {
    const {user} = useAuth();

    return (
        <div>
            <>
                {user && <Header />}
                <Grid container spacing={2} paddingX={5} marginTop={2}>
                    {user && 
                        <Grid item md={3}>
                            <Sidebar />
                        </Grid>
                    }
                    <Grid item md={user ? 9 : 12}>
                        {children}
                    </Grid>
                </Grid>
            </>
        </div>
    )
}

export default Layout
