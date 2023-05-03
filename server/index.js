const Koa = require("koa")
// const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")
const taskRoutes = require("./routes")

const app = new Koa()
const port = 12367

app.use(bodyParser())
app.use(taskRoutes.routes())
app.use(taskRoutes.allowedMethods())

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})