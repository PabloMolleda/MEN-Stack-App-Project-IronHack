const router = require("express").Router()

// pagina de legal

router.get("/", (req, res) => res.render("services/personal/index"))

router.get("/legal", (req, res) => res.render("services/personal/legal/index"))

module.exports = router

  