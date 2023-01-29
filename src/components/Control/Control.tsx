import { FC, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
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
  const [state, setState] = useState(false);
  const [anchData, setAnchData] = useState<HTMLButtonElement | null>(null);
  const [openData, setOpenData] = useState(false);
  const [dataPlace, setDataPlace] = useState<PopperPlacementType>();
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

  const closeDataPopper = () => {
    setOpenData(false);
  };

  const toggleDrawer = (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown'
        && ((event as React.KeyboardEvent).key === 'Tab'
          || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const closeDrawer = (open: boolean) => {
    setState(open);
  };

  return (
    <div className="calendar__control control">
      <div className="control__add-event">
        <Drawer
          open={state}
          onClose={toggleDrawer(false)}
          sx={{ width: 320 }}
        >
          <Box
            sx={{ width: 320 }}
            role="presentation"
          >
            <FormPopper
              closePopper={closeDrawer}
              triggerUpdate={triggerUpdate}
            />
          </Box>
        </Drawer>

        <Tooltip title="add event">
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={toggleDrawer(true)}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>

      <div className="control__data">
        <Tooltip title="previous month">
          <IconButton
            color="primary"
            aria-label="previous month"
            onClick={() => changeData(DataChange.MINUS)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </Tooltip>

        <div className="control__data-name">
          {userData}
        </div>

        <Tooltip title="next month">
          <IconButton
            color="primary"
            aria-label="next month"
            onClick={() => changeData(DataChange.PLUS)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Tooltip>

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

        <Tooltip title="select date">
          <IconButton
            color="primary"
            aria-label="date-popup"
            onClick={handleClickData('bottom-end')}
          >
            <CalendarMonthIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="log out">
          <IconButton
            color="primary"
            aria-label="logout"
            onClick={logOut}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
