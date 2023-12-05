import {CenteredContainer} from "./CenteredContainer";
import Spinner from 'react-bootstrap/Spinner';
import {Backdrop} from "./Backdrop";


const FullPageSpinner = () => {
    return (
        // TODO: check if transition looks good and maybe remove backdrop
        <Backdrop source={"src/assets/background_book_circle.jpg"}>
            <CenteredContainer>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </CenteredContainer>
        </Backdrop>
    );
}

export default FullPageSpinner;

export {FullPageSpinner}