import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { RootState } from '../../store/modules';
import { setForm } from '../../store/modules/note';

import Calendar from '../../component/write/Calendar';

interface CalendarContainerProps {
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarContainer: React.FC<CalendarContainerProps> = ({
  setIsDateSelected,
}) => {
  const dispatch = useDispatch();
  const {
    form: { investmentDate },
  } = useSelector((state: RootState) => state.note);

  const setInvestmentDate = useCallback(
    (date: moment.Moment) => {
      dispatch(setForm({ investmentDate: date }));
    },
    [dispatch]
  );

  const onSelectDate = useCallback(
    (selectedDate: moment.Moment) => {
      const prevYearAndMonth = investmentDate
        ? investmentDate.format('YYYY-MM')
        : null;
      const yearAndMonthOfSelectedDate = selectedDate.format('YYYY-MM');

      if (prevYearAndMonth === yearAndMonthOfSelectedDate) {
        setIsDateSelected(true);
      }
      setInvestmentDate(selectedDate);
    },
    [investmentDate, setInvestmentDate, setIsDateSelected]
  );

  const TODAY = useMemo(() => moment(Date.now()), []);

  return (
    <Calendar
      onSelectDate={onSelectDate}
      currentDate={investmentDate || TODAY}
    />
  );
};

export default CalendarContainer;
