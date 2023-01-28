import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { UserEvent } from '../../../../types/UserEvent';
import * as oneEventActions from '../../../../features/oneEvent';
import './DayEvent.scss';

type Props = {
  event: UserEvent,
};

export const DayEvent: FC<Props> = ({ event }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { title, time } = event;

  const handleEventModal = () => {
    dispatch(oneEventActions.actions.addEvent(event));
  };

  return (
    <button
      type="button"
      className="day-event-wrapper"
      onClick={handleEventModal}
    >
      <div className="day-event">
        <div className="day-event__title">
          {title}
        </div>

        <div className="day-event__time">
          {time}
        </div>
      </div>
    </button>
  );
};
