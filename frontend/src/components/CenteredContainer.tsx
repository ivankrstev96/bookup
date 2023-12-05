import React from "react";
import styled from "styled-components";


const FlexContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props extends React.ComponentProps<"div"> {
}

const CenteredContainer = (props: Props) => {
    const {children, ...rest} = props;

    return (
        <FlexContainer {...rest} >
            {children}
        </FlexContainer>
    );
}

export default CenteredContainer;

export {CenteredContainer}