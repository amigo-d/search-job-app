import React from 'react';
import { Box } from "@mui/system";
import { Avatar, Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { QuestionAnswer } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { users } from './dataUsers';

const UserItems: React.FC = () => {
    const history = useHistory();

    return (
        <Card
            variant="outlined"
            sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgba(221, 221, 221, 0.4)",
                border: "none",
                borderRadius: 3
            }}
        >
            <Box 
            sx={{
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 2,
                display: "flex",
                fontSize: 20,
            }}
            >
                Сейчас на сайте:
            </Box>
            {users.map(user => {
                return (
                    <Link
                        key={user._id}
                        to={"/profile/" + user._id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#111",
                            marginBottom: 12
                        }}
                    >
                        <Box sx={{
                            position: "relative",
                            marginRight: 2,
                            overflow: "hidden",
                            width: 50,
                            height: 50
                        }}>
                            <Avatar
                                alt="Profile image"
                                src={user.avatar}
                                sx={{
                                    width: 46,
                                    height: 46
                                }}
                            />
                            {user.isInNetwork && <Box sx={{
                                backgroundColor: "#4fb14f",
                                width: 12,
                                height: 12,
                                position: "absolute",
                                borderRadius: "50%",
                                bottom: 5,
                                right: 5,
                                border: "2px solid #f1f7f1"
                            }}></Box>}
                        </Box>
                        <span>{user.name}</span>
                    </Link>
                )
            })}
            
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => history.push("/messages")}>
                        <ListItemIcon>
                            <QuestionAnswer />
                        </ListItemIcon>
                        <ListItemText primary="Сообщения" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Card>
    )
}

export default UserItems;
   