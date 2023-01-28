import { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Control } from '../Control';
import { Field } from '../Field';
import { AuthContext } from '../Auth/AuthContext';
import { AppDispatch } from '../../store/store';
import * as eventsActions from '../../features/events';
import './Calendar.scss';
import { useAppSelector } from '../../store/hooks';
import { EventModal } from '../EventModal';

export const Calendar: FC = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const {
    userMonth,
    userYear,
  } = useAppSelector(store => store.date);

  const loadEvents = () => {
    if (user) {
      const data = {
        year: userYear,
        month: userMonth,
        userId: user.id,
      };

      dispatch(eventsActions.init(data));
    }
  };

  useEffect(() => {
    loadEvents();
  }, [user, userMonth, userYear]);

  return (
    <div className="calendar">
      <Control loadEvents={loadEvents} />

      <Field />

      <EventModal loadEvents={loadEvents} />
    </div>
  );
};
