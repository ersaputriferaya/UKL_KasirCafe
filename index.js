const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const PORT = 8000

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const userRoute = require("./routes/UserRoute")
app.use('/user', userRoute)

const mejaRoute = require("./routes/MejaRoute")
app.use('/meja', mejaRoute)

// const menuRoute = require("./routes/MenuRoute")
// app.use('/menu', menuRoute)

app.listen(PORT, () => {
    console.log(`Alhamdulillah Server of Wikusama Cafe runs on port ${PORT}`)
})