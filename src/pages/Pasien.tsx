import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockApi } from '@/lib/mock-api';
import { formatDate, calculateAge } from '@/lib/date-formatter';
import { Search } from 'lucide-react';

interface Patient {
  id: string;
  nik: string | null;
  no_bpjs: string | null;
  nama: string;
  tgl_lahir: string;
  jk: string;
  alamat: string;
  phone: string;
  status_bpjs: string;
}

const Pasien = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    const { data } = await mockApi.getPatients();
    setPatients(data);
    setLoading(false);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      loadPatients();
      return;
    }
    
    setLoading(true);
    const { data } = await mockApi.searchPatients(query);
    setPatients(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Pasien</h1>
        <p className="text-muted-foreground">Kelola data pasien Puskesmas</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama, NIK, atau No. BPJS..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : patients.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">Tidak ada data pasien</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{patient.nama}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {patient.jk === 'L' ? 'Laki-laki' : 'Perempuan'} · {calculateAge(patient.tgl_lahir)} tahun
                    </div>
                  </div>
                  <Badge variant={patient.status_bpjs === 'AKTIF' ? 'default' : 'secondary'}>
                    {patient.status_bpjs === 'AKTIF' ? 'BPJS Aktif' : 'Non-BPJS'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {patient.nik && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NIK:</span>
                    <span className="font-mono">{patient.nik}</span>
                  </div>
                )}
                {patient.no_bpjs && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">No. BPJS:</span>
                    <span className="font-mono">{patient.no_bpjs}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tgl Lahir:</span>
                  <span>{formatDate(patient.tgl_lahir, 'short')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telepon:</span>
                  <span>{patient.phone}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-muted-foreground">Alamat:</div>
                  <div className="text-sm mt-1">{patient.alamat}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pasien;
