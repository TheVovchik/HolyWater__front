import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEvent } from '../types/UserEvent';

type OneEventState = {
  oneEvent: UserEvent | null;
};

const initialState: OneEventState = {
  oneEvent: null,
};

const OneEventSlice = createSlice({
  name: 'oneEvent',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<UserEvent>) => {
      state.oneEvent = action.payload;
    },
    closeEvent: (state) => {
      state.oneEvent = null;
    },
  },
});

export default OneEventSlice.reducer;
export const { actions } = OneEventSlice;
