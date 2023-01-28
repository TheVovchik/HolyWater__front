import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { FormPopper } from '../Control/FormPopper';
import { AppDispatch } from '../../store/store';
import * as oneEventActions from '../../features/oneEvent';
import './EventModal.scss';

type Props = {
  loadEvents: () => void,
};

export const EventModal: FC<Props> = ({ loadEvents }) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { oneEvent } = useAppSelector(store => store.oneEvent);

  const closeModal = () => {
    dispatch(oneEventActions.actions.closeEvent());
  };

  useEffect(() => {
    if (oneEvent) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [oneEvent]);

  return (
    <div className={cn(
      'modal',
      'event-modal',
      { 'is-active': isActive },
    )}
    >
      <div className="modal-background" />
      <div className="modal-card event-modal__card">
        <section className="modal-card-body event-modal__body">
          <FormPopper
            loadEvents={loadEvents}
            closePopper={closeModal}
          />
        </section>
      </div>
    </div>
  );
};
