import {createContext, useEffect, useState} from "react";
import {clearAccessToken, getAccessToken, setAccessToken} from "../services/browserStorageServices";
import {login as authLogin} from "../services/authServices";
import {FullPageSpinner} from "../components/FullPageSpinner";
import {getCurrentUser} from "../services/userServices";
import {UserDto} from "../types/UserDto";

export interface AuthContextProps {
    isAuthenticated: boolean,
    currentUser?: UserDto,
    login: (username: string, password: string) => Promise<any>,
    logout: () => void
}

const defaultContextState: AuthContextProps = {
    isAuthenticated: false,
    currentUser: undefined,
    login: () => Promise.resolve(),
    logout: () => {
    }
}
export const AuthContext = createContext(defaultContextState);

export const AuthContextProvider = (props: any) => {
    const login = async (username: string, password: string) => {
        try {
            const res = await authLogin(username, password);
            const bearer = res.headers.authorization;

            setAccessToken(bearer);
            setAuthState({
                ...authState,
                isAuthenticated: true
            });

            return Promise.resolve();

        } catch (e) {
            return Promise.reject(e);
        }
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

    const loadUserDetails = async () => {
        try {
            const userDto = await getCurrentUser();

            setAuthState({
                ...authState,
                currentUser: userDto
            });
        } catch (e) {

        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            loadUserDetails();
        }
    }, [isAuthenticated]);

    if (isAuthenticated && !currentUser) {
        return (
            <FullPageSpinner/>
        );
    }

    return (
        <AuthContext.Provider value={authState}>
            {props.children}
        </AuthContext.Provider>
    );

}