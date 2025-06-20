require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/Users');
app.use("/user", userRouter);  
const weatherRouter = require("./routes/Weather");
app.use("/weather", weatherRouter);

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
