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
  stats: {
    totalAnalyses: 20,
    pendingResults: 3,
    analyzedToday: 5,
    notifiedToday: 4,
    lowStockItems: 2,
  },

  dailyResults: [
    { date: "Lun", received: 3, analyzed: 2, notified: 2 },
    { date: "Mar", received: 4, analyzed: 4, notified: 3 },
    { date: "Mié", received: 2, analyzed: 2, notified: 2 },
    { date: "Jue", received: 5, analyzed: 4, notified: 4 },
    { date: "Vie", received: 3, analyzed: 3, notified: 2 },
    { date: "Sáb", received: 2, analyzed: 2, notified: 1 },
    { date: "Dom", received: 1, analyzed: 1, notified: 1 },
  ],

  pendingByType: [
    { name: "Hematología", value: 2 },
    { name: "Química", value: 1 },
  ],

  monthlyTrend: [
    { month: "May", analyses: 10, completed: 9 },
    { month: "Jun", analyses: 15, completed: 14 },
    { month: "Jul", analyses: 20, completed: 17 },
  ],

  lowStock: [
    {
      name: "Tubos EDTA 3 ml",
      current: 8,
      minimum: 50,
      unit: "uds",
    },
    {
      name: "Reactivo Glucosa GOD-POD",
      current: 2,
      minimum: 10,
      unit: "frascos",
    },
  ],
};

export const useDashboardData = (): DashboardData => MOCK_DATA;