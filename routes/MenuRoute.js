const express = require("express")
var bodyParser = require("body-parser");

const app = express()
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const menuController = require("../controllers/menu");
const auth = require("../auth/auth")

app.get("/getAll", menuController.getAllMenu)
app.post("/find", menuController.findMenu)
app.post("/", menuController.addMenu)
app.delete("/:id", menuController.deleteMenu)
app.put("/:id", menuController.updateMenu)

module.exports = app
