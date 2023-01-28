import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { months } from '../utils/generateMonth';
import { parseDate } from '../utils/parseDate';
import { getData, setData } from '../utils/useStorage';

type DataState = {
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  userYear: number;
  userMonth: number;
};

const [day, year, month] = parseDate();
const { savedYear, savedMonth } = getData('userDate') ?? { year, month };

const initialState: DataState = {
  currentYear: year,
  currentMonth: month,
  currentDay: day,
  userYear: savedYear ?? year,
  userMonth: savedMonth ?? month,
};

const DataSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    toggleNewMonth: (state, action: PayloadAction<number[]>) => {
      const [choosedMonth, choosedYear] = action.payload;

      state.userMonth = choosedMonth;
      state.userYear = choosedYear;
      setData('userDate', { savedYear: choosedYear, savedMonth: choosedMonth });
    },
    toggleDataSelect: (state, action: PayloadAction<string[]>) => {
      const [choosedMonth, choosedYear] = action.payload;
      const monthIndex = months.findIndex(name => name.includes(choosedMonth));

      state.userMonth = monthIndex;
      state.userYear = +choosedYear;
      setData('userDate', { savedYear: +choosedYear, savedMonth: monthIndex });
    },
  },
});

export default DataSlice.reducer;
export const { actions } = DataSlice;
