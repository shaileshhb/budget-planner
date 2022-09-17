require("dotenv").config()
require('express-async-errors')
const express = require("express")
const app = express()
const sequelize = require('./db/connect')

// routers
const userRouter = require('./routes/user');

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

app.get('/', (req, res) => {
  res.send("Welcome to budget-planner")
})

app.use('/api/v1', userRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(PORT, console.log(`Server started at port ${PORT}`))
  } catch (err) {
    console.error(err);
    sequelize.close()
  }
}

startApp()