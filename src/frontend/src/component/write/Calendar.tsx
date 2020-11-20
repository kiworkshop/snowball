import React from 'react';
import { Calendar as AntdCalendar, Typography } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

interface DatePickerProps {
  defaultDate?: moment.Moment;
  onSelectDate: (date: moment.Moment) => void;
  currentDate: moment.Moment;
}

const CalendarContainer = styled.div`
  background: #fff;
  padding: 20px;
`;

const StyledCalendar = styled(AntdCalendar)`
  .ant-radio-group {
    display: none;
  }
`;

const { Title } = Typography;

const Calendar: React.FC<DatePickerProps> = ({ onSelectDate, currentDate }) => {
  const firstDateOfCalendar = moment('1990-01-01');
  const lastDateOfCalendar = moment(Date.now() + 3600 * 24);

  return (
    <CalendarContainer>
      <Title level={3} style={{ color: '#27496d' }}>
        투자노트 날짜 선택
      </Title>
      <StyledCalendar
        validRange={[firstDateOfCalendar, lastDateOfCalendar]}
        onSelect={onSelectDate}
        value={currentDate}
      />
    </CalendarContainer>
  );
};

export default Calendar;
