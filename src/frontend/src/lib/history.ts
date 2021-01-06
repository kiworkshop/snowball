import { Action, createBrowserHistory, Location } from 'history';

export const browserHistory = createBrowserHistory();

export const push = (url: string): void => {
  browserHistory.push(url);
};

export const goBack = () => {
  browserHistory.goBack();
};

export const listen = (listener: historyListener) => {
  browserHistory.listen(listener);
};

type historyListener = (location: Location<unknown>, action: Action) => void;
