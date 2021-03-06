import { PortfolioSummaries } from '../domain/portfolio';

export interface PortfolioState {
  portfolioSummaries: PortfolioSummaries;
  loading: {
    [action: string]: boolean;
  };
  error: {
    [action: string]: Error | null;
  };
}

export namespace PortfolioPayload {
  namespace GetPortfolioSummaries {
    type Request = undefined;
    type Success = PortfolioSummaries;
  }
}
