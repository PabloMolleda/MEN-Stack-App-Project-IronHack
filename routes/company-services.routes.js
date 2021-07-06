const router = require("express").Router()

// pagina de legal

router.get("/", (req, res) => res.render("services/company/index"))

//pagina de hr

router.get("/hr", (req, res) => res.render("services/company/hr/index"))


//pagina de business

router.get("/business", (req, res) => res.render("services/company/business/index"))



module.exports = router

  