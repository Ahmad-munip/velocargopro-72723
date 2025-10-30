import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * SATUSEHAT Faker API
 * Menyediakan mock FHIR endpoints untuk integrasi dengan SATUSEHAT
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const resource = url.searchParams.get('resource');
    
    console.log('SATUSEHAT Faker called with resource:', resource);

    // Sync Patient ke FHIR
    if (resource === 'Patient' && req.method === 'POST') {
      const { data } = await req.json();
      
      if (!data?.nik || !data?.nama) {
        return new Response(
          JSON.stringify({ error: 'Data pasien tidak lengkap' }), 
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Generate FHIR Patient ID
      const fhirId = `P${data.nik}${Date.now()}`;

      const fhirPatient = {
        resourceType: 'Patient',
        id: fhirId,
        identifier: [
          {
            use: 'official',
            system: 'https://fhir.kemkes.go.id/id/nik',
            value: data.nik
          }
        ],
        name: [{
          use: 'official',
          text: data.nama
        }],
        gender: data.jenis_kelamin === 'Laki-laki' ? 'male' : 'female',
        birthDate: data.tanggal_lahir,
        address: data.alamat ? [{
          use: 'home',
          text: data.alamat
        }] : [],
        telecom: data.telepon ? [{
          system: 'phone',
          value: data.telepon,
          use: 'mobile'
        }] : []
      };

      console.log('Patient synced to FHIR:', fhirId);

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: fhirPatient,
          message: 'Data pasien berhasil disinkronkan ke SATUSEHAT'
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sync Encounter ke FHIR
    if (resource === 'Encounter' && req.method === 'POST') {
      const { data } = await req.json();
      
      if (!data?.patient_id || !data?.tanggal) {
        return new Response(
          JSON.stringify({ error: 'Data kunjungan tidak lengkap' }), 
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Generate FHIR Encounter ID
      const fhirId = `E${Date.now()}${Math.floor(Math.random() * 10000)}`;

      const fhirEncounter = {
        resourceType: 'Encounter',
        id: fhirId,
        status: 'finished',
        class: {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
          code: 'AMB',
          display: 'ambulatory'
        },
        subject: {
          reference: `Patient/${data.id_fhir_patient}`,
          display: data.nama_pasien || 'Patient'
        },
        period: {
          start: data.tanggal,
          end: data.tanggal
        },
        serviceType: {
          coding: [{
            system: 'http://terminology.hl7.org/CodeSystem/service-type',
            code: data.poli || 'general',
            display: data.poli || 'General Practice'
          }]
        },
        reasonCode: data.diagnosa_utama ? [{
          coding: [{
            system: 'http://hl7.org/fhir/sid/icd-10',
            code: data.kode_icd10 || '',
            display: data.diagnosa_utama
          }]
        }] : []
      };

      console.log('Encounter synced to FHIR:', fhirId);

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: fhirEncounter,
          message: 'Data kunjungan berhasil disinkronkan ke SATUSEHAT'
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get Patient by NIK
    if (resource === 'Patient' && req.method === 'GET') {
      const nik = url.searchParams.get('identifier');
      
      if (!nik) {
        return new Response(
          JSON.stringify({ error: 'NIK wajib diisi' }), 
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Mock search result
      const mockBundle = {
        resourceType: 'Bundle',
        type: 'searchset',
        total: 1,
        entry: [{
          resource: {
            resourceType: 'Patient',
            id: `P${nik}${Date.now()}`,
            identifier: [{
              use: 'official',
              system: 'https://fhir.kemkes.go.id/id/nik',
              value: nik
            }],
            name: [{
              use: 'official',
              text: `Pasien ${nik.substring(0, 4)}`
            }],
            gender: 'unknown',
            birthDate: '1990-01-01'
          }
        }]
      };

      return new Response(
        JSON.stringify({ 
          success: true, 
          data: mockBundle
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Resource tidak valid. Gunakan ?resource=Patient atau ?resource=Encounter' }), 
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in SATUSEHAT faker:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan pada SATUSEHAT faker';
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
