package com.ivank.bookup.search.repository;

import com.ivank.bookup.search.model.BookIndex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookIndexRepository extends JpaRepository<BookIndex, Long> {
}
