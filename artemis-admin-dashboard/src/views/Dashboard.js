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
  Spinner,
  Input,
} from "reactstrap";
import axios from "axios";
import routes from "routes.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import TopNavbar from "components/Navbars/TopNavbar.js";

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
  const [destroyDbButton, setDestroyDbButton] = useState(false);
  const [deployButton, setDeployButton] = useState(false);
  const [teardownButton, setTeardownButton] = useState(false);
  const [grafanaUrl, setGrafanaUrl] = useState("");
  const [grafanaUsername, setGrafanaUsername] = useState("");
  const [grafanaPassword, setGrafanaPassword] = useState("");
  const [grafanaRunning, setGrafanaRunning] = useState(false);
  const [grafanaDetails, setGrafanaDetails] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [taskCount, setTaskCount] = useState(1);
  const [runTestButton, setRunTestButton] = useState(false);
  const [grafanaButton, setGrafanaButton] = useState(false);
  const [grafanaStopButton, setGrafanaStopButton] = useState(false);
  const [sleepButton, setSleepButton] = useState(false);

  const commandIsNotExecuting = () => {
    const buttons = [
      destroyDbButton,
      deployButton,
      teardownButton,
      runTestButton,
      grafanaButton,
      grafanaStopButton,
      sleepButton,
    ];
    return !buttons.includes(true);
  };

  const onFileSelect = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const onTaskCountChange = (event) => {
    console.log(event.target.value);
    setTaskCount(event.target.value);
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
      alert("File upload successful.");
      console.log(res);
    } catch (err) {
      alert("File upload unsucccessful. Please try again.");
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
    setDestroyDbButton(
      JSON.parse(window.localStorage.getItem("destroyDbButton")) || false
    );
    setDeployButton(
      JSON.parse(window.localStorage.getItem("deployButton")) || false
    );
    setTeardownButton(
      JSON.parse(window.localStorage.getItem("teardownButton")) || false
    );
    setRunTestButton(
      JSON.parse(window.localStorage.getItem("runTestButton")) || false
    );
    setGrafanaButton(
      JSON.parse(window.localStorage.getItem("grafanaButton")) || false
    );
    setGrafanaStopButton(
      JSON.parse(window.localStorage.getItem("grafanaStopButton")) || false
    );
    setSleepButton(
      JSON.parse(window.localStorage.getItem("sleepButton")) || false
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
    window.localStorage.setItem("destroyDbButton", destroyDbButton);
    window.localStorage.setItem("deployButton", deployButton);
    window.localStorage.setItem("teardownButton", teardownButton);
    window.localStorage.setItem("runTestButton", runTestButton);
    window.localStorage.setItem("grafanaStopButton", grafanaStopButton);
    window.localStorage.setItem("grafanaButton", grafanaButton);
    window.localStorage.setItem("sleepButton", sleepButton);
  }, [
    infrastructureDeployed,
    grafanaUrl,
    grafanaUsername,
    grafanaPassword,
    grafanaRunning,
    grafanaDetails,
    destroyDbButton,
    deployButton,
    teardownButton,
    runTestButton,
    grafanaButton,
    grafanaStopButton,
    sleepButton,
  ]);

  const startGrafana = () => {
    if (commandIsNotExecuting()) {
      if (window.confirm("Start grafana dashboard?")) {
        setGrafanaButton(true);
        return axios
          .post("http://localhost:9000/artemisApi/grafanaStart")
          .then((response) => {
            console.log(response.data);
            getGrafanaUrl(response.data);
            getGrafanaUserName(response.data);
            getGrafanaPassword(response.data);
            setGrafanaRunning(true);
            setGrafanaDetails(true);
            setGrafanaButton(false);
          })
          .catch(logError);
      }
    } else {
      alert("Please wait for current task to finish.");
    }
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
    if (commandIsNotExecuting()) {
      if (window.confirm("Are you sure you want to stop Grafana?")) {
        setGrafanaStopButton(true);
        return axios
          .post("http://localhost:9000/artemisApi/grafanaStop")
          .then((response) => {
            console.log(response.data);
            setGrafanaRunning(false);
            setGrafanaDetails(false);
            resetGrafanaDetails();
            setGrafanaStopButton(false);
          })
          .catch(logError);
      }
    } else {
      alert("Please wait for current task to finish.");
    }
  };

  const sleepTelegraf = () => {
    if (commandIsNotExecuting()) {
      setSleepButton(true);
      return axios
        .post("http://localhost:9000/artemisApi/telegrafStop")
        .then((response) => {
          setSleepButton(false);
          setGrafanaRunning(false);
        })
        .catch(logError);
    } else {
      alert("Please wait for current task to finish.");
    }
  };

  const destroyDatabase = () => {
    if (commandIsNotExecuting()) {
      if (window.confirm("Are you sure you want to destroy the database?")) {
        setDestroyDbButton(true);
        return axios
          .post("http://localhost:9000/artemisApi/deletedb")
          .then((response) => {
            console.log(response.data);
            setDestroyDbButton(false);
          })
          .catch(logError);
      }
    } else {
      alert("Please wait for current task to finish.");
    }
  };

  const deployInfrastructure = () => {
    if (commandIsNotExecuting()) {
      if (
        window.confirm(
          "Would you like to deploy the artemis infrastructure?\nThis will take about 3 minutes."
        )
      ) {
        setDeployButton(true);
        return axios
          .post("http://localhost:9000/artemisApi/deploy")
          .then((response) => {
            console.log(response.data);
            setInfrastructureDeployed(true);
            setDeployButton(false);
          })
          .catch(logError);
      }
    } else {
      alert("Please wait for current task to finish.");
    }
  };

  const teardownInfrastructure = () => {
    if (commandIsNotExecuting()) {
      if (
        window.confirm(
          "Are you sure sure you want to destroy the artemis infrastructure?"
        )
      ) {
        setTeardownButton(true);
        return axios
          .post("http://localhost:9000/artemisApi/teardown")
          .then((response) => {
            console.log(response.data);
            setInfrastructureDeployed(false);
            setTeardownButton(false);
          })
          .catch(logError);
      }
    } else {
      alert("Please wait for current task to finish.");
    }
  };

  const onRunTest = () => {
    if (commandIsNotExecuting()) {
      if (
        window.confirm(
          "Check that you are not running any other tests.\nArtemis does not allow for concurrent testing.\nEnsure your test script has been uploaded."
        )
      ) {
        setRunTestButton(true);
        return axios
          .post("http://localhost:9000/artemisApi/runtest", null, {
            params: { taskCount: `${taskCount}` },
          })
          .then((response) => {
            console.log(response);
            setRunTestButton(false);
          });
      }
    } else {
      alert("Please wait for current task to finish.");
    }
  };

  return (
    <div className="wrapper">
      <Sidebar routes={routes} bgColor={"white"} activeColor={"info"} />
      <div className="main-panel">
        <TopNavbar />

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
                          {deployButton === true ? (
                            <CardTitle tag="p">
                              <Button variant="primary" disabled>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                />
                                {"     "}Deploying infrastructure...
                              </Button>
                            </CardTitle>
                          ) : (
                            <CardTitle tag="p">
                              <Button onClick={deployInfrastructure}>
                                Deploy
                              </Button>
                            </CardTitle>
                          )}
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
                            Teardown Artemis infrastructure on AWS account.
                            Retain Artemis database.
                          </p>
                          {teardownButton === true ? (
                            <CardTitle tag="p">
                              <Button variant="primary" disabled>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                />
                                {"     "}Tearing down infrastructure...
                              </Button>
                            </CardTitle>
                          ) : (
                            <CardTitle tag="p">
                              <Button onClick={teardownInfrastructure}>
                                Teardown
                              </Button>
                            </CardTitle>
                          )}
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
                        {destroyDbButton === true ? (
                          <CardTitle tag="p">
                            <Button variant="primary" disabled>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                              />
                              {"     "}Destroying database...
                            </Button>
                          </CardTitle>
                        ) : (
                          <CardTitle tag="p">
                            <Button onClick={destroyDatabase}>
                              Destroy Database
                            </Button>
                          </CardTitle>
                        )}
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
                        {sleepButton === true ? (
                          <CardTitle tag="p">
                            <Button variant="primary" disabled>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                              />
                              {"     "}Stopping support containers...
                            </Button>
                          </CardTitle>
                        ) : (
                          <CardTitle tag="p">
                            <Button onClick={sleepTelegraf}>Sleep</Button>
                          </CardTitle>
                        )}
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
                        <p className="card-category">
                          Run the uploaded test script concurrently the
                          specified number of times.
                        </p>
                        {runTestButton === true ? (
                          <CardTitle tag="p">
                            <Button variant="primary" disabled>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                              />
                              {"     "}Tests starting up...
                            </Button>
                          </CardTitle>
                        ) : (
                          <CardTitle tag="p">
                            <Button onClick={onRunTest}>Run Test</Button>
                          </CardTitle>
                        )}
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="">
                    <Input type="file" onChange={onFileSelect} />
                    <br />
                    <Button onClick={onFileUpload}>Upload!</Button>
                  </div>
                  <hr />
                  <div className="">
                    <i className="nc-icon nc-paper" /> Define Task Count
                    <Input
                      type="number"
                      value={taskCount}
                      min="1"
                      max="100"
                      onChange={onTaskCountChange}
                    />
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
                          <p className="card-category">
                            Start the Artemis Grafana dashboard.
                          </p>
                          {grafanaButton === true ? (
                            <CardTitle tag="p">
                              <Button variant="primary" disabled>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                />
                                {"     "}Grafana starting...
                              </Button>
                            </CardTitle>
                          ) : (
                            <CardTitle tag="p">
                              <Button onClick={startGrafana}>
                                Start Grafana
                              </Button>
                            </CardTitle>
                          )}
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
                          <p className="card-category">
                            Stop the Artemis Grafana dashboard.
                          </p>
                          {grafanaStopButton === true ? (
                            <CardTitle tag="p">
                              <Button variant="primary" disabled>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                />
                                {"     "}Grafana stopping...
                              </Button>
                            </CardTitle>
                          ) : (
                            <CardTitle tag="p">
                              <Button onClick={stopGrafana}>
                                Stop Grafana
                              </Button>
                            </CardTitle>
                          )}

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
      </div>
    </div>
  );
}

export default Dashboard;
