import firebase from '../../firebase';
import { unstarAll, fetchStarredPosts } from './posts';

// Actions
const REGISTER   = 'easeit/users/REGISTER';
const LOGIN      = 'easeit/users/LOGIN';
const LOGOUT     = 'easeit/users/LOGOUT';
const STAR       = 'easeit/users/STAR';
const START_AUTH = 'easeit/users/START_AUTH';
const STOP_AUTH  = 'easeit/users/STOP_AUTH';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        username: action.username,
        authenticated: false
      }
    case LOGIN:
      return {
        ...state,
        username: action.username,
        token: action.token,
        authenticated: true,
        isAuthenticating: false
      }
    case LOGOUT:
      return {
        username: null,
        token: null,
        authenticated: false,
        isAuthenticating: false,
        starred: []
      }
    case START_AUTH:
      return {
        ...state,
        isAuthenticating: true
      }
    case STOP_AUTH:
      return {
        ...state,
        isAuthenticating: false
      }
    case STAR:
      const index = state.starred.findIndex(x => x === action.postId);
      const newStarred = [ ...state.starred ];;
      if (index < 0) {
        newStarred.push(action.postId);
      }

      return {
        ...state,
        starred: newStarred,
      }
    default: return state;
  }
}

// Action Creators
export function startAuthenticating() {
  return { type: START_AUTH };
}

export function stopAuthenticating() {
  return { type: STOP_AUTH };
}

export function register(username, password) {
  return { type: REGISTER, username, password };
}

export function loginUser(username, password, token) {
  return { type: LOGIN, username, password, token };
}

export function logoutUser(username) {
  return { type: LOGOUT, username };
}

export function starPost(postId) {
  return { type: STAR, postId };
}

// Side effects
export function logout (username) {
  return dispatch => {
    dispatch(unstarAll());
    dispatch(logoutUser(username));
  }
}

export function signup (username, password) {
  return dispatch => {
    // Disable the login/signup buttons while we're authenticating with Firebase
    dispatch(startAuthenticating());

    return firebase.auth()
      .createUserWithEmailAndPassword(username, password)
      .then((e) => {
        dispatch(login(username, password));
      })
      .catch((err) => {
        dispatch(stopAuthenticating());
        let message;
        if (err.code === 'auth/email-already-in-use') {
          message = 'Email already in use';
        } if (err.code === 'auth/weak-password') {
          message = 'The password is too weak';
        } if (err.code === 'auth/invalid-email') {
          message = 'Invalid email';
        } if (err.code === 'auth/operation-not-allowed') {
          message = 'Email not allowed';
        } else {
          message = err.message;
        }
        console.log('Login error', err, 'username', username, 'password', password);

        return message;
      });
  }
}

export function login (username, password) {
  return dispatch => {
    // Disable the login/signup buttons while we're authenticating with Firebase
    dispatch(startAuthenticating());

    return firebase.auth()
      .signInWithEmailAndPassword(username, password)
      .then((e) => {
        dispatch(loginUser(username, password, e.uid));
        dispatch(fetchStarredPosts());
      })
      .catch((err) => {
        dispatch(stopAuthenticating());
        let message;
        if (err.code === 'auth/invalid-email') {
          message = 'Email invalid';
        } else if (err.code === 'auth/user-not-found') {
          message = 'User not found';
        } else if (err.code === 'auth/wrong-password') {
          message = 'Invalid password';
        } else {
          message = err.message;
        }

        console.log('Signup error', err, 'username', username, 'password', password);
        return message;
      });
  }
}
