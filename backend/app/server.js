const express = require("express");
const path = require("path");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { AllRoutes } = require("./routes/routes.js");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.WHITE_LIST_ORGIN.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = class Application {
  #app = express();
  #PORT;
  constructor(port) {
    this.#PORT = port;
    this.configApplication();
    this.createServer(port);
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    this.#app.use(morgan("dev"));
    this.#app.use(express.static(path.join(__dirname, "public")));
    this.#app.use(helmet());
    this.#app.use(xss());
    this.#app.use(cors(corsOptions));
    this.#app.use(cookieParser(process.env.COOKIES_SECRET_KEY));
    this.#app.use(bodyParser.json());
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
  }
  createServer() {
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log(
        `server running on ${process.env.SERVERBASEURL}:${this.#PORT}`,
      );
    });
  }
  createRoutes() {
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد"));
    });
    this.#app.use((error, req, res, next) => {
      const statusCode =
        error.status || createError.InternalServerError().status;
      const message =
        error.message || createError.InternalServerError().message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
