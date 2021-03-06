export namespace NoteRequest {
  namespace GetNotes {
    type size = number;
    type page = number;
  }

  namespace GetNote {
    type id = number;
  }

  namespace Create {
    interface Form {
      title: string;
      content: string;
      investmentDate: string;
      stockTransactionRequests: Array<{
        stockDetailId: number;
        quantity: number;
        tradedPrice: number;
        transactionType: 'BUY' | 'SELL';
      }>;
    }
  }

  namespace Update {
    type id = number;
    interface Form {
      title: string;
      content: string;
      investmentDate: string;
      stockTransactionRequests: Array<{
        stockDetailId: number;
        quantity: number;
        tradedPrice: number;
        transactionType: 'BUY' | 'SELL';
      }>;
    }
  }

  namespace Delete {
    type id = number;
  }
}
