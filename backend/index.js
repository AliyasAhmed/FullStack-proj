const express = require("express")
const app = express();
const userroutes = require("./routes/userRoutes")
const cors = require("cors")
app.use(express.json());
app.use(cors())

app.get("/" , (req , res) => {
    res.status(200).json({
        "message": "Hello backend"
    })
})

app.use("/api" , userroutes)

app.listen(2000 , () => {
    console.log("app running")
})