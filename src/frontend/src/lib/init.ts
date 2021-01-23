import { Store } from 'redux';
import { getMeAsync } from '../store/modules/user';

const init = (store: Store) => {
  store.dispatch(getMeAsync.request());
};

export default init;
