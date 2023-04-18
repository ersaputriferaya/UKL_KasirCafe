const express = require("express")
var bodyParser = require("body-parser");

const app = express()
app.use(express.json())

const mejaController = require("../controllers/meja");
const auth = require("../auth/auth")

app.get("/getAll", mejaController.getAllMeja)
app.post("/find", mejaController.findMeja)
app.post("/", mejaController.addMeja)
app.delete("/:id", mejaController.deleteMeja)
app.put("/:id", mejaController.updateMeja)

module.exports = app