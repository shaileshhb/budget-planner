require("dotenv").config()
require('express-async-errors')
const express = require("express")
const app = express()
const sequelize = require('./db/connect')
const cors = require('cors');

// routers
const authRouter = require('./user/routes/auth.router');
const userRouter = require('./user/routes/user.router');
const envelopRouter = require('./envelop/routes/envelop.router')
const userAccountRouter = require('./user-account/routes/acount.router')
const spendingRouter = require('./transaction/routes/transaction.router')
const userSalaryRouter = require('./user-salary/routes/salary.router')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  console.log("inside / route");
  res.send("Welcome to budget-planner")
})

app.use('/api/v1/budget-planner', authRouter, userRouter, envelopRouter, 
  userAccountRouter, spendingRouter, userSalaryRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected successfully.');
    app.listen(PORT, console.log(`Server started at port ${PORT}`))
  } catch (err) {
    console.error(err);
    sequelize.close()
  }
}

startApp()