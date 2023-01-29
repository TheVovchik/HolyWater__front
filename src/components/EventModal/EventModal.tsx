import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { FormPopper } from '../Control/FormPopper';
import { AppDispatch } from '../../store/store';
import * as oneEventActions from '../../features/oneEvent';
import './EventModal.scss';

type Props = {
  triggerUpdate: () => void,
};

export const EventModal: FC<Props> = ({ triggerUpdate }) => {
  const [state, setState] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { oneEvent } = useAppSelector(store => store.oneEvent);

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

    dispatch(oneEventActions.actions.closeEvent());
    setState(open);
  };

  const closeDrawer = (open: boolean) => {
    dispatch(oneEventActions.actions.closeEvent());
    setState(open);
  };

  useEffect(() => {
    if (oneEvent) {
      setState(true);
    } else {
      setState(false);
    }
  }, [oneEvent]);

  return (
    <Drawer
      open={state}
      onClose={toggleDrawer(false)}
      sx={{ width: 320, height: 'fit-content' }}
    >
      <Box
        sx={{ width: 320, height: 'fit-content' }}
        role="presentation"
      >
        <FormPopper
          closePopper={closeDrawer}
          triggerUpdate={triggerUpdate}
        />
      </Box>
    </Drawer>
  );
};
