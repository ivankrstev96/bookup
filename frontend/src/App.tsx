import './App.css'
import {AuthContextProvider} from "./context/AuthContext";
import Main from "./containers/Main";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
        <>
            <AuthContextProvider>
                <Main/>
            </AuthContextProvider>
        </>
    )
}

export default App
