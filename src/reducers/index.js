/*
 * combines all th existing reducers
 */
import {loadingReducer} from "./loadingReducer";
import {loginReducer} from "./loginReducer";
import {masterDataReducer} from "./masterDataReducer";
import {otpReducer} from "./otpReducer";
import {registerReducer} from "./registerReducer";
import {updateProfileReducer} from "./updateProfileReducer";
import {formSearch} from "./formSearch";
import {search} from "./search";
import {profileReducer} from "./profileReducer";
import {users} from "./users";
import {chats} from "./chats";
import {appLink} from "./appLink";
import {payments} from "./payments";
import {calendar} from "./calendar";
import {medicalHistory} from "./medicalHistory";

export {
  payments,
  loginReducer,
  loadingReducer,
  masterDataReducer,
  otpReducer,
  registerReducer,
  updateProfileReducer,
  profileReducer,
  users,
  chats,
  formSearch,
  search,
  appLink,
  calendar,
  medicalHistory,
};
