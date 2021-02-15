import { message, Modal } from 'antd';
import routes from '../routes';

type ErrorMap = {
  [statusCode: number]: any;
};

type CustomHandler = ErrorMap | undefined;

const errorMap: ErrorMap = {
  400: () => message.error('잘못된 요청입니다.'),
  401: () => {
    message.error('로그인 세션이 만료되었습니다.');
    window.location.replace(routes.login());
  },
  403: () => message.error('권한이 없습니다.'),
  404: () => message.error('존재하지 않는 경로에 대한 요청입니다.'),
  500: () => message.error('서버 오류입니다.'),
};

const errorHandler = (error: any, customHandler: CustomHandler = undefined) => {
  if (error.response && error.response.status) {
    const statusCode = error.response.status;

    if (customHandler && customHandler[statusCode]) {
      customHandler[statusCode].call();
      return;
    }

    if (errorMap[statusCode]) {
      errorMap[statusCode].call();
      return;
    }
  }

  Modal.confirm({
    title: '일시적 오류',
    content: '일시적인 오류가 발생했습니다. 새로고침 하시겠습니까?',
    okText: '확인',
    cancelText: '취소',
    onOk: () => {
      window.location.reload();
    },
  });
};

export default errorHandler;
