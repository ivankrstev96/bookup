import {Link, Navigate, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {Field, Form as FinalForm, FormRenderProps} from "react-final-form";
import {Backdrop, Button, CenteredContainer, defaultErrorMessageMap, FormControl} from "../components";
import styled from "styled-components";
import {Alert, Card, Col, Form, Row} from "react-bootstrap";
import {anyValidator, emailValidator, equalsValidator, requiredValidator} from "../utils/validatorUtils";
import {UserUpsertDto} from "../types/UserUpsertDto";
import _ from "lodash";
import {register} from "../services/userServices";

const StyledCard = styled(Card)`
  padding: 2px 10px 10px 10px;
  width: 650px;
  box-shadow: 5px 5px 10px 12px rgba(0, 0, 0, 0.6);
`;

const CardTitle = styled(Card.Title)`
  margin-bottom: 25px;
`;

interface FormData extends UserUpsertDto {
    confirmPassword: string
}

const Register = () => {

    const [error, setError] = useState<string | undefined>(undefined);
    const [renderSuccessPage, setRenderSuccessPage] = useState<boolean>(false);
    const {isAuthenticated} = useContext(AuthContext);
    const navigateTo = useNavigate();

    const handleSubmit = async (values: FormData) => {
        const userUpsertDto = _.omit(values, ["confirmPassword"]);

        try {
            await register(userUpsertDto);
            setRenderSuccessPage(true);
        } catch (error: any) {
            if (error.response.status === 400 && error.response.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong!");
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

    const renderForm = ({handleSubmit, submitting, values}: FormRenderProps) => {
        return (
            <Form onSubmit={handleSubmit}>
                {renderError()}
                <Row>
                    <Col>
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
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Field
                                name="email"
                                validate={anyValidator(requiredValidator, emailValidator)}
                            >
                                {props => (
                                    <FormControl
                                        type="text"
                                        placeholder="Email"
                                        fieldRenderProps={props}
                                    />
                                )}
                            </Field>
                        </Form.Group>
                    </Col>
                </Row>
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
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Field
                        name="confirmPassword"
                        validate={anyValidator(requiredValidator, equalsValidator(values.password))}
                    >
                        {props => (
                            <FormControl
                                type="password"
                                placeholder="Confirm Password"
                                fieldRenderProps={props}
                                errorMessageMap={{
                                    ...defaultErrorMessageMap,
                                    DOES_NOT_EQUAL: "Passwords do not match!"
                                }}
                            />
                        )}
                    </Field>
                </Form.Group>
                <Form.Group>
                    <Form.Text id="login" muted>
                        <Link to="/login">Already registered? Login here.</Link>
                    </Form.Text>
                </Form.Group>
                <Button.Submit submitting={submitting}>
                    Register
                </Button.Submit>
                <Button variant="secondary" type="button" disabled={submitting} onClick={() => navigateTo(-1)}>
                    Back
                </Button>
            </Form>
        );
    }

    const renderRegister = () => {
        return (
            <FinalForm
                onSubmit={(values: any) => handleSubmit(values)}
                subscription={{values: true, pristine: true, submitting: true}}
                render={renderForm}
            />
        );
    }

    const renderSuccess = () => {
        return (
            <>
                <Alert variant="success">
                    You have successfully registered an account.
                </Alert>
                <Button
                    variant="success"
                    type="button"
                    onClick={() => navigateTo("/login")}
                >
                    Login
                </Button>
            </>
        );
    }

    const render = () => {
        return (
            <Backdrop source={"src/assets/background_book_circle.jpg"}>
                <CenteredContainer>
                    <StyledCard body>
                        <CardTitle>Register</CardTitle>
                        {renderSuccessPage ? renderSuccess() : renderRegister()}
                    </StyledCard>
                </CenteredContainer>
            </Backdrop>
        );
    }

    return isAuthenticated
        ? (<Navigate to={"/"}/>)
        : render();

}

export default Register;

export {Register};