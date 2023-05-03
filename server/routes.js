const Router = require("koa-router")
const honks = []

const router = new Router()

// Read all honks
router.get("/honks", (ctx) => {
  ctx.body = honks
})

// Read a specific honk
router.get("/honks/:id", (ctx) => {
  const honk = honks.find((honk) => honk.id === Number(ctx.params.id))
  if (honk) {
    ctx.body = honk
  } else {
    ctx.status = 404
    ctx.body = { message: "Honk not found" }
  }
})

// Create a new honk
router.post("/honks", async (ctx) => {
  const newHonk = {
    ...ctx.request.body,
    id: honks.length + 1,
    timestamp: new Date(),
  }
  honks.push(newHonk)
  ctx.status = 201
  ctx.body = newHonk
})

// Update a specific honk
router.put("/honks/:id", async (ctx) => {
  const honkIndex = honks.findIndex((honk) => honk.id === Number(ctx.params.id))
  if (honkIndex !== -1) {
    honks[honkIndex] = { ...honks[honkIndex], ...ctx.request.body }
    ctx.body = honks[honkIndex]
  } else {
    ctx.status = 404
    ctx.body = { message: "Honk not found" }
  }
})

// Delete a specific honk
router.delete("/honks/:id", (ctx) => {
  const honkIndex = honks.findIndex((honk) => honk.id === Number(ctx.params.id))
  if (honkIndex !== -1) {
    honks.splice(honkIndex, 1)
    ctx.status = 204
  } else {
    ctx.status = 404
    ctx.body = { message: "Honk not found" }
  }
})

module.exports = router