const router = require("express").Router()

// pagina de legal

router.get("/", (req, res) => res.render("services/personal/index"))

router.get("/legal", (req, res) => res.render("services/personal/legal/index"))

router.get("/legal/vehicle-agreement-selling", (req, res) => res.render("services/personal/legal/selling-vehicle-agreement"))

router.get("/legal/vehicle-agreement-buying", (req, res) => res.render("services/personal/legal/selling-vehicle-agreement"))


module.exports = router

  