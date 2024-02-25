import {BookType} from "./BookType";

export interface BookUpsertDto {
    name: string,
    description: string,
    type: BookType,
    fileResourceId: number,
    imageId: number
}