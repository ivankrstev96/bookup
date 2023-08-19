ALTER TABLE IF EXISTS public.file_resource
    ADD COLUMN book_inserted boolean NOT NULL DEFAULT false;