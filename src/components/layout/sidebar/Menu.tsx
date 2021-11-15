import React from 'react';
import { Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { menu } from './dataMenu';
import { useHistory } from 'react-router';

const Menu: React.FC = () => {
    const history = useHistory();

    return (
        <Card
            variant="outlined"
            sx={{
                padding: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(221, 221, 221, 0.4)",
                border: "none",
                borderRadius: 3,
                marginTop: 5,
                marginBottom: 10
            }}
        >
            <List sx={{width: "100%"}}>
                {menu.map(item => {
                    return (
                        <ListItem key={`item: ${item.link}`} disablePadding>
                            <ListItemButton onClick={() => history.push(item.link)}>
                                <ListItemIcon>
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    )
                })} 
            </List>
        </Card>
    )
}

export default Menu
