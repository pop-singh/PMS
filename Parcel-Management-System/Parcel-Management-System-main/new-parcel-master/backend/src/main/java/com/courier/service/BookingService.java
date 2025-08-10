package com.courier.service;

import com.courier.dto.BookingPage;
import com.courier.model.Booking;
import com.courier.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking getBookingById(String bookingId) {
        try {
            return bookingRepository.findByBookingId(bookingId).orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    public Booking updateBooking(Booking booking) {
        try {
            return bookingRepository.save(booking);
        } catch (Exception e) {
            return null;
        }
    }

    public BookingPage getCustomerBookingsPaginated(Long customerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Booking> bookingPage = bookingRepository.findByCustomerIdOrderByCreatedAtDesc(customerId, pageable);
        
        return new BookingPage(
            bookingPage.getContent(),
            bookingPage.getTotalElements(),
            bookingPage.getTotalPages(),
            bookingPage.getNumber(),
            bookingPage.getSize()
        );
    }

    public BookingPage getAllBookingsPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Booking> bookingPage = bookingRepository.findAllByOrderByCreatedAtDesc(pageable);
        
        return new BookingPage(
            bookingPage.getContent(),
            bookingPage.getTotalElements(),
            bookingPage.getTotalPages(),
            bookingPage.getNumber(),
            bookingPage.getSize()
        );
    }

    public List<Booking> getAllBookings() {
        try {
            return bookingRepository.findAll();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    // =========================
    // Export / Report Functions
    // =========================

    // Imports required for export/report generation
    // Keeping imports scoped here in the edit for clarity
    // In the actual file, these will appear at the top of the file
    // ... existing code ...

    public void exportCustomerBookings(Long customerId) {
        // Default export to an Excel file on disk with a sensible filename
        try {
            List<Booking> bookings = bookingRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
            String filename = "customer-" + customerId + "-bookings.xlsx";
            generateExcelReport(bookings, filename);
        } catch (Exception e) {
            throw new RuntimeException("Failed to export customer bookings", e);
        }
    }

    public byte[] exportCustomerBookings(Long customerId, String format) {
        try {
            List<Booking> bookings = bookingRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
            if (bookings == null) {
                bookings = new ArrayList<>();
            }

            if (format == null) {
                format = "xlsx";
            }

            String normalized = format.trim().toLowerCase();
            switch (normalized) {
                case "xlsx":
                case "excel":
                    return ExportUtil.toExcelBytes(bookings);
                case "pdf":
                    return ExportUtil.toPdfBytes(bookings);
                default:
                    throw new IllegalArgumentException("Unsupported export format: " + format);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to export customer bookings", e);
        }
    }

    public void generateExcelReport(List<Booking> bookings, String filename) {
        try {
            ExportUtil.writeExcelToFile(bookings, filename);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate Excel report", e);
        }
    }

    public void generatePdfReport(List<Booking> bookings, String filename) {
        try {
            ExportUtil.writePdfToFile(bookings, filename);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF report", e);
        }
    }

    // =========================
    // Internal export helper
    // =========================
    private static class ExportUtil {
        // Apache POI
        private static final org.apache.poi.ss.usermodel.CellStyle HEADER_STYLE;
        private static final org.apache.poi.ss.usermodel.CellStyle DATE_STYLE;

        static {
            // Prepare minimal styles using a temporary workbook (styles are workbook-bound)
            org.apache.poi.xssf.usermodel.XSSFWorkbook wb = new org.apache.poi.xssf.usermodel.XSSFWorkbook();
            HEADER_STYLE = wb.createCellStyle();
            org.apache.poi.ss.usermodel.Font headerFont = wb.createFont();
            headerFont.setBold(true);
            HEADER_STYLE.setFont(headerFont);

            DATE_STYLE = wb.createCellStyle();
            short dateFormat = wb.getCreationHelper().createDataFormat().getFormat("yyyy-MM-dd HH:mm");
            DATE_STYLE.setDataFormat(dateFormat);
            try { wb.close(); } catch (Exception ignored) {}
        }

        static byte[] toExcelBytes(List<Booking> bookings) throws Exception {
            try (org.apache.poi.xssf.usermodel.XSSFWorkbook workbook = new org.apache.poi.xssf.usermodel.XSSFWorkbook();
                 java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream()) {

                org.apache.poi.ss.usermodel.Sheet sheet = workbook.createSheet("Bookings");

                // Header
                String[] headers = new String[]{
                    "Booking ID", "Customer Name", "Receiver Name", "Receiver Mobile", "Receiver Address",
                    "Weight (g)", "Delivery Type", "Packing", "Status", "Service Cost",
                    "Created At", "Payment Time", "Pickup Time", "Dropoff Time"
                };
                org.apache.poi.ss.usermodel.Row headerRow = sheet.createRow(0);
                for (int i = 0; i < headers.length; i++) {
                    org.apache.poi.ss.usermodel.Cell cell = headerRow.createCell(i);
                    cell.setCellValue(headers[i]);
                    // Basic bold style for header
                    org.apache.poi.ss.usermodel.CellStyle style = workbook.createCellStyle();
                    org.apache.poi.ss.usermodel.Font font = workbook.createFont();
                    font.setBold(true);
                    style.setFont(font);
                    cell.setCellStyle(style);
                }

                java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

                // Rows
                int rowIdx = 1;
                for (Booking b : bookings) {
                    org.apache.poi.ss.usermodel.Row row = sheet.createRow(rowIdx++);
                    int col = 0;
                    row.createCell(col++).setCellValue(safe(b.getBookingId()));
                    row.createCell(col++).setCellValue(b.getCustomer() != null ? safe(b.getCustomer().getCustomerName()) : "");
                    row.createCell(col++).setCellValue(safe(b.getReceiverName()));
                    row.createCell(col++).setCellValue(safe(b.getReceiverMobile()));
                    row.createCell(col++).setCellValue(safe(b.getReceiverAddress()));
                    row.createCell(col++).setCellValue(b.getParcelWeightInGram() != null ? b.getParcelWeightInGram() : 0);
                    row.createCell(col++).setCellValue(b.getParcelDeliveryType() != null ? b.getParcelDeliveryType().name() : "");
                    row.createCell(col++).setCellValue(b.getParcelPackingPreference() != null ? b.getParcelPackingPreference().name() : "");
                    row.createCell(col++).setCellValue(b.getParcelStatus() != null ? b.getParcelStatus().name() : "");
                    row.createCell(col++).setCellValue(b.getParcelServiceCost() != null ? b.getParcelServiceCost().toPlainString() : "");
                    row.createCell(col++).setCellValue(b.getCreatedAt() != null ? b.getCreatedAt().format(formatter) : "");
                    row.createCell(col++).setCellValue(b.getParcelPaymentTime() != null ? b.getParcelPaymentTime().format(formatter) : "");
                    row.createCell(col++).setCellValue(b.getParcelPickupTime() != null ? b.getParcelPickupTime().format(formatter) : "");
                    row.createCell(col++).setCellValue(b.getParcelDropoffTime() != null ? b.getParcelDropoffTime().format(formatter) : "");
                }

                // Autosize columns (cap to avoid excessive work)
                for (int i = 0; i < headers.length; i++) {
                    sheet.autoSizeColumn(i);
                }

                workbook.write(baos);
                return baos.toByteArray();
            }
        }

        static void writeExcelToFile(List<Booking> bookings, String filename) throws Exception {
            byte[] bytes = toExcelBytes(bookings);
            try (java.io.FileOutputStream fos = new java.io.FileOutputStream(filename)) {
                fos.write(bytes);
            }
        }

        static byte[] toPdfBytes(List<Booking> bookings) throws Exception {
            try (java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream()) {
                com.itextpdf.kernel.pdf.PdfWriter writer = new com.itextpdf.kernel.pdf.PdfWriter(baos);
                com.itextpdf.kernel.pdf.PdfDocument pdf = new com.itextpdf.kernel.pdf.PdfDocument(writer);
                com.itextpdf.layout.Document document = new com.itextpdf.layout.Document(pdf);

                com.itextpdf.kernel.font.PdfFont bold = com.itextpdf.kernel.font.PdfFontFactory
                        .createFont(com.itextpdf.io.font.constants.StandardFonts.HELVETICA_BOLD);
                com.itextpdf.kernel.font.PdfFont regular = com.itextpdf.kernel.font.PdfFontFactory
                        .createFont(com.itextpdf.io.font.constants.StandardFonts.HELVETICA);

                document.add(new com.itextpdf.layout.element.Paragraph("Customer Bookings")
                        .setFont(bold).setFontSize(16));
                document.add(new com.itextpdf.layout.element.Paragraph("Exported: " + java.time.LocalDateTime.now())
                        .setFont(regular).setFontSize(10));
                document.add(new com.itextpdf.layout.element.Paragraph(""));

                // Table with columns
                String[] headers = new String[]{
                    "Booking ID", "Customer", "Receiver", "Mobile", "Weight(g)",
                    "Delivery", "Packing", "Status", "Service Cost", "Created At"
                };
                com.itextpdf.layout.element.Table table = new com.itextpdf.layout.element.Table(headers.length)
                        .useAllAvailableWidth();

                for (String h : headers) {
                    com.itextpdf.layout.element.Cell cell = new com.itextpdf.layout.element.Cell()
                            .add(new com.itextpdf.layout.element.Paragraph(h).setFont(bold));
                    table.addCell(cell);
                }

                java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                for (Booking b : bookings) {
                    table.addCell(paragraphCell(safe(b.getBookingId()), regular));
                    table.addCell(paragraphCell(b.getCustomer() != null ? safe(b.getCustomer().getCustomerName()) : "", regular));
                    table.addCell(paragraphCell(safe(b.getReceiverName()), regular));
                    table.addCell(paragraphCell(safe(b.getReceiverMobile()), regular));
                    table.addCell(paragraphCell(b.getParcelWeightInGram() != null ? String.valueOf(b.getParcelWeightInGram()) : "", regular));
                    table.addCell(paragraphCell(b.getParcelDeliveryType() != null ? b.getParcelDeliveryType().name() : "", regular));
                    table.addCell(paragraphCell(b.getParcelPackingPreference() != null ? b.getParcelPackingPreference().name() : "", regular));
                    table.addCell(paragraphCell(b.getParcelStatus() != null ? b.getParcelStatus().name() : "", regular));
                    table.addCell(paragraphCell(b.getParcelServiceCost() != null ? b.getParcelServiceCost().toPlainString() : "", regular));
                    table.addCell(paragraphCell(b.getCreatedAt() != null ? b.getCreatedAt().format(formatter) : "", regular));
                }

                document.add(table);
                document.close();
                return baos.toByteArray();
            }
        }

        static void writePdfToFile(List<Booking> bookings, String filename) throws Exception {
            byte[] bytes = toPdfBytes(bookings);
            try (java.io.FileOutputStream fos = new java.io.FileOutputStream(filename)) {
                fos.write(bytes);
            }
        }

        private static String safe(String value) {
            return value == null ? "" : value;
        }

        private static com.itextpdf.layout.element.Cell paragraphCell(String text, com.itextpdf.kernel.font.PdfFont font) {
            return new com.itextpdf.layout.element.Cell()
                    .add(new com.itextpdf.layout.element.Paragraph(text).setFont(font));
        }
    }
} 