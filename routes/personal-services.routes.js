const router = require("express").Router()

router.get("/", (req, res) => res.render("services/personal/index"))

router.get("/legal", (req, res) => res.render("services/personal/legal/index"))

module.exports = router

  