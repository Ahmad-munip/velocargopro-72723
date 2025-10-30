import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * BPJS Faker API
 * Menyediakan mock data untuk validasi BPJS dan pembuatan SEP
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');
    
    console.log('BPJS Faker called with action:', action);

    // Validasi BPJS
    if (action === 'validate') {
      const noBpjs = url.searchParams.get('no_bpjs');
      
      if (!noBpjs) {
        return new Response(
          JSON.stringify({ error: 'Nomor BPJS wajib diisi' }), 
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Mock validation data
      const isActive = Math.random() > 0.2; // 80% chance aktif
      
      const mockData = {
        noKartu: noBpjs,
        nama: `Pasien BPJS ${noBpjs.substring(0, 4)}`,
        nik: `320${noBpjs.substring(0, 13)}`,
        tglLahir: '1990-01-01',
        statusPeserta: {
          kode: isActive ? '1' : '0',
          keterangan: isActive ? 'AKTIF' : 'TIDAK AKTIF'
        },
        pisa: 'Faskes I Jakarta',
        provUmum: {
          kdProvider: 'F001',
          nmProvider: 'PUSKESMAS MERDEKA'
        },
        hakKelas: {
          kode: '3',
          keterangan: 'KELAS III'
        },
        jenisPeserta: {
          kode: 'PBI',
          keterangan: 'PENERIMA BANTUAN IURAN'
        }
      };

      console.log('BPJS validation result:', isActive ? 'AKTIF' : 'TIDAK AKTIF');

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: mockData,
          message: isActive ? 'Peserta BPJS aktif' : 'Peserta BPJS tidak aktif'
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Buat SEP (Surat Eligibilitas Peserta)
    if (action === 'create-sep') {
      const { data } = await req.json();
      
      if (!data?.noBpjs || !data?.tglSep) {
        return new Response(
          JSON.stringify({ error: 'Data tidak lengkap untuk pembuatan SEP' }), 
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Generate nomor SEP
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 10000);
      const noSep = `0301R001${timestamp}${random}`;

      const mockSep = {
        noSep: noSep,
        tglSep: data.tglSep,
        noKartu: data.noBpjs,
        peserta: {
          nama: data.namaPasien || 'Pasien BPJS',
          noMr: data.noMr || '',
          tglLahir: data.tglLahir || '1990-01-01'
        },
        diagnosa: data.kodeDiagnosa || 'Z00.0',
        poli: data.poli || 'Umum',
        ppkPelayanan: 'F001',
        jnsPelayanan: '2', // Rawat Jalan
        catatan: data.catatan || ''
      };

      console.log('SEP created:', noSep);

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: mockSep,
          message: 'SEP berhasil dibuat'
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Action tidak valid. Gunakan ?action=validate atau ?action=create-sep' }), 
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in BPJS faker:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan pada BPJS faker';
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
