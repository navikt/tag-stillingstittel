import axios from "axios";
import express from "express";
import winston from "winston";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

const fileLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "full.log" })],
});

const env = (envKey, required = true) => {
  const envValue = process.env[envKey];
  if (!envValue && required) {
    logger.error("Mangler miljøvariabel: " + envKey);
    process.exit(1);
  }
  return envValue;
};

const config = {
  pamUrl: env("PAM_URL"),
};

const server = express();

async function startApp() {
  try {
    server.use(["/internal/is_alive", "/internal/is_ready"], (req, res) => {
      res.send("Ok");
    });

    server.get(
      "/",
      asyncHandler(async (req, res) => {
        const response = await axios.get(
          `${config.pamUrl}/rest/typeahead/stilling`,
          {
            headers: {
              "Nav-CallId": uuidv4(),
            },
            params: {
              stillingstittel: req.query.q,
            },
          }
        );
        res.json(
          response.data.map((yrke) => {
            return {
              ...yrke,
              styrk08: yrke.styrk08[0].substr(0, yrke.styrk08[0].indexOf(".")),
            };
          })
        );
      })
    );

    const port = 4000;
    server.listen(port, () => logger.info(`Listening on port ${port}`));
  } catch (error) {
    logger.error("Error during start-up");
    fileLogger.error("Error during start-up", error);
  }
}

startApp().catch((err) => logger.error(err));
