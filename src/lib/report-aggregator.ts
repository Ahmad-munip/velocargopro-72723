/**
 * Report aggregation utilities
 * For generating statistics and reports from mock data
 */

import encountersData from '@/mock/encounters.json';
import diagnosesData from '@/mock/diagnoses.json';
import labOrdersData from '@/mock/lab_orders.json';
import patientsData from '@/mock/patients.json';

export interface DashboardStats {
  totalPatients: number;
  totalEncountersToday: number;
  totalLabOrders: number;
  bpjsActiveCount: number;
}

export interface EncounterByPoli {
  poli: string;
  count: number;
}

export interface TopDiagnosis {
  code: string;
  description: string;
  count: number;
}

/**
 * Get dashboard statistics
 */
export const getDashboardStats = (): DashboardStats => {
  const today = new Date().toISOString().split('T')[0];
  
  return {
    totalPatients: patientsData.length,
    totalEncountersToday: encountersData.filter(e => 
      e.tanggal.startsWith(today)
    ).length,
    totalLabOrders: labOrdersData.length,
    bpjsActiveCount: patientsData.filter(p => p.status_bpjs === 'AKTIF').length,
  };
};

/**
 * Get encounters grouped by poli
 */
export const getEncountersByPoli = (): EncounterByPoli[] => {
  const poliMap = new Map<string, number>();
  
  encountersData.forEach(e => {
    const count = poliMap.get(e.poli) || 0;
    poliMap.set(e.poli, count + 1);
  });
  
  return Array.from(poliMap.entries()).map(([poli, count]) => ({
    poli,
    count,
  }));
};

/**
 * Get top 10 diagnoses
 */
export const getTopDiagnoses = (limit: number = 10): TopDiagnosis[] => {
  const diagnosisMap = new Map<string, { description: string; count: number }>();
  
  diagnosesData.forEach(d => {
    const current = diagnosisMap.get(d.icd10_code);
    if (current) {
      current.count++;
    } else {
      diagnosisMap.set(d.icd10_code, {
        description: d.description,
        count: 1,
      });
    }
  });
  
  return Array.from(diagnosisMap.entries())
    .map(([code, { description, count }]) => ({
      code,
      description,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

/**
 * Get encounter statistics by date range
 */
export const getEncountersByDateRange = (startDate: string, endDate: string) => {
  return encountersData.filter(e => {
    const encounterDate = e.tanggal.split('T')[0];
    return encounterDate >= startDate && encounterDate <= endDate;
  });
};
