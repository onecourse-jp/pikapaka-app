import createReducer from '@lib/createReducer';
import * as types from '@actions/types';

const initialState = {
  isLoading: false,
  loaded: false,
  data: null,
  error: null,
  mapData: null,
  appLinks: [],
};

export const masterDataReducer = createReducer(initialState, {
  [types.GET_MASTER_DATA_REQUEST](state) {
    return {
      ...state,
      isLoading: true,
      loaded: false,
      data: null,
      error: null,
    };
  },
  [types.GET_MASTER_DATA_SUCCESS](state, action) {
    return {
      ...state,
      isLoading: false,
      loaded: true,
      data: action.response.data,
      // mapData:action.response.mapData,
      error: null,
    };
  },
  [types.PROCESS_MASTER_DATA](state, action) {
    return {
      ...state,
      isLoading: false,
      loaded: true,
      data: action.data,
      mapData: action.mapData,
      error: null,
    };
  },
  [types.GET_MASTER_DATA_FAILED](state, action) {
    return {
      ...state,
      isLoading: false,
      loaded: true,
      data: null,
      error: action,
    };
  },
});
