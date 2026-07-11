export interface DashboardStats {
  totalAnalyses: number;
  pendingResults: number;
  analyzedToday: number;
  notifiedToday: number;
  lowStockItems: number;
}

export interface DailyResult {
  date: string;
  received: number;
  analyzed: number;
  notified: number;
}

export interface PendingByType {
  name: string;
  value: number;
}

export interface MonthlyTrend {
  month: string;
  analyses: number;
  completed: number;
}

export interface LowStockItem {
  name: string;
  current: number;
  minimum: number;
  unit: string;
}

export interface DashboardData {
  stats: DashboardStats;
  dailyResults: DailyResult[];
  pendingByType: PendingByType[];
  monthlyTrend: MonthlyTrend[];
  lowStock: LowStockItem[];
}

const MOCK_DATA: DashboardData = {
  stats: { totalAnalyses: 2847, pendingResults: 63, analyzedToday: 42, notifiedToday: 38, lowStockItems: 12 },
  dailyResults: [
    { date: 'Lun', received: 48, analyzed: 45, notified: 40 },
    { date: 'Mar', received: 52, analyzed: 50, notified: 47 },
    { date: 'Mie', received: 45, analyzed: 42, notified: 39 },
    { date: 'Jue', received: 55, analyzed: 53, notified: 50 },
    { date: 'Vie', received: 50, analyzed: 48, notified: 45 },
    { date: 'Sab', received: 30, analyzed: 28, notified: 25 },
    { date: 'Dom', received: 22, analyzed: 20, notified: 18 },
  ],
  pendingByType: [
    { name: 'Hematología', value: 18 },
    { name: 'Química Sanguínea', value: 14 },
    { name: 'Urianálisis', value: 11 },
    { name: 'Microbiología', value: 9 },
    { name: 'Inmunología', value: 7 },
    { name: 'Coagulación', value: 4 },
  ],
  monthlyTrend: [
    { month: 'Ene', analyses: 210, completed: 195 },
    { month: 'Feb', analyses: 225, completed: 210 },
    { month: 'Mar', analyses: 240, completed: 228 },
    { month: 'Abr', analyses: 218, completed: 200 },
    { month: 'May', analyses: 235, completed: 222 },
    { month: 'Jun', analyses: 250, completed: 240 },
    { month: 'Jul', analyses: 242, completed: 230 },
    { month: 'Ago', analyses: 260, completed: 248 },
    { month: 'Sep', analyses: 245, completed: 235 },
    { month: 'Oct', analyses: 255, completed: 240 },
    { month: 'Nov', analyses: 270, completed: 258 },
    { month: 'Dic', analyses: 198, completed: 185 },
  ],
  lowStock: [
    { name: 'Tubos EDTA 3ml', current: 5, minimum: 50, unit: 'uds' },
    { name: 'Reactivo Glucosa GOD-POD', current: 2, minimum: 10, unit: 'frascos' },
    { name: ' Lancetas estériles', current: 12, minimum: 100, unit: 'uds' },
    { name: 'Gasas estériles 10x10', current: 3, minimum: 20, unit: 'paq' },
    { name: 'Micropipetas 100-1000µL', current: 1, minimum: 5, unit: 'uds' },
    { name: 'Guantes nitrilo M', current: 2, minimum: 15, unit: 'cajas' },
    { name: 'Alcohol isopropílico 70%', current: 1, minimum: 6, unit: 'litros' },
    { name: 'Puntas azules 1000µL', current: 50, minimum: 500, unit: 'uds' },
    { name: 'Tiras reactivas orina', current: 3, minimum: 20, unit: 'fcos' },
    { name: 'Sueros control Química', current: 1, minimum: 4, unit: 'kit' },
    { name: 'Agu jas jeringa 5ml', current: 8, minimum: 50, unit: 'uds' },
    { name: 'Hisopos estériles', current: 10, minimum: 100, unit: 'uds' },
  ],
};

export const useDashboardData = (): DashboardData => MOCK_DATA;
