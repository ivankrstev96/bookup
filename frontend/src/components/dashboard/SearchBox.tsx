import {Col, Form, InputGroup, Row} from "react-bootstrap";
import {Search} from "react-feather";
import styled from "styled-components";
import Backdrop from "../Backdrop";
import Button from "../Button";
import {useContext} from "react";
import {SearchContext} from "../../context/SearchContext";

const SearchWrapper = styled.div`
  height: 150px;
  width: 100%;
  margin-bottom: 40px;
`;

const StyledBackdrop = styled(Backdrop)`
  padding: 50px 20px 0 20px;
`;

const StyledHeading = styled.h2`
  color: white;
  //text-align: center;
`

const InputGroupButton = styled(Button)`
  background-color: white;
  color: saddlebrown;

  &:hover {
    background-color: saddlebrown;
  }
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

    return (
        <SearchWrapper>
            <StyledBackdrop source={"src/assets/bookshelf-wide.png"}>
                <Row className="justify-content-md-center">
                    <Col md={9}>
                        <StyledHeading style={{color: "white"}}>Find the book you're looking for!</StyledHeading>
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
            </StyledBackdrop>
        </SearchWrapper>
    );
}

export default SearchBox;

export {SearchBox}