import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import { envConfig } from "../../shared/config/env.config";
import indexRouter from "../routes/index.router";
import { errorHandler } from "../middleware/error.handler.middleware";
import adminRouter from "../routes/admin.router";
import cookieParser from "cookie-parser";
import companyRouter from "../routes/company.router";
import employeeRouter from "../routes/employee.router";

export const createServer = async () => {
  try {
    const app = express();
    app.use(
      cors({
        origin: envConfig.ORIGIN_URL,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    app.use(morgan("dev"));
    app.use(urlencoded({ limit: "50mb", extended: true }));
    app.use(cookieParser());
    app.use(express.json({ limit: "50mb" }));
    app.use("/", indexRouter);
    app.use("/admin", adminRouter);
    app.use("/company", companyRouter);
    app.use("/employee", employeeRouter);
    app.use(errorHandler);
    app.listen(envConfig.PORT, () =>
      console.log(`server running on port ${envConfig.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};
