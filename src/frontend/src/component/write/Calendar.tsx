import React from 'react';
import { Calendar as AntdCalendar, Typography } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { $mainColor } from '../../constants/colors';

interface DatePickerProps {
  currentDate: moment.Moment;
  onSelectDate: (date: moment.Moment) => void;
}

const Wrapper = styled.div`
  background: #fff;
  padding: 20px;
`;

const CalendarTitle = styled(Typography.Title)`
  color: ${$mainColor};
`;

const StyledCalendar = styled(AntdCalendar)`
  .ant-radio-group {
    display: none;
  }
`;

const Calendar: React.FC<DatePickerProps> = ({ onSelectDate, currentDate }) => {
  const firstDateOfCalendar = moment('1990-01-01');
  const lastDateOfCalendar = moment(Date.now() + 3600 * 24);

  return (
    <Wrapper>
      <CalendarTitle level={3}>투자노트 날짜 선택</CalendarTitle>
      <StyledCalendar
        validRange={[firstDateOfCalendar, lastDateOfCalendar]}
        onSelect={onSelectDate}
        value={currentDate}
      />
    </Wrapper>
  );
};

export default Calendar;
