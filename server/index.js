const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 8080;
const DB_URL = "mongodb+srv://alibek:12345678Fa@cluster0.rjj745j.mongodb.net/";

app.use(cors());
app.use(express.json());

const BASE_URL = "/api/v1";

app.use(`${BASE_URL}/auth`, authRoutes);

const start = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};


start()