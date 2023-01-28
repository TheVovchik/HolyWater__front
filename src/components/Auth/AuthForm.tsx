import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { dataStorage } from '../../Storage/Storage';
import { User } from '../../types/User';

export type Props = {
  onLogin: (user: User) => void,
  setErrorMessage: (message: string) => void,
  errorMessage: string,
};

export const AuthForm: React.FC<Props> = ({
  onLogin, errorMessage, setErrorMessage,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isDisabled = email && password;

  const saveUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
  };

  const loadUser = async (
    userEmail: string,
    userPassword: string,
  ) => {
    try {
      const user = await dataStorage.checkUser(userEmail, userPassword);

      if (typeof user !== 'string') {
        saveUser(user);
      } else if (user === 'email not valid') {
        setEmailError(user);
      } else {
        setPasswordError(user);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  const registerUser = async () => {
    try {
      const user = await dataStorage.createNewUser(email, password);

      if (typeof user !== 'string') {
        saveUser(user);
      } else if (user === 'user with such email already exist') {
        setEmailError(user);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrorMessage('');
    setLoading(true);

    try {
      await loadUser(email, password);
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError('');
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError('');
    setPassword(e.target.value);
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      return;
    }

    const user = JSON.parse(userData) as User;

    setEmail(user.email);
    setPassword(user.password);
  }, []);

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit} className="box">
        <h1 className="title is-3">
          Welcome to
          {' '}
          <span style={{ color: 'darkred' }}>Your</span>
          {' '}
          personal
          {' '}
          <span style={{ color: 'darkred' }}>Calendar</span>
          {' '}
        </h1>

        <div className="field">
          <label className="label" htmlFor="user-email">
            Email
          </label>

          <div
            className={classNames('control has-icons-left', {
              'is-loading': loading,
            })}
          >
            <input
              type="email"
              id="user-email"
              className={classNames('input', {
                'is-danger': emailError,
              })}
              placeholder="Enter your email"
              value={email}
              required
              onChange={handleEmailInput}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          </div>

          {emailError && (
            <p className="help is-danger">{emailError}</p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="user-name">
            Your password
          </label>

          <div
            className={classNames('control has-icons-left', {
              'is-loading': loading,
            })}
          >
            <input
              type="password"
              id="user-name"
              className={classNames('input', {
                'is-danger': passwordError,
              })}
              placeholder="Enter your password"
              required
              minLength={4}
              disabled={loading}
              value={password}
              onChange={handlePasswordInput}
            />

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
          </div>

          {passwordError && (
            <p className="help is-danger">{passwordError}</p>
          )}
        </div>

        <div className="buttons">
          <button
            type="submit"
            className={classNames('button is-primary is-outlined', {
              'is-loading': loading,
            })}
            disabled={!isDisabled}
          >
            Login
          </button>

          <button
            type="button"
            onClick={registerUser}
            className={classNames('button is-info is-outlined', {
              'is-loading': loading,
            })}
            disabled={!isDisabled}
          >
            Register
          </button>
        </div>
        {errorMessage && (
          <p className="help is-danger">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};
