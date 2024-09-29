import mongoose, { Connection } from "mongoose";
import { envConfig } from "../../shared/config/env.config";
import slugify from "slugify";
import { CompanyModel } from "../database/models/company.model";
import { ICompanyDbService } from "../../interface/service/I_dbService";

export class CompanyDbService implements ICompanyDbService {
  // Establish a connection to a company's database
  public async getConnection(domain: string): Promise<Connection | null> {
    try {
      const dbName = slugify(domain).toUpperCase();
      const connection = mongoose.createConnection(
        `${envConfig.MONGODB_URI}${dbName}`
      );
      // Ensure the connection is established
      await new Promise<void>((resolve, reject) => {
        connection.once("open", resolve);
        connection.once("error", reject);
      });
      return connection;
    } catch (error) {
      return null;
    }
  }

  // Check if a database for the given company already exists
  public async checkExistingDb(companyName: string): Promise<boolean> {
    const dbName = slugify(companyName).toUpperCase();

    try {
      // Create a connection to the admin database
      const adminConnection = mongoose.createConnection(
        `${envConfig.MONGODB_URI}admin`
      );

      await new Promise<void>((resolve, reject) => {
        adminConnection.once("open", resolve);
        adminConnection.on("error", reject);
      });
      // Use the admin interface to list all databases
      const admin = adminConnection?.db?.admin();
      const dbs = await admin?.listDatabases();

      // Close the admin connection after the query
      await adminConnection.close();

      // Check if the desired database exists in the list of databases
      const out =
        dbs?.databases.some((db: { name: string }) => db.name === dbName) ||
        false;
      return out;
    } catch (error) {
      console.error(`Error checking if database exists: ${dbName}`, error);
      return true;
    }
  }
}

// Admin

export class AdminDbService {
  public async getConnection(): Promise<Connection | null> {
    try {
      const dbName = envConfig.ADMIN_DB_NAME;
      const connection = mongoose.createConnection(
        `${envConfig.MONGODB_URI}${dbName}`
      );
      // Ensure the connection is established
      await new Promise<void>((resolve, reject) => {
        connection.once("open", resolve);
        connection.once("error", reject);
      });
      return connection;
    } catch (error) {
      return null;
    }
  }
  public async getAllCompanies(): Promise<Record<string, any[]> | null> {
    try {
      // Connect to the admin database to list all company databases
      const adminConnection = mongoose.createConnection(
        `${envConfig.MONGODB_URI}admin`
      );
      await new Promise<void>((resolve, reject) => {
        adminConnection.once("open", resolve);
        adminConnection.on("error", reject);
      });

      const admin = adminConnection.db?.admin();
      const dbs = await admin?.listDatabases();
      await adminConnection.close();

      // Filter to get company databases (excluding system and admin databases)
      const companyDbs =
        dbs?.databases
          .filter(
            (db: { name: string }) =>
              db.name !== "admin" &&
              db.name !== "local" &&
              db.name !== "flowlabs_admin" &&
              db.name !== "test" &&
              db.name !== "config"
          )
          .map((db: { name: string }) => db.name) || null;

      if (!companyDbs || companyDbs.length === 0) {
        console.error("No company databases found");
        return null;
      }
      const allCompanies: Record<string, any[]> = {}; // To store companies by db name
      // Iterate through each company database
      for (const dbName of companyDbs) {
        const companyConnection = mongoose.createConnection(
          `${envConfig.MONGODB_URI}${dbName}`
        );
        try {
          // Bind the Company model to this connection
          const CompanyModelInDb = companyConnection.model(
            "companydatas",
            CompanyModel.schema
          );

          // Fetch all companies (approved and unapproved)
          const companies = await CompanyModelInDb.find().lean();
          if (companies.length > 0) {
            allCompanies[dbName] = companies;
          } else {
            console.warn(`No companies found in database: ${dbName}`);
          }
        } catch (error) {
          console.error(`Error fetching companies from ${dbName}:`, error);
        } finally {
          await companyConnection.close();
        }
      }

      return Object.keys(allCompanies).length > 0 ? allCompanies : null;
    } catch (error) {
      console.error("Error fetching companies from all databases:", error);
      return null;
    }
  }
  public async dropDatabase(companySlug: string): Promise<boolean> {
    try {
      const dbName = companySlug.toUpperCase();
      const connection = mongoose.createConnection(
        `${envConfig.MONGODB_URI}${dbName}`
      );
      // Ensure the connection is established before dropping
      await new Promise<void>((resolve, reject) => {
        connection.once("open", resolve);
        connection.once("error", reject);
      });
      await connection.dropDatabase();
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Tenant DB
export class TenantDbService {
  public async getConnection(): Promise<Connection | null> {
    return null;
  }
}
