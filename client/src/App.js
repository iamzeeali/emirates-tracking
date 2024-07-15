import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./_actions/authAction";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./utils/PrivateRoute";

import Login from "./components/auth/Login";
import Navbar from "./components/ui/Navbar";
import Alert from "./components/ui/Alert";
import Track from "./components/Track";
import TrackStatus from "./components/TrackStatus";
import TrackStatusNew from "./components/TrackStatusNew";
import UploadEcci from "./components/UploadEcci";
import Asns from "./components/Asns";
import Grns from "./components/Grns";
import AddFeedback from "./components/AddFeedback";
import Feedback from "./components/Feedback";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />

        <div className='App'>
          <Route exact path='/login' component={Login} />
          <Route exact path='/add-feedback' component={AddFeedback} />
          <Route exact path='/' component={Track} />

          <Route exact path={`/trackStatus/:id`} component={TrackStatusNew} />
          <Route exact path={`/trackStatusNew/:id`} component={TrackStatusNew} />
          <PrivateRoute exact path='/upload' component={UploadEcci} />
          <PrivateRoute exact path='/asns' component={Asns} />
          <PrivateRoute exact path='/grns' component={Grns} />
          <PrivateRoute exact path='/feedback' component={Feedback} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
