import styled from 'styled-components';
import { Typography, Table as AntdTable } from 'antd';
import * as Color from '../../../constants/colors';

export const Container = styled.div`
  background: ${Color.WHITE};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  padding: 20px;
`;

export const Title = styled(Typography.Title)`
  color: ${Color.BLUE_2};
  margin-bottom: 30px !important;
`;

export const Table = styled(AntdTable)`
  * {
    text-align: center !important;
  }
`;
