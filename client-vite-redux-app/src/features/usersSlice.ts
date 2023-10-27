import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios from "axios";

export type UserType = {
  name: string;
  surname: string;
  email: string;
  role: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};

export type RegisterUserData = {
  name: string;
  surname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

export type UpdateEmailData = {
  newEmail: string;
  confirmNewEmail: string;
  password: string;
};

export type UpdatePasswordData = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

type StatusType = "idle" | "loading" | "succeeded" | "failed";

type Statuses = {
  login: StatusType;
  register: StatusType;
  currentUser: StatusType;
  updateEmail: StatusType;
  updatePassword: StatusType;
  logout: StatusType;
};

type UserState = {
  user: UserType | null;
  status: Statuses;
  error: null | string;
};

const idleStatuses: Statuses = {
  currentUser: "idle",
  login: "idle",
  register: "idle",
  updateEmail: "idle",
  updatePassword: "idle",
  logout: "idle",
};

const initialState: UserState = {
  user: null,
  status: idleStatuses,
  error: null,
};

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const response = await axios.get("/api/users");
  return response.data;
});

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (loginData: LoginUserData) => {
    await axios.post("/api/users/login", loginData);
    const response = await axios.get("/api/users");
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (registerData: RegisterUserData) => {
    await axios.post("/api/users", registerData);
  }
);

export const updateEmail = createAsyncThunk(
  "users/updateEmail",
  async (updateEmailData: UpdateEmailData) => {
    await axios.put("/api/users/changeEmail", updateEmailData);
    const response = await axios.get("/api/users");
    return response.data;
  }
);

export const updatePassword = createAsyncThunk(
  "users/updatePassword",
  async (updatePasswordData: UpdatePasswordData) => {
    await axios.put("/api/users/changePassword", updatePasswordData);
  }
);

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
  await axios.delete("/api/users/logout");
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetStatuses(state) {
      state.status = {
        currentUser: "succeeded",
        login: "idle",
        register: "idle",
        updateEmail: "idle",
        updatePassword: "idle",
        logout: "idle",
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status.currentUser = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status.currentUser = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status.currentUser = "failed";
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status.login = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status.login = "succeeded";
        state.status.currentUser = "idle";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status.login = "failed";
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status.register = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status.register = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status.register = "failed";
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(updateEmail.pending, (state) => {
        state.status.updateEmail = "loading";
        state.error = null;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.status.updateEmail = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.status.updateEmail = "failed";
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.status.updatePassword = "loading";
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status.updatePassword = "succeeded";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status.updatePassword = "failed";
        // if (action.error.message) state.error = action.error.message;
        state.error = action;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status.logout = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = idleStatuses;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status.logout = "failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.users.user;
export const selectAllUserStatuses = (state: RootState) => state.users.status;
export const selectCurrentUserStatus = (state: RootState) =>
  state.users.status.currentUser;
export const selectLoginStatus = (state: RootState) => state.users.status.login;
export const selectRegisterStatus = (state: RootState) =>
  state.users.status.register;
export const selectLogoutStatus = (state: RootState) =>
  state.users.status.logout;
export const selectUpdateEmailStatus = (state: RootState) =>
  state.users.status.updateEmail;
export const selectUpdatePasswordStatus = (state: RootState) =>
  state.users.status.updatePassword;
export const selectUserError = (state: RootState) => state.users.error;

export const { resetStatuses } = usersSlice.actions;

export default usersSlice.reducer;
