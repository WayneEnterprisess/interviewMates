import { createSlice } from "@reduxjs/toolkit";


const storedAuth = localStorage.getItem("isAuthenticated") === "true";
const storedUser = JSON.parse(localStorage.getItem("user"));



const initialState = {
    user: storedUser || null,
    isAuthenticated: storedAuth || false,
    loading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
  
      setCredentials: (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading=false;

      },
      logout: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading=false;
      },
    },
  });

  
export const { setCredentials, logout,setLoading } = authSlice.actions;
export default authSlice.reducer;
