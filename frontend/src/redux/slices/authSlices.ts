import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userInfoState {
  userInfo: {
    _id: string;
    name: string;
    email: string;
  } | null;
}
interface actionPayloadTypes {
  _id: string;
  name: string;
  email: string;
}

const initialState: userInfoState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state: userInfoState,
      action: PayloadAction<actionPayloadTypes>
    ) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
