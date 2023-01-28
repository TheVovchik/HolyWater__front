/* eslint-disable class-methods-use-this */
import {
  createEvent, getEventsFromApi, updateEvent,
} from '../components/api/event';
import { createUser, verifyUser } from '../components/api/user';
import { User } from '../types/User';
import { NewEvent, UserEvent } from '../types/UserEvent';
import { DataStorage } from './DataStorage';

export class APIStorage extends DataStorage {
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

  createNewEvent(event: NewEvent): Promise<UserEvent> {
    return createEvent(event);
  }

  updateCurrentEvent(
    event: NewEvent, eventId: number,
  ): Promise<UserEvent> {
    return updateEvent(event, eventId);
  }

  getAllEvents(
    year: number, month: number, userId: number,
  ): Promise<UserEvent[]> {
    return getEventsFromApi(year, month, userId);
  }
}
