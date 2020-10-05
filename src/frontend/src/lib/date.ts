import moment from 'moment';

export const setDate = (date: string) => {
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  return `${moment(date).format('YYYY-MM-DD')} (${
    dayOfWeek[moment(date).day()]
  })`;
};
