import {Card, Col, Row, Image, Button} from "react-bootstrap";
import styled from "styled-components";
import {BookDto} from "../../types/BookDto";
import {Download} from "react-feather";
import {Link} from "react-router-dom";

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  padding: 20px
`;

const StyledParagraph = styled.p`
  white-space: pre-wrap;
`;

const StyledImage = styled(Image)`
  border: 0;
  padding: 0;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

interface Props {
    book: BookDto
}


const BookCard = (props: Props) => {
    const {book} = props;

    const imageSrc = `/api/v1/public/file-resources/${book.image.id}`;
    const bookSrc = `/api/v1/public/file-resources/${book.fileResource.id}`;

    return (
        <StyledCard>
            <Row>
                <Col xs={6} md={5} lg={4} xl={3} xxl={2}>
                    <StyledImage src={imageSrc} thumbnail/>
                    <StyledLink to={bookSrc} target="_blank">
                        <div className="d-grid gap-2 mt-2">
                            <Button variant="success">
                                <Download size={"20px"}/>{" "}
                                Download
                            </Button>
                        </div>
                    </StyledLink>
                </Col>
                <Col>
                    <h4>{book.name}</h4>
                    <StyledParagraph>
                        {book.description}
                    </StyledParagraph>
                </Col>
            </Row>
        </StyledCard>
    );
}

export default BookCard;

export {BookCard}