import http from "k6/http";

export let options = {
  stages: [
    {
      duration: "100s",
      target: 10,
    },
    {
      duration: "30s",
      target: 15,
    },
    {
      duration: "10s",
      target: 0,
    },
  ],
  noConnectionReuse: true,
};

export default function () {
  http.get("https://test.k6.io");
}
