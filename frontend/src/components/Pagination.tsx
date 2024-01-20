import {Pagination as ReactBootstrapPagination} from "react-bootstrap";


interface Props {
    page: number,
    totalPages: number
    handlePageChange: (page: number) => void,
    disabled: boolean

}

const Pagination = (props: Props) => {
    const {
        page,
        totalPages,
        handlePageChange,
        disabled
    } = props;

    return (
        <ReactBootstrapPagination>
            <ReactBootstrapPagination.First
                onClick={() => handlePageChange(0)}
                disabled={page === 0 || disabled}
            />
            <ReactBootstrapPagination.Prev
                onClick={() => handlePageChange(page + 1)}
                disabled={page === 0 || disabled}
            />

            {page > 1 ? (
                <ReactBootstrapPagination.Item
                    onClick={() => handlePageChange(page - 2)}
                    disabled={disabled}
                >
                    {page - 1}
                </ReactBootstrapPagination.Item>
            ) : null}
            {page > 0 ? (
                <ReactBootstrapPagination.Item
                    onClick={() => handlePageChange(page - 1)}
                    disabled={disabled}
                >
                    {page}
                </ReactBootstrapPagination.Item>
            ) : null}

            <ReactBootstrapPagination.Item active>{page + 1}</ReactBootstrapPagination.Item>

            {page < totalPages - 1 ? (
                <ReactBootstrapPagination.Item
                    onClick={() => handlePageChange(page + 1)}
                    disabled={disabled}
                >
                    {page + 2}
                </ReactBootstrapPagination.Item>
            ) : null}
            {page < totalPages - 2 ? (
                <ReactBootstrapPagination.Item
                    onClick={() => handlePageChange(page + 2)}
                    disabled={disabled}
                >
                    {page + 3}
                </ReactBootstrapPagination.Item>
            ) : null}

            <ReactBootstrapPagination.Next
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages - 1 || disabled}
            />
            <ReactBootstrapPagination.Last
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={page === totalPages - 1 || disabled}
            />
        </ReactBootstrapPagination>
    );
}

export default Pagination;

export {Pagination}