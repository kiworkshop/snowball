import styled from 'styled-components';
import { Button, Typography, List as AntdList, Popover as AntdPopover, Pagination as AntdPagination } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import * as Color from '../../../constants/colors';

export const Container = styled.div`
  background-color: ${Color.WHITE};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Title = styled(Typography.Title)`
  color: ${Color.BLUE_2};
  margin-bottom: 30px !important;
`;

export const List = styled(AntdList)`
  padding: 0 10px;
`;

export const Popover = styled(AntdPopover)``;

export const MoreButton = styled(MoreOutlined)`
  font-size: 20px;
`;

export const SmallButton = styled(Button)`
  padding: 4px 5px;
`;

export const Pagination = styled(AntdPagination)`
  padding: 10px 0;
  text-align: center;
`;
