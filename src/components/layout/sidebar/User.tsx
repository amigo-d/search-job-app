import { Avatar, Button, Card, Chip } from '@mui/material'
import { useAuth } from '../../providers/useAuth';
import {signOut} from "firebase/auth";

const User = () => {
    const {user, ga} = useAuth();
    const userLogo = `https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png`
    return (
        <Card
            variant="outlined"
            sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background-color: rgba(221, 221, 221, 0.4)",
                border: "none",
                borderRadius: 3,
                marginBottom: 5
            }}
        >
            <Chip
                avatar={<Avatar src={userLogo} />}
                label={user?.name || "Без имени"}
                variant="outlined"
                sx={{marginBottom: 2, height: 50}}
            />
            {/* <Button variant="outlined" onClick={() => signOut(ga)}>Выйти</Button> */}
        </Card>
    )
}

export default User
