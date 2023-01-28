import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import date from '../features/date';
import events from '../features/events';
import oneEvent from '../features/oneEvent';

export const store = configureStore({
  reducer: {
    date,
    events,
    oneEvent,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
