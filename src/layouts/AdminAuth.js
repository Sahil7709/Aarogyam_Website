import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// views
import AdminLogin from "views/admin/auth/AdminLogin.js";
import AdminRegister from "views/admin/auth/AdminRegister.js";

export default function AdminAuth() {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Switch>
            <Route path="/admin/auth/login" exact component={AdminLogin} />
            <Route path="/admin/auth/register" exact component={AdminRegister} />
            <Redirect from="/admin/auth" to="/admin/auth/login" />
          </Switch>
        </section>
      </main>
    </>
  );
}