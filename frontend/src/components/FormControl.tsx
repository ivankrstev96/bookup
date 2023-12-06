import {Form} from "react-bootstrap";
import {FieldRenderProps} from "react-final-form";
import {FormControlProps} from 'react-bootstrap/FormControl'

interface Props extends Omit<FormControlProps, "value" | "onChange"> {
    fieldRenderProps: FieldRenderProps<string | undefined>,
    errorMessageMap?: { [index: string]: string }
}

export const defaultErrorMessageMap: { [index: string]: string } = {
    REQUIRED: "This field is required!",
    INVALID_EMAIL: "This is not a valid email!",
    DOES_NOT_EQUAL: "This is not the correct value!"
}

const FormControl = ({fieldRenderProps, errorMessageMap = defaultErrorMessageMap, ...props}: Props) => {

    const getError = (): string | undefined => {
        const {meta} = fieldRenderProps;

        if (!meta.touched) {
            return undefined;
        }

        if (meta.modifiedSinceLastSubmit) {
            return undefined;
        }

        if (!meta.error) {
            return undefined;
        }

        return errorMessageMap[meta.error];
    }

    const error = getError();

    return (
        <>
            <Form.Control
                value={fieldRenderProps.input.value}
                onChange={fieldRenderProps.input.onChange}
                isInvalid={error !== undefined}
                {...props}
            />
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </>
    )

}

FormControl.Feedback = Form.Control.Feedback;

export {FormControl};

export default FormControl;

