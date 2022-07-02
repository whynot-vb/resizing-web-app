import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  RESIZE_PROCESS_STARTED,
  RESIZE_PROCESS_OK,
  RESIZE_PROCESS_FAILED,
} from "../actionCreators/photos";

const initialState = {
  showAlert: false,
  alertText: "",
  alertType: "",
  isResizing: false,
  photos: [],
};

export default function photoReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_ALERT: {
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.alertType,
        alertText: action.payload.alertText,
      };
    }
    case CLEAR_ALERT: {
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    }
    case RESIZE_PROCESS_STARTED: {
      return {
        ...state,
        isResizing: true,
        alertType: "success",
        alertText: "Resize process started",
      };
    }
    case RESIZE_PROCESS_OK: {
      return {
        ...state,
        isResizing: false,
        alertType: "success",
        alertText: "Images successfully resized",
        photos: action.payload.photos,
      };
    }
    case RESIZE_PROCESS_FAILED: {
      return {
        ...state,
        isResizing: false,
        alertType: "error",
        alertText: "Unable to process image resizing request",
      };
    }
    default: {
      return state;
    }
  }
}
