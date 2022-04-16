/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";

function Dashboard(props) {
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={"white"}
        activeColor={"info"}
      />
      <div className="main-panel">
        <DemoNavbar />
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
