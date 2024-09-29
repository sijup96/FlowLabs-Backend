import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import { envConfig } from "../../shared/config/env.config";
import indexRouter from "../routes/index.router";
import { errorHandler } from "../middleware/error.handler.middleware";
import adminRouter from "../routes/admin.router";
import cookieParser from "cookie-parser";
import companyRouter from "../routes/company.router";

export const createServer = async () => {
  try {
    const app = express();
    app.use(
      cors({
        origin: envConfig.ORIGIN_URL,
        credentials: true,
      })
    );
    app.use(morgan("dev"));
    app.use(urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.json());
    app.use("/", indexRouter);
    app.use("/admin", adminRouter);
    app.use("/:domainName/", companyRouter);
    app.use(errorHandler);
    app.listen(envConfig.PORT, () =>
      console.log(`server running on port ${envConfig.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};
