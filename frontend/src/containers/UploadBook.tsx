import {Alert, Card, Form, ProgressBar} from "react-bootstrap";
import {Backdrop, Button, CenteredContainer, FormControl} from "../components";
import styled from "styled-components";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Field, Form as FinalForm, FormRenderProps} from "react-final-form";
import {BookUpsertDto} from "../types/BookUpsertDto";
import {anyValidator, requiredValidator} from "../utils/validatorUtils";
import {FormApi} from "final-form";
import {uploadFileResource} from "../services/fileResourceServices";
import {BookType} from "../types/BookType";
import {AxiosProgressEvent} from "axios";
import {submitBook} from "../services/bookServices";


const StyledCard = styled(Card)`
  padding: 2px 10px 10px 10px;
  width: 650px;
  box-shadow: 5px 5px 10px 12px rgba(0, 0, 0, 0.6);
`;

const CardTitle = styled(Card.Title)`
  margin-bottom: 25px;
`;

const StyledProgressBar = styled(ProgressBar)`
  margin-bottom: 10px;
`;

interface FormData extends BookUpsertDto {

}

interface UploadProgress {
    fileResourceId?: number
    imageId?: number
}

const UploadBook = () => {

    const [error, setError] = useState<string | undefined>(undefined);
    const [renderSuccessPage, setRenderSuccessPage] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
    const navigateTo = useNavigate();

    const handleSubmit = async (data: FormData) => {
        const bookUpsertDto: BookUpsertDto = data;

        try {
            await submitBook(bookUpsertDto);
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

    const handleFileChange = async (field: "fileResourceId" | "imageId", file: File | undefined, form: FormApi) => {
        if (!file) {
            form.change(field, undefined);
            return;
        }
        const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.progress === undefined) {
                return;
            }
            const progress = progressEvent.progress * 0.99 * 100;
            handleChangeUploadProgress(field, progress);
        }
        let fileResourceDto = await uploadFileResource(file, onUploadProgress);
        form.change(field, fileResourceDto.id);
        handleChangeUploadProgress(field, 100);
        setTimeout(() => {
            handleChangeUploadProgress(field, undefined);
        }, 500);
    }

    const handleChangeUploadProgress = (field: keyof UploadProgress, value?: number) => {
        const newUploadProgress = {...uploadProgress};
        newUploadProgress[field] = value;
        setUploadProgress(newUploadProgress);
    }

    const getInitialValues = (): Partial<FormData> => {
        return {
            type: BookType.PDF
        }
    }

    const renderForm = ({handleSubmit, submitting, form}: FormRenderProps) => {
        return (
            <Form onSubmit={handleSubmit}>
                {renderError()}
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Field
                        name="name"
                        validate={anyValidator(requiredValidator)}
                    >
                        {props => (
                            <FormControl
                                type="text"
                                placeholder="Name"
                                fieldRenderProps={props}
                            />
                        )}
                    </Field>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Field
                        name="description"
                        validate={anyValidator(requiredValidator)}
                    >
                        {props => (
                            <FormControl
                                type="text"
                                placeholder="Description"
                                fieldRenderProps={props}
                                as={"textarea"}
                            />
                        )}
                    </Field>
                </Form.Group>
                <Form.Group className="mb-3" controlId="fileResourceId">
                    <Form.Label>Upload pdf</Form.Label>
                    <Field
                        name="fileResourceId"
                        validate={anyValidator(requiredValidator)}
                    >
                        {({input: {onChange, value, ...input}, ...props}) => (
                            <FormControl
                                type="file"
                                fieldRenderProps={
                                    {
                                        ...props,
                                        input: {
                                            ...input,
                                            onChange: (event => {
                                                let file: File = event.target.files[0];
                                                handleFileChange("fileResourceId", file, form);
                                            }),
                                            accept: "application/pdf"
                                        }
                                    }
                                }
                            />
                        )}
                    </Field>
                </Form.Group>
                {
                    uploadProgress["fileResourceId"] ?
                        (<ProgressBar now={uploadProgress["fileResourceId"]} />) :
                        null
                }
                <Form.Group className="mb-3" controlId="imageId">
                    <Form.Label>Upload cover image</Form.Label>
                    <Field
                        name="imageId"
                        validate={anyValidator(requiredValidator)}
                    >
                        {({input: {onChange, value, ...input}, ...props}) => (
                            <FormControl
                                type="file"
                                fieldRenderProps={
                                    {
                                        ...props,
                                        input: {
                                            ...input,
                                            onChange: (event => {
                                                let file: File = event.target.files[0];
                                                handleFileChange("imageId", file, form);
                                            }),
                                            accept: "image/jpeg, image/png"
                                        }
                                    }
                                }
                            />
                        )}
                    </Field>
                </Form.Group>
                {
                    uploadProgress["imageId"] ?
                        (<StyledProgressBar now={uploadProgress["imageId"]} />) :
                        null
                }
                <Button.Submit submitting={submitting}>
                    Upload
                </Button.Submit>
                <Button variant="secondary" type="button" disabled={submitting} onClick={() => navigateTo(-1)}>
                    Back
                </Button>
            </Form>
        );
    }

    const renderSuccess = ({form}: FormRenderProps) => {
        return (
            <Form>
                <Alert variant="success">
                        You have successfully uploaded a book.
                </Alert>
                <Button
                    variant="success"
                    type="button"
                    onClick={() => {
                        form.reset();
                        setRenderSuccessPage(false);
                    }}
                >
                    Upload another book
                </Button>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={() => navigateTo("/dashboard")}
                >
                    Back to dashboard
                </Button>
            </Form>
        );
    }

    return (
        <Backdrop source={"src/assets/background_book_circle.jpg"}>
            <CenteredContainer>
                <StyledCard body>
                    <CardTitle>Upload a book</CardTitle>
                    <FinalForm
                        onSubmit={(values: any) => handleSubmit(values)}
                        subscription={{values: true, pristine: true, submitting: true}}
                        render={renderSuccessPage ? renderSuccess : renderForm}
                        initialValues={getInitialValues()}
                    />
                </StyledCard>
            </CenteredContainer>
        </Backdrop>
    );
}

export default UploadBook;

export {UploadBook};