/**
 * Mock API client for offline mode
 * Simulates API calls using local JSON data
 */

import patientsData from '@/mock/patients.json';
import encountersData from '@/mock/encounters.json';
import diagnosesData from '@/mock/diagnoses.json';
import labOrdersData from '@/mock/lab_orders.json';
import labResultsData from '@/mock/lab_results.json';
import icd10CodesData from '@/mock/icd10_codes.json';
import auditLogsData from '@/mock/audit_logs.json';
import bpjsValidationData from '@/mock/bpjs/validation.json';
import syncJobsData from '@/mock/sync_jobs.json';

// In-memory storage
let patients = [...patientsData];
let encounters = [...encountersData];
let diagnoses = [...diagnosesData];
let labOrders = [...labOrdersData];
let labResults = [...labResultsData];
let auditLogs = [...auditLogsData];
let syncJobs = [...syncJobsData];

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Patients
  async getPatients() {
    await delay();
    return { data: patients, error: null };
  },

  async getPatient(id: string) {
    await delay();
    const patient = patients.find(p => p.id === id);
    return { data: patient || null, error: patient ? null : 'Patient not found' };
  },

  async createPatient(patientData: any) {
    await delay();
    const newPatient = {
      id: `p${Date.now()}`,
      ...patientData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    patients.push(newPatient);
    return { data: newPatient, error: null };
  },

  async updatePatient(id: string, patientData: any) {
    await delay();
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) return { data: null, error: 'Patient not found' };
    
    patients[index] = {
      ...patients[index],
      ...patientData,
      updated_at: new Date().toISOString(),
    };
    return { data: patients[index], error: null };
  },

  async deletePatient(id: string) {
    await delay();
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) return { data: null, error: 'Patient not found' };
    
    patients.splice(index, 1);
    return { data: { success: true }, error: null };
  },

  async searchPatients(query: string) {
    await delay();
    const results = patients.filter(p => 
      p.nama.toLowerCase().includes(query.toLowerCase()) ||
      p.nik?.includes(query) ||
      p.no_bpjs?.includes(query) ||
      p.tgl_lahir?.includes(query)
    );
    return { data: results, error: null };
  },

  // Encounters
  async getEncounters(patientId?: string) {
    await delay();
    const data = patientId 
      ? encounters.filter(e => e.patient_id === patientId)
      : encounters;
    return { data, error: null };
  },

  async getEncounter(id: string) {
    await delay();
    const encounter = encounters.find(e => e.id === id);
    return { data: encounter || null, error: encounter ? null : 'Encounter not found' };
  },

  async createEncounter(encounterData: any) {
    await delay();
    const newEncounter = {
      id: `e${Date.now()}`,
      ...encounterData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    encounters.push(newEncounter);
    return { data: newEncounter, error: null };
  },

  async updateEncounter(id: string, encounterData: any) {
    await delay();
    const index = encounters.findIndex(e => e.id === id);
    if (index === -1) return { data: null, error: 'Encounter not found' };
    
    encounters[index] = {
      ...encounters[index],
      ...encounterData,
      updated_at: new Date().toISOString(),
    };
    return { data: encounters[index], error: null };
  },

  // Diagnoses
  async getDiagnoses(encounterId: string) {
    await delay();
    const data = diagnoses.filter(d => d.encounter_id === encounterId);
    return { data, error: null };
  },

  async createDiagnosis(diagnosisData: any) {
    await delay();
    const newDiagnosis = {
      id: `d${Date.now()}`,
      ...diagnosisData,
      created_at: new Date().toISOString(),
    };
    diagnoses.push(newDiagnosis);
    return { data: newDiagnosis, error: null };
  },

  async deleteDiagnosis(id: string) {
    await delay();
    const index = diagnoses.findIndex(d => d.id === id);
    if (index === -1) return { data: null, error: 'Diagnosis not found' };
    
    diagnoses.splice(index, 1);
    return { data: { success: true }, error: null };
  },

  // Lab Orders & Results
  async getLabOrders(encounterId?: string) {
    await delay();
    const data = encounterId
      ? labOrders.filter(lo => lo.encounter_id === encounterId)
      : labOrders;
    return { data, error: null };
  },

  async createLabOrder(labOrderData: any) {
    await delay();
    const newLabOrder = {
      id: `lo${Date.now()}`,
      ...labOrderData,
      created_at: new Date().toISOString(),
    };
    labOrders.push(newLabOrder);
    return { data: newLabOrder, error: null };
  },

  async getLabResults(labOrderId: string) {
    await delay();
    const data = labResults.filter(lr => lr.lab_order_id === labOrderId);
    return { data, error: null };
  },

  async createLabResult(labResultData: any) {
    await delay();
    const newLabResult = {
      id: `lr${Date.now()}`,
      ...labResultData,
      created_at: new Date().toISOString(),
    };
    labResults.push(newLabResult);
    return { data: newLabResult, error: null };
  },

  // ICD-10 Codes
  async searchIcd10(query: string) {
    await delay();
    const results = icd10CodesData.filter(icd =>
      icd.code.toLowerCase().includes(query.toLowerCase()) ||
      icd.title.toLowerCase().includes(query.toLowerCase())
    );
    return { data: results, error: null };
  },

  // Audit Logs
  async getAuditLogs() {
    await delay();
    return { data: auditLogs, error: null };
  },

  async createAuditLog(auditLogData: any) {
    await delay();
    const newAuditLog = {
      id: `al${Date.now()}`,
      ...auditLogData,
      created_at: new Date().toISOString(),
    };
    auditLogs.push(newAuditLog);
    return { data: newAuditLog, error: null };
  },

  // BPJS Validation
  async validateBPJS(noBpjs: string) {
    await delay();
    const validation = bpjsValidationData.response.data.find(
      v => v.no_bpjs === noBpjs
    );
    return { data: validation || null, error: validation ? null : 'No BPJS not found' };
  },

  // SEP Creation
  async createSEP(encounterId: string) {
    await delay();
    const sepNo = `SEP-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    const index = encounters.findIndex(e => e.id === encounterId);
    if (index === -1) return { data: null, error: 'Encounter not found' };
    
    encounters[index].sep_no = sepNo;
    return { data: { sep_no: sepNo }, error: null };
  },

  // FHIR Sync
  async syncPatientToFHIR(patientId: string) {
    await delay();
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return { data: null, error: 'Patient not found' };

    if (!patient.id_fhir_patient) {
      patient.id_fhir_patient = `fhir-${patientId}`;
    }

    const syncJob = {
      id: `sj${Date.now()}`,
      entity: 'patient',
      entity_id: patientId,
      fhir_id: patient.id_fhir_patient,
      payload: { resourceType: 'Patient', id: patient.id_fhir_patient },
      status: 'SUCCESS',
      created_at: new Date().toISOString(),
    };
    syncJobs.push(syncJob);

    return { data: { fhir_id: patient.id_fhir_patient, syncJob }, error: null };
  },

  async syncEncounterToFHIR(encounterId: string) {
    await delay();
    const encounter = encounters.find(e => e.id === encounterId);
    if (!encounter) return { data: null, error: 'Encounter not found' };

    if (!encounter.id_fhir_encounter) {
      encounter.id_fhir_encounter = `fhir-${encounterId}`;
    }

    const syncJob = {
      id: `sj${Date.now()}`,
      entity: 'encounter',
      entity_id: encounterId,
      fhir_id: encounter.id_fhir_encounter,
      payload: { resourceType: 'Encounter', id: encounter.id_fhir_encounter },
      status: 'SUCCESS',
      created_at: new Date().toISOString(),
    };
    syncJobs.push(syncJob);

    return { data: { fhir_id: encounter.id_fhir_encounter, syncJob }, error: null };
  },

  // Sync Jobs
  async getSyncJobs() {
    await delay();
    return { data: syncJobs, error: null };
  },
};
