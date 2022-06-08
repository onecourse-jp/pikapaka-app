import createReducer from "src/lib/createReducer";
import {UPDATE_PROFILE, UPDATE_LIKE_COUNT} from "@actions/types";
import {UPDATE_PAYMENT_STATUS} from "../actions/types";
const initialState = {
  userDetails: null,
  loading: false,
  error: false,
};

export const users = createReducer(initialState, {
  [UPDATE_PROFILE](state, {payload, type}) {
    return {...state, userDetails: payload};
  },
  [UPDATE_LIKE_COUNT](state, {payload, type}) {
    return {
      ...state,
      userDetails: {
        ...state.userDetails,
        profile: {
          ...state.userDetails.profile,
          numberOfLikesLeft: payload,
        },
      },
    };
  },
  [UPDATE_PAYMENT_STATUS](state, {payload, type}) {
    return {
      ...state,
      userDetails: {
        ...state.userDetails,
        subscriber: {
          originalTransactionId: "placeholder",
          createdAt: new Date(),
          updatedAt: new Date(),
          expiresDate: new Date(2022, 9, 9, 9, 9, 9, 9),
          transactions: [],
        },
      },
    };
  },
});
