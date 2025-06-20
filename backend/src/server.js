
import express from "express";
import "dotenv/config";
import cors from 'cors';
import sequelize from "./config/db.js";
import "./models/Employee.js";
import router from "./routes/employeeRoutes.js";


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api/employees", router);


// Sync DB and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database connected & synced.");
   
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
