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
// react plugin used to create charts
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import axios from "axios";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

function Dashboard() {
  const [apiResponse, setApiResponse] = React.useState("");

  // const callAPI = () => {
  //   fetch("http://localhost:9000/testApi")
  //     .then((res) => res.text())
  //     .then((res) => setApiResponse(res));
  // };

  const startGrafana = () => {
    // can use apiResponse state above to display a message on whether grafana is running or not
    return axios
      .post("http://localhost:9000/testApi")
      .then((response) => setApiResponse(response.data))
      .catch(logError);
  };

  React.useEffect(() => {}, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardHeader>artemis run-test</CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-alert-circle-i text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="">
                      <p className="card-category">card-category</p>
                      <CardTitle tag="p">
                        <Button>Run Test</Button>
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="">
                  <i className="nc-icon nc-paper" /> FILE_NAME
                  <Button className="button">Select Test Script</Button>
                </div>
                <hr />
                <div className="">
                  <i className="nc-icon nc-paper" /> Define Task Count
                  <p className="">0</p>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardHeader>artemis grafana-start</CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-alert-circle-i text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="">
                      <p className="card-category">Grafana</p>
                      <CardTitle tag="p">
                        <Button onClick={startGrafana}>Start Grafana</Button>
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                Grafana task started.
                <p>{apiResponse}</p>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardHeader>artemis grafana-stop</CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-alert-circle-i text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="">
                      <p className="card-category">Grafana</p>
                      <CardTitle tag="p">
                        <Button>Stop Grafana</Button>
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                Grafana task stopped.
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardHeader>artemis sleep</CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-alert-circle-i text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="">
                      <p className="card-category">Telegraf</p>
                      <CardTitle tag="p">
                        <Button>Stop Telegraf</Button>
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                Telegraf service stopped.
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
