import {createContext, useState} from "react";
import {PageableParams} from "../types/PageableParams";

export interface PagingResponseData {
    totalElements: number,
    totalPages: number
}

export interface SearchContextProps {
    searching: boolean,
    pageableParams: PageableParams,
    query: string,
    pagingResponseData?: PagingResponseData
    setSearching: (searching: boolean) => void,
    setQuery: (query: string) => void,
    setPage: (page?: number) => void,
    setSize: (size?: number) => void,
    setPagingResponseData: (pagingResponseData?: PagingResponseData) => void,
}

const defaultContextState: SearchContextProps = {
    searching: false,
    pageableParams: {
        page: 0,
        size: 4
    },
    query: "",
    setSearching: () => {
    },
    setQuery: () => {
    },
    setPage: () => {
    },
    setSize: () => {
    },
    setPagingResponseData: () => {
    },
}
export const SearchContext = createContext(defaultContextState);

export const SearchContextProvider = (props: any) => {

    const setSearching = (searching: boolean) => {
        setSearchState(searchState => ({
            ...searchState,
            searching
        }));
    }

    const setQuery = (query: string) => {
        setSearchState(searchState => ({
            ...searchState,
            query
        }));
    }
    const setPage = (page?: number) => {
        setSearchState(searchState => ({
            ...searchState,
            pageableParams: {
                ...searchState.pageableParams,
                page
            }
        }));
    }
    const setSize = (size?: number) => {
        setSearchState(searchState => ({
            ...searchState,
            pageableParams: {
                ...searchState.pageableParams,
                size
            }
        }));
    }

    const setPagingResponseData = (pagingResponseData?: PagingResponseData) => {
        setSearchState(searchState => ({
            ...searchState,
            pagingResponseData
        }));
    }

    const initialState: SearchContextProps = {
        ...defaultContextState,
        setSearching,
        setQuery,
        setPage,
        setSize,
        setPagingResponseData
    };

    const [searchState, setSearchState] = useState(initialState);

    return (
        <SearchContext.Provider value={searchState}>
            {props.children}
        </SearchContext.Provider>
    );

}