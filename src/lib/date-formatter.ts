/**
 * Date formatting utilities for SIMPUS
 * All dates use Asia/Jakarta timezone
 */

const APP_TZ = 'Asia/Jakarta';

/**
 * Format date to Indonesian locale string
 * @param date - Date string or Date object
 * @param format - 'short' | 'long' | 'datetime' | 'time'
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date,
  format: 'short' | 'long' | 'datetime' | 'time' = 'short'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    timeZone: APP_TZ,
  };

  switch (format) {
    case 'short':
      options.day = '2-digit';
      options.month = '2-digit';
      options.year = 'numeric';
      return dateObj.toLocaleDateString('id-ID', options);
    
    case 'long':
      options.day = 'numeric';
      options.month = 'long';
      options.year = 'numeric';
      return dateObj.toLocaleDateString('id-ID', options);
    
    case 'datetime':
      options.day = '2-digit';
      options.month = '2-digit';
      options.year = 'numeric';
      options.hour = '2-digit';
      options.minute = '2-digit';
      return dateObj.toLocaleString('id-ID', options);
    
    case 'time':
      options.hour = '2-digit';
      options.minute = '2-digit';
      return dateObj.toLocaleTimeString('id-ID', options);
    
    default:
      return dateObj.toLocaleDateString('id-ID');
  }
};

/**
 * Calculate age from birth date
 * @param birthDate - Birth date string
 * @returns Age in years
 */
export const calculateAge = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Get current date/time in Asia/Jakarta timezone
 * @returns ISO string with timezone
 */
export const getCurrentDateTime = (): string => {
  return new Date().toLocaleString('sv-SE', { timeZone: APP_TZ }).replace(' ', 'T') + '+07:00';
};

/**
 * Parse ISO date string to Date object
 * @param dateString - ISO date string
 * @returns Date object
 */
export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};
