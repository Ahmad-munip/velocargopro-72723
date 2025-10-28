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

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Patients
  async getPatients() {
    await delay();
    return { data: patientsData, error: null };
  },

  async getPatient(id: string) {
    await delay();
    const patient = patientsData.find(p => p.id === id);
    return { data: patient || null, error: patient ? null : 'Patient not found' };
  },

  async searchPatients(query: string) {
    await delay();
    const results = patientsData.filter(p => 
      p.nama.toLowerCase().includes(query.toLowerCase()) ||
      p.nik?.includes(query) ||
      p.no_bpjs?.includes(query)
    );
    return { data: results, error: null };
  },

  // Encounters
  async getEncounters(patientId?: string) {
    await delay();
    const data = patientId 
      ? encountersData.filter(e => e.patient_id === patientId)
      : encountersData;
    return { data, error: null };
  },

  async getEncounter(id: string) {
    await delay();
    const encounter = encountersData.find(e => e.id === id);
    return { data: encounter || null, error: encounter ? null : 'Encounter not found' };
  },

  // Diagnoses
  async getDiagnoses(encounterId: string) {
    await delay();
    const data = diagnosesData.filter(d => d.encounter_id === encounterId);
    return { data, error: null };
  },

  // Lab Orders & Results
  async getLabOrders(encounterId?: string) {
    await delay();
    const data = encounterId
      ? labOrdersData.filter(lo => lo.encounter_id === encounterId)
      : labOrdersData;
    return { data, error: null };
  },

  async getLabResults(labOrderId: string) {
    await delay();
    const data = labResultsData.filter(lr => lr.lab_order_id === labOrderId);
    return { data, error: null };
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
    return { data: auditLogsData, error: null };
  },
};
