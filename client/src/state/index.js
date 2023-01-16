import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  mode: "dark",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("firstName", action.payload.user.firstName);
      localStorage.setItem("lastName", action.payload.user.lastName);
      localStorage.setItem("user_id", action.payload.user._id);
      localStorage.setItem("picturePath", action.payload.user.picturePath);
      localStorage.setItem("email", action.payload.user.email);
      localStorage.setItem("watchlist", action.payload.user.watchlist);
      localStorage.setItem("created_at", action.payload.user.createdAt);
      localStorage.setItem("updated_at", action.payload.user.updatedAt);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("user_id");
      localStorage.removeItem("picturePath");
      localStorage.removeItem("email");
      localStorage.removeItem("watchlist");
      localStorage.removeItem("created_at");
      localStorage.removeItem("updated_at");
    },
  },
});

export const { setMode, setLogin, setLogout } = globalSlice.actions;
export default globalSlice.reducer;
