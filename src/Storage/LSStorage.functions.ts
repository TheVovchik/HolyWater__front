import { User } from '../types/User';
import { NewEvent, UserEvent } from '../types/UserEvent';
import { getData, setData } from '../utils/useStorage';

// #region User

async function getOne(email: string) {
  const users = getData('users');

  if (users) {
    const user = await users.find(
      (elem: User) => elem.email === email,
    ) ?? null;

    return user;
  }

  return null;
}

export async function verifyUser(email: string, password: string) {
  let user: User | null | undefined;

  if (typeof email === 'string') {
    user = await getOne(email);
  }

  if (user) {
    if (user.password === password) {
      return user;
    }

    return 'password not valid';
  }

  return 'email not valid';
}

async function createContact(email: string, password: string) {
  const users: User[] = getData('users');
  let index;

  if (!users) {
    index = 1;

    setData('users', [{
      id: index,
      email,
      password,
    }]);
  } else {
    index = Math.max(...users.map(user => user.id)) + 1;

    setData('users', [...users, {
      id: index,
      email,
      password,
    }]);
  }

  return {
    id: index,
    email,
    password,
  };
}

export async function createUser(email: string, password: string) {
  const isExist = await getOne(email);

  if (isExist) {
    return 'user with such email already exist';
  }

  const contact = await createContact(email, password);

  if (!contact) {
    return 'something went wrong';
  }

  return contact;
}

// #endregion

// #region Events

async function createUserEvent(event: NewEvent) {
  const events: UserEvent[] = getData('events');
  let index;
  const createdAt = new Date();

  if (!events) {
    index = 1;

    setData('events', [{
      ...event,
      id: index,
      createdAt,
      updatedAt: createdAt,
    }]);
  } else {
    index = Math.max(...events.map(data => data.id)) + 1;

    setData('events', [...events, {
      ...event,
      id: index,
      createdAt,
      updatedAt: createdAt,
    }]);
  }

  return {
    ...event,
    id: index,
    createdAt,
    updatedAt: createdAt,
  };
}

export async function createEvent(event: NewEvent) {
  const newEvent = await createUserEvent(event);

  if (!newEvent) {
    return 'something went wrong';
  }

  return newEvent;
}

export async function getAllEventsFromLS(
  year: number, month: number, userId: number,
) {
  const events: UserEvent[] = getData('events');

  if (events) {
    const filtredIvents = events
      .filter(event => (
        event.year === year && event.month === month && event.userId === userId
      )) ?? [];

    return filtredIvents;
  }

  return [];
}

async function updateUserEvent(
  event: NewEvent, eventId: number,
) {
  const events: UserEvent[] = getData('events');

  const updatedAt = new Date();

  const updatedEvent = events.find(data => data.id === eventId);

  if (!updatedEvent) {
    return null;
  }

  const updatedEvents = events.map(data => {
    if (data.id !== eventId) {
      return data;
    }

    return {
      ...event,
      id: updatedEvent.id,
      userId: updatedEvent.userId,
      createdAt: updatedEvent.createdAt,
      updatedAt,
    };
  });

  setData('events', updatedEvents);

  return {
    ...event,
    id: updatedEvent.id,
    userId: updatedEvent.userId,
    createdAt: updatedEvent.createdAt,
    updatedAt,
  };
}

export async function updateEvent(
  event: NewEvent, eventId: number,
) {
  const updatedEvent = await updateUserEvent(event, eventId);

  if (!updatedEvent) {
    return 'something went wrong';
  }

  return updatedEvent;
}

function deleteUserEvent(eventId: number) {
  const events: UserEvent[] = getData('events');
  const filtredEvents = events.filter(event => event.id !== eventId) ?? null;

  if (filtredEvents) {
    setData('events', filtredEvents);

    return 1;
  }

  localStorage.removeItem('events');

  return 1;
}

export async function deleteEvent(eventId: number) {
  const result = await deleteUserEvent(eventId);

  if (!result) {
    return 'something went wrong';
  }

  return 'success';
}

// #endregion
