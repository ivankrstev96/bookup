import {Col, Row} from "react-bootstrap";
import styled from "styled-components";
import {BookDto} from "../../types/BookDto";
import {BookCard} from "./BookCard";

const BookListWrapper = styled.div`
  padding: 0 20px 0 20px;
`;

interface Props {
    books: Array<BookDto>
}


const BookList = (props: Props) => {
    const {books} = props;

    const renderBooks = () => {
        return (
            <>
                {books.map((book, index) => (
                    <BookCard key={index} book={book}/>
                ))}
            </>
        )
    }

    return (
        <BookListWrapper>
            <Row className="justify-content-md-center">
                <Col md="9">
                    {renderBooks()}
                </Col>
            </Row>
        </BookListWrapper>
    );
}

export default BookList;

export {BookList}