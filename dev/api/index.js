const express = require("express")
const db = require("./db")

const routes = require("./routes")

const app = express()

app.use(express.json())


app.use((req, res, next) => {
	res.set("Access-Control-Allow-Origin", "*")
	res.set("Access-Control-Allow-Methods", "*")
	res.set("Access-Control-Allow-Headers", "*")
	
	
	//console.log(req.)
	next()
})

app.use(routes)


const port = 8000

app.listen(port, () => {
	console.log("Listening on", port)
})