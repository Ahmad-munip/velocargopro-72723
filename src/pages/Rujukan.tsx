import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send } from 'lucide-react';

const Rujukan = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rujukan</h1>
        <p className="text-muted-foreground">Kelola rujukan pasien ke fasilitas kesehatan lanjutan</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Fitur Rujukan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <div className="text-muted-foreground">
              Fitur rujukan sedang dalam pengembangan
            </div>
            <Badge variant="secondary">Coming Soon</Badge>
            <div className="text-sm text-muted-foreground max-w-md mx-auto">
              Fitur ini akan memungkinkan Anda untuk:
              <ul className="mt-3 space-y-2 text-left">
                <li>• Membuat rujukan ke RS atau fasilitas kesehatan lain</li>
                <li>• Mencetak surat rujukan</li>
                <li>• Tracking status rujukan</li>
                <li>• Integrasi dengan sistem BPJS</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rujukan;
