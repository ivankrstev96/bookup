import {ReactNode, useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

interface Props {
    container: ReactNode
}

const ProtectedRoute = ({container}: Props) => {
    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return (<Navigate to={"/login"}/>);
    }

    return (
        <>
            {container}
        </>
    );
}

export default ProtectedRoute;

export {ProtectedRoute}