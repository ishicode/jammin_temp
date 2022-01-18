const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./routes")

// Connect to MongoDB database
mongoose
	.connect("mongodb+srv://ishitag925:IG57A7ud26!!@cluster0.euupm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
	.then(() => {
		const app = express()
		app.use(express.json()) // new
		app.use("/api", routes)

		app.listen(5500, () => {
			console.log("Server has started!")
		})

	})