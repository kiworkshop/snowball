import React, { useCallback, useEffect } from 'react';
import { Calendar as AntdCalendar } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setFormThunk } from '../../store/modules/note';

interface DatePickerProps {
  defaultDate?: moment.Moment;
  onSelectDate: (date: moment.Moment) => void;
  value: moment.Moment;
}

const StyledCalendar = styled(AntdCalendar)`
  .ant-radio-group {
    display: none;
  }
`;

const Calendar: React.FC<DatePickerProps> = ({
  defaultDate,
  onSelectDate,
  value,
}) => {
  const dispatch = useDispatch();

  const setInvestmentDate = useCallback(
    (date: moment.Moment) => {
      dispatch(setFormThunk({ investmentDate: date }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (defaultDate) {
      setInvestmentDate(defaultDate);
    }
  }, [setInvestmentDate, defaultDate]);

  const firstDateOfCalendar = moment('1990-01-01');
  const lastDateOfCalendar = moment(Date.now() + 3600 * 24);

  return (
    <StyledCalendar
      validRange={[firstDateOfCalendar, lastDateOfCalendar]}
      onSelect={onSelectDate}
      value={value}
    />
  );
};

export default Calendar;
