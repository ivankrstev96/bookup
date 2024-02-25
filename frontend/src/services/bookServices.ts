import axios from "./http";
import {PageableParams} from "../types/PageableParams";
import {PageableResponse} from "../types/PageableResponse";
import {BookDto} from "../types/BookDto";
import {BookUpsertDto} from "../types/BookUpsertDto";

const apiUri = `/api/v1/books`;

export const searchBooks = (pageableParams: PageableParams, query?: string): Promise<PageableResponse<BookDto>> => {
    const params: any = {
        page: pageableParams.page,
        size: pageableParams.size,
        query
    }
    return axios.get(`${apiUri}/search`, {params})
        .then(response => response.data);
}

export const submitBook = (bookUpsertDto: BookUpsertDto): Promise<BookDto> => {
    return axios.post(apiUri, bookUpsertDto)
        .then(response => response.data);
}
