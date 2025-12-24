const express = require('express');
const cors = require('cors');
const routes = require("./routes/taskRoute");
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const PORT = 5000;


const corsOptions = {
    origin: process.env.FRONT_URL,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/tasks", routes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Tasks stored in Json file`);
});