import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { icrc1OracleService } from "../../services";
import { Status } from "../types";

export const fetchTokens = createAsyncThunk("tokens/fetchTokens", async () => {
  const response = await icrc1OracleService.getICRC1Canisters();
  return response;
});

const tokensSlice = createSlice({
  name: "tokens",
  initialState: {
    tokens: [],
    status: Status.IDLE,
  } as {
    tokens: Awaited<ReturnType<typeof icrc1OracleService.getICRC1Canisters>>;
    status: Status;
    error?: string;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.tokens = action.payload;
      })
      .addCase(fetchTokens.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      });
  },
});

export const tokensReducer = tokensSlice.reducer;
