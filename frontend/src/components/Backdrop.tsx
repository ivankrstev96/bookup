import React from "react";
import styled from "styled-components";


const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

interface Props extends React.ComponentProps<"div"> {
    source: string
}

const Backdrop = (props: Props) => {
    const {children, source, ...rest} = props;

    return (
        <BackgroundContainer
            style={{backgroundImage: `url(${source})`}}
            {...rest}
        >
            {children}
        </BackgroundContainer>
    );
}

export default Backdrop;

export {Backdrop}