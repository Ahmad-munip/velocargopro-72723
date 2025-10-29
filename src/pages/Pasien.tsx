import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockApi } from '@/lib/mock-api';
import { formatDate, calculateAge } from '@/lib/date-formatter';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { PatientDetail } from '@/components/PatientDetail';
import { PatientForm } from '@/components/PatientForm';

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
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [editPatientId, setEditPatientId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'form'>('list');

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

  const handleViewDetail = (patientId: string) => {
    setSelectedPatientId(patientId);
    setViewMode('detail');
  };

  const handleEdit = (patientId: string) => {
    setEditPatientId(patientId);
    setViewMode('form');
  };

  const handleAdd = () => {
    setEditPatientId(null);
    setViewMode('form');
  };

  const handleDelete = async (patientId: string) => {
    if (!confirm('Yakin ingin menghapus pasien ini?')) return;

    await mockApi.deletePatient(patientId);
    await mockApi.createAuditLog({
      user_id: user?.id,
      action: 'DELETE',
      entity: 'patient',
      entity_id: patientId,
      meta_json: {},
    });
    
    toast({ title: 'Berhasil', description: 'Pasien berhasil dihapus' });
    loadPatients();
  };

  const handleFormSuccess = () => {
    setViewMode('list');
    setEditPatientId(null);
    loadPatients();
  };

  const handleCloseDetail = () => {
    setViewMode('list');
    setSelectedPatientId(null);
  };

  if (viewMode === 'detail' && selectedPatientId) {
    return (
      <PatientDetail 
        patientId={selectedPatientId} 
        onClose={handleCloseDetail}
        onEdit={() => handleEdit(selectedPatientId)}
      />
    );
  }

  if (viewMode === 'form') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Data Pasien</h1>
          <p className="text-muted-foreground">
            {editPatientId ? 'Edit data pasien' : 'Tambah pasien baru'}
          </p>
        </div>
        <PatientForm 
          patientId={editPatientId || undefined}
          onSuccess={handleFormSuccess}
          onCancel={() => setViewMode('list')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Pasien</h1>
          <p className="text-muted-foreground">Kelola data pasien Puskesmas</p>
        </div>
        {user?.role !== 'LAB' && (
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Pasien
          </Button>
        )}
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
              <CardContent className="space-y-3 text-sm">
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
                
                <div className="flex gap-1 pt-2 border-t">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewDetail(patient.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Detail
                  </Button>
                  {user?.role !== 'LAB' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(patient.id)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      {user?.role === 'ADMIN' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(patient.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </>
                  )}
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
