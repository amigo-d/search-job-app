import { addDoc, collection, onSnapshot } from '@firebase/firestore';
import { Alert, Avatar, Divider, Fab, Grid, List, ListItem, ListItemText, TextField } from '@mui/material';
import {Send as SendIcon} from '@mui/icons-material';
import React from 'react';
import { IMessage } from '../../../types';
import { useAuth } from '../../providers/useAuth';
import Card from "../../ui/Card";

const Messages: React.FC = () => {
    const [messages, setMessages] = React.useState<IMessage[]>([]);
    const [message, setMessage] = React.useState("");
    const [error, setError] = React.useState("");
    const {user, db} = useAuth();

    React.useEffect(() => {
        const unsub = onSnapshot(collection(db, "messages"), doc => {
            const array: IMessage[] = [];

            doc.forEach((d: any) => {
                array.push(d.data());    
            })

            setMessages(array);
        })

        return () => {
            unsub();
        }
        // eslint-disable-next-line
    }, [])

    const addMessageHandler = async(event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await addDoc(collection(db, "messages"), {
                user, message
            })
        } catch(e: any) {
            setError(e);
        }
        setMessage("");
    }

    return (
        <>
            {error && <Alert severity="error" sx={{marginBottom: "20px"}}>{error}</Alert>}
            <Card>
                        <List style={{height: "65vh", overflowY: "auto"}}>
                            {messages.map(m => {
                                return (
                                    <ListItem key={m.user._id}>
                                        <Grid container sx={m.user._id === user?._id ? {textAlign: "right"} : {}}>
                                            <Grid item xs={12} display="flex" justifyContent={m.user._id === user?._id ? "flex-end" : "flex-start"}>
                                                <Avatar sx={{width: "30", height: "30"}} src={m.user.avatar} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText primary={m.message} style={m.user._id === user?._id ? {color: "#1976d2"} : {}}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText secondary={m.user.name}></ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            })}
                        </List>
                        <Divider />
                        <Grid container style={{padding: '20px'}}>
                            <Grid item xs={11}>
                                <TextField onChange={event => setMessage(event.target.value)} value={message} id="outlined-basic-email" label="Type Something" fullWidth />
                            </Grid>
                            <Grid item xs={1} alignItems="right">
                                <Fab color="primary" aria-label="add" sx={{marginLeft: 3}} onClick={addMessageHandler}><SendIcon /></Fab>
                            </Grid>
                        </Grid>
            </Card>
        </>
    )
}

export default Messages;
