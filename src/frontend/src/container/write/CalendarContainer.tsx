import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { RootState } from '../../store/modules';
import { setForm } from '../../store/modules/note';
import Calendar from '../../component/write/Calendar';

interface CalendarContainerProps {
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
}


const CalendarContainer: React.FC<CalendarContainerProps> = ({ setIsDateSelected }) => {
  const dispatch = useDispatch();
  const { form } = useSelector((state: RootState) => state.note);
  const TODAY    = useMemo(() => moment(Date.now()), []);

  const setInvestmentDate = useCallback(
    (date: moment.Moment) => {
      dispatch(setForm({ investmentDate: date }));
    }, [dispatch]);

  const onSelectDate = useCallback(
    (selectedDate: moment.Moment) => {
      const curSelected  = selectedDate.format('YYYY-MM');
      const prevSelected = form.investmentDate ? form.investmentDate.format('YYYY-MM') : null;

      if (prevSelected === curSelected) {
        setIsDateSelected(true);
      }

      setInvestmentDate(selectedDate);
    },
    [form.investmentDate, setInvestmentDate, setIsDateSelected]
  );

  return (
    <Calendar onSelectDate={onSelectDate} currentDate={form.investmentDate || TODAY} />
  );
};

export default CalendarContainer;
