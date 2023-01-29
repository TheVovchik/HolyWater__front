import { FC, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../store/hooks';
import { generateMonth } from '../../utils/generateMonth';
import './Field.scss';
import { Day } from './Day';

export const Field: FC = memo(() => {
  const {
    currentMonth,
    currentYear,
    userMonth,
    userYear,
  } = useAppSelector(store => store.date);

  const isThisMonth = userYear === currentYear && userMonth === currentMonth;
  const visibleMonth = generateMonth(userMonth, userYear);

  return (
    <div className="calendar__field field">
      {visibleMonth.map(day => {
        return (
          <Day
            day={day}
            isThisMonth={isThisMonth}
            key={uuidv4()}
          />
        );
      })}
    </div>
  );
});
