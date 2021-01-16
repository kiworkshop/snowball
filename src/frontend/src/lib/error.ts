import { message, Modal } from 'antd';

const errorHandler = (error: any, customHandler: CustomHandler = undefined) => {
  if (customHandler) {
    customHandler(error);
  }

  if (error.response && error.response.status) {
    const statusCode = error.response.status;

    if (statusCode === 400 || statusCode === 404) {
      return message.error('잘못된 요청입니다.');
    }

    if (statusCode === 401) {
      message.error('로그인 세션이 만료되었습니다.');
      return window.location.replace('/login');
    }

    if (statusCode === 403) {
      return message.error('권한이 없습니다.');
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

type CustomHandler = ((error: any) => void) | undefined;

export default errorHandler;
