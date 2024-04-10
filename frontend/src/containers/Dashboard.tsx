import {BookList, Pagination, SearchBox} from "../components";
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import {useContext, useEffect, useState} from "react";
import {PagingResponseData, SearchContext} from "../context/SearchContext";
import {searchBooks} from "../services/bookServices";
import {BookDto} from "../types/BookDto";
import styled from "styled-components";

const PageSizeFromControl = styled(Form.Control)`
  width: 4.5em !important;
`;

const Dashboard = () => {

    const {
        searching,
        setSearching,
        query,
        pageableParams,
        setPagingResponseData,
        pagingResponseData,
        setPage,
        setSize
    } = useContext(SearchContext);
    const {page, size} = pageableParams;

    const [books, setBooks] = useState([] as Array<BookDto>);


    useEffect(() => {
        handleSearch();
    }, [page, size]);


    const handleSearch = async () => {
        setSearching(true);

        try {
            const response = await searchBooks(pageableParams, query);

            const pagingResponseData: PagingResponseData = {
                totalElements: response.totalElements,
                totalPages: response.totalPages
            }
            setPagingResponseData(pagingResponseData);

            setBooks(response.content);
        } catch (e) {

        }

        setSearching(false);
    }

    const renderLoader = () => {
        if (!searching) {
            return null;
        }
        return (
            <Row className="justify-content-md-center me-0">
                <Col className="col-md-auto">
                    <Spinner animation="border"/>
                </Col>
            </Row>
        );
    }

    const renderPagination = () => {
        if (!books.length || !pagingResponseData) {
            return null;
        }

        return (
            <Container>
                <Row className="justify-content-md-center mt-3">
                    <Col className="col-md-auto">
                        <Pagination
                            page={pageableParams.page!}
                            totalPages={pagingResponseData!.totalPages}
                            handlePageChange={setPage}
                            disabled={searching}
                        />
                    </Col>
                    <Col className="col-md-auto">
                        <InputGroup>
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Page size
                            </InputGroup.Text>
                            <PageSizeFromControl
                                type="number"
                                value={pageableParams.size!}
                                onChange={event => {
                                    if (!event.target.value || event.target.value === "") {
                                        setSize(1);
                                        return;
                                    }

                                    let value = parseInt(event.target.value);
                                    if (value < 1) {
                                        value = 1;
                                    }
                                    if (value > 999) {
                                        value = 999
                                    }
                                    setSize(value)
                                }}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <>
            <SearchBox handleSearch={handleSearch}/>
            {renderLoader()}
            {!!books.length && !searching
                ? (<BookList books={books}/>)
                : null}
            {renderPagination()}
        </>
    );

}

export {Dashboard}

export default Dashboard;
