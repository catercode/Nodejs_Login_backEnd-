import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import usermodel from "./model.js"

const app = express()
const port = 5000;
app.use(express.json())
app.use(cors())


app.get("/home", async (req, res) => {
    res.json({ message: "Server is working" })
})
app.get("/getall", async (req, res) => {
    const loadAllUsers = await usermodel.find()
    if (loadAllUsers) {
        res.json({ data: loadAllUsers, message: "Fetch successful" })
    } else {
        res.json({ message: "Fetch failed" })
    }

})
app.post("/account", async (req, res) => {
    const { email, phoneNumber, password } = req.body
    const addUser = new usermodel({
        email: email,
        phoneNumber: phoneNumber,
        password: password

    })

    const saveUser = await addUser.save()
    if (saveUser) {
        res.json({ data: saveUser, message: "Account created successful" })
    } else {
        res.json({ message: "Account creation failed" })
    }
})

app.get("/login/:phoneNumber/:password", async (req, res) => {
    const { phoneNumber, password } = req.params
    console.log(password)

    const userLogin = await usermodel.find({ $and: [{ "phoneNumber": phoneNumber }, { "password": password }] })
    if (userLogin.length) {
        res.json({ data: userLogin, message: "Login Sucessfull" })
    } else {
        res.json({ data: userLogin, message: "Login failed" })
    }
})
mongoose.connect("mongodb://localhost:27017", {}).then(() => {
    console.log("connect to mongodb")
}).catch((err) => {
    console.log(err);
})

app.listen(port, () => {
    console.log("Server is listening to port " + port)
})




