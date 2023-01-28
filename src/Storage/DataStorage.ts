import { User } from '../types/User';
import { NewEvent, UserEvent } from '../types/UserEvent';

export abstract class DataStorage {
  abstract checkUser(
    email: string, password: string,
  ): Promise<string | User>;

  abstract createNewUser(
    email: string, password: string,
  ): Promise<string | User>;

  abstract createNewEvent(event: NewEvent): Promise<string | UserEvent>;

  abstract updateCurrentEvent(
    event: NewEvent, eventId: number,
  ): Promise<string | UserEvent>;

  abstract getAllEvents(
    year: number, month: number, userId: number,
  ): Promise<UserEvent[]>;
}
