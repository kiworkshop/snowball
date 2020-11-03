import React from 'react';
import { Calendar as AntdCalendar } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

interface DatePickerProps {
  defaultDate?: moment.Moment;
  onSelectDate: (date: moment.Moment) => void;
  currentDate: moment.Moment;
}

const StyledCalendar = styled(AntdCalendar)`
  .ant-radio-group {
    display: none;
  }
`;

const Calendar: React.FC<DatePickerProps> = ({ onSelectDate, currentDate }) => {
  const firstDateOfCalendar = moment('1990-01-01');
  const lastDateOfCalendar = moment(Date.now() + 3600 * 24);

  return (
    <StyledCalendar
      validRange={[firstDateOfCalendar, lastDateOfCalendar]}
      onSelect={onSelectDate}
      value={currentDate}
    />
  );
};

export default Calendar;
