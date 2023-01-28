/* eslint-disable no-console */
import React from 'react';
import { Calendar } from './components/Calendar';

import './App.css';
// import { generateMonth } from './utils/generateMonth';

export const App = () => {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
};
