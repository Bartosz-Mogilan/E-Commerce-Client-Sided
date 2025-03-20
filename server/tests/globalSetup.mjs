import dotenv from "dotenv";

export default async function globalSetup() {
  console.log("Global setup: Loading environment variables...");
  
  dotenv.config();
  
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = "testsecret";
    console.log("JWT_SECRET not found in env, using default testsecret.");
  }

  console.log("Global setup complete.");
}

