import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { noteSelector, portfolioSelector, stockTransactionSelector, userSelector } from './lib/selector';
import noteSlice from './features/note/noteSlice';
import portfolioSlice from './features/portfolio/portfolioSlice';
import stockTransactionSlice from './features/stockTransaction/stockTransactionSlice';
import userSlice from './features/user/userSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useNoteAction = () => noteSlice.actions;
export const usePortfolioAction = () => portfolioSlice.actions;
export const useStockTransactionAction = () => stockTransactionSlice.actions;
export const useUserAction = () => userSlice.actions;

export const useNoteState = () => useAppSelector(noteSelector);
export const usePortfolioState = () => useAppSelector(portfolioSelector);
export const useStockTransactionState = () => useAppSelector(stockTransactionSelector);
export const useUserState = () => useAppSelector(userSelector);
