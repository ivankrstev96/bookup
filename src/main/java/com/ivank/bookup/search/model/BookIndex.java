package com.ivank.bookup.search.model;

import com.ivank.bookup.model.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;

@Entity
@Table(name = "book_index")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Indexed
public class BookIndex {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    @Field(name = "name")
    private String name;

    @Column(name = "content")
    @Field(name = "content")
    private String content;

    @OneToOne
    @JoinColumn(name = "book_id", referencedColumnName = "id")
    private Book book;


}
