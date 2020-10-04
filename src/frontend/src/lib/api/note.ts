import axios from '../axios';

interface Form {
  content: string;
  date: string;
}

export const addNote = async (form: Form) => {
  try {
    const response = await axios.post('/create', form);
    return response;
  } catch (error) {
    console.error(error);
  }
};
