import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockApi } from '@/lib/mock-api';
import { formatDate } from '@/lib/date-formatter';
import patientsData from '@/mock/patients.json';

interface Encounter {
  id: string;
  patient_id: string;
  tanggal: string;
  poli: string;
  keluhan: string;
  anamnesis: string;
  assessment: string;
  plan: string;
  sep_no: string | null;
}

const Encounter = () => {
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEncounters();
  }, []);

  const loadEncounters = async () => {
    setLoading(true);
    const { data } = await mockApi.getEncounters();
    setEncounters(data);
    setLoading(false);
  };

  const getPatientName = (patientId: string) => {
    const patient = patientsData.find(p => p.id === patientId);
    return patient?.nama || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Encounter</h1>
        <p className="text-muted-foreground">Riwayat kunjungan pasien</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : encounters.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">Tidak ada data encounter</div>
      ) : (
        <div className="space-y-4">
          {encounters.map((encounter) => (
            <Card key={encounter.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{getPatientName(encounter.patient_id)}</CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      {formatDate(encounter.tanggal, 'datetime')}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{encounter.poli}</Badge>
                    {encounter.sep_no && (
                      <Badge variant="default">SEP</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Keluhan</div>
                  <div className="text-sm">{encounter.keluhan}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Anamnesis</div>
                  <div className="text-sm">{encounter.anamnesis}</div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Assessment</div>
                    <div className="text-sm">{encounter.assessment}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Plan</div>
                    <div className="text-sm">{encounter.plan}</div>
                  </div>
                </div>

                {encounter.sep_no && (
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium text-muted-foreground">No. SEP</div>
                    <div className="text-sm font-mono">{encounter.sep_no}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Encounter;
