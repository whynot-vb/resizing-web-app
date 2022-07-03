export const DISPLAY_ALERT = "DISPLAY_ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT";
export const RESIZE_PROCESS_STARTED = "RESIZE_PROCESS_STARTED";
export const RESIZE_PROCESS_OK = "RESIZE_PROCESS_OK";
export const RESIZE_PROCESS_FAILED = "RESIZE_PROCESS_FAILED";
export const ADD_PHOTO = "ADD_PHOTO";

export const displayAlert = (alertType, alertText) => async (dispatch) => {
  dispatch({ type: DISPLAY_ALERT, payload: { alertType, alertText } });
  setTimeout(() => {
    dispatch({ type: CLEAR_ALERT });
  }, 5000);
};
