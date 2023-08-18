package com.ivank.bookup.service.impl;

import com.ivank.bookup.model.Book;
import com.ivank.bookup.model.FileResource;
import com.ivank.bookup.service.PdfTextExtractorService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PdfTextExtractorServiceImpl implements PdfTextExtractorService {


    @Override
    public String extract(Book book) {
        FileResource fileResource = book.getFileResource();

        String text;

        try (final PDDocument document = PDDocument.load(ArrayUtils.toPrimitive(fileResource.getBytes()))) {
            final PDFTextStripper pdfStripper = new PDFTextStripper();
            text = pdfStripper.getText(document);
        } catch (final Exception ex) {
            log.error("Error parsing PDF", ex);
            throw new RuntimeException();
        }

        return text;
    }
}
