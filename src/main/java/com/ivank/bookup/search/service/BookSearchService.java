package com.ivank.bookup.search.service;

import com.ivank.bookup.dto.BookDto;
import com.ivank.bookup.dto.mapper.BookMapper;
import com.ivank.bookup.model.Book;
import com.ivank.bookup.search.model.BookIndex;
import lombok.RequiredArgsConstructor;
import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookSearchService {

    private final EntityManager entityManager;

    private final BookMapper bookMapper;

    public Page<BookDto> search(
            String searchQuery,
            Pageable pageable
    ) {
        FullTextEntityManager fullTextEntityManager
                = Search.getFullTextEntityManager(entityManager);

        QueryBuilder queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(BookIndex.class)
                .get();


        Query query = queryBuilder
                .keyword()
                .fuzzy()
                .withEditDistanceUpTo(2)
                .withPrefixLength(0)
                .onFields("name", "content")
                .matching(searchQuery)
                .createQuery();


        FullTextQuery fullTextQuery
                = fullTextEntityManager.createFullTextQuery(query, BookIndex.class);

        fullTextQuery.setFirstResult(pageable.getPageSize() * pageable.getPageNumber());
        fullTextQuery.setMaxResults(pageable.getPageSize());

        List<BookDto> results = getBookDtoResultsFromQuery(fullTextQuery);

        return new PageImpl<>(results, pageable, fullTextQuery.getResultSize());
    }

    private List<BookDto> getBookDtoResultsFromQuery(FullTextQuery fullTextQuery) {
        List resultList = fullTextQuery.getResultList();
        if (resultList.isEmpty()) {
            return new ArrayList<>();
        }

        if (!(resultList.get(0) instanceof BookIndex)) {
            throw new RuntimeException();
        }

        return ((List<BookIndex>) resultList)
                .stream()
                .map(bookIndex -> {
                    Book book = bookIndex.getBook();
                    return bookMapper.toDto(book);
                })
                .collect(Collectors.toList());
    }
}
