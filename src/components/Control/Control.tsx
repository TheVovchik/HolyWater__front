import { FC, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { AppDispatch } from '../../store/store';
import * as dataActions from '../../features/date';
import { DataChange } from '../../types/DataChange';
import { useAppSelector } from '../../store/hooks';
import { months } from '../../utils/generateMonth';
import './Control.scss';
import { DatePopper } from './DatePopper';
import { FormPopper } from './FormPopper';
import { AuthContext } from '../Auth/AuthContext';

type Props = {
  triggerUpdate: () => void,
};

export const Control: FC<Props> = ({ triggerUpdate }) => {
  const [anchData, setAnchData] = useState<HTMLButtonElement | null>(null);
  const [openData, setOpenData] = useState(false);
  const [dataPlace, setDataPlace] = useState<PopperPlacementType>();
  const [anchForm, setAnchForm] = useState<HTMLButtonElement | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [formPlace, setFormPlace] = useState<PopperPlacementType>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    userMonth,
    userYear,
  } = useAppSelector(store => store.date);
  const { logOut } = useContext(AuthContext);
  const userData = `${months[userMonth]} ${userYear}`;

  const changeData = (event: DataChange) => {
    let newData;

    switch (event) {
      case DataChange.PLUS: {
        let newMonth = userMonth + 1;

        newMonth = newMonth > 11 ? 0 : newMonth;

        const newYear = newMonth === 0 ? userYear + 1 : userYear;

        newData = [newMonth, newYear];

        break;
      }

      case DataChange.MINUS: {
        let newMonth = userMonth - 1;

        newMonth = newMonth === -1 ? 11 : newMonth;

        const newYear = newMonth === 11 ? userYear - 1 : userYear;

        newData = [newMonth, newYear];

        break;
      }

      default:
        newData = [userMonth, userYear];
        break;
    }

    dispatch(dataActions.actions.toggleNewMonth(newData));
  };

  const handleClickData = (
    newPlacement: PopperPlacementType,
  ) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchData(event.currentTarget);
    setOpenData((prev) => dataPlace !== newPlacement || !prev);
    setDataPlace(newPlacement);
  };

  const handleClickForm = (
    newPlacement: PopperPlacementType,
  ) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchForm(event.currentTarget);
    setOpenForm((prev) => formPlace !== newPlacement || !prev);
    setFormPlace(newPlacement);
  };

  const closeDataPopper = () => {
    setOpenData(false);
  };

  const closeFormPopper = () => {
    setOpenForm(false);
  };

  return (
    <div className="calendar__control control">
      <div className="control__add-event">
        <Popper
          open={openForm}
          anchorEl={anchForm}
          placement={formPlace}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{ padding: '8px' }}
              >
                <FormPopper
                  closePopper={closeFormPopper}
                  triggerUpdate={triggerUpdate}
                />
              </Paper>
            </Fade>
          )}
        </Popper>

        <Tooltip title="add event">
          <IconButton
            onClick={handleClickForm('bottom-start')}
          >
            <AddCircleIcon
              sx={{
                width: '34px',
                height: '34px',
                cursor: 'pointer',
                color: 'blue',
              }}
            />
          </IconButton>
        </Tooltip>
      </div>

      <div className="control__data">
        <ArrowBackIosIcon
          onClick={() => changeData(DataChange.MINUS)}
          sx={{ cursor: 'pointer' }}
        />
        <div className="control__data-name">
          {userData}
        </div>
        <ArrowForwardIosIcon
          onClick={() => changeData(DataChange.PLUS)}
          sx={{ cursor: 'pointer' }}
        />

        <Popper
          open={openData}
          anchorEl={anchData}
          placement={dataPlace}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{ padding: '8px' }}
              >
                <DatePopper closePopper={closeDataPopper} />
              </Paper>
            </Fade>
          )}
        </Popper>

        <Button
          onClick={handleClickData('bottom-end')}
          sx={{
            '&:hover': {
              background: 'transparent',
            },
          }}
        >
          <CalendarMonthIcon
            sx={{
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              color: 'black',
              '&:hover': {
                width: '34px',
                height: '34px',
                background: 'transparent',
              },
            }}
          />
        </Button>

        <LogoutIcon
          sx={{
            width: '28px',
            height: '28px',
            cursor: 'pointer',
            color: 'black',
            '&:hover': {
              width: '34px',
              height: '34px',
            },
          }}
          onClick={logOut}
        />
      </div>
    </div>
  );
};
