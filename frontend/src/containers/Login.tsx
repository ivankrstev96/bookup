import {Alert, Card, Form} from "react-bootstrap";
import {Backdrop} from "../components/Backdrop";
import {CenteredContainer} from "../components/CenteredContainer";
import styled from "styled-components";
import {useContext, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Button} from "../components/Button";
import {AuthContext} from "../context/AuthContext";
import {Field, Form as FinalForm, FormRenderProps} from "react-final-form";
import {requiredValidator} from "../utils/validatorUtils";
import {FormControl} from "../components/FormControl";


const StyledCard = styled(Card)`
  padding: 2px 10px 10px 10px;
  width: 400px;
  box-shadow: 5px 5px 10px 12px rgba(0, 0, 0, 0.6);
`;

const CardTitle = styled(Card.Title)`
  margin-bottom: 25px;
`;

interface FormData {
    username: string,
    password: string
}

const Login = () => {

    const [error, setError] = useState<string | undefined>(undefined);
    const {isAuthenticated, login} = useContext(AuthContext);
    const navigateTo = useNavigate();

    const handleSubmit = async ({username, password}: FormData) => {
        try {
            await login(username, password);
            navigateTo("/dashboard")
        } catch (error: any) {
            if (error.response.status === 401) {
                setError("Wrong username or password.")
            }
        }
    }

    const renderError = () => {
        if (!error) {
            return null;
        }

        return (
            <Alert variant="danger" onClose={() => setError(undefined)} dismissible>
                    {error}
            </Alert>
        );
    }

    const render = () => {
        return (
            <Backdrop source={"src/assets/background_book_circle.jpg"}>
                <CenteredContainer>
                    <StyledCard body>
                        <CardTitle>Login</CardTitle>
                        <FinalForm
                            onSubmit={(values: any) => handleSubmit(values)}
                            subscription={{values: true, pristine: true, submitting: true}}
                            render={renderForm}
                        />
                    </StyledCard>
                </CenteredContainer>
            </Backdrop>
        );
    }
    const renderForm = ({handleSubmit, submitting}: FormRenderProps) => {
        return (
            <Form onSubmit={handleSubmit}>
                {renderError()}
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
                        validate={requiredValidator}
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
                <Button variant="secondary" type="button" disabled={submitting} onClick={() => navigateTo(-1)}>
                    Back
                </Button>
            </Form>
        );
    }

    return isAuthenticated
        ? (<Navigate to={"/"}/>)
        : render();
}

export default Login;

export {Login};