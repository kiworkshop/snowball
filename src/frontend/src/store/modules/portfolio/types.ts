import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export type PortfolioAction = ActionType<typeof actions>;

export interface PortfolioState {
  portfolioSummaries: Array<PortfolioSummary>;
  loading: {
    [action: string]: boolean;
  };
  error: {
    [action: string]: Error | null;
  };
}

export interface PortfolioSummary {
  companyName: string;
  averageBuyingPrice: number;
  targetPrice: number;
  earningsRate: number;
  targetEarningsRate: number;
}
