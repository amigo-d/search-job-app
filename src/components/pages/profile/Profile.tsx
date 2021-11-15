import { Avatar } from '@mui/material';
import React from 'react';
import { useAuth } from '../../providers/useAuth';
import Card from "../../ui/Card";

const Profile: React.FC = () => {
    const {user} = useAuth();
    return (
        <Card>
            <h1> WELCOME TO YOUR PROFILE, {user?.name} </h1>  
            <Avatar src={user?.avatar} />
            <h1>{user?.name}</h1>
        </Card>
    )
}

export default Profile;
