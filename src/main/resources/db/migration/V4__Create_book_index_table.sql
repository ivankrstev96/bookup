CREATE TABLE public.book_index
(
    id bigserial NOT NULL,
    name character varying NOT NULL,
    content character varying NOT NULL,
    book_id bigserial NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_book_index_book FOREIGN KEY (book_id)
        REFERENCES public.book (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.book_index
    OWNER to postgres;