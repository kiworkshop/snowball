import React, { useCallback, useEffect } from 'react';
import { Button, DatePicker as Picker, Space, Typography } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setForm } from '../../store/modules/note';

interface DatePickerProps {
  initialDate: moment.Moment;
  onChange: (date: string) => void;
  onClick: () => void;
}

const StyledDatePicker = styled(Picker)`
  margin-bottom: 50px;
  width: 280px;

  input {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const { Title } = Typography;

const DatePicker: React.FC<DatePickerProps> = ({
  initialDate,
  onChange,
  onClick,
}) => {
  const dispatch = useDispatch();

  const setInvestmentDate = useCallback(
    (date: moment.Moment) => {
      dispatch(setForm({ investmentDate: date }));
    },
    [dispatch]
  );

  useEffect(() => {
    setInvestmentDate(initialDate);
  }, [setInvestmentDate, initialDate]);

  return (
    <Space
      direction="vertical"
      align="center"
      style={{ paddingTop: '100px', width: '100%' }}
    >
      <Title>작성하고픈 투자노트 날짜</Title>
      <StyledDatePicker
        allowClear={false}
        defaultValue={moment(initialDate)}
        onChange={(_, date) => onChange(date)}
        bordered={false}
      />
      <Button size="large" onClick={onClick}>
        작성 시작하기
      </Button>
    </Space>
  );
};

export default DatePicker;
