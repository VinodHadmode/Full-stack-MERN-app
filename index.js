const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./Routes/User.routes")
const jwt = require('jsonwebtoken');
var cors = require('cors')
require('dotenv').config()
const { auth } = require("./Middleware/auth.middleware");
const { noteRouter } = require("./Routes/Note.routes");

const app = express()

app.use(cors())
app.use(express.json())
app.use("/users", userRouter)

app.use(auth)
app.use("/notes",noteRouter)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to DB!!");

    } catch (error) {
        console.log(error);
        console.log("Something went wrong!!");
    }
    console.log(`Server is running at port no ${process.env.port}`);
})