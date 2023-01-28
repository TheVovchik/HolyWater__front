import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.scss';
import { store } from './store/store';
import { AuthProvider } from './components/Auth/AuthContext';
import { Calendar } from './components/Calendar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <AuthProvider>
    <Provider store={store}>
      <Calendar />
    </Provider>
  </AuthProvider>,
);
