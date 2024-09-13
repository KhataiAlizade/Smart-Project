import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
}
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
});
const initialState = {
  users: [] as User[],
  loading: false,
  error:""
};
const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      }
    );
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to show users"
    });
  },
});
export default UserSlice.reducer;
