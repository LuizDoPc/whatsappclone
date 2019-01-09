import React, { Component } from "react";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";

import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";

class App extends Component {
  constructor(props) {
    super(props);

    let config = {
      apiKey: "AIzaSyDNJb-9maVFvAi0ReZtlKUAuYPiUjXXLg4",
      authDomain: "whatsapp-clo.firebaseapp.com",
      databaseURL: "https://whatsapp-clo.firebaseio.com",
      projectId: "whatsapp-clo",
      storageBucket: "whatsapp-clo.appspot.com",
      messagingSenderId: "65371011763"
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
