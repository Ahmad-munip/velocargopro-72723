import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockApi } from '@/lib/mock-api';
import { formatDate, calculateAge } from '@/lib/date-formatter';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { 
  User, Calendar, MapPin, Phone, CheckCircle2, 
  XCircle, Activity, TestTube, FileText, Send 
} from 'lucide-react';

interface PatientDetailProps {
  patientId: string;
  onClose: () => void;
  onEdit: () => void;
}

export const PatientDetail = ({ patientId, onClose, onEdit }: PatientDetailProps) => {
  const { user } = useAuth();
  const [patient, setPatient] = useState<any>(null);
  const [encounters, setEncounters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatientData();
  }, [patientId]);

  const loadPatientData = async () => {
    setLoading(true);
    const { data: patientData } = await mockApi.getPatient(patientId);
    const { data: encountersData } = await mockApi.getEncounters(patientId);
    
    setPatient(patientData);
    setEncounters(encountersData);
    setLoading(false);
  };

  const handleValidateBPJS = async () => {
    if (!patient?.no_bpjs) {
      toast({ title: 'Error', description: 'Tidak ada No. BPJS', variant: 'destructive' });
      return;
    }

    const { data, error } = await mockApi.validateBPJS(patient.no_bpjs);
    if (error) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
      return;
    }

    const updateData = {
      status_bpjs: data.status,
      status_bpjs_ts: new Date().toISOString(),
    };
    await mockApi.updatePatient(patientId, updateData);
    await mockApi.createAuditLog({
      user_id: user?.id,
      action: 'VALIDATE_BPJS',
      entity: 'patient',
      entity_id: patientId,
      meta_json: { no_bpjs: patient.no_bpjs, status: data.status },
    });

    setPatient({ ...patient, ...updateData });
    toast({ title: 'Berhasil', description: `Status BPJS: ${data.status}` });
  };

  const handleSyncToFHIR = async () => {
    const { data, error } = await mockApi.syncPatientToFHIR(patientId);
    if (error) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
      return;
    }

    await mockApi.createAuditLog({
      user_id: user?.id,
      action: 'SYNC_FHIR',
      entity: 'patient',
      entity_id: patientId,
      meta_json: { fhir_id: data.fhir_id },
    });

    setPatient({ ...patient, id_fhir_patient: data.fhir_id });
    toast({ title: 'Berhasil', description: `FHIR ID: ${data.fhir_id}` });
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!patient) {
    return <div className="text-center py-8">Pasien tidak ditemukan</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{patient.nama}</h2>
          <p className="text-muted-foreground">Detail Pasien</p>
        </div>
        <div className="flex gap-2">
          {user?.role !== 'LAB' && (
            <Button onClick={onEdit} variant="outline">Edit</Button>
          )}
          <Button onClick={onClose} variant="ghost">Tutup</Button>
        </div>
      </div>

      {/* Patient Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Identitas Pasien
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">NIK</div>
              <div className="font-mono">{patient.nik || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">No. BPJS</div>
              <div className="font-mono">{patient.no_bpjs || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Tanggal Lahir</div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(patient.tgl_lahir, 'short')} ({calculateAge(patient.tgl_lahir)} tahun)
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Jenis Kelamin</div>
              <div>{patient.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Telepon</div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {patient.phone}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Status BPJS</div>
              <Badge variant={patient.status_bpjs === 'AKTIF' ? 'default' : 'secondary'}>
                {patient.status_bpjs}
              </Badge>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Alamat</div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1" />
              {patient.alamat}
            </div>
          </div>

          {user?.role !== 'LAB' && (
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleValidateBPJS} variant="outline" size="sm">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Validasi BPJS
              </Button>
              <Button onClick={handleSyncToFHIR} variant="outline" size="sm">
                <Send className="h-4 w-4 mr-2" />
                Sync ke FHIR
              </Button>
            </div>
          )}

          {patient.id_fhir_patient && (
            <div className="text-xs text-muted-foreground">
              FHIR ID: {patient.id_fhir_patient}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Encounter History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Riwayat Kunjungan ({encounters.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {encounters.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              Belum ada riwayat kunjungan
            </div>
          ) : (
            <div className="space-y-3">
              {encounters.map((encounter) => (
                <div key={encounter.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{encounter.poli}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(encounter.tanggal, 'datetime')}
                      </div>
                    </div>
                    {encounter.sep_no && (
                      <Badge variant="outline">SEP</Badge>
                    )}
                  </div>
                  <div className="text-sm">
                    <div className="text-muted-foreground">Keluhan:</div>
                    <div>{encounter.keluhan}</div>
                  </div>
                  <div className="text-sm mt-2">
                    <div className="text-muted-foreground">Assessment:</div>
                    <div>{encounter.assessment}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
