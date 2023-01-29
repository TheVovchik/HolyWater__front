/* eslint-disable class-methods-use-this */
import { User } from '../types/User';
import { NewEvent, UserEvent } from '../types/UserEvent';
import { DataStorage } from './DataStorage';
import {
  createEvent,
  createUser,
  deleteEvent,
  getAllEventsFromLS,
  updateEvent,
  verifyUser,
} from './LSStorage.functions';

export class LSStorage extends DataStorage {
  checkUser(
    email: string, password: string,
  ): Promise<string | User> {
    return verifyUser(email, password);
  }

  createNewUser(
    email: string, password: string,
  ): Promise<string | User> {
    return createUser(email, password);
  }

  createNewEvent(event: NewEvent): Promise<string | UserEvent> {
    return createEvent(event);
  }

  updateCurrentEvent(
    event: NewEvent, eventId: number,
  ): Promise<string | UserEvent> {
    return updateEvent(event, eventId);
  }

  getAllEvents(
    year: number, month: number, userId: number,
  ): Promise<UserEvent[]> {
    return getAllEventsFromLS(year, month, userId);
  }

  destroyEvent(eventId: number): Promise<string> {
    return deleteEvent(eventId);
  }
}
