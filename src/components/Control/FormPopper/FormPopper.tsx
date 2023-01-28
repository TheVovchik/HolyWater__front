import React, {
  FC, useContext, useState, useEffect, useMemo,
} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { TextField } from '@mui/material';
import './FormPopper.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../styles/textInput';
import { AuthContext } from '../../Auth/AuthContext';
import { NewEvent } from '../../../types/UserEvent';
import { parseDate } from '../../../utils/parseDate';
import { useAppSelector } from '../../../store/hooks';
import { dataStorage } from '../../../Storage/Storage';

type Props = {
  closePopper: () => void,
  triggerUpdate: () => void,
};

export const FormPopper: FC<Props> = ({
  closePopper, triggerUpdate,
}) => {
  const { oneEvent } = useAppSelector(store => store.oneEvent);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const { user } = useContext(AuthContext);

  const canSubmit = useMemo(() => {
    if (!oneEvent) {
      return title && date;
    }

    const eventDate = new Date(
      oneEvent.year, oneEvent.month, oneEvent.day,
    );

    let isTheSame;

    if (date) {
      isTheSame = title === oneEvent.title
        && text === oneEvent.description
        && date.getTime() === eventDate.getTime()
        && time === oneEvent.time;
    }

    return !isTheSame;
  }, [oneEvent, title, date, time, text]);

  const handleTitleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(e.target.value);
  };

  const handleTextInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setText(e.target.value);
  };

  const handleCreateEvent = async () => {
    const [day, year, month] = parseDate(date);
    const userId = user ? user.id : 0;

    const event: NewEvent = {
      userId,
      title,
      description: text,
      year,
      month,
      day,
      time,
    };

    await dataStorage.createNewEvent(event);
    closePopper();

    triggerUpdate();
  };

  const handleUpdateEvent = async () => {
    const [day, year, month] = parseDate(date);

    const event: NewEvent = {
      title,
      description: text,
      year,
      month,
      day,
      time,
    };

    if (oneEvent) {
      await dataStorage.updateCurrentEvent(event, oneEvent.id);
      closePopper();
      triggerUpdate();
    }
  };

  useEffect(() => {
    if (oneEvent) {
      const eventDate = new Date(
        oneEvent.year, oneEvent.month, oneEvent.day,
      );

      setTitle(oneEvent.title);
      setText(oneEvent.description);
      setDate(eventDate);
      setTime(oneEvent.time);
    }
  }, [oneEvent]);

  return (
    <div className="formpopper">
      <div className="formpopper__header">
        <h3 className="formpopper__title">
          {oneEvent ? 'Edit idea item' : 'Add new idea item'}
        </h3>
        <CloseIcon
          sx={{
            cursor: 'pointer',
          }}
          onClick={closePopper}
        />
      </div>

      {oneEvent && (
        <p className="formpopper__updated-at">
          {oneEvent.createdAt === oneEvent.updatedAt
            ? 'Created at: '
            : 'Updated at: '}
          {new Date(oneEvent.updatedAt).toLocaleString('en-US')}
        </p>
      )}

      <form className="formpopper__form">
        <ThemeProvider theme={theme}>
          <TextField
            label="Title"
            id="standard-size-normal"
            placeholder="Title goes here"
            value={title}
            onChange={handleTitleInput}
            variant="standard"
            required
          />
        </ThemeProvider>

        {text && (
          <label
            className="formpopper__label"
            htmlFor="description"
          >
            Description
          </label>
        )}
        <textarea
          id="description"
          className="textarea formpopper__textarea"
          placeholder="Description"
          value={text}
          onChange={handleTextInput}
        />

        <div className="formpopper__datepick datepick">
          <div className="datepick__date">
            <label htmlFor="date">Date*</label>
            <DatePicker
              id="date"
              selected={date}
              onChange={(thisDate: Date) => setDate(thisDate)}
              placeholderText="pick a date"
              required
            />
          </div>

          <div className="datepick__time">
            <label htmlFor="time">Begin time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="Time"
              required
            />
          </div>
        </div>

        {canSubmit
          && (
            <DoneAllIcon
              sx={{
                cursor: 'pointer',
                color: 'blue',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                alignSelf: 'center',
              }}
              onClick={oneEvent ? handleUpdateEvent : handleCreateEvent}
            />
          )}
      </form>
    </div>
  );
};
