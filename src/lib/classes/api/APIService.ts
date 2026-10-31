import type { DashboardData } from './DashboardData';

export abstract class APIService {
  protected readonly dashboardData: DashboardData = { events: [] };

  public get data(): DashboardData {
    return this.dashboardData;
  }
}
