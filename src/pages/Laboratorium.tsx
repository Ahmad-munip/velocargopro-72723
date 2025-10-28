import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockApi } from '@/lib/mock-api';
import { formatDate } from '@/lib/date-formatter';
import encountersData from '@/mock/encounters.json';
import patientsData from '@/mock/patients.json';

interface LabOrder {
  id: string;
  encounter_id: string;
  test_code: string;
  catatan: string;
  created_at: string;
}

interface LabResult {
  id: string;
  lab_order_id: string;
  test_code: string;
  nilai: number;
  unit: string;
  rujukan_min: number;
  rujukan_max: number;
  interpretasi: string;
  created_at: string;
}

const Laboratorium = () => {
  const [labOrders, setLabOrders] = useState<LabOrder[]>([]);
  const [labResults, setLabResults] = useState<Record<string, LabResult[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLabData();
  }, []);

  const loadLabData = async () => {
    setLoading(true);
    
    // Load lab orders
    const { data: orders } = await mockApi.getLabOrders();
    setLabOrders(orders);
    
    // Load results for each order
    const resultsMap: Record<string, LabResult[]> = {};
    for (const order of orders) {
      const { data: results } = await mockApi.getLabResults(order.id);
      resultsMap[order.id] = results;
    }
    setLabResults(resultsMap);
    
    setLoading(false);
  };

  const getEncounterInfo = (encounterId: string) => {
    const encounter = encountersData.find(e => e.id === encounterId);
    if (!encounter) return { patientName: 'Unknown', tanggal: '' };
    
    const patient = patientsData.find(p => p.id === encounter.patient_id);
    return {
      patientName: patient?.nama || 'Unknown',
      tanggal: encounter.tanggal,
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laboratorium</h1>
        <p className="text-muted-foreground">Permintaan dan hasil pemeriksaan lab</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : labOrders.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">Tidak ada data lab</div>
      ) : (
        <div className="space-y-4">
          {labOrders.map((order) => {
            const { patientName, tanggal } = getEncounterInfo(order.encounter_id);
            const results = labResults[order.id] || [];
            
            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{patientName}</CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">
                        {formatDate(tanggal, 'datetime')}
                      </div>
                    </div>
                    <Badge variant="outline">{order.test_code}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.catatan && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Catatan</div>
                      <div className="text-sm">{order.catatan}</div>
                    </div>
                  )}

                  {results.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-3">Hasil Pemeriksaan</div>
                      <div className="space-y-3">
                        {results.map((result) => (
                          <div key={result.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="space-y-1">
                              <div className="font-medium">{result.test_code}</div>
                              <div className="text-xs text-muted-foreground">
                                Rujukan: {result.rujukan_min} - {result.rujukan_max} {result.unit}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">
                                {result.nilai} {result.unit}
                              </div>
                              <Badge
                                variant={
                                  result.interpretasi === 'NORMAL'
                                    ? 'default'
                                    : result.interpretasi === 'TINGGI'
                                    ? 'destructive'
                                    : 'secondary'
                                }
                              >
                                {result.interpretasi}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Diperiksa: {formatDate(results[0]?.created_at, 'datetime')}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Laboratorium;
