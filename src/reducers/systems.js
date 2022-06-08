import createReducer from 'src/lib/createReducer';
import { UPDATE_SYSTEM_CONFIG } from '@actions/types';
const initialState = {
  config: null,
};

export const systems = createReducer(initialState, {
  [UPDATE_SYSTEM_CONFIG](state, { payload, type }) {
    return { ...state, config: payload };
  },
});
