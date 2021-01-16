import { message, Modal } from 'antd';

const lastErrorHandler = () => {
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

const handleErrorStatusCode = (statusCode: number) => {
  if (statusCode === 400 || statusCode === 404) {
    return message.error('잘못된 요청입니다.');
  }

  if (statusCode === 401) {
    message.error('로그인 기간이 만료되었습니다.');
    return window.location.replace('/login');
  }

  if (statusCode === 403) {
    return message.error('권한이 없습니다.');
  }

  lastErrorHandler();
};

const errorHandler = (error: any, customMessage: string = '') => {
  if (customMessage) {
    return message.error(customMessage);
  }

  if (error.response && error.response.status) {
    return handleErrorStatusCode(error.response.status);
  }

  lastErrorHandler();
};

export default errorHandler;
