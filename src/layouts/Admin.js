import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DashboardLayout from "./DashboardLayout.js";

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Users from "views/admin/Users.js";
import Appointments from "views/admin/Appointments.js";
import ContactMessages from "views/admin/ContactMessages.js";
import Profile from "views/admin/Profile.js";

export default function Admin() {
  return (
    <DashboardLayout>
      <Switch>
        <Route
          path="/admin/dashboard"
          exact
          render={(props) => <Dashboard {...props} />}
        />
        <Route
          path="/admin/maps"
          exact
          render={(props) => <Maps {...props} />}
        />
        <Route
          path="/admin/settings"
          exact
          render={(props) => <Settings {...props} />}
        />
        <Route
          path="/admin/tables"
          exact
          render={(props) => <Tables {...props} />}
        />
        <Route
          path="/admin/users"
          exact
          render={(props) => <Users {...props} />}
        />
        <Route
          path="/admin/appointments"
          exact
          render={(props) => <Appointments {...props} />}
        />
        <Route
          path="/admin/contact-messages"
          exact
          render={(props) => <ContactMessages {...props} />}
        />
        <Route
          path="/admin/profile"
          exact
          render={(props) => <Profile {...props} />}
        />

        <Redirect from="/admin" to="/admin/dashboard" />
      </Switch>
    </DashboardLayout>
  );
}