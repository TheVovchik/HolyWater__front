import { FC, useState } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './DatePopper.scss';
import { useDispatch } from 'react-redux';
import { months } from '../../../utils/generateMonth';
import { useAppSelector } from '../../../store/hooks';
import { generateYears } from '../../../utils/generateYears';
import { AppDispatch } from '../../../store/store';
import * as dataActions from '../../../features/date';

type Props = {
  closePopper: () => void,
};

export const DatePopper: FC<Props> = ({ closePopper }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    currentYear,
  } = useAppSelector(store => store.date);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const yearsList = generateYears(currentYear);
  const selectYear = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  const selectMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

  const isSelected = month && year;

  const handleDataSelect = () => {
    dispatch(dataActions.actions.toggleDataSelect([month, year]));
    closePopper();
  };

  return (
    <div className="datepopper">
      <CloseIcon
        sx={{
          alignSelf: 'flex-end',
          cursor: 'pointer',
        }}
        onClick={closePopper}
      />

      <div className="datepopper__selector selector">
        <FormControl sx={{ m: 1 }} className="selector__month">
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            label="Month"
            sx={{ width: 140 }}
            onChange={selectMonth}
          >
            {months.map(current => {
              return (
                <MenuItem
                  value={current}
                  key={current}
                >
                  {current}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1 }} className="selector__year">
          <InputLabel
            id="demo-simple-select-label"
          >
            Year
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="Year"
            sx={{ width: 100 }}
            onChange={selectYear}
          >
            {yearsList.map(current => {
              return (
                <MenuItem
                  value={current}
                  key={current}
                >
                  {current}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      {isSelected
        && (
          <DoneAllIcon
            sx={{
              cursor: 'pointer',
              color: 'blue',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            onClick={handleDataSelect}
          />
        )}
    </div>
  );
};
