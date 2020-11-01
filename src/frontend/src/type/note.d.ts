import moment from 'moment';

export namespace Note {
  interface Note {
    id: string;
    content: string;
    investmentDate: moment.Moment | null;
    createdDate: moment.Moment | null;
    lastModifiedDate: moment.Moment | null;
  }

  interface APIResponse {
    id: string;
    text: string;
    investmentDate: string;
    createdDate: string;
    lastModifiedDate: string;
  }

  interface APIResponseOnlyWithId {
    id: string;
  }

  interface Form {
    content: string;
    investmentDate: moment.Moment | null;
  }

  interface ChangedPartOfForm {
    content?: string;
    investmentDate?: moment.Moment | null;
  }
}
