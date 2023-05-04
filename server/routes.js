const Router = require("koa-router")
const skewps = require('./skewps')

const router = new Router()

// Read all skewps
router.get("/skewps", (ctx) => {
  ctx.body = skewps
})

// Read a specific skewp
router.get("/skewps/:id", (ctx) => {
  const skewp = skewps.find((skewp) => skewp.id === Number(ctx.params.id))
  if (skewp) {
    ctx.body = skewp
  } else {
    ctx.status = 404
    ctx.body = { message: "skewp not found" }
  }
})

// Create a new skewp
router.post("/skewps", async (ctx) => {
  const newskewp = {
    ...ctx.request.body,
    id: skewps.length + 1,
    timestamp: new Date(),
  }
  skewps.push(newskewp)
  ctx.status = 201
  ctx.body = newskewp
})

// Update a specific skewp
router.put("/skewps/:id", async (ctx) => {
  const skewpIndex = skewps.findIndex((skewp) => skewp.id === Number(ctx.params.id))
  if (skewpIndex !== -1) {
    skewps[skewpIndex] = { ...skewps[skewpIndex], ...ctx.request.body }
    ctx.body = skewps[skewpIndex]
  } else {
    ctx.status = 404
    ctx.body = { message: "skewp not found" }
  }
})

// Delete a specific skewp
router.delete("/skewps/:id", (ctx) => {
  const skewpIndex = skewps.findIndex((skewp) => skewp.id === Number(ctx.params.id))
  if (skewpIndex !== -1) {
    skewps.splice(skewpIndex, 1)
    ctx.status = 204
    ctx.body = 'skewp successfully deleted'
  } else {
    ctx.status = 404
    ctx.body = { message: "skewp not found" }
  }
})

module.exports = router