const router = require("express").Router()


// pagina de legal

router.get("/legal", (req, res) => res.render("index"))

//pagina de hr

router.get("/hr", (req, res) => res.render("index"))

//pagina de business

router.get("/business", (req, res) => res.render("index"))

module.exports = router