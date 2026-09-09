import { Component, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import type { ChartOptions } from 'chart.js';
import { StatsCardComponent } from '@components/cards/stats-card.component';
import { MainCardComponent } from '@components/cards/main-card.component';
import { IconComponent } from '@components/icon/icon.component';
import { ThemeService } from '@core/theme/theme.service';

interface DashboardStats {
  totalAnalyses: number;
  pendingResults: number;
  analyzedToday: number;
  notifiedToday: number;
  lowStockItems: number;
}

interface DailyResult { date: string; received: number; analyzed: number; notified: number; }
interface PendingByType { name: string; value: number; }
interface MonthlyTrend { month: string; analyses: number; completed: number; }
interface LowStockItem { name: string; current: number; minimum: number; unit: string; }

const MOCK_DATA = {
  stats: {
    totalAnalyses: 20,
    pendingResults: 3,
    analyzedToday: 5,
    notifiedToday: 4,
    lowStockItems: 2,
  },
  dailyResults: [
    { date: 'Lun', received: 3, analyzed: 2, notified: 2 },
    { date: 'Mar', received: 4, analyzed: 4, notified: 3 },
    { date: 'Mié', received: 2, analyzed: 2, notified: 2 },
    { date: 'Jue', received: 5, analyzed: 4, notified: 4 },
    { date: 'Vie', received: 3, analyzed: 3, notified: 2 },
    { date: 'Sáb', received: 2, analyzed: 2, notified: 1 },
    { date: 'Dom', received: 1, analyzed: 1, notified: 1 },
  ],
  pendingByType: [
    { name: 'Hematología', value: 2 },
    { name: 'Química', value: 1 },
  ],
  monthlyTrend: [
    { month: 'May', analyses: 10, completed: 9 },
    { month: 'Jun', analyses: 15, completed: 14 },
    { month: 'Jul', analyses: 20, completed: 17 },
  ],
  lowStock: [
    { name: 'Tubos EDTA 3 ml', current: 8, minimum: 50, unit: 'uds' },
    { name: 'Reactivo Glucosa GOD-POD', current: 2, minimum: 10, unit: 'frascos' },
  ],
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatsCardComponent, MainCardComponent, IconComponent, BaseChartDirective],
  template: `
    <div class="dash">
      <div class="dash-stats">
        @for (card of statCards; track card.title) {
          <div class="dash-stat-box">
            <app-stats-card [title]="card.title" [value]="card.value" [colorToken]="card.colorToken">
              <span icon><app-icon [name]="card.icon"></app-icon></span>
            </app-stats-card>
          </div>
        }
      </div>

      <div class="dash-row">
        <div class="dash-chart-box">
          <app-main-card>
            <div class="chart-title">Análisis diarios</div>
            <div class="chart-wrap">
              <canvas baseChart
                type="bar"
                [data]="dailyData"
                [options]="barOptions"
              ></canvas>
            </div>
          </app-main-card>
        </div>
        <div class="dash-chart-box">
          <app-main-card>
            <div class="chart-title">Pendientes por tipo</div>
            <div class="chart-wrap chart-wrap-doughnut">
              <canvas baseChart
                type="doughnut"
                [data]="pendingData"
                [options]="doughnutOptions"
              ></canvas>
            </div>
          </app-main-card>
        </div>
      </div>

      <div class="dash-row">
        <div class="dash-chart-box">
          <app-main-card>
            <div class="chart-title">Tendencia mensual</div>
            <div class="chart-wrap">
              <canvas baseChart
                type="line"
                [data]="monthlyData"
                [options]="lineOptions"
              ></canvas>
            </div>
          </app-main-card>
        </div>
        <div class="dash-chart-box">
          <app-main-card>
            <div class="chart-title">Stock bajo</div>
            <table class="low-stock">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Actual</th>
                  <th>Mínimo</th>
                </tr>
              </thead>
              <tbody>
                @for (item of data.lowStock; track item.name) {
                  <tr>
                    <td>{{ item.name }}</td>
                    <td class="low-now">{{ item.current }} {{ item.unit }}</td>
                    <td>{{ item.minimum }} {{ item.unit }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </app-main-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dash { display: flex; flex-direction: column; gap: 3rem; }
    .dash-stats { display: flex; flex-wrap: wrap; gap: 2.5rem; }
    .dash-stat-box { flex: 1 1 180px; min-width: 180px; }
    .dash-row { display: flex; flex-wrap: wrap; gap: 2.5rem; }
    .dash-chart-box { flex: 1 1 400px; min-width: 300px; }
    .chart-title { font-weight: 700; color: var(--color-text); margin-bottom: 1.25rem; }
    .chart-wrap { position: relative; height: 300px; }
    .chart-wrap-doughnut { height: 280px; max-width: 340px; margin: 0 auto; }
    .low-stock { width: 100%; border-collapse: collapse; }
    .low-stock th, .low-stock td { text-align: left; padding: 0.75rem; border-bottom: 1px solid var(--color-border); font-size: 0.9rem; color: var(--color-text); }
    .low-stock th { opacity: 0.6; font-weight: 500; }
    .low-now { color: var(--color-error); font-weight: 700; }
  `],
})
export class DashboardComponent {
  data: { stats: DashboardStats; dailyResults: DailyResult[]; pendingByType: PendingByType[]; monthlyTrend: MonthlyTrend[]; lowStock: LowStockItem[] } = MOCK_DATA;

