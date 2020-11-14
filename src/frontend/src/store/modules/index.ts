import { combineReducers } from 'redux';
import user from './user';
import note from './note';

const rootReducer = combineReducers({
  user,
  note,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
