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
import logo from "Artemis_graphic_color.png";

function Sidebar(props) {
  const sidebar = React.useRef();
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://artemis-load-testing.github.io"
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            <img src={logo} alt="artemis-logo" />
          </div>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://artemis-load-testing.github.io"
          className="simple-text logo-normal"
        >
          Artemis
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}></div>
    </div>
  );
}

export default Sidebar;
