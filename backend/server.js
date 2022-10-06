const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv").config()
const colors = require("colors")

const { errorHandler } = require("./middleware/errorMiddleware")

const PORT = process.env.PORT || 8000

// Connect to database
connectDB()

const app = express()

// Allow the server to accept JSON
app.use(express.json())
// Allow the server to accept form-urlencoded data
app.use(express.urlencoded({ extended: false }))

/**
 * ROUTES
 */
app.get("/", (req, res) => res.status(200).send("Hola Amigo"))
app.use("/api/users", require("./routes/userRoutes"))

/**
 * Middleware
 */
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on ${PORT}`.brightMagenta))
