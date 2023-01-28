import axios from 'axios';
import { User } from '../../types/User';

const BASE_URL = 'https://holy-water.onrender.com/users';

export const verifyUser = async (
  email: string, password: string,
) => {
  return axios.post<User | string>(
    `${BASE_URL}/validate`, { email, password },
  )
    .then(response => response.data);
};

export const createUser = async (
  email: string, password: string,
) => {
  return axios.post<User | string>(BASE_URL, { email, password })
    .then(response => response.data);
};
