import { Store } from 'redux';
import userSlice from '../features/user';

const init = (store: Store) => {
  store.dispatch(userSlice.actions.getMeRequest());
};

export default init;
