import { configureStore } from "@reduxjs/toolkit";

import photoReducer from "../reducers/photoReducer";

export const store = configureStore({
  reducer: {
    photos: photoReducer,
  },
});
