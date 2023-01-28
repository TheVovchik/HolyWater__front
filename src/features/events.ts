import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dataStorage } from '../Storage/Storage';
import { UserEvent } from '../types/UserEvent';

type EventsState = {
  events: UserEvent[],
  loading: boolean;
  error: string;
};

const initialState: EventsState = {
  events: [],
  loading: false,
  error: '',
};

interface Data {
  year: number,
  month: number,
  userId: number,
}

export const init = createAsyncThunk('events/fetch', (data: Data) => {
  const { year, month, userId } = data;

  return dataStorage.getAllEvents(year, month, userId);
});

const EventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.events = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default EventsSlice.reducer;
export const { actions } = EventsSlice;
