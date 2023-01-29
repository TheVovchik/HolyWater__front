import axios from 'axios';
import { UserEvent, NewEvent } from '../../types/UserEvent';

const BASE_URL = 'https://holy-water.onrender.com/events';

export const createEvent = async (event: NewEvent) => {
  return axios.post<UserEvent>(BASE_URL, event)
    .then(response => response.data);
};

export const getEventsFromApi = async (
  year: number, month: number, userId: number,
) => {
  return axios.get<UserEvent[]>(`${BASE_URL}?year=${year}&month=${month}&userId=${userId}`)
    .then(response => response.data);
};

export const updateEvent = async (
  event: NewEvent, eventId: number,
) => {
  return axios.patch<UserEvent>(`${BASE_URL}?eventId=${eventId}`, event)
    .then(response => response.data);
};

export const deleteEvent = async (
  eventId: number,
) => {
  return axios.delete<string>(`${BASE_URL}?eventId=${eventId}`)
    .then(response => response.data);
};
