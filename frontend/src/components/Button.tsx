import styled from "styled-components";
import {Button as ReactBootstrapButton, ButtonProps} from "react-bootstrap";


const StyledButton = styled(ReactBootstrapButton)`
  margin-right: 0.5em;
`;

interface Props extends ButtonProps {
}

const Button = (props: Props) => {
    return (
        // @ts-ignore
        <StyledButton
            {...props}
        />
    );
}

export default Button;

export {Button}