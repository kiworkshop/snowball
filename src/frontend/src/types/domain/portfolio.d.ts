export interface PortfolioSummary {
  companyName: string;
  averageBuyingPrice: number;
  targetPrice: number;
  earningsRate: number;
  targetEarningsRate: number;
}

export type PortfolioSummaries = Array<PortfolioSummary>;
