import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); 
  }
};

checkDatabaseConnection();

export default prisma;
