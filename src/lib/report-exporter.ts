/**
 * Report Export Utilities
 * Export reports to PDF and Excel
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatDate } from './date-formatter';
import type { ReportRow } from './report-aggregator';

interface ExportOptions {
  startDate: string;
  endDate: string;
  poli?: string;
  userName: string;
}

/**
 * Export report to PDF
 */
export const exportToPDF = (data: ReportRow[], options: ExportOptions) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(16);
  doc.text('PUSKESMAS MERDEKA', 105, 15, { align: 'center' });
  doc.setFontSize(12);
  doc.text('Laporan Kunjungan Pasien', 105, 22, { align: 'center' });
  
  // Filter info
  doc.setFontSize(10);
  doc.text(`Periode: ${formatDate(options.startDate, 'short')} - ${formatDate(options.endDate, 'short')}`, 14, 32);
  if (options.poli) {
    doc.text(`Poli: ${options.poli}`, 14, 38);
  }
  
  // Table
  const tableData = data.map(row => [
    formatDate(row.tanggal, 'short'),
    row.nama_pasien,
    row.poli,
    row.diagnosa_utama,
  ]);
  
  autoTable(doc, {
    startY: options.poli ? 42 : 36,
    head: [['Tanggal', 'Nama Pasien', 'Poli', 'Diagnosa Utama']],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [41, 128, 185] },
  });
  
  // Footer
  const finalY = (doc as any).lastAutoTable.finalY || 50;
  doc.setFontSize(8);
  doc.text(
    `Dicetak: ${formatDate(new Date().toISOString(), 'datetime')} | Petugas: ${options.userName}`,
    14,
    finalY + 10
  );
  
  // Save
  const filename = `Laporan_${options.startDate}_${options.endDate}.pdf`;
  doc.save(filename);
};

/**
 * Export report to Excel
 */
export const exportToExcel = (data: ReportRow[], options: ExportOptions) => {
  // Prepare data with formatted dates
  const excelData = data.map(row => ({
    'Tanggal': formatDate(row.tanggal, 'short'),
    'Nama Pasien': row.nama_pasien,
    'Poli': row.poli,
    'Diagnosa Utama': row.diagnosa_utama,
  }));
  
  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(excelData);
  
  // Set column widths
  ws['!cols'] = [
    { wch: 12 }, // Tanggal
    { wch: 30 }, // Nama Pasien
    { wch: 15 }, // Poli
    { wch: 50 }, // Diagnosa Utama
  ];
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Laporan');
  
  // Add metadata sheet
  const metadata = [
    { Field: 'Periode', Value: `${formatDate(options.startDate, 'short')} - ${formatDate(options.endDate, 'short')}` },
    { Field: 'Poli', Value: options.poli || 'Semua' },
    { Field: 'Dicetak', Value: formatDate(new Date().toISOString(), 'datetime') },
    { Field: 'Petugas', Value: options.userName },
  ];
  const metaWs = XLSX.utils.json_to_sheet(metadata);
  XLSX.utils.book_append_sheet(wb, metaWs, 'Info');
  
  // Save
  const filename = `Laporan_${options.startDate}_${options.endDate}.xlsx`;
  XLSX.writeFile(wb, filename);
};
