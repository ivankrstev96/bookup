import {Card, Col, Row} from "react-bootstrap";
import styled from "styled-components";
import {BookDto} from "../../types/BookDto";

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  padding: 20px
`;

interface Props {
    book: BookDto
}


const BookCard = (props: Props) => {
    const {book} = props;

    return (
        <StyledCard>
            <Row>
                <Col xs={6} md={5} lg={4} xl={3} xxl={2}>Image here</Col>
                <Col>
                    <h4>{book.name}</h4>
                    <p>
                        {book.description}
                    </p>
                </Col>
            </Row>
        </StyledCard>
    );
}

export default BookCard;

export {BookCard}