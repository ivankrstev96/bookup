import styled from "styled-components";
import {Button as ReactBootstrapButton, ButtonProps} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const StyledSpinner = styled(Spinner)`
    margin-right: 0.2em;
`;

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

interface SubmitButtonProps extends Props {
    submitting: boolean
}

const SubmitButton = (props: SubmitButtonProps) => {
    const {submitting, disabled, children="Submit", ...rest} = props;

    return (
        <Button
            variant="primary"
            type="submit"
            disabled={submitting || disabled}
            {...rest}
        >
            {submitting ? <StyledSpinner animation="border" size="sm" /> : null}
            {children}
        </Button>
    );

}

Button.Submit = SubmitButton;

export default Button;

export {Button}