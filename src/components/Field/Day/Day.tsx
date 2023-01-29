import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../../store/hooks';
import './Day.scss';
import { DayEvent } from './DayEvent';
import { UserEvent } from '../../../types/UserEvent';

type Props = {
  day: (string | number | boolean)[];
  isThisMonth: boolean;
};

export const Day: FC<Props> = ({
  day, isThisMonth,
}) => {
  const [eventsToday, setEventsToday] = useState<UserEvent[] | null>(null);
  const [name, number, status] = day;
  const { currentDay } = useAppSelector(store => store.date);
  const { events } = useAppSelector(store => store.events);
  const activeDay = isThisMonth && number === currentDay && status;

  useEffect(() => {
    if (events) {
      const thisDayEvents = events
        .filter(event => event.day === number) || null;

      if (thisDayEvents) {
        thisDayEvents
          .sort((eventA, eventB) => eventA.time.localeCompare(eventB.time));
      }

      setEventsToday(thisDayEvents);
    }
  }, [events]);

  return (
    <div
      className={cn(
        'calendar__day day',
        {
          'day--status-passive': !status,
          'day--status-active': activeDay,
        },
      )}
    >
      <div
        className={cn(
          'day__header',
          {
            'day__header--status-active': activeDay,
          },
        )}
      >
        <div className="day__number">
          {number}
        </div>

        <div className="day__name">
          {name}
        </div>
      </div>

      <div className="day__events">
        {status && eventsToday && eventsToday.map(event => {
          return (
            <DayEvent
              key={uuidv4()}
              event={event}
            />
          );
        })}
      </div>
    </div>
  );
};
