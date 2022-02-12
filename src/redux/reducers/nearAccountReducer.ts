import { PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';

import {
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  DISCONNECT,
  SILENT_CONNECT,
  INIT,
} from '../actions/nearAccountActions';

export interface NearAccountState {
  contract: any;
  user: any;
  type: string;
}

const initialState: NearAccountState = {
  user: null,
  contract: null,
  type: '',
};

interface NearAction {
  type: string;
  user: any;
  contract: any;
}

const accountReducer = (
  action: PayloadAction<NearAction> = {
    payload: { type: '', user: null, contract: null },
    type: INIT,
  },
  state: NearAccountState = initialState
) => {
  switch (action.type || '') {
    case INIT: {
      return produce(state, (draft) => {
        const { contract } = action.payload;

        const newDraft = draft;
        newDraft.contract = contract;
        return newDraft;
      });
    }

    case CONNECT_REQUEST: {
      return produce(state, (draft) => {
        // Ensure we clear current session
        const newDraft = draft;
        newDraft.user = null;
        return newDraft;
      });
    }

    case CONNECT_SUCCESS: {
      const { user } = action.payload;
      return produce(state, (draft) => {
        const newDraft = draft;
        newDraft.user = user;
        return newDraft;
      });
    }

    case CONNECT_FAILURE: {
      return produce(state, () => {
        // Maybe store error
      });
    }

    case DISCONNECT: {
      return produce(state, (draft) => {
        const newDraft = draft;
        newDraft.user = null;
        return newDraft;
      });
    }

    case SILENT_CONNECT: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        const newDraft = draft;
        newDraft.user = user;
        return newDraft;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
