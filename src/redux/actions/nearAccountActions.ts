import { Dispatch } from 'redux';

import { signOut } from '../../utils/NearAPI';

export const INIT = '@account/init';
export const CONNECT_REQUEST = '@account/connect-request';
export const CONNECT_SUCCESS = '@account/connect-success';
export const CONNECT_FAILURE = '@account/connect-failure';
export const SILENT_CONNECT = '@account/silent-connect';
export const DISCONNECT = '@account/disconnect';

export const init = (contract: any) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: INIT,
      payload: {
        contract,
      },
    });
  };
};

export const connect = (user: any) => {
  return async (dispatch: Dispatch) => {
    try {
      // dispatch({ type: CONNECT_REQUEST });

      dispatch({
        type: CONNECT_SUCCESS,
        payload: {
          user,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: CONNECT_FAILURE });
      throw error;
    }
  };
};

export const setUserData = (user: any) => {
  // TODO: here
  return (dispatch: Dispatch) =>
    dispatch({
      type: SILENT_CONNECT,
      payload: {
        user,
      },
    });
};

export const disconnect = (wallet: any) => {
  return async (dispatch: Dispatch) => {
    signOut(wallet);

    dispatch({
      type: DISCONNECT,
    });
  };
};
