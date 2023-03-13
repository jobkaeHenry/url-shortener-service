export interface DashboardItemsType {
  id: string;
  short_code: string;
  url: string;
  created_at: string;
  visitCounts: number;
}

export interface DetailedAnaliticsType {
  browserInfo: AnalizedData[];
  language: AnalizedData[];
}

interface AnalizedData {
  name: string;
  count: number;
}
