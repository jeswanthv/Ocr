const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

console.log("APIKEY: ", process.env.APIKEY);

const app = express();

// API key from Azure
const ApiKey = process.env.APIKEY;
const AzureEndpoint = process.env.AZUREENDPOINT + "/vision/v3.2";

const baseInstanceOptions = {
  baseURL: AzureEndpoint,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": ApiKey,
  },
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (res, req) => {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
  });
});

app.post("/api/describe", async (req, res) => {
  try {
    const instanceOptions = { ...baseInstanceOptions };
    const instance = axios.create(instanceOptions);
    const body = req.body;

    const response = await instance.post(`/ocr`, {
      url: body.image,
    });

    res.send({
      response: "ok",
      data: response.data,
    });
  } catch (err) {
    console.log("error :c : ", err);
    res.send({ response: "not ok" });
  }
});

const PORT = 51357;
app.listen(PORT, (err) => {
  if (err) {
    console.error(JSON.stringify(err, null, 2));
  } else {
    console.log(`Listening on port ${PORT}...`);
  }
});
