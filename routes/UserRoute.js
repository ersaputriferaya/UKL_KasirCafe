const express = require("express")
var bodyParser = require("body-parser");

const app = express()
app.use(express.json())

const userController = require("../controllers/user")
const auth = require("../auth/auth")

app.post("/login", userController.login)
app.get("/getAll", userController.getAlluser)
app.post("/find", userController.findUser)
app.post("/", userController.addUser)
app.delete("/:id", userController.deleteUser)
app.put("/:id", userController.updateUser)

module.exports = app