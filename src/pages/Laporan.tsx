import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDashboardStats, getTopDiagnoses, getEncountersByPoli } from '@/lib/report-aggregator';
import { BarChart3, FileText, TrendingUp } from 'lucide-react';

const Laporan = () => {
  const stats = getDashboardStats();
  const topDiagnoses = getTopDiagnoses(10);
  const encountersByPoli = getEncountersByPoli();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laporan</h1>
        <p className="text-muted-foreground">Laporan dan statistik Puskesmas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Encounter</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {encountersByPoli.reduce((acc, curr) => acc + curr.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Semua kunjungan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pasien</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Pasien terdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cakupan BPJS</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.bpjsActiveCount / stats.totalPatients) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.bpjsActiveCount} dari {stats.totalPatients} pasien
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Distribution by Poli */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Kunjungan per Poli</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {encountersByPoli.map((item) => {
                const total = encountersByPoli.reduce((acc, curr) => acc + curr.count, 0);
                const percentage = Math.round((item.count / total) * 100);
                
                return (
                  <div key={item.poli} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.poli}</span>
                      <span className="text-muted-foreground">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top 10 Diagnoses */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topDiagnoses.map((item, index) => (
                <div key={item.code} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{item.code}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground flex-shrink-0">
                    {item.count}x
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Laporan;
