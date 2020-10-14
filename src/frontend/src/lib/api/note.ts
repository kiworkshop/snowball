import async from '../async';
import { NoteType } from '../../type/note';

export const getNotes = async (page: number) => {
  return await async.GET('/notes', {
    params: { page },
  });
};

export const addNote = async (form: NoteType.NoteForm) => {
  return await async.POST('/notes', form);
};
