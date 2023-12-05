import {createContext, useEffect, useState} from "react";
import {clearAccessToken, getAccessToken} from "../services/browserStorageServices";
import {login as authLogin} from "../services/authServices";

export interface AuthContextProps {
    isAuthenticated: boolean,
    currentUser?: undefined,
    login: (username: string, password: string) => void,
    logout: () => void
}

const defaultContextState: AuthContextProps = {
    isAuthenticated: false,
    currentUser: undefined,
    login: () => {
    },
    logout: () => {
    }
}
export const AuthContext = createContext(defaultContextState);

export const AuthContextProvider = (props: any) => {

    const login = async (username: string, password: string) => {
        return authLogin(username, password);
    };

    const logout = () => {
        clearAccessToken();
        setAuthState({
            ...authState,
            isAuthenticated: false,
            currentUser: undefined
        });
    };

    const initialState: AuthContextProps = !!getAccessToken() ? {
        isAuthenticated: true,
        currentUser: undefined,
        login,
        logout
    } : {
        isAuthenticated: false,
        currentUser: undefined,
        login,
        logout
    };

    const [authState, setAuthState] = useState(initialState);

    const {
        isAuthenticated,
        currentUser,
    } = authState;

    useEffect(() => {
        if (isAuthenticated) {
            // get user details
        }
    }, [isAuthenticated]);

    if (isAuthenticated && !currentUser) {
        return (<>loading</>);
    }

    return (
        <AuthContext.Provider value={authState}>
            {props.children}
        </AuthContext.Provider>
    );

}