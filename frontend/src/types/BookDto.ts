import {FileResourceDto} from "./FileResourceDto";
import {UserDto} from "./UserDto";

export interface BookDto {
    id: number,
    name: string,
    bookType: BookType,
    fileResource: FileResourceDto
    createdBy: UserDto
}

export enum BookType {
    PDF = "PDF",
}