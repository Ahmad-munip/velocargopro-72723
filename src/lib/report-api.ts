/**
 * Report API - Database queries for reporting
 */

import { supabase } from "@/integrations/supabase/client";

export interface ReportRow {
  tanggal: string;
  nama_pasien: string;
  poli: string;
  diagnosa_utama: string;
  kode_icd10?: string;
}

/**
 * Get report data from database
 */
export const getReportData = async (
  startDate: string,
  endDate: string,
  poli?: string
): Promise<{ data: ReportRow[] | null; error: any }> => {
  try {
    let query = supabase
      .from('encounters')
      .select(`
        tanggal,
        poli,
        patients!inner(nama),
        diagnoses!inner(
          nama_diagnosis,
          kode_icd10,
          jenis
        )
      `)
      .gte('tanggal', startDate)
      .lte('tanggal', endDate)
      .eq('diagnoses.jenis', 'PRINCIPAL')
      .order('tanggal', { ascending: true });

    if (poli) {
      query = query.eq('poli', poli);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching report data:', error);
      return { data: null, error };
    }

    // Transform data to match ReportRow interface
    const reportData: ReportRow[] = data.map((row: any) => ({
      tanggal: row.tanggal,
      nama_pasien: row.patients?.nama || 'Unknown',
      poli: row.poli,
      diagnosa_utama: row.diagnoses?.[0]?.nama_diagnosis || 'Tidak ada diagnosa',
      kode_icd10: row.diagnoses?.[0]?.kode_icd10,
    }));

    return { data: reportData, error: null };
  } catch (error) {
    console.error('Exception in getReportData:', error);
    return { data: null, error };
  }
};

/**
 * Get list of unique poli from encounters
 */
export const getPoliList = async (): Promise<{ data: string[] | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from('encounters')
      .select('poli')
      .order('poli');

    if (error) {
      console.error('Error fetching poli list:', error);
      return { data: null, error };
    }

    // Get unique poli values
    const uniquePoli = [...new Set(data.map((row: any) => row.poli))];

    return { data: uniquePoli, error: null };
  } catch (error) {
    console.error('Exception in getPoliList:', error);
    return { data: null, error };
  }
};
