import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

type InitialState = {
  user: UserType | null;
  status: StatusType;
  error: string;
};

const initialState: InitialState = {
  user: null,
  status: "idle",
  error: "",
};

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const response = await axios.get("/api/users");
  return response.data;
});

export const loginUser = createAsyncThunk<
  UserType,
  LoginUserData,
  { rejectValue: string }
>("users/loginUser", async (loginData: LoginUserData, { rejectWithValue }) => {
  try {
    await axios.post("/api/users/login", loginData);
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      return rejectWithValue(error.response.data[0].message);
    } else {
      return rejectWithValue(error.response.data.message);
    }
  }
});

export const registerUser = createAsyncThunk<
  void,
  RegisterUserData,
  { rejectValue: string }
>(
  "users/registerUser",
  async (registerData: RegisterUserData, { rejectWithValue }) => {
    try {
      await axios.post("/api/users", registerData);
    } catch (error: any) {
      if (Array.isArray(error.response.data)) {
        return rejectWithValue(error.response.data[0].message);
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const updateEmail = createAsyncThunk<
  UserType,
  UpdateEmailData,
  { rejectValue: string }
>(
  "users/updateEmail",
  async (updateEmailData: UpdateEmailData, { rejectWithValue }) => {
    try {
      await axios.put("/api/users/changeEmail", updateEmailData);
      const response = await axios.get("/api/users");
      return response.data;
    } catch (error: any) {
      if (Array.isArray(error.response.data)) {
        return rejectWithValue(error.response.data[0].message);
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const updatePassword = createAsyncThunk<
  void,
  UpdatePasswordData,
  { rejectValue: string }
>(
  "users/updatePassword",
  async (updatePasswordData: UpdatePasswordData, { rejectWithValue }) => {
    try {
      await axios.put("/api/users/changePassword", updatePasswordData);
    } catch (error: any) {
      if (Array.isArray(error.response.data)) {
        return rejectWithValue(error.response.data[0].message);
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
  await axios.delete("/api/users/logout");
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    clearAllErrors: (state) => {
      state.error = "";
    },
    createErrorMessage: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
        state.error = "User is not logged in!";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(updateEmail.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.users.user;
export const selectUserStatus = (state: RootState) => state.users.status;
export const selectUserError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
export const userActions = usersSlice.actions;
