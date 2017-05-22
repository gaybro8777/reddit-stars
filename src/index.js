import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const iniitalState = {
  posts: {
    data: [],
    activeIndex: -1,
    currentPost: null
  },
  user: {
    username: null,
    authenticated: false,
    isAuthenticating: false,
    starred: []
  }
};

const store = configureStore(iniitalState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
