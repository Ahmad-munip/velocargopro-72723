import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockApi } from '@/lib/mock-api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface PatientFormProps {
  patientId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PatientForm = ({ patientId, onSuccess, onCancel }: PatientFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nik: '',
    no_bpjs: '',
    nama: '',
    tgl_lahir: '',
    jk: 'L',
    alamat: '',
    phone: '',
    status_bpjs: 'TIDAK_AKTIF',
  });

  useEffect(() => {
    if (patientId) {
      loadPatient();
    }
  }, [patientId]);

  const loadPatient = async () => {
    const { data } = await mockApi.getPatient(patientId!);
    if (data) {
      setFormData({
        nik: data.nik || '',
        no_bpjs: data.no_bpjs || '',
        nama: data.nama,
        tgl_lahir: data.tgl_lahir,
        jk: data.jk,
        alamat: data.alamat,
        phone: data.phone,
        status_bpjs: data.status_bpjs,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (patientId) {
        await mockApi.updatePatient(patientId, formData);
        await mockApi.createAuditLog({
          user_id: user?.id,
          action: 'UPDATE',
          entity: 'patient',
          entity_id: patientId,
          meta_json: { nama: formData.nama },
        });
        toast({ title: 'Berhasil', description: 'Data pasien berhasil diubah' });
      } else {
        const { data } = await mockApi.createPatient(formData);
        await mockApi.createAuditLog({
          user_id: user?.id,
          action: 'CREATE',
          entity: 'patient',
          entity_id: data.id,
          meta_json: { nama: formData.nama },
        });
        toast({ title: 'Berhasil', description: 'Pasien baru berhasil ditambahkan' });
      }
      onSuccess();
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Terjadi kesalahan saat menyimpan data', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{patientId ? 'Edit Pasien' : 'Tambah Pasien Baru'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nik">NIK</Label>
              <Input
                id="nik"
                value={formData.nik}
                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                placeholder="3201012001950001"
              />
            </div>
            <div>
              <Label htmlFor="no_bpjs">No. BPJS</Label>
              <Input
                id="no_bpjs"
                value={formData.no_bpjs}
                onChange={(e) => setFormData({ ...formData, no_bpjs: e.target.value })}
                placeholder="0001234567890"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="nama">Nama Lengkap *</Label>
            <Input
              id="nama"
              required
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              placeholder="Nama lengkap pasien"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tgl_lahir">Tanggal Lahir *</Label>
              <Input
                id="tgl_lahir"
                type="date"
                required
                value={formData.tgl_lahir}
                onChange={(e) => setFormData({ ...formData, tgl_lahir: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="jk">Jenis Kelamin *</Label>
              <Select value={formData.jk} onValueChange={(value) => setFormData({ ...formData, jk: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Laki-laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Telepon *</Label>
            <Input
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="081234567890"
            />
          </div>

          <div>
            <Label htmlFor="alamat">Alamat *</Label>
            <Textarea
              id="alamat"
              required
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              placeholder="Alamat lengkap"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="status_bpjs">Status BPJS</Label>
            <Select 
              value={formData.status_bpjs} 
              onValueChange={(value) => setFormData({ ...formData, status_bpjs: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AKTIF">AKTIF</SelectItem>
                <SelectItem value="TIDAK_AKTIF">TIDAK AKTIF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
