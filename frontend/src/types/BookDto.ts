import {FileResourceDto} from "./FileResourceDto";
import {UserDto} from "./UserDto";
import {BookType} from "./BookType";

export interface BookDto {
    id: number,
    name: string,
    description: string,
    bookType: BookType,
    fileResource: FileResourceDto,
    image: FileResourceDto,
    createdBy: UserDto
}