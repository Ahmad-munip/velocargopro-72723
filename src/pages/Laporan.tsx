import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getReportData, getPoliList } from '@/lib/report-api';
import { exportToPDF, exportToExcel } from '@/lib/report-exporter';
import { useAuth } from '@/contexts/AuthContext';
import { createAuditLog } from '@/lib/api-client';
import { toast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/date-formatter';
import { FileDown, FileSpreadsheet, Search } from 'lucide-react';
import type { ReportRow } from '@/lib/report-api';

const Laporan = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPoli, setSelectedPoli] = useState<string>('');
  const [reportData, setReportData] = useState<ReportRow[]>([]);
  const [poliList, setPoliList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPoliList = async () => {
      const { data } = await getPoliList();
      if (data) {
        setPoliList(data);
      }
    };
    fetchPoliList();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const { data, error } = await getReportData(startDate, endDate, selectedPoli || undefined);
    
    if (error) {
      toast({ 
        title: 'Error', 
        description: 'Gagal mengambil data laporan', 
        variant: 'destructive' 
      });
      setLoading(false);
      return;
    }

    setReportData(data || []);
    setLoading(false);
    
    toast({ 
      title: 'Berhasil', 
      description: `Ditemukan ${data?.length || 0} data kunjungan` 
    });
  };

  const handleExportPDF = async () => {
    if (reportData.length === 0) {
      toast({ 
        title: 'Error', 
        description: 'Tidak ada data untuk diekspor', 
        variant: 'destructive' 
      });
      return;
    }

    exportToPDF(reportData, {
      startDate,
      endDate,
      poli: selectedPoli || undefined,
      userName: user?.email || 'Unknown',
    });

    await createAuditLog({
      user_id: user?.id,
      action: 'EXPORT',
      entity: 'report',
      entity_id: 'pdf',
      meta_json: {
        format: 'PDF',
        records: reportData.length,
        date_range: `${startDate} - ${endDate}`,
        poli: selectedPoli || 'Semua',
      },
    });

    toast({ title: 'Berhasil', description: 'Laporan PDF berhasil diunduh' });
  };

  const handleExportExcel = async () => {
    if (reportData.length === 0) {
      toast({ 
        title: 'Error', 
        description: 'Tidak ada data untuk diekspor', 
        variant: 'destructive' 
      });
      return;
    }

    exportToExcel(reportData, {
      startDate,
      endDate,
      poli: selectedPoli || undefined,
      userName: user?.email || 'Unknown',
    });

    await createAuditLog({
      user_id: user?.id,
      action: 'EXPORT',
      entity: 'report',
      entity_id: 'excel',
      meta_json: {
        format: 'Excel',
        records: reportData.length,
        date_range: `${startDate} - ${endDate}`,
        poli: selectedPoli || 'Semua',
      },
    });

    toast({ title: 'Berhasil', description: 'Laporan Excel berhasil diunduh' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laporan Kunjungan</h1>
        <p className="text-muted-foreground">Generate dan export laporan kunjungan pasien</p>
      </div>

      {/* Filter Card */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Laporan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="startDate">Tanggal Mulai</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Tanggal Akhir</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="poli">Poli (Opsional)</Label>
              <Select value={selectedPoli} onValueChange={setSelectedPoli}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Poli" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Poli</SelectItem>
                  {poliList.map((poli) => (
                    <SelectItem key={poli} value={poli}>
                      {poli}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Cari
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Card */}
      {reportData.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Hasil Laporan ({reportData.length} data)</CardTitle>
              <div className="flex gap-2">
                <Button onClick={handleExportPDF} variant="outline" size="sm">
                  <FileDown className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button onClick={handleExportExcel} variant="outline" size="sm">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Nama Pasien</TableHead>
                    <TableHead>Poli</TableHead>
                    <TableHead>Diagnosa Utama</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{formatDate(row.tanggal, 'short')}</TableCell>
                      <TableCell>{row.nama_pasien}</TableCell>
                      <TableCell>{row.poli}</TableCell>
                      <TableCell>{row.diagnosa_utama}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {reportData.length === 0 && !loading && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Pilih filter dan klik "Cari" untuk menampilkan laporan
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Laporan;
