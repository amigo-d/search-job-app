import * as Icons from "@mui/icons-material";
import { IMenuItem } from "../../../types";

export const menu:IMenuItem[] = [
    {
        title: "Моя страница",
        link: "/profile",
        icon: Icons.Home
    },
    {
        title: "Друзья",
        link: "/friends/:id",
        icon: Icons.People
    },
    {
        title: "Отклики",
        link: "/",
        icon: Icons.Article
    }
];