  statCards = [
    { title: 'Total Análisis', value: this.data.stats.totalAnalyses, colorToken: undefined, icon: 'FlaskConical' },
    { title: 'Pendientes', value: this.data.stats.pendingResults, colorToken: 'warning', icon: 'Clock' },
    { title: 'Analizados Hoy', value: this.data.stats.analyzedToday, colorToken: 'primary', icon: 'Activity' },
    { title: 'Notificados Hoy', value: this.data.stats.notifiedToday, colorToken: 'success', icon: 'CheckCheck' },
    { title: 'Stock Bajo', value: this.data.stats.lowStockItems, colorToken: 'error', icon: 'AlertTriangle' },
  ];

  private readonly theme = inject(ThemeService);

  private colors = this.theme.colors;

  dailyData = {
    labels: this.data.dailyResults.map((item) => item.date),
    datasets: [
      { label: 'Recibidos', data: this.data.dailyResults.map((item) => item.received), backgroundColor: this.colors.chartIndigo, borderRadius: 6, maxBarThickness: 26 },
      { label: 'Analizados', data: this.data.dailyResults.map((item) => item.analyzed), backgroundColor: this.colors.chartBlue, borderRadius: 6, maxBarThickness: 26 },
      { label: 'Notificados', data: this.data.dailyResults.map((item) => item.notified), backgroundColor: this.colors.chartGreen, borderRadius: 6, maxBarThickness: 26 },
    ],
  };

  pendingData = {
    labels: this.data.pendingByType.map((item) => item.name),
    datasets: [
      {
        data: this.data.pendingByType.map((item) => item.value),
        backgroundColor: [this.colors.chartIndigo, this.colors.chartAmber],
        borderColor: this.colors.bgCard,
        borderWidth: 2,
        borderRadius: 6,
        spacing: 4,
        cutout: '60%',
        radius: '82%',
      },
    ],
  };

  monthlyData = {
    labels: this.data.monthlyTrend.map((item) => item.month),
    datasets: [
      {
        label: 'Análisis',
        data: this.data.monthlyTrend.map((item) => item.analyses),
        borderColor: this.colors.chartBlue,
        backgroundColor: this.rgba(this.colors.chartBlue, 0.12),
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: this.colors.chartBlue,
        pointBorderWidth: 0,
      },
      {
        label: 'Completados',
        data: this.data.monthlyTrend.map((item) => item.completed),
        borderColor: this.colors.chartGreen,
        backgroundColor: this.rgba(this.colors.chartGreen, 0.12),
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: this.colors.chartGreen,
        pointBorderWidth: 0,
      },
    ],
  };

  private rgba(color: string, alpha: number): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private baseOptions(): ChartOptions {
    const c = this.colors;
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: c.text,
            usePointStyle: true,
            boxWidth: 8,
            boxHeight: 8,
            padding: 16,
            font: { family: 'Outfit', size: 12 },
          },
        },
        tooltip: {
          backgroundColor: c.bgCard,
          borderColor: c.border,
          borderWidth: 1,
          titleColor: c.text,
          bodyColor: c.textSecondary,
          padding: 10,
          cornerRadius: 8,
          boxPadding: 4,
          usePointStyle: true,
          titleFont: { family: 'Outfit', weight: 600 },
          bodyFont: { family: 'Outfit' },
        },
      },
    };
  }

  private cartesianOptions(): ChartOptions {
    const c = this.colors;
    const base = this.baseOptions();
    return {
      ...base,
      scales: {
        x: {
          grid: { display: false },
          border: { color: c.border },
          ticks: { color: c.text, font: { family: 'Outfit', size: 12 } },
        },
        y: {
          beginAtZero: true,
          grid: { color: c.border },
          border: { display: false },
          ticks: { color: c.text, font: { family: 'Outfit', size: 12 } },
        },
      },
    };
  }

  barOptions: ChartOptions = this.cartesianOptions();

  lineOptions: ChartOptions = this.cartesianOptions();

  doughnutOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 8 },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: this.colors.text,
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          padding: 16,
          font: { family: 'Outfit', size: 12 },
        },
      },
      tooltip: {
        backgroundColor: this.colors.bgCard,
        borderColor: this.colors.border,
        borderWidth: 1,
        titleColor: this.colors.text,
        bodyColor: this.colors.textSecondary,
        padding: 10,
        cornerRadius: 8,
        boxPadding: 4,
        usePointStyle: true,
        titleFont: { family: 'Outfit', weight: 600 },
        bodyFont: { family: 'Outfit' },
      },
    },
  };
}