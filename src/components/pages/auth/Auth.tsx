import { Alert, Button, ButtonGroup, Grid, TextField } from '@mui/material';
import { style } from '@mui/system';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/useAuth';
import { IUserData } from './types';
import ui from './Auth.module.css'
import Box from '@material-ui/system/Box';

const Auth: React.FC = () => {
    const {ga, user} = useAuth();

    const [isRegForm, setIsRegForm] = React.useState(false);
    const [error, setError] = React.useState("");
    const [userData, setUserData] = React.useState<IUserData>({name:"", email: "", password: ""} as IUserData);

    const handleLogin = async(event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isRegForm) {
            try {
                const res = await createUserWithEmailAndPassword(ga, userData.email, userData.password);
                await updateProfile(res.user, {
                    displayName: userData.name
                })
                setError("");
                setUserData({name: "", email: "", password: ""});
            } catch(error:any) {
                error.message && setError(error.message);
            }
        } else {
            try {
                await signInWithEmailAndPassword(ga, userData.email, userData.password);
                setError("");
                setUserData({name: "", email: "", password: ""});
            } catch(error:any) {
                error.message && setError(error.message);
            }
        }

        setUserData({name: "", email: "", password: ""});
    }

    const history = useHistory();

    React.useEffect(() => {
        if (user) history.push("/");
        // eslint-disable-next-line
    }, [user]);

    return (
        <>
            {error && <Alert severity="error" sx={{marginBottom: "20px"}}>{error}</Alert>}
            <Grid display="flex" justifyContent="center" alignItems="center">
                <form className={ui.background} onSubmit={event => handleLogin(event)}>
                    <TextField
                        type="text"
                        label="Name"
                        variant="outlined"
                        value={userData.name}
                        onChange={event => setUserData({...userData, name: event.target.value})}
                        sx={{display: "block", marginBottom: 3}}
                    />
                    <TextField
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={userData.email}
                        onChange={event => setUserData({...userData, email: event.target.value})}
                        required
                        sx={{display: "block", marginBottom: 3}}
                    />
                    <TextField
                        type="password"
                        label="Password"
                        variant="outlined"
                        value={userData.password}
                        onChange={event => setUserData({...userData, password: event.target.value})}
                        required
                        sx={{display: "block", marginBottom: 3}}
                    />
                    <ButtonGroup variant="outlined" sx={{display: "flex", justifyContent: "center"}}>
                        <Button type="submit" onClick={() => setIsRegForm(false)}>Auth</Button>
                        <Button type="submit" onClick={() => setIsRegForm(true)}>Register</Button>
                    </ButtonGroup>
                </form>
                <Box sx={{
                    fontSize: 28,
                }}>
                    Welcome..
                </Box>
            </Grid>
        </>
    )
}

export default Auth;
