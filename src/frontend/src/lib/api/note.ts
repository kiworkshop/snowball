import async from '../async';

interface Form {
  text: string;
  investmentDate: string;
}

export const addNote = async (form: Form) => {
  const data = await async.POST('/notes', form);
  return data;
};
