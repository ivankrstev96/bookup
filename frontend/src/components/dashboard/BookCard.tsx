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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget est lorem ipsum dolor sit amet. Neque egestas congue quisque egestas diam. Etiam tempor orci eu lobortis elementum. Aliquet bibendum enim facilisis gravida neque convallis a cras. Quis blandit turpis cursus in. Ullamcorper morbi tincidunt ornare massa. At risus viverra adipiscing at in tellus integer. Posuere ac ut consequat semper viverra nam libero. Fames ac turpis egestas sed tempus. Congue quisque egestas diam in arcu cursus euismod quis. Lacus laoreet non curabitur gravida arcu ac tortor.
                    </p>
                </Col>
            </Row>
        </StyledCard>
    );
}

export default BookCard;

export {BookCard}