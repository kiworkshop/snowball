import async from '../async';

interface Form {
  text: string;
  investmentDate: string;
}

export const getNotes = async (page: number) => {
  const data = await async.GET('/notes', {
    params: { page },
  });
  return data;
};

export const addNote = async (form: Form) => {
  const data = await async.POST('/notes', form);
  return data;
};
