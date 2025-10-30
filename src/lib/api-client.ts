/**
 * API Client - Supabase Integration
 * Handles all database operations and external API calls
 */

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Types
export interface Patient {
  id: string;
  nik: string;
  no_bpjs?: string;
  nama: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  alamat?: string;
  telepon?: string;
  status?: string;
  status_bpjs?: string;
  waktu_validasi_bpjs?: string;
  id_fhir_patient?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Encounter {
  id: string;
  patient_id: string;
  tanggal: string;
  poli: string;
  keluhan?: string;
  anamnesis?: string;
  pemeriksaan?: string;
  assessment?: string;
  plan?: string;
  status?: string;
  no_sep?: string;
  id_fhir_encounter?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Diagnosis {
  id: string;
  encounter_id: string;
  kode_icd10: string;
  nama_diagnosis: string;
  jenis: 'PRINCIPAL' | 'SECONDARY' | 'COMPLICATION';
  created_at?: string;
}

export interface LabOrder {
  id: string;
  encounter_id: string;
  jenis_pemeriksaan: string;
  status?: string;
  catatan?: string;
  created_at?: string;
}

export interface LabResult {
  id: string;
  lab_order_id: string;
  parameter: string;
  nilai?: string;
  satuan?: string;
  nilai_rujukan?: string;
  interpretasi?: string;
  created_at?: string;
}

// Patient operations
export const getPatients = async () => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getPatient = async (id: string) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
};

export const searchPatients = async (query: string) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .or(`nik.ilike.%${query}%,no_bpjs.ilike.%${query}%,nama.ilike.%${query}%`)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const createPatient = async (patient: Database['public']['Tables']['patients']['Insert']) => {
  const { data, error } = await supabase
    .from('patients')
    .insert(patient)
    .select()
    .single();
  
  return { data, error };
};

export const updatePatient = async (id: string, patient: Database['public']['Tables']['patients']['Update']) => {
  const { data, error } = await supabase
    .from('patients')
    .update(patient)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const deletePatient = async (id: string) => {
  const { data, error } = await supabase
    .from('patients')
    .delete()
    .eq('id', id);
  
  return { data, error };
};

// Encounter operations
export const getEncounters = async () => {
  const { data, error } = await supabase
    .from('encounters')
    .select('*, patients(nama)')
    .order('tanggal', { ascending: false });
  
  return { data, error };
};

export const getEncounter = async (id: string) => {
  const { data, error } = await supabase
    .from('encounters')
    .select('*, patients(*)')
    .eq('id', id)
    .single();
  
  return { data, error };
};

export const createEncounter = async (encounter: Database['public']['Tables']['encounters']['Insert']) => {
  const { data, error } = await supabase
    .from('encounters')
    .insert(encounter)
    .select()
    .single();
  
  return { data, error };
};

export const updateEncounter = async (id: string, encounter: Database['public']['Tables']['encounters']['Update']) => {
  const { data, error } = await supabase
    .from('encounters')
    .update(encounter)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

// Diagnosis operations
export const getDiagnoses = async (encounterId: string) => {
  const { data, error } = await supabase
    .from('diagnoses')
    .select('*')
    .eq('encounter_id', encounterId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const createDiagnosis = async (diagnosis: Database['public']['Tables']['diagnoses']['Insert']) => {
  const { data, error } = await supabase
    .from('diagnoses')
    .insert(diagnosis)
    .select()
    .single();
  
  return { data, error };
};

export const deleteDiagnosis = async (id: string) => {
  const { data, error } = await supabase
    .from('diagnoses')
    .delete()
    .eq('id', id);
  
  return { data, error };
};

// Lab operations
export const getLabOrders = async (encounterId?: string) => {
  let query = supabase
    .from('lab_orders')
    .select('*');
  
  if (encounterId) {
    query = query.eq('encounter_id', encounterId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};

export const createLabOrder = async (labOrder: Database['public']['Tables']['lab_orders']['Insert']) => {
  const { data, error } = await supabase
    .from('lab_orders')
    .insert(labOrder)
    .select()
    .single();
  
  return { data, error };
};

export const getLabResults = async (labOrderId: string) => {
  const { data, error } = await supabase
    .from('lab_results')
    .select('*')
    .eq('lab_order_id', labOrderId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const createLabResult = async (labResult: Database['public']['Tables']['lab_results']['Insert']) => {
  const { data, error } = await supabase
    .from('lab_results')
    .insert(labResult)
    .select()
    .single();
  
  return { data, error };
};

// ICD-10 codes
export const searchIcd10 = async (query: string) => {
  const { data, error } = await supabase
    .from('icd10_codes')
    .select('*')
    .or(`kode.ilike.%${query}%,nama.ilike.%${query}%`)
    .limit(50);
  
  return { data, error };
};

// Audit logs
export const getAuditLogs = async () => {
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(100);
  
  return { data, error };
};

export const createAuditLog = async (log: {
  user_id?: string;
  action: string;
  entity: string;
  entity_id?: string;
  meta_json?: any;
}) => {
  const { data, error } = await supabase
    .from('audit_logs')
    .insert(log)
    .select()
    .single();
  
  return { data, error };
};

// BPJS Integration
export const validateBPJS = async (noBpjs: string) => {
  const { data, error } = await supabase.functions.invoke('bpjs-faker', {
    body: { action: 'validate', no_bpjs: noBpjs }
  });
  
  return { data, error };
};

export const createSEP = async (sepData: any) => {
  const { data, error } = await supabase.functions.invoke('bpjs-faker', {
    body: { action: 'create-sep', data: sepData }
  });
  
  return { data, error };
};

// FHIR/SATUSEHAT Integration
export const syncPatientToFHIR = async (patient: Patient) => {
  const { data, error } = await supabase.functions.invoke('satusehat-faker', {
    body: { 
      resource: 'Patient',
      data: patient
    }
  });
  
  return { data, error };
};

export const syncEncounterToFHIR = async (encounter: any) => {
  const { data, error } = await supabase.functions.invoke('satusehat-faker', {
    body: { 
      resource: 'Encounter',
      data: encounter
    }
  });
  
  return { data, error };
};

// Sync jobs
export const getSyncJobs = async () => {
  const { data, error } = await supabase
    .from('sync_jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);
  
  return { data, error };
};
