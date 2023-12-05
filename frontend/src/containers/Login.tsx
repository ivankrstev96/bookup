import {Card, Form} from "react-bootstrap";
import {Backdrop} from "../components/Backdrop";
import {CenteredContainer} from "../components/CenteredContainer";
import styled from "styled-components";
import {useContext} from "react";
import {Link, Navigate} from "react-router-dom";
import {Button} from "../components/Button";
import {AuthContext} from "../context/AuthContext";
import {Field, Form as FinalForm, FormRenderProps} from "react-final-form";
import {anyValidator, requiredValidator} from "../utils/validatorUtils";
import {FormControl} from "../components/FormControl";
import { useNavigate } from 'react-router-dom';


const StyledCard = styled(Card)`
  padding: 20px;
  width: 400px;
  box-shadow: 5px 5px 10px 12px rgba(0, 0, 0, 0.6);
`;

interface LoginDetails {
    username: string,
    password: string
}

const Login = () => {

    const {isAuthenticated, login} = useContext(AuthContext);
    const navigateTo = useNavigate();

    const handleSubmit = async ({username, password}: LoginDetails) => {

        try {
            await login(username, password);
            console.log("SUCCSESS")
            navigateTo("/dashboard")
        } catch (e) {
            console.log("FAIL", e)
        }
    }

    const render = () => {
        return (
            <Backdrop source={"src/assets/background_book_circle.jpg"}>
                <CenteredContainer>
                    <FinalForm
                        onSubmit={(values: any) => handleSubmit(values)}
                        subscription={{values: true, pristine: true, submitting: true}}
                        render={renderForm}
                    />
                </CenteredContainer>
            </Backdrop>
        );
    }
    const renderForm = ({handleSubmit, submitting}: FormRenderProps) => {
        return (
            <StyledCard body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Field
                            name="username"
                            validate={requiredValidator}
                        >
                            {props => (
                                <FormControl
                                    type="text"
                                    placeholder="Username"
                                    fieldRenderProps={props}
                                />
                            )}
                        </Field>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Field
                            name="password"
                            validate={anyValidator(requiredValidator)}
                        >
                            {props => (
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    fieldRenderProps={props}
                                />
                            )}
                        </Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Text id="register" muted>
                            <Link to="/register">Don't have an account? Register here.</Link>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={submitting}>
                        Login
                    </Button>
                    <Button variant="secondary" type="button">
                        Back
                    </Button>
                </Form>
            </StyledCard>
        );
    }

    return isAuthenticated
        ? (<Navigate to={"/"}/>)
        : render();
}

export default Login;

export {Login};