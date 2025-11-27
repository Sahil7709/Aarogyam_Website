import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "assets/styles/custom.css"; // Import custom CSS for health clinic theme

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import AdminAuth from "layouts/AdminAuth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Service from "views/Service";
import FAQ from "views/FAQ";
import ContactUs from "views/ContactUs";
import MeetOurTeam from "views/MeetOurTeam";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* Admin routes */}
      <Route path="/admin/auth" component={AdminAuth} />
      <Route path="/admin" component={Admin} />
      
      {/* Auth routes */}
      <Route path="/auth" component={Auth} />
      
      {/* Public routes */}
      <Route path="/landing" component={Landing} />
      <Route path="/profile" component={Profile} />
      <Route path="/services" component={Service} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/meet-our-team" component={MeetOurTeam} />
      <Route path="/" exact component={Index} />
      
      {/* Redirect any unknown routes to home */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);