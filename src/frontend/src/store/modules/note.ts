import { NoteType } from '../../type/note';
import { UserType } from '../../type/user';
import { Action, ActionCreator } from 'redux';

const LOGIN = 'note/LOGIN';
const CHANGE_INVESTMENT_DATE = 'note/CHANGE_INVESTMENT_DATE';
const CHANGE_TEXT = 'note/CHANGE_TEXT';

interface LoginAction extends Action {
  type: typeof LOGIN;
  payload: UserType.UserInfo;
}

interface ChangeInvestmentDateAction extends Action {
  type: typeof CHANGE_INVESTMENT_DATE;
  payload: string;
}

interface ChangeTextAction extends Action {
  type: typeof CHANGE_TEXT;
  payload: string;
}

export const login: ActionCreator<LoginAction> = (user: UserType.UserInfo) => ({
  type: LOGIN,
  payload: user,
});

export const changeInvestmentDate: ActionCreator<ChangeInvestmentDateAction> = (
  date: string
) => ({
  type: CHANGE_INVESTMENT_DATE,
  payload: date,
});

export const changeText: ActionCreator<ChangeTextAction> = (text: string) => ({
  type: CHANGE_TEXT,
  payload: text,
});

type NoteAction =
  | ReturnType<typeof changeInvestmentDate>
  | ReturnType<typeof login>
  | ReturnType<typeof changeText>;

const initialState: NoteType.NoteState = {
  noteInfo: {
    id: '',
    text: '',
    investmentDate: '',
    createdDate: '',
    lastModifiedDate: '',
  },
  noteForm: {
    text: '',
    investmentDate: '',
    user: {
      id: '',
      email: '',
      name: '',
      age: null,
      gender: '',
      pictureUrl: '',
      notes: [],
    },
  },
};

function note(state: NoteType.NoteState = initialState, action: NoteAction) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        noteForm: {
          ...state.noteForm,
          user: action.payload,
        },
      };
    case CHANGE_INVESTMENT_DATE:
      return {
        ...state,
        noteForm: {
          ...state.noteForm,
          investmentDate: action.payload,
        },
      };
    case CHANGE_TEXT:
      return {
        ...state,
        noteForm: {
          ...state.noteForm,
          text: action.payload,
        },
      };

    default:
      return state;
  }
}

export default note;
