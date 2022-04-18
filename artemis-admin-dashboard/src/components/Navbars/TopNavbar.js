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
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faNpm } from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <Navbar
      expand="lg"
      className="navbar-absolute fixed-top navbar-transparent"
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <NavbarBrand href="/">{"Dashboard"}</NavbarBrand>
        </div>
        <Collapse navbar className="justify-content-end">
          <Nav navbar>
            <NavItem>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.npmjs.com/package/artemis-load-testing"
                className="nav-link btn-rotate"
              >
                <FontAwesomeIcon icon={faNpm} size="2xl" />
              </a>
            </NavItem>
            <NavItem>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/artemis-load-testing"
                className="nav-link btn-rotate"
              >
                <FontAwesomeIcon icon={faGithub} size="2xl" />
              </a>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
