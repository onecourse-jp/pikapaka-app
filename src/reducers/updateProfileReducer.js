/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'src/lib/createReducer';
import * as types from 'src/actions/types';
const initialState = {};

export const updateProfileReducer = createReducer(initialState, {
  [types.UPDATE_NICKNAME_PROFILE](state, action) {
    return {
      ...state,
      nickName: action.data,
    };
  },
  [types.UPDATE_BIRTHDAY_PROFILE](state, action) {
    return {
      ...state,
      birthday: action.data,
    };
  },
  [types.UPDATE_LIVING_AREA_PROFILE](state, action) {
    return {
      ...state,
      livingArea: action.data,
    };
  },
  [types.UPDATE_NATIONALITY_PROFILE](state, action) {
    return {
      ...state,
      nationality: action.data,
    };
  },
  [types.UPDATE_GENDER_PROFILE](state, action) {
    return {
      ...state,
      gender: action.data,
    };
  },
  // [types.UPDATE_EMAILFACEBOOK_PROFILE](state, action) {
  //   return {
  //     ...state,
  //     emailFacebook: action.data,
  //   };
  // },
  [types.UPDATE_REFECHANNEL_PROFILE](state, action) {
    return {
      ...state,
      channel: action.data,
    };
  },
  [types.UPDATE_HOMETOWN_PROFILE](state, action) {
    return {
      ...state,
      hometown: action.data,
    };
  },
  [types.UPDATE_OCCUPATION_PROFILE](state, action) {
    return {
      ...state,
      occupation: action.data,
    };
  },
  [types.UPDATE_JOB_PROFILE](state, action) {
    return {
      ...state,
      occupation: action.data,
    };
  },
  [types.UPDATE_HEIGHT_PROFILE](state, action) {
    return {
      ...state,
      height: action.data,
    };
  },
  [types.UPDATE_MARRY_PROFILE](state, action) {
    return {
      ...state,
      marriageHistory: action.data,
    };
  },
  [types.UPDATE_ENTRYDATE_PROFILE](state, action) {
    return {
      ...state,
      entryDate: action.data,
    };
  },
  [types.UPDATE_RESIDENTCYSTATUS_PROFILE](state, action) {
    return {
      ...state,
      residenceStatus: action.data,
    };
  },
  [types.UPDATE_PERIODOFSTAY_PROFILE](state, action) {
    return {
      ...state,
      periodOfStay: action.data,
    };
  },
  [types.UPDATE_LANGUAGE_PROFILE](state, action) {
    return {
      ...state,
      language: action.data,
    };
  },
  [types.UPDATE_LEVELLANGUAGE_PROFILE](state, action) {
    return {
      ...state,
      japaneseLevel: action.data,
    };
  },
  [types.UPDATE_ANNUALINCOME_PROFILE](state, action) {
    return {
      ...state,
      annualIncome: action.data,
    };
  },
  [types.UPDATE_MARRIAGEINTENTIONS_PROFILE](state, action) {
    return {
      ...state,
      willingnessToMarry: action.data,
    };
  },
  [types.UPDATE_MARRIAGEHISTORY_PROFILE](state, action) {
    return {
      ...state,
      marriageHistory: action.data,
    };
  },
  [types.UPDATE_CURRENTROOMATE_PROFILE](state, action) {
    return {
      ...state,
      currentRoomate: action.data,
    };
  },
  [types.UPDATE_FAMILY_PROFILE](state, action) {
    return {
      ...state,
      familyComposition: action.data,
    };
  },
  [types.UPDATE_WORKAFTERMARRIAGE_PROFILE](state, action) {
    return {
      ...state,
      workAfterMarriage: action.data,
    };
  },
  [types.UPDATE_INTERESTS_PROFILE](state, action) {
    return {
      ...state,
      interest: action.data,
    };
  },
  [types.UPDATE_AGETOWANT_PROFILE](state, action) {
    return {
      ...state,
      age: action.data,
    };
  },
  [types.UPDATE_DESIREDPARTNER_PROFILE](state, action) {
    return {
      ...state,
      housemateAfterMarriage: action.data,
    };
  },
  [types.UPDATE_DESIRED_PLACE_LIVE](state, action) {
    return {
      ...state,
      livingArea: action.data,
    };
  },
  [types.UPDATE_PROFILE_IMAGE_MANAGEMENT_CODE](state, action) {
    return {
      ...state,
      profileImageManagementCode: action.data,
    };
  },
  [types.UPDATE_PROFILE_LOCATION](state, action) {
    return {
      ...state,
      lat: action.lat,
      lng: action.lng,
    };
  },
  [types.UPDATE_EMAILFACEBOOK_PROFILE](state, action) {
    return {
      ...state,
      facebookEmail: action.data,
    };
  },
});
