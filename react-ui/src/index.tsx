import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/routes/Routes';
import {AuthProvider} from "./components/providers/AuthProvider";
import {Provider} from 'react-redux';
import {store} from './redux/store';
import * as firebase from "firebase/app";
import './index.css';

firebase.initializeApp({
  apiKey: "AIzaSyAE4HIRtt9kNED13M8hWAHJD6uFSJRccuA",
  authDomain: "job-search-max.firebaseapp.com",
  projectId: "job-search-max",
  storageBucket: "job-search-max.appspot.com",
  messagingSenderId: "155054264175",
  appId: "1:155054264175:web:7c467abfa7a18c7d9d229a"
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
