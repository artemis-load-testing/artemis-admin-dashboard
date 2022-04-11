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

import React, { useEffect, useState } from "react";
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
  const [infrastructureDeployed, setInfrastructureDeployed] = useState(false);

  const [grafanaUrl, setGrafanaUrl] = useState("");
  const [grafanaUsername, setGrafanaUsername] = useState("");
  const [grafanaPassword, setGrafanaPassword] = useState("");
  const [telegrafStatus, setTelegrafStatus] = useState("");
  const [grafanaRunning, setGrafanaRunning] = useState(false);
  const [grafanaDetails, setGrafanaDetails] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const onFileSelect = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "http://localhost:9000/artemisApi/uploadfile",
        formData
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getGrafanaUrl = (data) => {
    setGrafanaUrl(data.split(" ")[5].split("D")[0]);
  };

  const getGrafanaUserName = (data) => {
    setGrafanaUsername(data.split(" ")[7]);
  };

  const getGrafanaPassword = (data) => {
    const password = data.split(" ")[10];
    setGrafanaPassword(password);
  };

  useEffect(() => {
    setGrafanaUrl(window.localStorage.getItem("grafanaUrl") || "");
    setGrafanaUsername(window.localStorage.getItem("grafanaUsername") || "");
    setGrafanaPassword(window.localStorage.getItem("grafanaPassword") || "");
    setGrafanaRunning(
      JSON.parse(window.localStorage.getItem("grafanaRunning")) || false
    );
    setGrafanaDetails(
      JSON.parse(window.localStorage.getItem("grafanaDetails")) || false
    );
    setInfrastructureDeployed(
      JSON.parse(window.localStorage.getItem("infrastructureDeployed")) || false
    );
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "infrastructureDeployed",
      infrastructureDeployed
    );
    window.localStorage.setItem("grafanaUrl", grafanaUrl);
    window.localStorage.setItem("grafanaUsername", grafanaUsername);
    window.localStorage.setItem("grafanaPassword", grafanaPassword);
    window.localStorage.setItem("grafanaRunning", grafanaRunning);
    window.localStorage.setItem("grafanaDetails", grafanaDetails);
  }, [
    infrastructureDeployed,
    grafanaUrl,
    grafanaUsername,
    grafanaPassword,
    grafanaRunning,
    grafanaDetails,
  ]);

  const startGrafana = () => {
    return axios
      .post("http://localhost:9000/artemisApi/grafanaStart")
      .then((response) => {
        getGrafanaUrl(response.data);
        getGrafanaUserName(response.data);
        getGrafanaPassword(response.data);
        setGrafanaRunning(true);
        setGrafanaDetails(true);
      })
      .catch(logError);
  };

  const resetGrafanaDetails = () => {
    setGrafanaUrl("");
    setGrafanaUsername("");
    setGrafanaPassword("");
    window.localStorage.removeItem("grafanaUrl");
    window.localStorage.removeItem("grafanaUsername");
    window.localStorage.removeItem("grafanaPassword");
  };

  const stopGrafana = () => {
    return axios
      .post("http://localhost:9000/artemisApi/grafanaStop")
      .then((response) => {
        console.log(response.data);
        setGrafanaRunning(false);
        setGrafanaDetails(false);
        resetGrafanaDetails();
      })
      .catch(logError);
  };

  const sleepTelegraf = () => {
    return axios
      .post("http://localhost:9000/artemisApi/telegrafStop")
      .then((response) => {
        setTelegrafStatus(response.data);
      })
      .catch(logError);
  };

  const destroyDatabase = () => {
    return axios
      .post("http://localhost:9000/artemisApi/deletedb")
      .catch(logError);
  };

  const deployInfrastructure = () => {
    return axios
      .post("http://localhost:9000/artemisApi/deploy")
      .then((response) => {
        console.log(response.data);
        setInfrastructureDeployed(true);
      })
      .catch(logError);
  };

  const teardownInfrastructure = () => {
    return axios
      .post("http://localhost:9000/artemisApi/teardown")
      .then((response) => {
        console.log(response.data);
        setInfrastructureDeployed(false);
      })
      .catch(logError);
  };

  return (
    <>
      <div className="content">
        <h4>Infrastructure {infrastructureDeployed}</h4>

        <Row>
          {infrastructureDeployed === false ? (
            // DEPLOY
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardHeader>artemis deploy</CardHeader>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-alert-circle-i text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="">
                        <p className="card-category">
                          Deploy Artemis infrastructure on AWS account.
                        </p>
                        <CardTitle tag="p">
                          <Button onClick={deployInfrastructure}>Deploy</Button>
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                </CardFooter>
              </Card>
            </Col>
          ) : (
            // TEARDOWN
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardHeader>artemis teardown</CardHeader>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-alert-circle-i text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="">
                        <p className="card-category">
                          Teardown Artemis infrastructure on AWS account. Retain
                          Artemis database.
                        </p>
                        <CardTitle tag="p">
                          <Button onClick={teardownInfrastructure}>
                            teardown
                          </Button>
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                </CardFooter>
              </Card>
            </Col>
          )}

          {/* TIMESTREAM */}
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardHeader>artemis destroy-db</CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-alert-circle-i text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="">
                      <p className="card-category">
                        Delete the Artemis database.
                      </p>
                      <CardTitle tag="p">
                        <Button onClick={destroyDatabase}>
                          Destroy Database
                        </Button>
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          {/* TELEGRAF */}
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
                      <p className="card-category">
                        Stop all support container tasks for minimal AWS usage
                        charges.
                      </p>
                      <CardTitle tag="p">
                        <Button onClick={sleepTelegraf}>Stop Telegraf</Button>
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                {telegrafStatus}
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <h4>Testing</h4>
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardHeader>artemis run-test</CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-alert-circle-i text-success" />
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
                  <input type="file" onChange={onFileSelect} />
                  <button onClick={onFileUpload}>Upload!</button>
                </div>
                <hr />
                <div className="">
                  <i className="nc-icon nc-paper" /> Define Task Count
                  <p className="">0</p>
                </div>
              </CardFooter>
            </Card>
          </Col>
          {grafanaRunning === false ? (
            // GRAFANA-START
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
                </CardFooter>
              </Card>
            </Col>
          ) : (
            // GRAFANA-STOP
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardHeader>artemis grafana-stop</CardHeader>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-alert-circle-i text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="">
                        <p className="card-category">Grafana</p>
                        <CardTitle tag="p">
                          <Button onClick={stopGrafana}>Stop Grafana</Button>
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  {grafanaDetails === true ? (
                    <>
                      <hr />
                      <p>Login Details</p>
                      <p>
                        URL:{" "}
                        <a href={grafanaUrl} target="_blank" rel="noreferrer">
                          {grafanaUrl}
                        </a>
                      </p>
                      <p>Username: {grafanaUsername}</p>
                      <p>Password: {grafanaPassword}</p>
                    </>
                  ) : (
                    <hr />
                  )}
                </CardFooter>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
