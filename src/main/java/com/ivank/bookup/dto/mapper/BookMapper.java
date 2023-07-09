package com.ivank.bookup.dto.mapper;


import com.ivank.bookup.dto.BookDto;
import com.ivank.bookup.dto.BookUpsertDto;
import com.ivank.bookup.model.Book;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {
                FileResourceMapper.class,
                UserMapper.class
        }
)
public interface BookMapper {

    BookMapper mapper = Mappers.getMapper(BookMapper.class);

    Book upsertDtoToModel(BookUpsertDto bookUpsertDto);

    BookDto toDto(Book book);

    List<BookDto> toDtoList(List<Book> books);

}