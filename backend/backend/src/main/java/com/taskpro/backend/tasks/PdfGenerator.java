package com.taskpro.backend.tasks;

import com.lowagie.text.*;
import com.lowagie.text.pdf.CMYKColor;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

public class PdfGenerator {
    public void generate(List<CountType> countType ,HttpServletResponse httpServletResponse) throws IOException {

        Document document = new Document(PageSize.A4);

        PdfWriter.getInstance(document, httpServletResponse.getOutputStream());

        document.open();

        Font fontTitle = FontFactory.getFont(FontFactory.TIMES_ROMAN);
        fontTitle.setSize(20);

        Paragraph paragraph1 = new Paragraph("Task alignment", fontTitle);

        paragraph1.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(paragraph1);

        PdfPTable table = new PdfPTable(2);

        table.setWidthPercentage(100f);
        table.setWidths(new int[] {4,4});
        table.setSpacingBefore(5);

        PdfPCell cell = new PdfPCell();

        cell.setBackgroundColor(CMYKColor.BLUE);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.TIMES_ROMAN);
        font.setColor(CMYKColor.WHITE);
        // Adding headings in the created table cell or  header
        // Adding Cell to table
        cell.setPhrase(new Phrase("Number of tasks", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Status", font));
        table.addCell(cell);

        for(CountType countType1: countType){
            table.addCell(String.valueOf(countType1.getCount()));
            table.addCell(String.valueOf(countType1.getStatus()));
        }

        document.add(table);
        document.close();

    }
}
