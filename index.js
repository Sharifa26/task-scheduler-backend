const express = require('express');
const cors = require('cors');
const routes = require("./routes/taskRoute");


const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());
app.use("/tasks", routes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Tasks stored in Json file`);
});