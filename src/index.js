/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Formular from "views/examples/Formular";

import './style.css';
import ActivateRequest from "views/examples/ActivateRequest";
import MyRequestDetails from "views/examples/MyRequestDetails";
import ReclamationForm from "views/examples/ReclamationForm";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/components" render={(props) => <Index {...props} />} />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/activate/:id"
        render={(props) => <ActivateRequest {...props} />}
      />
      <Route
        path="/myrequest"
        render={(props) => <MyRequestDetails {...props} />}
      />
      <Route
        path="/reclamation"
        render={(props) => <ReclamationForm {...props} />}
      />
      {/* <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      /> */}
      {/* <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      /> */}
      <Route
        path="/formulair"
        render={(props) => <Formular {...props} />}
      />
      <Redirect from="/" to="/formulair" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
