import React from "react";
import { getAuth, onAuthStateChanged, Auth } from "@firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { IUser, TypeSetState } from "../../types";
import { users } from "../layout/sidebar/dataUsers";

interface IContext {
    user: IUser | null,
    setUser: TypeSetState<IUser | null>,
    ga: Auth,
    db: Firestore
}

export const AuthContext = React.createContext<IContext>({} as IContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<IUser | null>(null);
    const ga = getAuth();
    const db = getFirestore();

    React.useEffect(() => {
        const unListen = onAuthStateChanged(ga, authUser => {
            if (authUser) {
                setUser({
                    _id: authUser.uid,
                    avatar: users[1].avatar,
                    name: authUser.displayName || ""
                });
            } else {
                setUser(null);
            }
        })

        return () => {
            unListen();
        }
        // eslint-disable-next-line
    }, []);

    const values = React.useMemo(() => ({
        user, setUser, ga, db
        // eslint-disable-next-line
    }), [user]);

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
};