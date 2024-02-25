import {OverlayTrigger, OverlayTriggerProps, Tooltip} from "react-bootstrap";

interface Props extends Omit<OverlayTriggerProps, "overlay"> {
    hoverText: string
}

const IconButton = (props: Props) => {
    const {children, hoverText, ...restProps} = props;
    return (
        <OverlayTrigger
            overlay={
                <Tooltip>
                    {hoverText}
                </Tooltip>
            }
            {...restProps}
        >
            {children}
        </OverlayTrigger>
    );
}

export default IconButton;

export {IconButton}