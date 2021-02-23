export interface PortfolioSummary {
  companyName: string;
  averageBuyingPrice: number;
  targetPrice: number;
  earningsRate: number;
  targetEarningsRate: number;
}

export interface PortfolioState {
  portfolioSummaries: Array<PortfolioSummary>;
  loading: {
    [action: string]: boolean;
  };
  error: {
    [action: string]: Error | null;
  };
}

export type GetPortfolioSummariesSuccessPayload = PortfolioSummary[];
