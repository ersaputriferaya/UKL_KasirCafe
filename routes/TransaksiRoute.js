const express = require("express")
var bodyParser = require("body-parser");

const app = express()
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const transaksiController = require("../controllers/transaksi")
const auth = require("../auth/auth")

app.get("/getAll", transaksiController.getAllTransaksi)
app.post("/find", transaksiController.findTransaksi)
app.post("/", transaksiController.addTransaksi)
app.delete("/:id", transaksiController.deleteTransaksi)
app.put("/:id", transaksiController.updateTransaksi)

module.exports = app