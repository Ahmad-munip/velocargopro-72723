import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, TestTube, CheckCircle, Calendar, TrendingUp } from 'lucide-react';
import { 
  getDashboardStats, 
  getEncountersByPoli, 
  getTopDiagnoses,
  getDailyEncounters,
  getMonthlyEncounters
} from '@/lib/report-aggregator';
import type { DashboardStats, EncounterByPoli, TopDiagnosis } from '@/lib/report-aggregator';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [encountersByPoli, setEncountersByPoli] = useState<EncounterByPoli[]>([]);
  const [topDiagnoses, setTopDiagnoses] = useState<TopDiagnosis[]>([]);
  const [dailyCount, setDailyCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);

  useEffect(() => {
    // Load data
    setStats(getDashboardStats());
    setEncountersByPoli(getEncountersByPoli());
    setTopDiagnoses(getTopDiagnoses(5));
    setDailyCount(getDailyEncounters());
    setMonthlyCount(getMonthlyEncounters());
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan data Puskesmas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pasien</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Terdaftar dalam sistem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kunjungan Hari Ini</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyCount}</div>
            <p className="text-xs text-muted-foreground">Encounter hari ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kunjungan Bulan Ini</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyCount}</div>
            <p className="text-xs text-muted-foreground">Total bulan ini</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Order Lab</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLabOrders}</div>
            <p className="text-xs text-muted-foreground">Total permintaan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BPJS Aktif</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bpjsActiveCount}</div>
            <p className="text-xs text-muted-foreground">Dari {stats.totalPatients} pasien</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cakupan BPJS</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.bpjsActiveCount / stats.totalPatients) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Peserta aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Poli Aktif</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{encountersByPoli.length}</div>
            <p className="text-xs text-muted-foreground">Unit layanan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Encounters by Poli */}
        <Card>
          <CardHeader>
            <CardTitle>Kunjungan per Poli</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {encountersByPoli.map((item) => (
                <div key={item.poli} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.poli}</span>
                  <span className="text-sm text-muted-foreground">{item.count} kunjungan</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Diagnoses */}
        <Card>
          <CardHeader>
            <CardTitle>Diagnosis Tersering</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topDiagnoses.map((item, index) => (
                <div key={item.code} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium">{item.code}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.count}x</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
