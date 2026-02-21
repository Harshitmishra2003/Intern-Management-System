export interface Batch {
  id: number;
  name: string; // ✅ must match backend
  startDate: string;
  endDate: string;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED';
  interns?: any[]; // optional since backend sends it
}