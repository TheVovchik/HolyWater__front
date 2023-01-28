import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
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
  const selectYear = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    if (value) {
      setYear(value);
    }
  };

  const selectMonth = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    if (value) {
      setMonth(value);
    }
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
        <div className="selector__month">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={months}
            value={month}
            clearOnEscape
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              value: string | null,
            ) => (
              selectMonth(event, value)
            )}
            sx={{ width: 180 }}
            renderInput={(params) => <TextField {...params} label="Month" />}
          />
        </div>

        <div className="selector__year">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={yearsList}
            value={year}
            clearOnEscape
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              value: string | null,
            ) => (
              selectYear(event, value)
            )}
            sx={{ width: 140 }}
            renderInput={(params) => <TextField {...params} label="Year" />}
          />
        </div>
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
