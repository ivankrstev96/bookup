import {Col, Form, InputGroup, Row} from "react-bootstrap";
import {LogOut, Search} from "react-feather";
import styled from "styled-components";
import Backdrop from "../Backdrop";
import Button from "../Button";
import {useContext} from "react";
import {SearchContext} from "../../context/SearchContext";
import {useNavigate} from "react-router-dom";
import {IconButton} from "../IconButton";
import {AuthContext} from "../../context/AuthContext";

const SearchWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const StyledBackdrop = styled(Backdrop)`
  padding: 50px 20px 20px 20px;
`;

const StyledHeading = styled.h2`
  color: white;
  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;

const InputGroupButton = styled(Button)`
  background-color: white;
  color: saddlebrown;

  &:hover {
    background-color: saddlebrown;
  }
`;

const StyledUploadButton = styled(Button)`
  color: saddlebrown;
  background-color: white;
  width: fit-content;
  align-self: flex-end;

  &:hover {
    background-color: saddlebrown;
  }

  @media only screen and (max-width: 768px) {
      align-self: center;
      margin-bottom: 10px;
  }
`;

const StyledIconButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledUploadButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

interface Props {
    handleSearch: () => {}
}

const SearchBox = ({handleSearch}: Props) => {
    const {
        searching,
        query,
        setQuery
    } = useContext(SearchContext);

    const navigateTo = useNavigate();
    const {logout} = useContext(AuthContext);

    return (
        <SearchWrapper>
            <StyledBackdrop source={"src/assets/bookshelf-wide.png"}>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <StyledHeading>Find the book you're looking for!</StyledHeading>
                    </Col>
                    <Col md={3}>
                        <StyledUploadButtonContainer>
                            <StyledUploadButton
                                variant="secondary"
                                type="button"
                                onClick={() => navigateTo("/upload-book")}
                            >
                                Upload a new book
                            </StyledUploadButton>
                        </StyledUploadButtonContainer>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md="9">
                        <InputGroup>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-1"
                                aria-label="Search"
                                value={query}
                                onChange={event => setQuery(event.target.value)}
                            />
                            <InputGroupButton
                                variant="outline-secondary"
                                onClick={() => handleSearch()}
                                disabled={searching}
                            >
                                <Search/>
                            </InputGroupButton>
                        </InputGroup>
                    </Col>
                </Row>
                <StyledIconButtonContainer>
                    <IconButton hoverText={"Log out"} placement={"left-end"}>
                        <LogOut color={"white"} onClick={() => logout()}/>
                    </IconButton>
                </StyledIconButtonContainer>
            </StyledBackdrop>
        </SearchWrapper>
    );
}

export default SearchBox;

export {SearchBox}