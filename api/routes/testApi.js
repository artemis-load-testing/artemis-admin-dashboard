const express = require("express");
const router = express.Router();

const { exec } = require("child_process");

router.get("/", function (req, res) {
  res.send("Command Run!");
});

router.post("/", async function (req, res) {
  await exec(`artemis grafana-start`, (error, stdout, stderr) => {
    if (error) {
      console.log("error: ", error);
    }
    if (stderr) {
      console.log("stderr: ", stderr);
    }
    console.log("stdout: ", stdout);
    res.send(stdout);
  });
  console.log("post request");
});

module.exports = router;
