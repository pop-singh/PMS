package com.courier.service;

import com.courier.dto.InvoiceData;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class PdfService {

    public byte[] generateInvoicePdf(InvoiceData invoiceData) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            // Add header
            addHeader(document, invoiceData);
            
            // Add invoice details
            addInvoiceDetails(document, invoiceData);
            
            // Add receiver information
            addReceiverInfo(document, invoiceData);
            
            // Add parcel information
            addParcelInfo(document, invoiceData);
            
            // Add timing information
            addTimingInfo(document, invoiceData);
            
            // Add payment information
            addPaymentInfo(document, invoiceData);
            
            // Add footer
            addFooter(document);

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF", e);
        }
    }

    private void addHeader(Document document, InvoiceData invoiceData) throws Exception {
        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        PdfFont regularFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);

        // Company header
        Paragraph companyHeader = new Paragraph("COURIER SERVICE MANAGEMENT")
            .setFont(boldFont)
            .setFontSize(20)
            .setFontColor(ColorConstants.DARK_GRAY);
        document.add(companyHeader);

        // Invoice title
        Paragraph invoiceTitle = new Paragraph("INVOICE")
            .setFont(boldFont)
            .setFontSize(16)
            .setFontColor(ColorConstants.BLUE);
        document.add(invoiceTitle);

        // Invoice number
        Paragraph invoiceNumber = new Paragraph("Invoice #: " + invoiceData.getInvoiceNumber())
            .setFont(regularFont)
            .setFontSize(12);
        document.add(invoiceNumber);

        document.add(new Paragraph(""));
    }

    private void addInvoiceDetails(Document document, InvoiceData invoiceData) throws Exception {
        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        PdfFont regularFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);

        Paragraph sectionTitle = new Paragraph("INVOICE DETAILS")
            .setFont(boldFont)
            .setFontSize(14)
            .setFontColor(ColorConstants.BLUE);
        document.add(sectionTitle);

        Table table = new Table(2).useAllAvailableWidth();
        
        addTableRow(table, "Booking ID", invoiceData.getBookingId(), boldFont, regularFont);
        addTableRow(table, "Payment ID", invoiceData.getPaymentId(), boldFont, regularFont);
        addTableRow(table, "Transaction ID", invoiceData.getTransactionId(), boldFont, regularFont);
        addTableRow(table, "Invoice Number", invoiceData.getInvoiceNumber(), boldFont, regularFont);

        document.add(table);
        document.add(new Paragraph(""));
    }

    private void addReceiverInfo(Document document, InvoiceData invoiceData) throws Exception {
        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        PdfFont regularFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);

        Paragraph sectionTitle = new Paragraph("RECEIVER INFORMATION")
            .setFont(boldFont)
            .setFontSize(14)
            .setFontColor(ColorConstants.BLUE);
        document.add(sectionTitle);

        Table table = new Table(2).useAllAvailableWidth();
        
        addTableRow(table, "Name", invoiceData.getReceiverName(), boldFont, regularFont);
        addTableRow(table, "Address", invoiceData.getReceiverAddress(), boldFont, regularFont);
        addTableRow(table, "Mobile", invoiceData.getReceiverMobile(), boldFont, regularFont);

        document.add(table);
        document.add(new Paragraph(""));
    }

    private void addParcelInfo(Document document, InvoiceData invoiceData) throws Exception {
        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        PdfFont regularFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);

        Paragraph sectionTitle = new Paragraph("PARCEL INFORMATION")
            .setFont(boldFont)
            .setFontSize(14)
            .setFontColor(ColorConstants.BLUE);
        document.add(sectionTitle);

        Table table = new Table(2).useAllAvailableWidth();
        
        addTableRow(table, "Weight", invoiceData.getParcelWeight() + "g", boldFont, regularFont);
        addTableRow(table, "Contents", invoiceData.getParcelContents(), boldFont, regularFont);
        addTableRow(table, "Delivery Type", invoiceData.getDeliveryType(), boldFont, regularFont);
        addTableRow(table, "Packing Preference", invoiceData.getPackingPreference(), boldFont, regularFont);

        document.add(table);
        document.add(new Paragraph(""));
    }

    private void addTimingInfo(Document document, InvoiceData invoiceData) throws Exception {
        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        PdfFont regularFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);

        Paragraph sectionTitle = new Paragraph("TIMING INFORMATION")
            .setFont(boldFont)
            .setFontSize(14)
            .setFontColor(ColorConstants.BLUE);
        document.add(sectionTitle);

        Table table = new Table(2).useAllAvailableWidth();
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        
        String pickupTime = invoiceData.getPickupTime() != null ? 
            invoiceData.getPickupTime().format(formatter) : "Not scheduled";
        String dropoffTime = invoiceData.getDropoffTime() != null ? 
            invoiceData.getDropoffTime().format(formatter) : "Not scheduled";
        String paymentTime = invoiceData.getPaymentTime() != null ? 
            invoiceData.getPaymentTime().format(formatter) : "Not available";
        
        addTableRow(table, "Pickup Time", pickupTime, boldFont, regularFont);
        addTableRow(table, "Drop-off Time", dropoffTime, boldFont, regularFont);
        addTableRow(table, "Payment Time", paymentTime, boldFont, regularFont);

        document.add(table);
        document.add(new Paragraph(""));
    }

    private void addPaymentInfo(Document document, InvoiceData invoiceData) throws Exception {
        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        PdfFont regularFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);

        Paragraph sectionTitle = new Paragraph("PAYMENT INFORMATION")
            .setFont(boldFont)
            .setFontSize(14)
            .setFontColor(ColorConstants.BLUE);
        document.add(sectionTitle);

        Table table = new Table(2).useAllAvailableWidth();
        
        addTableRow(table, "Service Cost", "₹" + invoiceData.getServiceCost(), boldFont, regularFont);
        addTableRow(table, "Payment Type", "Credit/Debit Card", boldFont, regularFont);
        addTableRow(table, "Status", "PAID", boldFont, regularFont);

        document.add(table);
        document.add(new Paragraph(""));
    }

    private void addFooter(Document document) throws Exception {
        PdfFont regularFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);

        Paragraph footer = new Paragraph("Thank you for choosing our courier service!")
            .setFont(regularFont)
            .setFontSize(10)
            .setFontColor(ColorConstants.GRAY);
        document.add(footer);
    }

    private void addTableRow(Table table, String label, String value, PdfFont boldFont, PdfFont regularFont) {
        Cell labelCell = new Cell().add(new Paragraph(label).setFont(boldFont));
        Cell valueCell = new Cell().add(new Paragraph(value != null ? value : "").setFont(regularFont));
        
        labelCell.setBorder(null);
        valueCell.setBorder(null);
        
        table.addCell(labelCell);
        table.addCell(valueCell);
    }
} 