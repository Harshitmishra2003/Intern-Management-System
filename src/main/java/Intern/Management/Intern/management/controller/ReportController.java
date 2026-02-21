package Intern.Management.Intern.management.controller;



import java.io.ByteArrayOutputStream;
import java.util.List;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import Intern.Management.Intern.management.entities.Batch;
import Intern.Management.Intern.management.entities.Intern;
import Intern.Management.Intern.management.services.ReportService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/batch/{id}")
    public ResponseEntity<byte[]> generateBatchReport(@PathVariable Long id) {

        Batch batch = reportService.getBatch(id);
        List<Intern> interns = reportService.getInternsByBatch(id);

        if (batch == null) {
            throw new RuntimeException("Batch not found");
        }

        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);

            document.open();

            document.add(new Paragraph("Batch Report"));
            document.add(new Paragraph("Batch Name: " + batch.getName()));
            document.add(new Paragraph("Status: " + batch.getStatus()));
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(3);
            table.addCell("Intern ID");
            table.addCell("Name");
            table.addCell("Email");

            if (interns != null) {
                for (Intern i : interns) {
                    table.addCell(String.valueOf(i.getInternId()));
                    table.addCell(i.getName());
                    table.addCell(i.getEmail());
                }
            }

            document.add(table);
            document.close();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);

            return new ResponseEntity<>(out.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("PDF generation failed");
        }
    
    }
}
