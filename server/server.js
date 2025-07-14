const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDb = require('./config/db.js')
const path = require("path");


// config env
dotenv.config();
PORT = process.env.PORT || 5000

// connect to mongodb
connectDb();


// basic app
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:3001",
  })
);

app.use(express.static(path.join(__dirname, "../client")));
// test route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "index.html"));
})

app.use('/api/departments' , require('./routes/departmentRoutes.js'))

app.use("/api/employees", require("./routes/employeeRoutes"));

// start of server
app.listen(PORT, () => {
    console.log(`server started running on http://localhost:${PORT}`);
    
})