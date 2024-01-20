import {CenteredContainer} from "./CenteredContainer";
import Spinner from 'react-bootstrap/Spinner';


const FullPageSpinner = () => {
    return (
        <CenteredContainer>
            <Spinner animation="border">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </CenteredContainer>
    );
}

export default FullPageSpinner;

export {FullPageSpinner}