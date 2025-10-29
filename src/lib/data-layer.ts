/**
 * Data Layer - Toggle between mock and API mode
 * MODE: "mock" | "api"
 */

import { mockApi } from './mock-api';

// Data mode configuration - change this to switch modes
let DATA_MODE = 'mock' as 'mock' | 'api'; // Toggle this to switch modes

// Placeholder for PostgreSQL API calls
export const fetchFromDB = async (query: string, params?: any) => {
  if (DATA_MODE === 'api') {
    // TODO: Implement actual PostgreSQL connection
    // Example: return await pg.query(query, params);
    throw new Error('API mode not yet configured. Please set up DATABASE_URL in .env');
  }
  
  // In mock mode, this function is not used
  throw new Error('fetchFromDB should not be called in mock mode');
};

// Export unified data layer
export const dataLayer = {
  mode: DATA_MODE as string,
  
  // Check if in mock mode
  isMockMode: () => DATA_MODE === 'mock',
  
  // Patient operations
  getPatients: mockApi.getPatients,
  getPatient: mockApi.getPatient,
  createPatient: mockApi.createPatient,
  updatePatient: mockApi.updatePatient,
  deletePatient: mockApi.deletePatient,
  searchPatients: mockApi.searchPatients,
  
  // Encounter operations
  getEncounters: mockApi.getEncounters,
  getEncounter: mockApi.getEncounter,
  createEncounter: mockApi.createEncounter,
  updateEncounter: mockApi.updateEncounter,
  
  // Diagnosis operations
  getDiagnoses: mockApi.getDiagnoses,
  createDiagnosis: mockApi.createDiagnosis,
  deleteDiagnosis: mockApi.deleteDiagnosis,
  
  // Lab operations
  getLabOrders: mockApi.getLabOrders,
  createLabOrder: mockApi.createLabOrder,
  getLabResults: mockApi.getLabResults,
  createLabResult: mockApi.createLabResult,
  
  // ICD-10 codes
  searchIcd10: mockApi.searchIcd10,
  
  // Audit logs
  getAuditLogs: mockApi.getAuditLogs,
  createAuditLog: mockApi.createAuditLog,
  
  // BPJS & SEP
  validateBPJS: mockApi.validateBPJS,
  createSEP: mockApi.createSEP,
  
  // FHIR sync
  syncPatientToFHIR: mockApi.syncPatientToFHIR,
  syncEncounterToFHIR: mockApi.syncEncounterToFHIR,
  
  // Sync jobs
  getSyncJobs: mockApi.getSyncJobs,
};

/**
 * Instructions for switching to API mode:
 * 
 * 1. Create .env file with database credentials:
 *    VITE_DATABASE_URL=postgresql://simpus_user:ahmad106@127.0.0.1:5432/simpus_db
 *    VITE_APP_TZ=Asia/Jakarta
 * 
 * 2. Run database migrations to create tables
 * 
 * 3. Change DATA_MODE to 'api' above
 * 
 * 4. Implement fetchFromDB() with actual PostgreSQL queries
 * 
 * 5. Replace mock API calls in dataLayer with real API implementations
 */
