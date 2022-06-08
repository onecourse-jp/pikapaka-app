// export action creators
import * as loginActions from "./loginActions";
import * as navigationActions from "./navigationActions";
import * as masterDataActions from "./masterDataAction";
import * as registerAction from "./registerAction";
import * as profileAction from "./profileAction";
import * as waitingPayment from "./paymentActions";
import * as calendarAction from "./calendarAction";
import * as medicalHistoryAction from "./medicalHistoryAction";

export const ActionCreators = Object.assign(
  {},
  loginActions,
  navigationActions,
  masterDataActions,
  registerAction,
  profileAction,
  waitingPayment,
  calendarAction,
  medicalHistoryAction,
);
