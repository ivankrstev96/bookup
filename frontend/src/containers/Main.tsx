import {useContext} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {Login} from "./Login";
import {Register} from "./Register";

const Main = () => {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={"/"}
                    element={isAuthenticated ? <Navigate to={"/dashboard"}/> : <Navigate to={"/login"}/>}
                />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Main;

export {Main};