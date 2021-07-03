const router = require("express").Router()

//pagina principal

router.get("/", (req, res) => res.render("index"))

router.get("/my-profile", (req, res) => res.render("index"))

router.get("/my-profile/edit", (req, res) => res.render("index"))

router.get("/book", (req, res) => res.render("index"))


module.exports = router